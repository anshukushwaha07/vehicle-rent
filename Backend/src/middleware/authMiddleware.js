import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import User from '../models/user.model.js';
import catchAsync from '../utils/catchAsync.js'; 

export const protect = catchAsync(async (req, res, next) => {
  let token;

  // Get token from cookie OR from header
  if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    const error = new Error('You are not logged in. Please log in to get access.');
    res.status(401);
    return next(error);
  }

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //  Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    const error = new Error('The user belonging to this token no longer exists.');
    res.status(401);
    return next(error);
  }

  // Grant access to the protected route
  req.user = currentUser;
  next();
});

// Authorization Middleware for Roles 
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the roles allowed for this route
    if (!roles.includes(req.user.role)) {
      // Use next(error) for consistent error handling
      const error = new Error('You do not have permission to perform this action.');
      res.status(403); // 403 Forbidden is the correct code here
      return next(error);
    }
    next();
  };
};