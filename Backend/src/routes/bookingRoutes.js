import express from 'express';
import { createBooking, getMyBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// This line protects all routes defined below it
router.use(protect);

router.post('/', createBooking);

//   this new route for fetching a user's own bookings
router.get('/my-bookings', getMyBookings);

export default router;