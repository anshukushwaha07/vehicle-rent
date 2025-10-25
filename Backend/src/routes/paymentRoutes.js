import express from 'express';
import { initiatePayment, handlePaymentWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to initiate the payment - requires user to be logged in
router.post('/initiate', protect, initiatePayment);

// Route for Easybuzz to send webhook notifications - NO 'protect' middleware
router.post('/webhook', handlePaymentWebhook);

export default router;