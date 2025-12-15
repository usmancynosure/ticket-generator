# 📂 Project Structure

## Complete Directory Layout

```
Ticket generator/
│
├── 📄 START_HERE.md              ← Read this first!
├── 📄 QUICKSTART.md              ← 5-minute setup guide
├── 📄 README.md                  ← Full documentation
├── 📄 DEPLOYMENT.md              ← How to deploy
├── 📄 CHECKLIST.md               ← Step-by-step checklist
├── 📄 PROJECT_SUMMARY.md         ← Project overview
├── 📄 env.config.txt             ← Environment setup guide
│
├── 🔧 Configuration Files
│   ├── .env                      ← CREATE THIS (your config)
│   ├── .gitignore                ← Git ignore rules
│   ├── package.json              ← Backend dependencies
│   ├── requirements.txt          ← Package list reference
│   └── render.yaml               ← Render.com deploy config
│
├── 🚀 Quick Start Scripts
│   ├── start.js                  ← Smart startup script
│   ├── verify-setup.js           ← Verify configuration
│   ├── start-dev.bat             ← Windows: Start everything
│   ├── start-dev.sh              ← Linux/Mac: Start everything
│   └── build-production.bat      ← Build for production
│
├── 🖥️ Backend (Node.js/Express)
│   ├── server.js                 ← Main server file
│   │
│   ├── routes/
│   │   └── ticketRoutes.js       ← API endpoints (/api/submit)
│   │
│   ├── backend/
│   │   ├── models/
│   │   │   └── Ticket.js         ← MongoDB schema
│   │   │
│   │   └── utils/
│   │       ├── generateTicket.js ← PDF generation logic
│   │       └── sendEmail.js      ← Email sending logic
│   │
│   ├── tickets/                  ← Generated PDFs (auto-created)
│   ├── uploads/                  ← Uploaded files (auto-created)
│   └── node_modules/             ← Backend packages
│
└── 🎨 Frontend (React + Vite)
    └── frontend/
        ├── index.html            ← HTML template
        ├── package.json          ← Frontend dependencies
        ├── vite.config.js        ← Vite configuration
        │
        ├── src/
        │   ├── main.jsx          ← React entry point
        │   ├── App.jsx           ← Main component (the form)
        │   ├── App.css           ← Component styles
        │   ├── index.css         ← Global styles (Tailwind)
        │   └── config.js         ← API URL configuration
        │
        ├── public/               ← Static assets
        │   └── vite.svg
        │
        ├── dist/                 ← Production build (created by npm run build)
        └── node_modules/         ← Frontend packages
```

---

## 🔑 Key Files Explained

### Must-Read Documentation
| File | Purpose | When to Read |
|------|---------|--------------|
| `START_HERE.md` | Quick start guide | First time setup |
| `QUICKSTART.md` | 5-minute setup | Getting started |
| `README.md` | Complete documentation | When you need details |
| `DEPLOYMENT.md` | Deployment instructions | Before deploying |
| `CHECKLIST.md` | Setup checklist | Track your progress |

### Configuration
| File | Purpose | Action Required |
|------|---------|-----------------|
| `.env` | Environment variables | **CREATE THIS!** |
| `env.config.txt` | .env file template | Copy content to .env |
| `package.json` | Backend dependencies | Auto-used by npm |
| `render.yaml` | Render.com config | For deployment |

### Backend Core Files
| File | Purpose |
|------|---------|
| `server.js` | Express server, MongoDB connection |
| `routes/ticketRoutes.js` | API endpoints (`POST /api/submit`) |
| `backend/models/Ticket.js` | MongoDB database schema |
| `backend/utils/generateTicket.js` | Creates PDF tickets |
| `backend/utils/sendEmail.js` | Sends emails with attachments |

### Frontend Core Files
| File | Purpose |
|------|---------|
| `frontend/src/App.jsx` | Main UI component (the form) |
| `frontend/src/App.css` | Styling for the form |
| `frontend/src/config.js` | API URL configuration |
| `frontend/index.html` | HTML template |

### Helper Scripts
| File | Purpose | How to Use |
|------|---------|------------|
| `start-dev.bat` | Start both servers (Windows) | Double-click |
| `start-dev.sh` | Start both servers (Linux/Mac) | `./start-dev.sh` |
| `verify-setup.js` | Check configuration | `npm run verify` |
| `build-production.bat` | Build for deployment | Double-click |

---

## 📦 Generated Directories

These folders are **auto-created** when you run the app:

```
├── tickets/                  ← PDF tickets saved here
├── uploads/                  ← Payment proofs uploaded here
├── node_modules/             ← Backend packages (npm install)
└── frontend/
    ├── node_modules/         ← Frontend packages (npm install)
    └── dist/                 ← Production build (npm run build)
```

**Note**: These are git-ignored (not committed to version control)

---

## 🔄 Data Flow

```
User fills form
    ↓
frontend/src/App.jsx (React form)
    ↓
POST to /api/submit
    ↓
routes/ticketRoutes.js (handles request)
    ↓
1. Save to MongoDB (backend/models/Ticket.js)
2. Generate PDF (backend/utils/generateTicket.js)
3. Send email (backend/utils/sendEmail.js)
    ↓
User receives email with PDF ticket
```

---

## 🎯 Files You Need to Modify

### For Basic Setup:
1. ✅ Create `.env` file (copy from `env.config.txt`)
2. ✅ Update values in `.env`
3. ✅ That's it!

### For Customization:
| What to Change | File to Edit |
|----------------|--------------|
| Form fields | `frontend/src/App.jsx` |
| UI styling | `frontend/src/App.css` |
| PDF ticket design | `backend/utils/generateTicket.js` |
| Email template | `backend/utils/sendEmail.js` |
| Database schema | `backend/models/Ticket.js` |
| API endpoints | `routes/ticketRoutes.js` |

---

## 📊 File Sizes (Approximate)

```
Total Project: ~150 MB (with node_modules)
Without node_modules: ~500 KB

Key Files:
├── server.js              : 1.5 KB
├── frontend/src/App.jsx   : 5 KB
├── generateTicket.js      : 3 KB
├── sendEmail.js           : 2 KB
└── Documentation          : 50 KB
```

---

## 🔍 Quick File Finder

**Need to change...**

- Form appearance → `frontend/src/App.jsx` + `frontend/src/App.css`
- PDF ticket design → `backend/utils/generateTicket.js`
- Email template → `backend/utils/sendEmail.js`
- Database fields → `backend/models/Ticket.js`
- API logic → `routes/ticketRoutes.js`
- Server config → `server.js`
- Environment variables → `.env`

**Need help with...**

- Setup → `START_HERE.md` or `QUICKSTART.md`
- Deployment → `DEPLOYMENT.md`
- Full docs → `README.md`
- Troubleshooting → `README.md` (Troubleshooting section)

---

## 🚫 Don't Commit These

Files in `.gitignore`:
```
node_modules/          ← Package dependencies
.env                   ← Your credentials (NEVER commit!)
tickets/               ← Generated PDFs
uploads/               ← Uploaded files
dist/                  ← Build output
*.log                  ← Log files
```

---

## ✅ Checklist for New Developers

- [ ] Read `START_HERE.md`
- [ ] Understand this file (STRUCTURE.md)
- [ ] Create `.env` from `env.config.txt`
- [ ] Run `npm run verify`
- [ ] Start development servers
- [ ] Test locally
- [ ] Read `DEPLOYMENT.md` before deploying

---

**Need Help?** Start with `START_HERE.md` 🚀

**Last Updated**: December 2025

