import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A booking must belong to a user.'],
    },
    vehicle: {
      type: mongoose.Schema.ObjectId,
      ref: 'Vehicle',
      required: [true, 'A booking must have a vehicle.'],
    },
    startDate: {
      type: Date,
      required: [true, 'Booking must have a start date.'],
    },
    endDate: {
      type: Date,
      required: [true, 'Booking must have an end date.'],
      validate: {
        validator: function (value) {
          // 'this' refers to the current document being saved
          return value > this.startDate;
        },
        message: 'End date must be after the start date.',
      },
    },
    totalPrice: {
      type: Number,
      required: [true, 'Booking must have a total price.'],
    },
    paymentDetails: {
      paymentId: {
        type: String, // From the payment gateway (e.g., Stripe's pi_xxxx)
      },
      status: {
        type: String,
        enum: ['pending', 'paid', 'failed', 'refunded'],
        default: 'pending',
      },
      method: String, // e.g., 'card', 'paypal'
    },
    status: {
      type: String,
      enum: ['upcoming', 'active', 'completed', 'cancelled'],
      default: 'upcoming',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Mongoose Middleware

// Populate user and vehicle details when a booking is queried
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name email', // Only select name and email of the user
  }).populate({
    path: 'vehicle',
    select: 'make model pricePerDay imageUrl', // Select key details of the vehicle
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
