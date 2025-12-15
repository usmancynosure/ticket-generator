#!/usr/bin/env node

/**
 * Setup verification script
 * Checks if the project is properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying Ticket Generator Setup...\n');

let hasErrors = false;

// Check 1: .env file
console.log('1. Checking .env file...');
if (!fs.existsSync('.env')) {
  console.error('   ❌ .env file not found');
  console.log('   Run: copy .env.example .env');
  console.log('   Then edit .env with your configuration');
  hasErrors = true;
} else {
  console.log('   ✅ .env file exists');
  
  // Check environment variables
  require('dotenv').config();
  const required = ['MONGO_URI', 'EMAIL', 'EMAIL_PASSWORD'];
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('   ❌ Missing environment variables:');
    missing.forEach(key => console.log(`      - ${key}`));
    hasErrors = true;
  } else {
    console.log('   ✅ All required environment variables are set');
  }
}

// Check 2: Node modules
console.log('\n2. Checking dependencies...');
if (!fs.existsSync('node_modules')) {
  console.error('   ❌ Backend dependencies not installed');
  console.log('   Run: npm install');
  hasErrors = true;
} else {
  console.log('   ✅ Backend dependencies installed');
}

if (!fs.existsSync('frontend/node_modules')) {
  console.error('   ❌ Frontend dependencies not installed');
  console.log('   Run: cd frontend && npm install');
  hasErrors = true;
} else {
  console.log('   ✅ Frontend dependencies installed');
}

// Check 3: Required directories
console.log('\n3. Checking directories...');
const dirs = ['uploads', 'tickets', 'backend', 'frontend', 'routes'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.error(`   ❌ ${dir}/ directory not found`);
    hasErrors = true;
  } else {
    console.log(`   ✅ ${dir}/ exists`);
  }
});

// Check 4: Required files
console.log('\n4. Checking required files...');
const files = [
  'server.js',
  'start.js',
  'package.json',
  'backend/models/Ticket.js',
  'backend/utils/generateTicket.js',
  'backend/utils/sendEmail.js',
  'routes/ticketRoutes.js',
  'frontend/src/App.jsx',
  'frontend/package.json'
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.error(`   ❌ ${file} not found`);
    hasErrors = true;
  } else {
    console.log(`   ✅ ${file} exists`);
  }
});

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.error('\n❌ Setup verification failed!');
  console.log('Please fix the errors above and run this script again.\n');
  process.exit(1);
} else {
  console.log('\n✅ Setup verification passed!');
  console.log('\n🚀 You can now start the application:');
  console.log('   Backend:  npm run dev');
  console.log('   Frontend: cd frontend && npm run dev\n');
  console.log('📖 See QUICKSTART.md for more information\n');
}

