// Import necessary modules and packages
import express from "express"; // Import Express framework
import cookieParser from "cookie-parser"; // Middleware for handling cookies
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import routes from "./src/routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

let isConnected = false;

async function connectToDatabase() {
  if (isConnected) {
    console.log('Using existing database connection');
    return;
  }

  try {
    console.log("Attempting to connect to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    isConnected = false;
    throw error;
  }
}

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed', error);
    res.status(503).json({ error: 'Service Unavailable: Database connection failed' });
  }
});

// Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

// Handler for serverless function
const handler = async (req, res) => {
  await app(req, res);
};

export default handler;
