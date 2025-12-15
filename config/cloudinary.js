// config/cloudinary.js
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary
const configureCloudinary = () => {
  try {
    if (process.env.CLOUDINARY_CLOUD_NAME && 
        process.env.CLOUDINARY_API_KEY && 
        process.env.CLOUDINARY_API_SECRET) {
      
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
        secure: true
      });

      console.log('✅ Cloudinary configured successfully');
      return true;
    } else {
      console.log('⚠️ Cloudinary not configured - image uploads will be skipped');
      return false;
    }
  } catch (error) {
    console.error('❌ Cloudinary configuration error:', error.message);
    return false;
  }
};

module.exports = { cloudinary, configureCloudinary };


