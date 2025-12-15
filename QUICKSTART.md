# Quick Start Guide

## Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas account)
- Gmail account with App Password

## Installation (5 minutes)

### 1. Install Dependencies

**Backend:**
```bash
npm install
```

**Frontend:**
```bash
cd frontend
npm install
cd ..
```

### 2. Configure Environment

Copy the example environment file:
```bash
copy .env.example .env
```

Edit `.env` and add your credentials:
```env
MONGO_URI=mongodb://localhost:27017/ticket-generator
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-gmail-app-password
PORT=5000
```

#### Getting Gmail App Password:
1. Go to https://myaccount.google.com/security
2. Enable **2-Step Verification**
3. Go to https://myaccount.google.com/apppasswords
4. Select "Mail" and "Windows Computer"
5. Copy the 16-character password
6. Paste it in `.env` as `EMAIL_PASSWORD`

### 3. Start the Application

**Start Backend (Terminal 1):**
```bash
npm run dev
```
Server will run on http://localhost:5000

**Start Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### 4. Test the Application

1. Open http://localhost:5173 in your browser
2. Fill in the form:
   - Name: Test User
   - Registration No: TEST001
   - Batch: 2021-2025
   - Email: your-test-email@gmail.com
   - (Optional) Upload a payment proof image
3. Click "Generate Ticket"
4. Check your email for the ticket PDF

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to:
- Render.com (Recommended - Free)
- Vercel + Render
- Heroku
- Railway.app
- DigitalOcean

## Troubleshooting

### MongoDB Connection Error
```
Error: MongooseServerSelectionError
```
**Solution:** Install MongoDB locally or use MongoDB Atlas (free):
1. Go to https://cloud.mongodb.com
2. Create free cluster
3. Get connection string
4. Update `MONGO_URI` in `.env`

### Email Not Sending
```
Error: Invalid login
```
**Solution:** 
1. Enable 2-Factor Authentication in Google
2. Generate App Password (not regular password)
3. Use App Password in `.env`

### Port Already in Use
```
Error: EADDRINUSE :::5000
```
**Solution:** Change `PORT` in `.env` to another port like 3000 or 8000

## Project Structure

```
Ticket generator/
├── server.js              ← Main server file
├── start.js               ← Startup script (checks env)
├── package.json           ← Backend dependencies
├── .env                   ← Your configuration (create this)
├── .env.example           ← Example configuration
├── routes/
│   └── ticketRoutes.js    ← API endpoints
├── backend/
│   ├── models/
│   │   └── Ticket.js      ← Database schema
│   └── utils/
│       ├── generateTicket.js  ← PDF generation
│       └── sendEmail.js       ← Email sending
├── frontend/
│   ├── src/
│   │   ├── App.jsx        ← Main React component
│   │   └── App.css        ← Styles
│   └── package.json       ← Frontend dependencies
├── tickets/               ← Generated PDFs (auto-created)
├── uploads/               ← Payment proofs (auto-created)
├── README.md              ← Full documentation
└── DEPLOYMENT.md          ← Deployment guide
```

## Features

✅ Beautiful black & white themed UI
✅ Form validation
✅ PDF ticket generation with professional design
✅ Automatic email delivery
✅ Payment proof upload
✅ MongoDB database storage
✅ Responsive design
✅ Error handling

## Need Help?

- Check [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Open an issue on GitHub

## Development

**Backend (watch mode):**
```bash
npm run dev
```

**Frontend (hot reload):**
```bash
cd frontend
npm run dev
```

## Production Build

**Build frontend:**
```bash
cd frontend
npm run build
```

**Start production server:**
```bash
npm start
```

---

**Ready to deploy?** See [DEPLOYMENT.md](DEPLOYMENT.md) for step-by-step deployment instructions! 🚀

