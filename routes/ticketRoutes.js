// routes/ticketRoutes.js - With Cloudinary
const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const Ticket = require("../backend/models/Ticket");
const generateTicket = require("../backend/utils/generateTicket");
const sendEmail = require("../backend/utils/sendEmail");
const { cloudinary } = require("../config/cloudinary");

// Configure multer for memory storage (temporary)
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Submit ticket request
router.post("/submit", upload.single("payment"), async (req, res) => {
  try {
    const { name, regNo, batch, email, phone } = req.body;

    // Validation
    if (!name || !regNo || !batch || !email || !phone) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format!" });
    }

    // Phone validation
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone) || phone.length < 10) {
      return res.status(400).json({ error: "Invalid phone number format!" });
    }

    let paymentImageUrl = null;

    // Upload image to Cloudinary if provided
    if (req.file) {
      try {
        // Upload to Cloudinary using buffer
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'ticket-generator/payment-proofs',
              resource_type: 'image',
              public_id: `payment-${Date.now()}-${regNo}`,
            },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          uploadStream.end(req.file.buffer);
        });

        paymentImageUrl = result.secure_url;
        console.log('✅ Image uploaded to Cloudinary:', paymentImageUrl);
      } catch (uploadError) {
        console.error('❌ Failed to upload to Cloudinary:', uploadError);
        // Continue without image if upload fails
      }
    }

    // Create ticket in database with pending status
    const ticket = await Ticket.create({
      name,
      regNo,
      batch,
      email,
      phone,
      paymentImage: paymentImageUrl,
      status: "pending",
    });

    // Don't send email yet - wait for admin approval
    res.json({ 
      success: true, 
      message: "Your request has been submitted! Pending verification. You'll receive your ticket via email once approved.",
      ticketId: ticket._id,
      status: "pending"
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ 
      error: "Failed to submit ticket", 
      details: error.message 
    });
  }
});

// Get ticket status
router.get("/ticket/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

module.exports = router;
