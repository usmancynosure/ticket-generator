// utils/generateTicket.js
const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

module.exports = (ticket) => {
  const doc = new PDFDocument({
    size: "A4",
    margin: 50
  });
  
  const ticketsDir = path.join(__dirname, "../../tickets");
  if (!fs.existsSync(ticketsDir)) {
    fs.mkdirSync(ticketsDir, { recursive: true });
  }
  
  const filePath = path.join(ticketsDir, `${ticket.regNo}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));

  // Black background header with gold accent
  doc.rect(0, 0, doc.page.width, 180).fill("#000000");

  // Gold decorative line at top
  doc.rect(0, 0, doc.page.width, 3).fill("#FFD700");

  // Title in white with gold accent
  doc.fillColor("#FFFFFF")
     .fontSize(40)
     .font("Helvetica-Bold")
     .text("Farewell Eve '25", 50, 50, { align: "center" });

  doc.fontSize(14)
     .font("Helvetica-Oblique")
     .fillColor("#FFD700")
     .text("with grateful hearts, we bid farewell & welcome new beginnings", 50, 105, { align: "center" });

  doc.fontSize(18)
     .font("Helvetica-Bold")
     .fillColor("#FFFFFF")
     .text("LIVE QAWALI & CONCERT", 50, 140, { align: "center" });

  // Event Details Box
  doc.rect(50, 200, doc.page.width - 100, 140)
     .lineWidth(2)
     .strokeColor("#FFD700")
     .stroke();

  doc.rect(50, 200, doc.page.width - 100, 40)
     .fill("#FFD700");

  doc.fillColor("#000000")
     .fontSize(16)
     .font("Helvetica-Bold")
     .text("EVENT DETAILS", 50, 210, { align: "center" });

  // Date, Time, Venue
  doc.fillColor("#000000")
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("Date & Time:", 70, 260);
  
  doc.font("Helvetica")
     .fillColor("#333333")
     .text("FRIDAY, 19 DEC 2025 AT 6 PM", 200, 260);

  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Venue:", 70, 290);
  
  doc.font("Helvetica")
     .fillColor("#333333")
     .text("Avior Marquee, Gulberg Greens, Islamabad", 200, 290);

  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Entry Fee:", 70, 320);
  
  doc.font("Helvetica-Bold")
     .fillColor("#FFD700")
     .fontSize(16)
     .text("Rs. 3500", 200, 318);

  // Attendee Information
  doc.rect(50, 360, doc.page.width - 100, 180)
     .lineWidth(2)
     .strokeColor("#FFD700")
     .stroke();

  doc.rect(50, 360, doc.page.width - 100, 40)
     .fill("#FFD700");

  doc.fillColor("#000000")
     .fontSize(16)
     .font("Helvetica-Bold")
     .text("TICKET HOLDER INFORMATION", 50, 370, { align: "center" });

  let yPos = 420;
  const lineHeight = 35;

  // Name
  doc.fillColor("#000000")
     .fontSize(13)
     .font("Helvetica-Bold")
     .text("Name:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .text(ticket.name, 200, yPos);

  // Registration Number
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Registration No:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .text(ticket.regNo, 200, yPos);

  // Batch
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Batch:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .text(ticket.batch, 200, yPos);

  // Email
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Email:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .text(ticket.email, 200, yPos, { width: 300 });

  // Phone
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Phone:", 70, yPos);
  doc.font("Helvetica")
     .fillColor("#333333")
     .text(ticket.phone || 'N/A', 200, yPos);

  // Ticket ID
  yPos += lineHeight;
  doc.font("Helvetica-Bold")
     .fillColor("#000000")
     .text("Ticket ID:", 70, yPos);
  doc.font("Helvetica")
     .fontSize(10)
     .fillColor("#666666")
     .text(ticket._id ? ticket._id.toString().substring(0, 16) : "N/A", 200, yPos + 2);

  // Important Instructions
  yPos = 580;
  doc.rect(50, yPos, doc.page.width - 100, 130)
     .fill("#000000");

  doc.fillColor("#FFD700")
     .fontSize(14)
     .font("Helvetica-Bold")
     .text("IMPORTANT INSTRUCTIONS", 50, yPos + 15, { align: "center" });

  doc.fontSize(11)
     .font("Helvetica")
     .fillColor("#FFFFFF")
     .text("• Please bring this ticket (printed or digital) on the event day", 70, yPos + 45, { width: doc.page.width - 140 })
     .text("• Bring your valid student ID card for verification", 70, yPos + 65, { width: doc.page.width - 140 })
     .text("• Gates open at 5:30 PM. Event starts at 6:00 PM sharp", 70, yPos + 85, { width: doc.page.width - 140 })
     .text("• Contact organizing committee for any queries", 70, yPos + 105, { width: doc.page.width - 140 });

  // Footer with contact
  yPos = 730;
  doc.rect(0, yPos, doc.page.width, 3).fill("#FFD700");
  
  doc.fontSize(9)
     .fillColor("#666666")
     .text("For queries: Hasnain 0306-5789045 | Zarnish 0340-4555553 | M Asad 0301-6996105 | Usman 0320-0787777", 
           50, yPos + 15, { align: "center", width: doc.page.width - 100 });

  doc.end();

  return filePath;
};
