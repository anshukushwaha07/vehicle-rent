import crypto from 'crypto-js';
import axios from 'axios';
import Booking from '../models/booking.model.js';
import Vehicle from '../models/vehicle.model.js';
import catchAsync from '../utils/catchAsync.js';

// hash function
const calculateHash = (data, salt) => {
  const hashString = `${process.env.EASEBUZZ_KEY}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|${data.udf1}|${data.udf2}|${data.udf3}|${data.udf4}|${data.udf5}|${data.udf6}|${data.udf7}|${data.udf8}|${data.udf9}|${data.udf10}|${salt}`;
  const hash = crypto.SHA512(hashString).toString(crypto.enc.Hex);
  return hash;
};



//INITIATE PAYMENT CONTROLLER 
export const initiatePayment = catchAsync(async (req, res, next) => {
  const { vehicleId, startDate, endDate, totalPrice } = req.body;
  console.log('--- ENTERED initiatePayment ---'); 
  console.log('Request Body:', req.body);        
  console.log('User from protect:', req.user);     
  const user = req.user;

  //  Validation
  if (!vehicleId || !startDate || !endDate || !totalPrice || totalPrice <= 0) {
    return res.status(400).json({ status: 'fail', message: 'Missing or invalid booking details.' });
  }

  //  Re-verify Vehicle Availability
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) {
    return res.status(404).json({ status: 'fail', message: 'Vehicle not found.' });
  }
  const existingBooking = await Booking.findOne({
    vehicle: vehicleId,
    status: { $in: ['upcoming', 'active'] },
    $or: [{ startDate: { $lte: endDate }, endDate: { $gte: startDate } }],
  });
  if (existingBooking) {
    return res.status(400).json({ status: 'fail', message: 'Vehicle is not available for the selected dates.' });
  }

  //  Create Booking Record with 'pending' status
  let newBooking;
  try {
    newBooking = await Booking.create({
      user: user._id,
      vehicle: vehicleId,
      startDate,
      endDate,
      totalPrice,
      paymentDetails: { status: 'pending' },
      status: 'upcoming',
    });
  } catch (dbError) {
    console.error("Error creating booking:", dbError);
    return res.status(500).json({ status: 'error', message: 'Failed to create booking record.' });
  }

  // Prepare Data for Easybuzz API
  const transactionId = newBooking._id.toString();
  const paymentData = {
    key: process.env.EASEBUZZ_KEY,
    txnid: transactionId,
    amount: totalPrice.toFixed(2),
    productinfo: `${vehicle.make} ${vehicle.model} Rental`,
    firstname: user.name.split(' ')[0] || 'Customer',
    email: user.email,
    phone: user.phoneNumber || '9999999999', // Ensure a fallback
    surl: `${process.env.FRONTEND_URL}/payment-success?bookingId=${transactionId}`,
    furl: `${process.env.FRONTEND_URL}/payment-failure?bookingId=${transactionId}`,
    udf1: '', udf2: '', udf3: '', udf4: '', udf5: '',
    udf6: '', udf7: '', udf8: '', udf9: '', udf10: '',
  };

  // 5. Calculate the Hash
  paymentData.hash = calculateHash(paymentData, process.env.EASEBUZZ_SALT);


console.log("--- Easybuzz Payment Data ---");
console.log("URL:", `${process.env.EASEBUZZ_API_BASE_URL}/payment/initiate`);
console.log("Data Sent:", paymentData); // Log the entire object being sent
console.log("Calculated Hash:", paymentData.hash);
console.log("--- End Easybuzz Data ---");
  //  Call Easybuzz Initiate Payment API
  try {
    const easybuzzResponse = await axios.post(
      `${process.env.EASEBUZZ_API_BASE_URL}/payment/initiate`,
      new URLSearchParams(paymentData).toString(),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    //  Send access_key to frontend
    if (easybuzzResponse.data && easybuzzResponse.data.status === 1) {
      res.status(200).json({
        status: 'success',
        data: {
          access_key: easybuzzResponse.data.data,
          bookingId: transactionId,
        },
      });
    } else {
      console.error("Easybuzz initiation failed:", easybuzzResponse.data);
      // Optional: Clean up pending booking
      // await Booking.findByIdAndDelete(transactionId);
      res.status(400).json({
        status: 'fail',
        message: easybuzzResponse.data.error_desc || 'Failed to initiate payment.',
      });
    }
  } catch (apiError) {
    // console.error('Error calling Easybuzz API:', apiError.response?.data || apiError.message);
    // // Optional: Clean up pending booking
    // // await Booking.findByIdAndDelete(transactionId);
    // res.status(500).json({ status: 'error', message: 'Could not connect to payment gateway.' });

    console.error('--- Easybuzz API Call Failed ---');
    if (apiError.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Status:', apiError.response.status);
      console.error('Headers:', apiError.response.headers);
      console.error('Data:', apiError.response.data); // Log the HTML response you saw
    } else if (apiError.request) {
      // The request was made but no response was received
      console.error('Request Error:', apiError.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error Message:', apiError.message);
    }
    console.error('Config:', apiError.config);
    console.error('--- End Easybuzz Error ---');
  }
});

// Webhook Handler (Placeholder - Not used in current flow but keep for later)
export const handlePaymentWebhook = catchAsync(async (req, res, next) => {
    console.log("Webhook received (currently ignored):", req.body);
    res.status(200).send('Webhook received');
});
