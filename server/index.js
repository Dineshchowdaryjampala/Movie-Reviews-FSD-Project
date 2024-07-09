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

app.use("/api/v1", routes);

// Connect to MongoDB
let cachedDb = null;
async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }
  const db = await mongoose.connect(process.env.MONGODB_URL);
  cachedDb = db;
  return db;
}

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = app;
