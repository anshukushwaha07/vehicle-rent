import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';
import Vehicle from '../models/vehicle.model.js';
import catchAsync from '../utils/catchAsync.js';

export const getAnalytics = catchAsync(async (req, res, next) => {
  //  Get total counts of documents
  const totalUsers = await User.countDocuments();
  const totalVehicles = await Vehicle.countDocuments();
  const totalBookings = await Booking.countDocuments();

  //  Calculate revenue using Mongoose Aggregation Pipeline
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfQuarter = new Date(now.getFullYear(), Math.floor(now.getMonth() / 3) * 3, 1);
  const firstDayOfYear = new Date(now.getFullYear(), 0, 1);

  const revenueStats = await Booking.aggregate([
    {
      $match: {
        status: { $in: ['completed', 'active'] }, // Only count revenue from paid/active bookings
      },
    },
    {
      $group: {
        _id: null,
        dailyRevenue: {
          $sum: {
            $cond: [{ $gte: ['$createdAt', today] }, '$totalPrice', 0],
          },
        },
        monthlyRevenue: {
          $sum: {
            $cond: [{ $gte: ['$createdAt', firstDayOfMonth] }, '$totalPrice', 0],
          },
        },
        quarterlyRevenue: {
          $sum: {
            $cond: [{ $gte: ['$createdAt', firstDayOfQuarter] }, '$totalPrice', 0],
          },
        },
        yearlyRevenue: {
          $sum: {
            $cond: [{ $gte: ['$createdAt', firstDayOfYear] }, '$totalPrice', 0],
          },
        },
        totalRevenue: { $sum: '$totalPrice' },
      },
    },
  ]);

  //  Send the response
  res.status(200).json({
    status: 'success',
    data: {
      totalUsers,
      totalVehicles,
      totalBookings,
      revenue: revenueStats[0] || { // Handle case where there are no bookings yet
        dailyRevenue: 0,
        monthlyRevenue: 0,
        quarterlyRevenue: 0,
        yearlyRevenue: 0,
        totalRevenue: 0,
      },
    },
  });
});