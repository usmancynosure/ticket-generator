// backend/models/Ticket.js - Firebase Version
const { getFirestore } = require('../../config/firebase');

class Ticket {
  constructor(data) {
    this.name = data.name;
    this.regNo = data.regNo;
    this.batch = data.batch;
    this.email = data.email;
    this.paymentImage = data.paymentImage || null;
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || new Date();
    this._id = data._id || null;
  }

  // Save ticket to Firestore
  static async create(ticketData) {
    try {
      const db = getFirestore();
      const ticket = new Ticket(ticketData);
      const docRef = await db.collection('tickets').add({
        name: ticket.name,
        regNo: ticket.regNo,
        batch: ticket.batch,
        email: ticket.email,
        paymentImage: ticket.paymentImage,
        status: ticket.status,
        createdAt: ticket.createdAt
      });
      ticket._id = docRef.id;
      return ticket;
    } catch (error) {
      throw new Error('Failed to create ticket: ' + error.message);
    }
  }

  // Find ticket by ID
  static async findById(id) {
    try {
      const db = getFirestore();
      const doc = await db.collection('tickets').doc(id).get();
      if (!doc.exists) {
        return null;
      }
      return new Ticket({ _id: doc.id, ...doc.data() });
    } catch (error) {
      throw new Error('Failed to find ticket: ' + error.message);
    }
  }

  // Find all tickets with optional filter
  static async find(filter = {}) {
    try {
      const db = getFirestore();
      let query = db.collection('tickets');

      // Apply filters
      if (filter.status) {
        query = query.where('status', '==', filter.status);
      }

      // Get documents without ordering first (to avoid index requirement)
      const snapshot = await query.get();
      const tickets = [];
      snapshot.forEach(doc => {
        tickets.push(new Ticket({ _id: doc.id, ...doc.data() }));
      });
      
      // Sort in JavaScript instead of Firebase
      tickets.sort((a, b) => {
        const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
        const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
        return dateB - dateA; // Descending order
      });
      
      return tickets;
    } catch (error) {
      throw new Error('Failed to find tickets: ' + error.message);
    }
  }

  // Update ticket
  static async findByIdAndUpdate(id, updates) {
    try {
      const db = getFirestore();
      await db.collection('tickets').doc(id).update(updates);
      return await this.findById(id);
    } catch (error) {
      throw new Error('Failed to update ticket: ' + error.message);
    }
  }

  // Delete ticket
  static async findByIdAndDelete(id) {
    try {
      const db = getFirestore();
      await db.collection('tickets').doc(id).delete();
      return { success: true };
    } catch (error) {
      throw new Error('Failed to delete ticket: ' + error.message);
    }
  }

  // Count documents
  static async countDocuments(filter = {}) {
    try {
      const db = getFirestore();
      let query = db.collection('tickets');

      if (filter.status) {
        query = query.where('status', '==', filter.status);
      }

      const snapshot = await query.count().get();
      return snapshot.data().count;
    } catch (error) {
      // Fallback: get all documents and count
      const tickets = await this.find(filter);
      return tickets.length;
    }
  }

  // Save instance method
  async save() {
    try {
      const db = getFirestore();
      if (this._id) {
        // Update existing
        await db.collection('tickets').doc(this._id).update({
          name: this.name,
          regNo: this.regNo,
          batch: this.batch,
          email: this.email,
          paymentImage: this.paymentImage,
          status: this.status,
          createdAt: this.createdAt
        });
      } else {
        // Create new
        const docRef = await db.collection('tickets').add({
          name: this.name,
          regNo: this.regNo,
          batch: this.batch,
          email: this.email,
          paymentImage: this.paymentImage,
          status: this.status,
          createdAt: this.createdAt
        });
        this._id = docRef.id;
      }
      return this;
    } catch (error) {
      throw new Error('Failed to save ticket: ' + error.message);
    }
  }
}

module.exports = Ticket;
