import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import catchAsync from '../utils/catchAsync.js';


const createSendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    maxAge: parseInt(process.env.JWT_COOKIE_EXPIRES_IN, 10) * 24 * 60 * 60 * 1000,
    httpOnly: true, // Prevents JavaScript from accessing the cookie
    secure: process.env.NODE_ENV === 'production', // Only send over HTTPS
  };

  res.cookie('jwt', token, cookieOptions);

  // Remove password from the output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// SIGNUP CONTROLLER 
export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phoneNumber: req.body.phoneNumber,
    dateOfBirth: req.body.dateOfBirth,
    drivingLicenseNumber: req.body.drivingLicenseNumber,
    address: req.body.address,
  });

  createSendToken(newUser, 201, res);
});

//  LOGIN CONTROLLER 
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error('Please provide email and password.');
    res.status(400);
    return next(error);
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    const error = new Error('Incorrect email or password.');
    res.status(401);
    return next(error);
  }

  createSendToken(user, 200, res);
});

//  LOGOUT CONTROLLER (New) 
export const logout = (req, res) => {
  // To log out, we send a cookie with the same name but set its maxAge to 1ms,
  // effectively expiring it instantly.
  res.cookie('jwt', 'loggedout', {
    maxAge: 1, // Expires immediately
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};