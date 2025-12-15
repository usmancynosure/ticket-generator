#!/usr/bin/env node

/**
 * Production build script for Render.com
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building Ticket Generator for Production...\n');

try {
  // Step 1: Install root dependencies
  console.log('📦 [1/4] Installing backend dependencies...');
  execSync('npm install', { stdio: 'inherit' });

  // Step 2: Install frontend dependencies
  console.log('\n📦 [2/4] Installing frontend dependencies...');
  execSync('npm install --prefix frontend', { stdio: 'inherit' });

  // Step 3: Build frontend
  console.log('\n🏗️  [3/4] Building frontend...');
  execSync('npm run build --prefix frontend', { stdio: 'inherit' });

  // Step 4: Verify build
  console.log('\n✅ [4/4] Verifying build...');
  const distPath = path.join(__dirname, 'frontend', 'dist');
  
  if (fs.existsSync(distPath)) {
    const files = fs.readdirSync(distPath);
    console.log(`   Found ${files.length} files in dist/`);
    console.log('   ✅ Frontend build successful!');
  } else {
    throw new Error('Frontend dist folder not created!');
  }

  console.log('\n🎉 Build completed successfully!\n');
  console.log('Ready to deploy! 🚀\n');

} catch (error) {
  console.error('\n❌ Build failed:', error.message);
  process.exit(1);
}


