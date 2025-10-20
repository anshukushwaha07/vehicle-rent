import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email address.'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address.',
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password.'],
      minlength: [8, 'Password must be at least 8 characters long.'],
      select: false, // Do not send password in query results by default
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide a phone number.'],
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Please provide your date of birth.'],
      validate: {
        validator: function (value) {
          // Calculate age: user must be at least 18 years old.
          const today = new Date();
          const birthDate = new Date(value);
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDifference = today.getMonth() - birthDate.getMonth();
          if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthDate.getDate())
          ) {
            age--;
          }
          return age >= 18;
        },
        message: 'You must be at least 18 years old to rent a vehicle.',
      },
    },
    drivingLicenseNumber: {
      type: String,
      required: [true, 'A valid driving license number is required.'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    // Field for Payment Gateway Integration
    paymentCustomerId: {
      type: String, // e.g., Stripe's customer ID (cus_xxxxxxxx)
      select: false,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

//  Mongoose Middleware 

//  Password Hashing: Encrypt password before saving the user document
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with a cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  next();
});

//Mongoose Instance Methods 

// Password Comparison: Method to compare candidate password with the hashed password
userSchema.methods.comparePassword = async function (candidatePassword) {
  // `this.password` refers to the hashed password of the specific user document
  return await bcrypt.compare(candidatePassword, this.password);
};


const User = mongoose.model('User', userSchema);

export default User;