// Handles requests to routes that don't exist
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Main error handler for the application
const errorHandler = (err, req, res, next) => {
  // Determine the status code. If the error already has one, use it. Otherwise, default to 500 (Internal Server Error).
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // --- Handle specific Mongoose errors ---

  // For invalid ObjectIDs
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'Resource not found.';
  }

  // For duplicate key errors (e.g., unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    statusCode = 400;
    message = `Duplicate field value entered for '${field}'. Please use another value.`;
  }

  // For Mongoose validation errors
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map(el => el.message);
    statusCode = 400;
    message = `Invalid input data: ${errors.join('. ')}`;
  }
  
  // --- Handle specific JWT errors ---
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token. Please log in again.';
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Your token has expired. Please log in again.';
  }

  // Send the final, formatted error response
  res.status(statusCode).json({
    status: 'fail',
    message,
    // Include the stack trace only in development mode for debugging
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };