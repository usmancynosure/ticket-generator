// utils/sendEmail.js
const brevo = require('@getbrevo/brevo');
const fs = require('fs');

module.exports = async (email, filePath) => {
  try {
    // Initialize Brevo API
    const apiInstance = new brevo.TransactionalEmailsApi();
    apiInstance.setApiKey(
      brevo.TransactionalEmailsApiApiKeys.apiKey,
      process.env.BREVO_API_KEY
    );

    // Read the PDF file and convert to base64
    const pdfContent = fs.readFileSync(filePath).toString('base64');

    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = {
      name: "Farewell Eve 2025",
      email: process.env.BREVO_FROM_EMAIL || 'warisusman073@gmail.com'
    };
    sendSmtpEmail.to = [{ email: email }];
    sendSmtpEmail.subject = "🎉 Your Farewell Eve '25 Ticket - LIVE QAWALI & CONCERT";
    sendSmtpEmail.htmlContent = `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; background-color: #000000; border: 3px solid #FFD700;">
          <!-- Header -->
          <div style="background: linear-gradient(180deg, #1a1a1a 0%, #000000 100%); padding: 50px 30px; text-align: center; border-bottom: 5px solid #FFD700; position: relative;">
            <div style="width: 60px; height: 60px; background-color: #FFD700; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 30px;">🎉</div>
            <h1 style="margin: 0; color: #FFD700; font-size: 42px; font-weight: bold; letter-spacing: 2px; text-transform: uppercase; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
              Farewell Eve '25
            </h1>
            <p style="color: #FFFFFF; font-size: 15px; font-style: italic; margin: 15px 0; opacity: 0.9;">
              with grateful hearts, we bid farewell & welcome new beginnings
            </p>
            <div style="display: inline-block; background-color: #FFD700; color: #000000; padding: 12px 30px; border-radius: 25px; margin-top: 15px; font-weight: bold; font-size: 18px;">
              LIVE QAWALI & CONCERT
            </div>
          </div>

          <!-- Success Message -->
          <div style="background: linear-gradient(135deg, #FFD700 0%, #FFA500 100%); padding: 40px 30px; text-align: center;">
            <h2 style="color: #000000; margin: 0; font-size: 32px; font-weight: bold;">✅ TICKET APPROVED!</h2>
            <p style="color: #1a1a1a; font-size: 18px; margin: 15px 0; font-weight: 500;">
              Your entry to Farewell Eve 2025 is confirmed!
            </p>
            <p style="color: #333333; font-size: 15px; margin: 5px 0;">
              Your official ticket is attached as a PDF below
            </p>
          </div>

          <!-- Event Details -->
          <div style="background-color: #000000; padding: 30px; border-top: 2px solid #FFD700;">
            <h3 style="color: #FFD700; margin-top: 0; font-size: 22px; text-align: center; margin-bottom: 20px;">
              📅 Event Details
            </h3>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="background-color: #1a1a1a;">
                <td style="padding: 15px; border: 1px solid #FFD700; color: #FFD700; font-weight: bold;">Date & Time</td>
                <td style="padding: 15px; border: 1px solid #FFD700; color: #FFFFFF;">FRIDAY, 19 DEC 2025 AT 6 PM</td>
              </tr>
              <tr style="background-color: #0a0a0a;">
                <td style="padding: 15px; border: 1px solid #FFD700; color: #FFD700; font-weight: bold;">Venue</td>
                <td style="padding: 15px; border: 1px solid #FFD700; color: #FFFFFF;">Avior Marquee, Gulberg Greens, Islamabad</td>
              </tr>
              <tr style="background-color: #1a1a1a;">
                <td style="padding: 15px; border: 1px solid #FFD700; color: #FFD700; font-weight: bold;">Entry Fee</td>
                <td style="padding: 15px; border: 1px solid #FFD700; color: #FFD700; font-size: 20px; font-weight: bold;">Rs. 3500</td>
              </tr>
            </table>
          </div>

          <!-- Activities -->
          <div style="background-color: #1a1a1a; padding: 30px;">
            <h3 style="color: #FFD700; margin-top: 0; font-size: 22px; text-align: center; margin-bottom: 20px;">
              🎭 What's Included
            </h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div style="background-color: #000000; padding: 15px; border-left: 3px solid #FFD700; margin-bottom: 10px;">
                <strong style="color: #FFD700;">🎤 Awaaz Band Concert</strong>
              </div>
              <div style="background-color: #000000; padding: 15px; border-left: 3px solid #FFD700; margin-bottom: 10px;">
                <strong style="color: #FFD700;">🎵 Qawali & DJ</strong>
              </div>
              <div style="background-color: #000000; padding: 15px; border-left: 3px solid #FFD700; margin-bottom: 10px;">
                <strong style="color: #FFD700;">🍽️ Lavish Dinner</strong>
              </div>
              <div style="background-color: #000000; padding: 15px; border-left: 3px solid #FFD700; margin-bottom: 10px;">
                <strong style="color: #FFD700;">🏮 Lantern Show</strong>
              </div>
              <div style="background-color: #000000; padding: 15px; border-left: 3px solid #FFD700; margin-bottom: 10px;">
                <strong style="color: #FFD700;">🎂 Cake Cutting</strong>
              </div>
              <div style="background-color: #000000; padding: 15px; border-left: 3px solid #FFD700; margin-bottom: 10px;">
                <strong style="color: #FFD700;">🎙️ Open Mic</strong>
              </div>
            </div>
          </div>

          <!-- Dinner Menu -->
          <div style="background-color: #000000; padding: 30px; border-top: 2px solid #FFD700;">
            <h3 style="color: #FFD700; margin-top: 0; font-size: 22px; text-align: center; margin-bottom: 20px;">
              🍽️ Dinner Menu
            </h3>
            <div style="background-color: #1a1a1a; padding: 20px; border-left: 4px solid #FFD700;">
              <p style="color: #FFD700; font-weight: bold; margin-top: 0;">Starter:</p>
              <p style="color: #FFFFFF; margin: 5px 0;">• Soup • Fish Crackers</p>
              
              <p style="color: #FFD700; font-weight: bold; margin-top: 15px;">Main Course:</p>
              <p style="color: #FFFFFF; margin: 5px 0;">
                • Chicken Qorma • Chicken Biyani<br>
                • Live BBQ • Tikka Boti & Seekh Kabab<br>
                • Two Types of Sweets • Naan & Salad<br>
                • Cold Drink & Mineral Water
              </p>
            </div>
          </div>

          <!-- Important Instructions -->
          <div style="background-color: #FFD700; padding: 25px; margin-top: 20px;">
            <h3 style="color: #000000; margin-top: 0; font-size: 20px; text-align: center;">⚠️ Important Instructions</h3>
            <ul style="color: #000000; line-height: 1.8; padding-left: 20px;">
              <li><strong>Bring this ticket:</strong> Printed or digital copy on your phone</li>
              <li><strong>Valid ID required:</strong> Bring your student ID for verification</li>
              <li><strong>Timing:</strong> Gates open at 5:30 PM. Event starts at 6:00 PM sharp</li>
              <li><strong>Dress Code:</strong> Come in your best formal/semi-formal attire</li>
            </ul>
          </div>

          <!-- Contact Information -->
          <div style="background-color: #1a1a1a; padding: 25px; text-align: center;">
            <h3 style="color: #FFD700; margin-top: 0; font-size: 20px;">📞 Contact Us</h3>
            <p style="color: #FFFFFF; font-size: 14px; line-height: 1.6; margin: 10px 0;">
              <strong style="color: #FFD700;">Hasnain Abbasi:</strong> 0306-5789045<br>
              <strong style="color: #FFD700;">Zarnish Jawad:</strong> 0340-4555553<br>
              <strong style="color: #FFD700;">M Asad:</strong> 0301-6996105<br>
              <strong style="color: #FFD700;">Usman Waris:</strong> 0320-0787777
            </p>
          </div>

          <!-- Footer -->
          <div style="background-color: #1a1a1a; padding: 30px; text-align: center; border-top: 5px solid #FFD700;">
            <p style="color: #FFD700; font-size: 24px; font-weight: bold; margin: 0 0 10px 0;">
              🎊 See You at Farewell Eve 2025! 🎊
            </p>
            <p style="color: #FFFFFF; font-size: 14px; margin: 10px 0;">
              Bring this ticket and your student ID card
            </p>
            <div style="background-color: #000000; border: 2px solid #FFD700; border-radius: 10px; padding: 20px; margin: 20px 0;">
              <p style="color: #FFD700; font-size: 13px; font-weight: bold; margin: 0 0 5px 0;">Need Help?</p>
              <p style="color: #CCCCCC; font-size: 11px; margin: 0; line-height: 1.6;">
                Hasnain: 0306-5789045 • Zarnish: 0340-4555553<br>
                M Asad: 0301-6996105 • Usman: 0320-0787777
              </p>
            </div>
            <p style="color: #888888; font-size: 11px; margin: 15px 0 0 0;">
              © 2025 Farewell Eve. All rights reserved.
            </p>
          </div>
        </div>
      `,
    sendSmtpEmail.attachment = [
      {
        content: pdfContent,
        name: "Farewell-Eve-2025-Ticket.pdf"
      }
    ];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log(`✅ Email sent successfully to ${email} via Brevo`);
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    if (error.response && error.response.body) {
      console.error("Brevo error details:", error.response.body);
    }
    throw new Error("Failed to send email: " + error.message);
  }
};
