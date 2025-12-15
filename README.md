# Ticket Generator Web Application

A modern, full-stack web application for generating event tickets with automatic email delivery. Built with React (frontend) and Node.js/Express (backend).

## Features

- ✅ Beautiful Black & White themed UI
- ✅ Form validation and error handling
- ✅ Automatic PDF ticket generation
- ✅ Email delivery with styled HTML templates
- ✅ File upload support for payment proofs
- ✅ MongoDB database integration
- ✅ Responsive design

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- MongoDB with Mongoose
- Nodemailer (Email)
- PDFKit (PDF Generation)
- Multer (File Upload)

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gmail account with App Password

### Setup

1. **Clone the repository**
```bash
cd "Ticket generator"
```

2. **Install Backend Dependencies**
```bash
npm install
```

3. **Install Frontend Dependencies**
```bash
cd frontend
npm install
cd ..
```

4. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env` file with your credentials:
- `MONGO_URI`: Your MongoDB connection string
- `EMAIL`: Your Gmail address
- `EMAIL_PASSWORD`: Gmail App Password (not your regular password)
- `PORT`: Server port (default: 5000)

### Getting Gmail App Password
1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Generate a new App Password
5. Use this password in your `.env` file

## Running the Application

### Development Mode

**Start Backend Server:**
```bash
npm run dev
```
Backend will run on http://localhost:5000

**Start Frontend Dev Server:**
```bash
cd frontend
npm run dev
```
Frontend will run on http://localhost:5173

### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Start Production Server:**
```bash
NODE_ENV=production node server.js
```

## Project Structure

```
Ticket generator/
├── backend/
│   ├── models/
│   │   └── Ticket.js          # MongoDB ticket schema
│   └── utils/
│       ├── generateTicket.js  # PDF generation logic
│       └── sendEmail.js       # Email sending logic
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main React component
│   │   ├── App.css           # Styles
│   │   └── index.css         # Tailwind imports
│   └── package.json
├── routes/
│   └── ticketRoutes.js       # API routes
├── tickets/                   # Generated PDF tickets (auto-created)
├── uploads/                   # Uploaded payment proofs (auto-created)
├── server.js                  # Express server
├── .env                       # Environment variables (create from .env.example)
└── package.json              # Backend dependencies
```

## API Endpoints

### POST /api/submit
Submit ticket request and generate ticket

**Request Body (multipart/form-data):**
- `name` (string, required): Full name
- `regNo` (string, required): Registration number
- `batch` (string, required): Batch year
- `email` (string, required): Email address
- `payment` (file, optional): Payment proof image

**Response:**
```json
{
  "success": true,
  "message": "Ticket generated and sent to your email successfully!",
  "ticketId": "..."
}
```

### GET /api/ticket/:id
Get ticket details by ID

**Response:**
```json
{
  "_id": "...",
  "name": "John Doe",
  "regNo": "CS001",
  "batch": "2021-2025",
  "email": "john@example.com",
  "status": "approved",
  "createdAt": "..."
}
```

## Deployment

### Deploy to Render.com (Recommended)

1. **Push your code to GitHub**

2. **Create a new Web Service on Render**
   - Connect your GitHub repository
   - Set build command: `npm install && cd frontend && npm install && npm run build`
   - Set start command: `node server.js`

3. **Add Environment Variables in Render Dashboard**
   - `MONGO_URI`
   - `EMAIL`
   - `EMAIL_PASSWORD`
   - `PORT` (will be set automatically by Render)

4. **Create a MongoDB Atlas cluster** (if not using local MongoDB)
   - Go to https://cloud.mongodb.com
   - Create a free cluster
   - Get connection string and add to `MONGO_URI`

### Deploy to Vercel (Frontend) + Render (Backend)

**Frontend (Vercel):**
```bash
cd frontend
vercel
```

**Backend (Render):**
- Deploy as Web Service (see above)
- Update frontend API URL in `App.jsx`

### Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create new app
heroku create ticket-generator-app

# Add MongoDB addon
heroku addons:create mongolab

# Set environment variables
heroku config:set EMAIL=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password

# Deploy
git push heroku main
```

## Environment Variables for Production

Make sure to set these in your hosting platform:
- `MONGO_URI`
- `EMAIL`
- `EMAIL_PASSWORD`
- `PORT` (usually auto-set)
- `NODE_ENV=production` (optional)

## Troubleshooting

### Email not sending
- Verify Gmail App Password is correct
- Check 2FA is enabled on Google account
- Check email in spam folder

### MongoDB connection failed
- Verify MONGO_URI is correct
- For Atlas: whitelist IP address (0.0.0.0/0 for all)
- Check network connectivity

### File upload errors
- Ensure `uploads/` directory exists (auto-created)
- Check file size (5MB limit)
- Only image files are allowed

## License

MIT

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

