// server.js - Firebase Version
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { initializeFirebase } = require("./config/firebase");
const { configureCloudinary } = require("./config/cloudinary");
const ticketRoutes = require("./routes/ticketRoutes");
const path = require("path");
const fs = require("fs");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Create necessary directories
const dirs = ["uploads", "tickets"];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Initialize Firebase
initializeFirebase();

// Initialize Cloudinary
configureCloudinary();

// Health check API
app.get("/api/health", (req, res) => {
  res.json({ 
    message: "Ticket Generator API is running!",
    status: "OK",
    database: "Firebase Firestore",
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use("/api", ticketRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));

// Serve static files from frontend build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!", details: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Database: Firebase Firestore`);
});
