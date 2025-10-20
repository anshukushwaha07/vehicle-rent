import Vehicle from '../models/vehicle.model.js';
import catchAsync from '../utils/catchAsync.js'
//  get all vehicles
export const getAllVehicles = catchAsync(async (req, res, next) => {
  try {
    // Execute the query
    const vehicles = await Vehicle.find();

    // Send the response
    res.status(200).json({
      status: 'success',
      results: vehicles.length,
      data: {
        vehicles,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'Could not find vehicles.',
    });
  }
});

// get single vehicle
export const getVehicle = catchAsync(async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle) {
      return res.status(404).json({
        status: 'fail',
        message: 'No vehicle found with that ID',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        vehicle,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
});

// create vehicle (Admin Only)
export const createVehicle = catchAsync(async (req, res, next) => {
    try {
        const newVehicle = await Vehicle.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                vehicle: newVehicle,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
});

// update vehicle (Admin Only)
export const updateVehicle = catchAsync(async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true, // Run model validators on update
        });

        if (!vehicle) {
            return res.status(404).json({
                status: 'fail',
                message: 'No vehicle found with that ID',
            });
        }

        res.status(200).json({
            status: 'success',
            data: {
                vehicle,
            },
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
        });
    }
});

// delete vehicle (Admin Only)
export const deleteVehicle = catchAsync(async (req, res, next) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);

        if (!vehicle) {
            return res.status(404).json({
                status: 'fail',
                message: 'No vehicle found with that ID',
            });
        }

        // 204 means 'No Content', a standard for successful deletions
        res.status(204).json({
            status: 'success',
            data: null,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Something went wrong while deleting the vehicle.',
        });
    }
});