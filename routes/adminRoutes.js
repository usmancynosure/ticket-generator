// routes/adminRoutes.js - Firebase Version
const express = require("express");
const router = express.Router();
const Ticket = require("../backend/models/Ticket");
const generateTicket = require("../backend/utils/generateTicket");
const sendEmail = require("../backend/utils/sendEmail");

// Simple admin credentials (you can enhance this with JWT later)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

// Admin login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      res.json({ 
        success: true, 
        message: "Login successful",
        token: "admin-authenticated" // Simple token for demo
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// Get all tickets (with filter options)
router.get("/tickets", async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== '' ? { status } : {};
    
    const tickets = await Ticket.find(filter);
    res.json({ success: true, tickets });
  } catch (error) {
    console.error("Failed to fetch tickets:", error);
    res.status(500).json({ error: "Failed to fetch tickets", details: error.message });
  }
});

// Get single ticket details
router.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.json({ success: true, ticket });
  } catch (error) {
    console.error("Failed to fetch ticket:", error);
    res.status(500).json({ error: "Failed to fetch ticket" });
  }
});

// Approve ticket
router.post("/tickets/:id/approve", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (ticket.status === "approved") {
      return res.status(400).json({ error: "Ticket already approved" });
    }

    // Update status to approved
    ticket.status = "approved";
    await ticket.save();

    // Generate PDF ticket
    const ticketPath = generateTicket(ticket);

    // Wait for PDF to be written
    await new Promise(resolve => setTimeout(resolve, 500));

    // Send email with ticket
    await sendEmail(ticket.email, ticketPath);

    res.json({ 
      success: true, 
      message: "Ticket approved and sent to user",
      ticket 
    });
  } catch (error) {
    console.error("Approval error:", error);
    res.status(500).json({ 
      error: "Failed to approve ticket",
      details: error.message 
    });
  }
});

// Reject ticket
router.post("/tickets/:id/reject", async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    ticket.status = "rejected";
    await ticket.save();

    res.json({ 
      success: true, 
      message: "Ticket rejected",
      ticket 
    });
  } catch (error) {
    console.error("Reject error:", error);
    res.status(500).json({ error: "Failed to reject ticket" });
  }
});

// Delete ticket
router.delete("/tickets/:id", async (req, res) => {
  try {
    await Ticket.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Ticket deleted" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Failed to delete ticket" });
  }
});

// Get statistics
router.get("/stats", async (req, res) => {
  try {
    const pending = await Ticket.countDocuments({ status: "pending" });
    const approved = await Ticket.countDocuments({ status: "approved" });
    const rejected = await Ticket.countDocuments({ status: "rejected" });
    const total = await Ticket.countDocuments({});

    res.json({
      success: true,
      stats: { pending, approved, rejected, total }
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({ error: "Failed to fetch stats", details: error.message });
  }
});

module.exports = router;
