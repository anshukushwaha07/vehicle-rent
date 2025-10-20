import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes in this file are for admins only
router.use(protect, restrictTo('admin'));

router.get('/', getAnalytics);

export default router;