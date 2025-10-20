import express from 'express';
import { 
    getAllVehicles, 
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle
} from '../controllers/vehicleController.js';
// IMPORT the middleware
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public Routes
router.get('/', getAllVehicles);
router.get('/:id', getVehicle);

// Admin-Only Routes 
// The requests will first go through 'protect', then 'restrictTo', and finally the controller.
router.post('/', protect, restrictTo('admin'), createVehicle);
router.patch('/:id', protect, restrictTo('admin'), updateVehicle);
router.delete('/:id', protect, restrictTo('admin'), deleteVehicle);

export default router;