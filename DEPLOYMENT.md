# Deployment Guide

## Quick Deployment Options

### Option 1: Render.com (Easiest - Free Tier Available)

#### Step 1: Prepare Your Code
1. Make sure all code is committed to GitHub
2. Create a `.env` file locally (don't commit it)

#### Step 2: Setup MongoDB Atlas (Free)
1. Go to https://cloud.mongodb.com
2. Sign up and create a free M0 cluster
3. Create a database user (username & password)
4. Whitelist all IPs: Network Access → Add IP Address → `0.0.0.0/0`
5. Get connection string: Connect → Connect your application
6. Copy the connection string (replace `<password>` with your database password)

#### Step 3: Setup Gmail App Password
1. Go to https://myaccount.google.com
2. Enable 2-Factor Authentication
3. Go to https://myaccount.google.com/apppasswords
4. Generate an App Password
5. Copy the 16-character password

#### Step 4: Deploy to Render
1. Go to https://render.com and sign up
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ticket-generator`
   - **Region**: Choose closest to you
   - **Branch**: `main` or `master`
   - **Root Directory**: Leave blank
   - **Runtime**: `Node`
   - **Build Command**: `npm install && cd frontend && npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

5. Add Environment Variables (click "Advanced"):
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/ticket-generator
   EMAIL=your-email@gmail.com
   EMAIL_PASSWORD=your-16-char-app-password
   NODE_ENV=production
   ```

6. Click "Create Web Service"
7. Wait for deployment (5-10 minutes)
8. Your app will be live at: `https://ticket-generator-xxxx.onrender.com`

#### Step 5: Update Frontend API URL
1. Update `frontend/src/App.jsx`:
   ```javascript
   const API_URL = process.env.NODE_ENV === 'production' 
     ? 'https://your-app-name.onrender.com/api'
     : 'http://localhost:5000/api';
   
   // Replace the axios.post URL with:
   await axios.post(`${API_URL}/submit`, data, {...});
   ```

---

### Option 2: Vercel (Frontend) + Render (Backend)

#### Backend on Render:
Follow Option 1 steps for backend only

#### Frontend on Vercel:
```bash
cd frontend
npm install -g vercel
vercel
```

Follow prompts:
- Set up and deploy: Yes
- Which scope: Your account
- Link to existing project: No
- Project name: ticket-generator
- Directory: ./
- Override settings: No

Set environment variable in Vercel dashboard:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```

Update `App.jsx`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
```

---

### Option 3: Railway.app

1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variables in Variables tab
6. Railway will auto-detect Node.js and deploy
7. Get your URL from Settings → Public Networking

---

### Option 4: Heroku

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create ticket-generator-app

# Add MongoDB addon (free tier)
heroku addons:create mongodb-atlas:sandbox

# Set environment variables
heroku config:set EMAIL=your-email@gmail.com
heroku config:set EMAIL_PASSWORD=your-app-password
heroku config:set NODE_ENV=production

# Deploy
git add .
git commit -m "Deploy to Heroku"
git push heroku main

# Open app
heroku open
```

---

### Option 5: DigitalOcean App Platform

1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Connect GitHub repository
4. Select branch
5. DigitalOcean will auto-detect Node.js
6. Set environment variables in dashboard
7. Deploy

---

## Post-Deployment Checklist

✅ **Test the deployment:**
1. Visit your deployed URL
2. Fill out the form
3. Submit and check email
4. Verify PDF ticket is received

✅ **Check logs if issues occur:**
- Render: Dashboard → Logs
- Vercel: Dashboard → Deployments → View Function Logs
- Heroku: `heroku logs --tail`

✅ **Common Issues:**

**Email not working:**
- Double-check Gmail App Password
- Verify 2FA is enabled
- Check spam folder

**Database connection error:**
- Verify MongoDB Atlas IP whitelist (0.0.0.0/0)
- Check connection string format
- Ensure database user has read/write permissions

**File upload issues:**
- Render creates temporary storage (files deleted on restart)
- Consider using AWS S3 or Cloudinary for permanent storage

---

## Making Updates After Deployment

1. Make changes to your code locally
2. Test locally
3. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Your update message"
   git push origin main
   ```
4. Render/Vercel will auto-deploy the changes
5. Check deployment logs to ensure success

---

## Custom Domain (Optional)

### Render:
1. Go to Settings → Custom Domain
2. Add your domain
3. Update DNS records as instructed

### Vercel:
1. Go to Settings → Domains
2. Add your domain
3. Configure DNS with provided values

---

## Monitoring

**Render:**
- Free tier sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds

**Vercel:**
- Excellent uptime on free tier
- Fast cold starts

**Tip:** Use a service like UptimeRobot to ping your app every 5 minutes to keep it awake

---

## Support

If you encounter issues:
1. Check deployment logs
2. Verify all environment variables
3. Test MongoDB connection
4. Test email credentials locally first
5. Check the README.md troubleshooting section

Your ticket generator should now be live and accessible to everyone! 🎉

