#!/usr/bin/env node

/**
 * Simple startup script to check environment and start the server
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Ticket Generator Application...\n');

// Check for .env file
if (!fs.existsSync('.env')) {
  console.error('❌ Error: .env file not found!');
  console.log('📝 Please create a .env file from .env.example');
  console.log('   cp .env.example .env');
  console.log('   Then edit .env with your configuration\n');
  process.exit(1);
}

// Load environment variables
require('dotenv').config();

// Check required environment variables
const required = ['MONGO_URI', 'EMAIL', 'EMAIL_PASSWORD'];
const missing = required.filter(key => !process.env[key]);

if (missing.length > 0) {
  console.error('❌ Missing required environment variables:');
  missing.forEach(key => console.log(`   - ${key}`));
  console.log('\n📝 Please update your .env file\n');
  process.exit(1);
}

console.log('✅ Environment configuration loaded');

// Create necessary directories
const dirs = ['uploads', 'tickets'];
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n🎯 Starting server...\n');

// Start the server
require('./server.js');

