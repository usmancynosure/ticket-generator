// utils/generateTicket.js - Fixed Professional Design (No Emoji Issues)
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

  // **HEADER SECTION** - Black with gold border
  doc.rect(0, 0, doc.page.width, 180).fill("#000000");
  
  // Top gold border (thick)
  doc.rect(0, 0, doc.page.width, 8).fill("#FFD700");

  // Gold side borders
  doc.rect(0, 0, 8, 180).fill("#FFD700");
  doc.rect(doc.page.width - 8, 0, 8, 180).fill("#FFD700");

  // Event Title - Large centered
  doc.fillColor("#FFD700")
     .fontSize(52)
     .font("Helvetica-Bold")
     .text("Farewell Eve '25", 0, 45, { align: "center", width: doc.page.width });

  // Tagline - Italic style
  doc.fontSize(12)
     .font("Helvetica-Oblique")
     .fillColor("#FFFFFF")
     .text("with grateful hearts, we bid farewell & welcome new beginnings", 0, 110, { 
       align: "center", 
       width: doc.page.width 
     });

  // Event Type Badge
  doc.rect(doc.page.width / 2 - 120, 140, 240, 32)
     .fill("#FFD700");
  
  doc.fontSize(16)
     .font("Helvetica-Bold")
     .fillColor("#000000")
     .text("LIVE QAWALI & CONCERT", 0, 148, { align: "center", width: doc.page.width });

  // Decorative bottom border
  doc.rect(0, 172, doc.page.width, 8).fill("#FFD700");

  // **EVENT DETAILS SECTION**
  let yPos = 210;
  
  // Gold header bar
  doc.rect(40, yPos, doc.page.width - 80, 45)
     .fill("#FFD700");
  
  doc.fillColor("#000000")
     .fontSize(22)
     .font("Helvetica-Bold")
     .text("EVENT DETAILS", 0, yPos + 12, { align: "center", width: doc.page.width });

  // White content box with gold border
  yPos += 45;
  doc.rect(40, yPos, doc.page.width - 80, 140)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .fillAndStroke("#FFFFFF", "#FFD700");

  yPos += 20;
  const leftMargin = 60;
  const valueMargin = 190;

  // Date & Time
  doc.fillColor("#000000")
     .fontSize(13)
     .font("Helvetica-Bold")
     .text("Date & Time:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .fontSize(12)
     .text("FRIDAY, 19 DEC 2025 AT 6:00 PM", valueMargin, yPos);

  yPos += 35;

  // Venue
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .fontSize(13)
     .text("Venue:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .fontSize(12)
     .text("Avior Marquee, Gulberg Greens, Islamabad", valueMargin, yPos, { width: 300 });

  yPos += 45;

  // Entry Fee - Highlighted
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .fontSize(13)
     .text("Entry Fee:", leftMargin, yPos);
  doc.font("Helvetica-Bold")
     .fillColor("#D4AF37")
     .fontSize(20)
     .text("Rs. 3500", valueMargin, yPos - 3);

  // **TICKET HOLDER SECTION**
  yPos = 430;
  
  // Black header bar with gold text
  doc.rect(40, yPos, doc.page.width - 80, 45)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .fillAndStroke("#000000", "#FFD700");
  
  doc.fillColor("#FFD700")
     .fontSize(22)
     .font("Helvetica-Bold")
     .text("TICKET HOLDER", 0, yPos + 12, { align: "center", width: doc.page.width });

  // White content box with gold border
  yPos += 45;
  doc.rect(40, yPos, doc.page.width - 80, 180)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .fillAndStroke("#F5F5F5", "#FFD700");

  yPos += 20;
  const lineSpacing = 30;

  // Name
  doc.fillColor("#000000")
     .fontSize(11)
     .font("Helvetica-Bold")
     .text("Name:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .fontSize(11)
     .text(ticket.name.toUpperCase(), valueMargin, yPos, { width: 300 });

  // Registration Number
  yPos += lineSpacing;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Registration No:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .text(ticket.regNo.toUpperCase(), valueMargin, yPos);

  // Batch
  yPos += lineSpacing;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Batch:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .text(ticket.batch, valueMargin, yPos);

  // Email
  yPos += lineSpacing;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Email:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .fontSize(10)
     .text(ticket.email.toLowerCase(), valueMargin, yPos, { width: 300 });

  // Phone
  yPos += lineSpacing;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .fontSize(11)
     .text("Phone:", leftMargin, yPos);
  doc.font("Helvetica")
     .fillColor("#1a1a1a")
     .text(ticket.phone || 'N/A', valueMargin, yPos);

  // Ticket ID (small, at bottom of box)
  yPos += lineSpacing;
  doc.font("Helvetica")
     .fillColor("#888888")
     .fontSize(8)
     .text(`Ticket ID: ${ticket._id ? ticket._id.toString().substring(0, 24).toUpperCase() : 'N/A'}`, 
           leftMargin, yPos);

  // **IMPORTANT INSTRUCTIONS BOX**
  yPos = 690;
  
  // Black box with gold border
  doc.rect(40, yPos, doc.page.width - 80, 110)
     .lineWidth(3)
     .strokeColor("#FFD700")
     .fillAndStroke("#1a1a1a", "#FFD700");

  // Gold top stripe
  doc.rect(40, yPos, doc.page.width - 80, 6)
     .fill("#FFD700");

  doc.fillColor("#FFD700")
     .fontSize(15)
     .font("Helvetica-Bold")
     .text("IMPORTANT INSTRUCTIONS", 0, yPos + 18, { align: "center", width: doc.page.width });

  // Instructions text
  yPos += 45;
  doc.fontSize(10)
     .font("Helvetica")
     .fillColor("#FFFFFF")
     .text("• Bring this ticket (printed or digital) and your student ID card", 60, yPos, { 
       width: doc.page.width - 120 
     });
  
  yPos += 20;
  doc.text("• Gates open at 5:30 PM - Event starts at 6:00 PM sharp", 60, yPos, { 
    width: doc.page.width - 120 
  });
  
  yPos += 20;
  doc.text("• Dress code: Formal/Semi-formal attire recommended", 60, yPos, { 
    width: doc.page.width - 120 
  });

  // **FOOTER**
  yPos = 815;
  
  // Gold separator line
  doc.rect(40, yPos, doc.page.width - 80, 3).fill("#FFD700");
  
  // Contact information
  doc.fontSize(8)
     .fillColor("#666666")
     .font("Helvetica")
     .text("For queries contact:", 0, yPos + 10, { align: "center", width: doc.page.width });
  
  doc.fontSize(7)
     .fillColor("#888888")
     .text("Hasnain 0306-5789045 | Zarnish 0340-4555553 | M Asad 0301-6996105 | Usman 0320-0787777", 
           50, yPos + 23, { align: "center", width: doc.page.width - 100 });

  // Copyright
  doc.fontSize(7)
     .fillColor("#999999")
     .text("© 2025 Farewell Eve. All rights reserved.", 
           0, yPos + 38, { align: "center", width: doc.page.width });

  doc.end();

  return filePath;
};
