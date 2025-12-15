// config/firebase.js
const admin = require('firebase-admin');

// Initialize Firebase Admin
let db;
let bucket;

const initializeFirebase = () => {
  try {
    // Check if already initialized
    if (!admin.apps.length) {
      // Initialize with environment variables
      const serviceAccount = {
        type: "service_account",
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: process.env.FIREBASE_CERT_URL
      };

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`
      });

      console.log('✅ Firebase initialized successfully');
    }

    db = admin.firestore();
    bucket = admin.storage().bucket();
    return db;
  } catch (error) {
    console.error('❌ Firebase initialization error:', error.message);
    // Return null if Firebase is not configured
    return null;
  }
};

const getFirestore = () => {
  if (!db) {
    return initializeFirebase();
  }
  return db;
};

const getStorage = () => {
  if (!bucket) {
    initializeFirebase();
  }
  return bucket;
};

module.exports = { initializeFirebase, getFirestore, getStorage, admin };

