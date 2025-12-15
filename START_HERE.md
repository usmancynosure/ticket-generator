# 🚀 START HERE - Ticket Generator Setup

## Welcome! 👋

This guide will help you set up and run your Ticket Generator application in **5 simple steps**.

---

## 📋 Before You Start

You need:
1. ✅ **Node.js** (v18+) - Download from https://nodejs.org
2. ✅ **Gmail Account** - For sending ticket emails
3. ✅ **MongoDB** - Local OR free cloud account

---

## 🎯 5 Steps to Get Started

### Step 1️⃣: Install Dependencies (2 minutes)

Open terminal in project folder and run:

```bash
npm install
cd frontend
npm install
cd ..
```

Wait for installation to complete.

---

### Step 2️⃣: Create Environment File (3 minutes)

1. **Create a file named `.env`** in the project root
2. **Copy this content** into it:

```env
MONGO_URI=mongodb://localhost:27017/ticket-generator
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password-here
PORT=5000
```

3. **Update the values:**

#### For `EMAIL`:
Put your Gmail address

#### For `EMAIL_PASSWORD`:
⚠️ **NOT your regular Gmail password!** You need an **App Password**:

1. Go to: https://myaccount.google.com/security
2. Enable **2-Step Verification** (if not already)
3. Go to: https://myaccount.google.com/apppasswords
4. Select "Mail" → "Windows Computer"
5. Click **Generate**
6. Copy the 16-character password (e.g., `abcd efgh ijkl mnop`)
7. Paste it as `EMAIL_PASSWORD` in your `.env` file

#### For `MONGO_URI`:
- **Option A (Local)**: Keep as is if MongoDB is installed locally
- **Option B (Cloud - Recommended)**: Use MongoDB Atlas (free):
  1. Go to: https://cloud.mongodb.com
  2. Create free account → Create M0 cluster
  3. Create database user (Database Access)
  4. Whitelist all IPs: `0.0.0.0/0` (Network Access)
  5. Click "Connect" → "Connect your application"
  6. Copy connection string
  7. Replace `<password>` with your database password
  8. Use this as `MONGO_URI`

**See `env.config.txt` for detailed instructions**

---

### Step 3️⃣: Verify Setup (30 seconds)

Run this to check everything is configured correctly:

```bash
npm run verify
```

You should see all ✅ checks pass.

---

### Step 4️⃣: Start the Application (1 minute)

#### 🪟 Windows - Super Easy:
Just **double-click** `start-dev.bat`
- Two windows will open (backend & frontend)
- Browser opens automatically at http://localhost:5173

#### 💻 Manual Method (All OS):

**Terminal 1 (Backend):**
```bash
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Wait for both to start, then open: http://localhost:5173

---

### Step 5️⃣: Test It! (2 minutes)

1. **Open** http://localhost:5173 in browser
2. **Fill the form:**
   - Name: `Test User`
   - Reg No: `TEST001`
   - Batch: `2021-2025`
   - Email: `your-email@gmail.com`
   - (Optional) Upload an image
3. **Click** "Generate Ticket"
4. **Check your email** for the PDF ticket!

✅ **If you received the email with PDF ticket, everything works!**

---

## 🎉 What's Next?

### Want to Deploy for Everyone to Use?

See **`DEPLOYMENT.md`** for step-by-step deployment instructions to:
- ✅ **Render.com** (Easiest - Free)
- ✅ **Vercel + Render**
- ✅ **Railway, Heroku, DigitalOcean**

### Need More Information?

- **Quick Reference**: `QUICKSTART.md`
- **Full Documentation**: `README.md`
- **Deployment Guide**: `DEPLOYMENT.md`
- **Setup Checklist**: `CHECKLIST.md`
- **Project Overview**: `PROJECT_SUMMARY.md`

---

## 🆘 Common Issues

### ❌ "Module not found"
```bash
npm install
cd frontend && npm install
```

### ❌ "MongoDB connection error"
- Check `MONGO_URI` in `.env`
- For Atlas: whitelist `0.0.0.0/0` in Network Access

### ❌ "Email authentication failed"
- Use **App Password**, not regular Gmail password
- Enable 2-Factor Authentication first
- Check `EMAIL` and `EMAIL_PASSWORD` in `.env`

### ❌ "Port already in use"
- Change `PORT=5000` to `PORT=3000` in `.env`

### ❌ ".env file not found"
- Create `.env` file in project root (not in frontend folder)
- Copy content from `env.config.txt`

---

## 📁 Quick Project Overview

```
Ticket generator/
├── .env                    ← CREATE THIS! (see Step 2)
├── env.config.txt         ← Template for .env
├── start-dev.bat          ← Easy start (Windows)
├── package.json           ← Backend dependencies
├── server.js              ← Backend server
├── frontend/              ← React app
│   └── src/App.jsx        ← Main UI
└── backend/
    ├── models/            ← Database schema
    └── utils/             ← PDF & Email logic
```

---

## 🎨 Features

Your ticket generator includes:
- ✅ **Beautiful Black & White UI**
- ✅ **Automatic PDF Generation**
- ✅ **Email Delivery**
- ✅ **Form Validation**
- ✅ **File Upload**
- ✅ **Database Storage**
- ✅ **Production Ready**

---

## 📞 Need Help?

1. Check `QUICKSTART.md` for quick answers
2. Check `README.md` for detailed docs
3. Check `CHECKLIST.md` to track your progress
4. Check troubleshooting sections above

---

## ✅ Quick Commands

```bash
# Check if everything is configured
npm run verify

# Start development (manual)
npm run dev                    # Backend
cd frontend && npm run dev     # Frontend

# Start development (Windows - easy)
start-dev.bat

# Build for production
cd frontend && npm run build

# Deploy
# See DEPLOYMENT.md
```

---

**🎓 Good luck with your CS Farewell Eve 2025!**

**Ready?** → Go to **Step 1** above and let's get started! 🚀

---

**Project**: Ticket Generator Web Application  
**Theme**: Black & White  
**Status**: Ready to Use ✅  
**Last Updated**: December 2025

