# 🎫 Setup Checklist

## Pre-Installation
- [ ] Node.js installed (v18 or higher) - https://nodejs.org
- [ ] Git installed (optional, for deployment)
- [ ] MongoDB installed locally OR MongoDB Atlas account
- [ ] Gmail account with 2FA enabled

---

## Installation Steps

### Step 1: Dependencies
- [ ] Run `npm install` in project root
- [ ] Run `cd frontend && npm install` for frontend
- [ ] Both commands completed without errors

### Step 2: Environment Configuration
- [ ] Create `.env` file in project root
- [ ] Copy content from `env.config.txt`
- [ ] Update `MONGO_URI` with your MongoDB connection
- [ ] Update `EMAIL` with your Gmail address
- [ ] Update `EMAIL_PASSWORD` with Gmail App Password (see env.config.txt)
- [ ] Verify all variables are set

### Step 3: Gmail App Password Setup
- [ ] Go to https://myaccount.google.com/security
- [ ] Enable 2-Step Verification
- [ ] Go to https://myaccount.google.com/apppasswords
- [ ] Generate new App Password
- [ ] Copy 16-character password to `.env` file

### Step 4: MongoDB Setup (Choose One)

#### Option A: Local MongoDB
- [ ] MongoDB installed and running
- [ ] Use: `MONGO_URI=mongodb://localhost:27017/ticket-generator`

#### Option B: MongoDB Atlas (Cloud - Recommended)
- [ ] Created free account at https://cloud.mongodb.com
- [ ] Created M0 free cluster
- [ ] Created database user
- [ ] Whitelisted IP: 0.0.0.0/0 (Network Access → Add IP Address)
- [ ] Got connection string
- [ ] Updated `MONGO_URI` in `.env`

### Step 5: Verification
- [ ] Run `npm run verify`
- [ ] All checks passed ✅

---

## First Run

### Start Development Servers

#### Option A: Windows - Easy Start
- [ ] Double-click `start-dev.bat`
- [ ] Two terminal windows open (backend & frontend)
- [ ] Browser opens automatically

#### Option B: Manual Start
- [ ] Terminal 1: `npm run dev` (backend)
- [ ] Terminal 2: `cd frontend && npm run dev` (frontend)
- [ ] Backend running on http://localhost:5000
- [ ] Frontend running on http://localhost:5173

### Test the Application
- [ ] Open http://localhost:5173
- [ ] Form displays correctly (black background, white card)
- [ ] Fill in test data:
  - Name: Test User
  - Reg No: TEST001
  - Batch: 2021-2025
  - Email: your-email@gmail.com
- [ ] Submit form
- [ ] Success message appears
- [ ] Check email for ticket PDF
- [ ] PDF opens and looks correct

---

## Production Deployment

### Pre-Deployment
- [ ] All tests passed locally
- [ ] Environment variables ready
- [ ] Chosen hosting platform (see options below)

### Hosting Platform Options

#### Option 1: Render.com (Recommended - Free)
- [ ] Code pushed to GitHub
- [ ] Created Render.com account
- [ ] Connected GitHub repository
- [ ] Set environment variables in Render
- [ ] Deployed successfully
- [ ] Tested live URL

#### Option 2: Vercel + Render
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Render
- [ ] Environment variables set
- [ ] Updated API URL in frontend
- [ ] Tested live application

#### Option 3: Railway.app
- [ ] Account created
- [ ] Repository connected
- [ ] Environment variables set
- [ ] Deployed successfully

#### Option 4: Heroku
- [ ] Heroku CLI installed
- [ ] Created Heroku app
- [ ] Environment variables set
- [ ] Deployed via Git
- [ ] Tested live URL

### Post-Deployment Testing
- [ ] Open deployed URL
- [ ] Submit test ticket
- [ ] Verify email received
- [ ] PDF attachment correct
- [ ] All features working

---

## Final Steps

### Share Your Application
- [ ] Share deployed URL with users
- [ ] Test from different devices
- [ ] Monitor for errors

### Documentation
- [ ] Read README.md for detailed info
- [ ] Check DEPLOYMENT.md for deployment help
- [ ] Refer to QUICKSTART.md for quick reference

---

## Troubleshooting Checklist

### Email Not Sending
- [ ] Using App Password (not regular password)
- [ ] 2FA enabled on Gmail
- [ ] Correct email in `.env`
- [ ] Check spam folder

### MongoDB Connection Error
- [ ] MongoDB running (if local)
- [ ] Connection string correct
- [ ] IP whitelisted (if Atlas: 0.0.0.0/0)
- [ ] Database user created with permissions

### Frontend Not Loading
- [ ] Dependencies installed: `cd frontend && npm install`
- [ ] Correct port (default: 5173)
- [ ] Backend running first
- [ ] No firewall blocking

### PDF Not Generating
- [ ] `tickets/` directory exists (auto-created)
- [ ] Sufficient disk space
- [ ] No permission errors

### Build Errors
- [ ] Node.js v18 or higher
- [ ] All dependencies installed
- [ ] No package version conflicts
- [ ] Clear node_modules and reinstall

---

## Quick Commands Reference

```bash
# Verify setup
npm run verify

# Start development
npm run dev                    # Backend
cd frontend && npm run dev     # Frontend

# Or use helper scripts
./start-dev.bat               # Windows (easy)
./start-dev.sh                # Linux/Mac

# Build for production
cd frontend && npm run build

# Start production server
npm start

# Check for issues
npm run verify
```

---

## Support Resources

- **Quick Start**: QUICKSTART.md
- **Full Docs**: README.md
- **Deployment**: DEPLOYMENT.md
- **Project Info**: PROJECT_SUMMARY.md
- **Environment Setup**: env.config.txt

---

## Status Tracking

**Current Status**: ⬜ Not Started / 🟡 In Progress / ✅ Complete

- Installation: ⬜
- Configuration: ⬜
- Local Testing: ⬜
- Deployment: ⬜
- Production Testing: ⬜
- Live & Shared: ⬜

---

**Last Updated**: December 2025
**Project**: Ticket Generator Web Application
**Theme**: Black & White


