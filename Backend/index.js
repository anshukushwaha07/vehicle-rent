import dotenv from "dotenv";
import app from './src/app.js'; 
import connectDB from "./src/config/db.js";

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB database
connectDB();

const PORT = process.env.PORT || 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

