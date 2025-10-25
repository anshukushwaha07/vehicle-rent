import Booking from '../models/booking.model.js';
import Vehicle from '../models/vehicle.model.js';
import catchAsync from '../utils/catchAsync.js'

// create new booking
export const createBooking = async (req, res) => {
  try {
    //  Get vehicle, dates, and the logged-in user's ID from the request
    const { vehicleId, startDate, endDate } = req.body;
    const userId = req.user.id; // From the 'protect' middleware

    //  Find the vehicle to get its price
    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) {
      return res.status(404).json({
        status: 'fail',
        message: 'No vehicle found with that ID.',
      });
    }

    // Check for overlapping bookings for the same vehicle
    const existingBooking = await Booking.findOne({
      vehicle: vehicleId,
      // Check if the requested dates conflict with an existing booking
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (existingBooking) {
      return res.status(400).json({
        status: 'fail',
        message: 'Vehicle is not available for the selected dates.',
      });
    }

    //  Calculate the total price
    const timeDifference = new Date(endDate).getTime() - new Date(startDate).getTime();
    const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    const totalPrice = numberOfDays * vehicle.pricePerDay;

    // Create the new booking
    const newBooking = await Booking.create({
      user: userId,
      vehicle: vehicleId,
      startDate,
      endDate,
      totalPrice,
    });

    //  Send success response
    res.status(201).json({
      status: 'success',
      data: {
        booking: newBooking,
      },
    });

  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while creating the booking.',
      error: error.message
    });
  }
};


export const getMyBookings = async (req, res) => {
  try {
    //  Find all bookings that match the logged-in user's ID
    const bookings = await Booking.find({ user: req.user.id });

    //  Send the response
    res.status(200).json({
      status: 'success',
      results: bookings.length,
      data: {
        bookings,
      },
    });
    
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Something went wrong while fetching your bookings.',
    });
  }
};


export const getAllBookings = catchAsync(async (req, res, next) => {
  // Find all bookings in the database
  const bookings = await Booking.find();

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: {
      bookings,
    },
  });
});


export const confirmBookingPayment = catchAsync(async (req, res, next) => {
  const { bookingId } = req.params;
  const { status, paymentId } = req.body; // Status ('success' or 'failure') from frontend

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    return res.status(404).json({ status: 'fail', message: 'Booking not found.' });
  }

  // Security check: Ensure the logged-in user owns this booking
  if (booking.user.toString() !== req.user.id) {
     return res.status(403).json({ status: 'fail', message: 'Not authorized.' });
  }

  // Only update if still pending (prevents overwriting webhook confirmation later)
  if (booking.paymentDetails.status === 'pending') {
    if (status === 'success') {
      booking.paymentDetails.status = 'paid';
      booking.paymentDetails.paymentId = paymentId || 'N/A_FrontendConfirm';
    } else {
      booking.paymentDetails.status = 'failed';
      // booking.status = 'cancelled'; // Optionally cancel the booking
    }
    await booking.save();
  } else {
    console.log(`Booking ${bookingId} already processed: ${booking.paymentDetails.status}`);
  }

  res.status(200).json({
    status: 'success',
    data: { booking },
  });
});