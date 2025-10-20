import express from 'express';
import { createBooking, getMyBookings,getAllBookings } from '../controllers/bookingController.js';
import { protect,restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// This line protects all routes defined below it
router.use(protect);

router.post('/', createBooking);

//   this new route for fetching a user's own bookings
router.get('/my-bookings', getMyBookings);
// Only an admin can get a list of ALL bookings in the system.
router.get('/', restrictTo('admin'), getAllBookings); // Add the new admin route


export default router;