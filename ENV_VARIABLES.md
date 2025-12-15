# 🔐 Environment Variables Configuration

## Required for Render Deployment

Add these environment variables in your Render dashboard:

### **1. Slots Configuration**
```
MAX_SLOTS=100
```
**Description:** Maximum number of tickets available for sale. Default is 100.
**Change this** to set your event capacity (e.g., 50, 150, 200, etc.)

### **2. Admin Authentication**
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```
**⚠️ IMPORTANT:** Change the default password to something secure!

### **3. Firebase Configuration**
```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-client-email
```
Get these from your Firebase project settings.

### **4. Cloudinary Configuration**
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```
For storing payment proof images.

### **5. Brevo Email Configuration**
```
BREVO_API_KEY=your-brevo-api-key
BREVO_FROM_EMAIL=your-verified-sender-email
```
**⚠️ CRITICAL:** The sender email MUST be verified in Brevo dashboard!

---

## Quick Setup in Render

1. Go to: https://dashboard.render.com
2. Open your service: **ticket-generator-1h1c**
3. Click **"Environment"** tab
4. Click **"Add Environment Variable"**
5. Add each variable one by one
6. Click **"Save Changes"**

---

## How to Change Admin Password

### Option 1: Via Render Dashboard (Recommended)
1. Go to Render Environment tab
2. Find `ADMIN_PASSWORD`
3. Click Edit
4. Enter new password
5. Save changes
6. Service will auto-redeploy

### Option 2: Via Code (Not Recommended)
Edit `routes/adminRoutes.js` line 10, but this requires code push and redeploy.

---

## How to Change Max Slots

1. Go to Render Environment tab
2. Find `MAX_SLOTS`
3. Change value (e.g., from 100 to 150)
4. Save changes
5. Service will auto-redeploy

---

## 📝 Notes

- **MAX_SLOTS**: Controls total capacity. When approved tickets = MAX_SLOTS, submissions stop.
- **Payment Proof**: Now MANDATORY. Users cannot submit without uploading.
- **Slot Counter**: Updates in real-time every 30 seconds on the website.
- **Email**: Fixed with htmlContent. Should work now after Brevo sender verification.

---

## 🎉 What's New

✅ **Limited Slots System** - Shows available tickets in real-time
✅ **Mandatory Payment Proof** - Users must upload payment screenshot
✅ **Enhanced PDF Design** - Beautiful, professional ticket PDF
✅ **Enhanced Email Design** - Eye-catching HTML email with gradient backgrounds
✅ **Sold Out Protection** - Form disables when all tickets sold
✅ **Urgent Warning** - Shows "Hurry! Only X left" when slots <= 10


