import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import vehicleRoutes from './routes/vehicleRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize the Express app
const app = express();

//  Global Middleware

const corsOptions = {
  origin: process.env.CLIENT_URL, // Always use the specific client URL
  credentials: true,             // This is the crucial line that allows cookies
};
app.use(cors(corsOptions));



// Body parser to read JSON from request bodies
app.use(express.json());
app.use(cookieParser());


//  API Routes 
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/vehicles', vehicleRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/payments', paymentRoutes);


//  Server Health Check Route 
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Vehicle Rental API is running and healthy!' });
});


// Error Handling Middleware 
app.use(notFound); 
app.use(errorHandler);


// Export the app to be used by the server startup file (index.js)
export default app;