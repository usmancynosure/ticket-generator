# 🔥 FIREBASE SETUP GUIDE

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `ticket-generator`
4. Click **Continue**
5. Disable Google Analytics (optional)
6. Click **Create project**

---

## Step 2: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** from left menu
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select location (closest to you)
5. Click **Enable**

---

## Step 3: Set Firestore Rules

1. Click **"Rules"** tab in Firestore
2. Replace the rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

3. Click **Publish**

⚠️ **Note:** These rules allow full access. For production, you should secure them!

---

## Step 4: Get Service Account Key

1. Click **⚙️ (Settings icon)** → **Project settings**
2. Go to **"Service accounts"** tab
3. Click **"Generate new private key"**
4. Click **"Generate key"**
5. A JSON file will download - **SAVE IT!**

---

## Step 5: Update Your .env File

Open the downloaded JSON file and copy the values to your `.env`:

```env
# Firebase Configuration
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-private-key-id
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYour private key here\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-xxxxx%40your-project.iam.gserviceaccount.com

# Email Settings (Keep these)
EMAIL=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Server (Keep these)
PORT=5000
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
```

**Important:**
- Keep the quotes around `FIREBASE_PRIVATE_KEY`
- Keep the `\n` in the private key
- Copy values **exactly** from the JSON file

---

## Step 6: Example Mapping

If your downloaded JSON looks like this:

```json
{
  "type": "service_account",
  "project_id": "ticket-generator-12345",
  "private_key_id": "abc123def456",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIE...",
  "client_email": "firebase-adminsdk-xyz@ticket-generator.iam.gserviceaccount.com",
  "client_id": "123456789",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/..."
}
```

Your `.env` should have:

```env
FIREBASE_PROJECT_ID=ticket-generator-12345
FIREBASE_PRIVATE_KEY_ID=abc123def456
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...(full key here)...-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xyz@ticket-generator.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=123456789
FIREBASE_CERT_URL=https://www.googleapis.com/robot/v1/metadata/x509/...
```

---

## Step 7: Restart Server

```powershell
# Stop server (Ctrl+C)
npm run dev
```

You should see:
```
✅ Firebase initialized successfully
🚀 Server running on port 5000
📊 Database: Firebase Firestore
```

---

## ✅ Done!

Your app now uses Firebase Firestore instead of MongoDB!

**Benefits:**
- ✅ No connection errors
- ✅ Free tier is very generous
- ✅ Real-time updates
- ✅ Easier setup
- ✅ Better scaling

---

## 🔒 Security Note

The rules I provided allow anyone to read/write. For production:

1. Go to Firestore → Rules
2. Update to secure rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /tickets/{ticketId} {
      allow read, write: if false; // Only server can access
    }
  }
}
```

This ensures only your server can access the database.

---

## 📞 Need Help?

1. Check Firebase Console for errors
2. Verify .env file has all keys
3. Make sure private key is in quotes
4. Restart server after updating .env

---

**Firebase is much easier than MongoDB! No connection issues!** 🎉


