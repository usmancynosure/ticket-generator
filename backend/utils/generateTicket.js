// utils/generateTicket.js - Enhanced Design
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = (ticket) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 0
  });
  
  const ticketsDir = path.join(__dirname, "../../tickets");
  if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir, { recursive: true });
  }
  
  const filePath = path.join(ticketsDir, `${ticket.regNo}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));

  // **Header Section** - Black with gold accents
  doc.rect(0, 0, doc.page.width, 200).fill("#000000");

  // Top gold border
  doc.rect(0, 0, doc.page.width, 5).fill("#FFD700");

  // Event Title - Large and Bold
  doc.fillColor("#FFFFFF")
     .fontSize(48)
     .font("Helvetica-Bold")
     .text("Farewell Eve '25", 0, 50, { align: "center", width: doc.page.width });

  // Tagline
  doc.fontSize(13)
     .font("Helvetica-Oblique")
     .fillColor("#FFD700")
     .text("with grateful hearts, we bid farewell & welcome new beginnings", 0, 110, { 
       align: "center", 
       width: doc.page.width 
     });

  // Event Type - Bold Banner
  doc.fontSize(22)
     .font("Helvetica-Bold")
     .fillColor("#FFFFFF")
     .text("LIVE QAWALI & CONCERT", 0, 145, { align: "center", width: doc.page.width });

  // Decorative line under header
  doc.rect(80, 195, doc.page.width - 160, 3).fill("#FFD700");

  // **Event Details Section**
  let yPos = 220;
  
  // Gold title bar
  doc.rect(50, yPos, doc.page.width - 100, 50)
     .fill("#FFD700");
  
  doc.fillColor("#000000")
     .fontSize(20)
     .font("Helvetica-Bold")
     .text("EVENT DETAILS", 0, yPos + 15, { align: "center", width: doc.page.width });

  // White background box for details
  yPos += 50;
  doc.rect(50, yPos, doc.page.width - 100, 150)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .fillAndStroke("#FFFFFF", "#FFD700");

  yPos += 25;

  // Date & Time
  doc.fillColor("#000000")
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("📅 Date & Time:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .fontSize(13)
     .text("FRIDAY, 19 DEC 2025 AT 6:00 PM", 220, yPos);

  yPos += 35;

  // Venue
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .fontSize(14)
     .text("📍 Venue:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .fontSize(13)
     .text("Avior Marquee, Gulberg Greens, Islamabad", 220, yPos, { width: 270 });

  yPos += 45;

  // Entry Fee - Highlighted
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .fontSize(14)
     .text("💰 Entry Fee:", 70, yPos);
  doc.font("Helvetica-Bold")
     .fillColor("#D4AF37")
     .fontSize(20)
     .text("Rs. 3500", 220, yPos - 3);

  // **Ticket Holder Information**
  yPos = 430;
  
  // Gold title bar
  doc.rect(50, yPos, doc.page.width - 100, 50)
     .fill("#000000");
  
  doc.rect(50, yPos, doc.page.width - 100, 50)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .stroke();

  doc.fillColor("#FFD700")
     .fontSize(20)
     .font("Helvetica-Bold")
     .text("TICKET HOLDER", 0, yPos + 15, { align: "center", width: doc.page.width });

  // White background for ticket holder details
  yPos += 50;
  doc.rect(50, yPos, doc.page.width - 100, 170)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .fillAndStroke("#F9F9F9", "#FFD700");

  yPos += 20;
  const lineHeight = 28;

  // Name
  doc.fillColor("#000000")
     .fontSize(12)
     .font("Helvetica-Bold")
     .text("Name:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .fontSize(12)
     .text(ticket.name, 220, yPos, { width: 300 });

  // Registration Number
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Registration No:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .text(ticket.regNo.toUpperCase(), 220, yPos);

  // Batch
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Batch:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .text(ticket.batch, 220, yPos);

  // Email
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Email:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .fontSize(11)
     .text(ticket.email, 220, yPos, { width: 300 });

  // Phone
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .fontSize(12)
     .text("Phone:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .text(ticket.phone || 'N/A', 220, yPos);

  // Ticket ID (small)
  yPos += lineHeight;
  doc.font("Helvetica")
     .fillColor("#999999")
     .fontSize(8)
     .text(`Ticket ID: ${ticket._id ? ticket._id.toString().substring(0, 20) : 'N/A'}`, 70, yPos);

  // **Important Instructions Box**
  yPos = 690;
  doc.rect(50, yPos, doc.page.width - 100, 120)
     .fill("#1a1a1a");

  doc.rect(50, yPos, doc.page.width - 100, 5)
     .fill("#FFD700");

  doc.fillColor("#FFD700")
     .fontSize(16)
     .font("Helvetica-Bold")
     .text("⚠️ IMPORTANT INSTRUCTIONS", 0, yPos + 15, { align: "center", width: doc.page.width });

  doc.fontSize(10)
     .font("Helvetica")
     .fillColor("#FFFFFF")
     .text("✓ Bring this ticket (printed or digital) and your student ID", 70, yPos + 45, { width: doc.page.width - 140 })
     .text("✓ Gates open 5:30 PM • Event starts 6:00 PM sharp", 70, yPos + 65, { width: doc.page.width - 140 })
     .text("✓ Dress code: Formal/Semi-formal attire recommended", 70, yPos + 85, { width: doc.page.width - 140 });

  // **Footer**
  yPos = 820;
  doc.rect(0, yPos, doc.page.width, 2).fill("#FFD700");
  
  doc.fontSize(7)
     .fillColor("#666666")
     .font("Helvetica")
     .text("For queries contact: Hasnain 0306-5789045 | Zarnish 0340-4555553 | M Asad 0301-6996105 | Usman 0320-0787777", 
           40, yPos + 10, { align: "center", width: doc.page.width - 80 });

  doc.fontSize(7)
     .fillColor("#999999")
     .text("© 2025 Farewell Eve. All rights reserved.", 
           0, yPos + 25, { align: "center", width: doc.page.width });

  doc.end();

  return filePath;
};
