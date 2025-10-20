import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, 'Vehicle make (e.g., Toyota, Honda) is required.'],
      trim: true,
    },
    model: {
      type: String,
      required: [true, 'Vehicle model (e.g., Camry, Civic) is required.'],
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'Manufacturing year is required.'],
    },
    type: {
      type: String,
      required: [true, 'Vehicle type is required.'],
      enum: ['car', 'bike', 'scooter','van'], // Match the types from your frontend
    },
    pricePerDay: {
      type: Number,
      required: [true, 'Price per day is required.'],
    },
    imageUrl: {
      type: String,
      required: [true, 'An image URL for the vehicle is required.'],
    },
    availability: {
      isAvailable: {
        type: Boolean,
        default: true,
      },
      // You could expand this to include rental dates later
      // rentalPeriods: [{ from: Date, to: Date }]
    },
    features: {
      engine: String, // e.g., "TWIN-TURBO V-12"
      transmission: {
        type: String,
        enum: ['automatic', 'manual'],
        default: 'automatic',
      },
      seats: Number,
      fuelType: String, // e.g., "Petrol", "Diesel", "Electric"
    },
    location: {
      // For future geo-location features
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        index: '2dsphere', // For geospatial queries
      },
      address: String,
    },
  },
  {
    timestamps: true,
  }
);

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

export default Vehicle;
