const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const routes = require("./src/routes/index.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect to MongoDB
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  try {
    console.log("Attempting to connect to MongoDB...");
    console.log("MongoDB URL:", process.env.MONGODB_URL); // Remove this line before production deployment
    const db = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
    cachedDb = db;
    return db;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error; // Re-throw the error to be caught in the middleware
  }
}

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed', error);
    res.status(500).json({ error: 'Internal Server Error: Database connection failed' });
  }
});

// Routes
app.use("/api/v1", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;
