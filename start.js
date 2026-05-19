const fs = require('fs');
const path = require('path');

console.log('Preparing Next.js standalone environment...');

function copyRecursiveSync(src, dest) {
  if (!fs.existsSync(src)) return;
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach((child) => {
      copyRecursiveSync(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

try {
  copyRecursiveSync('./public', './.next/standalone/public');
  copyRecursiveSync('./.next/static', './.next/standalone/.next/static');
  console.log('Static assets copied successfully.');
} catch (e) {
  console.warn('Warning: Could not copy static assets:', e.message);
}

// Force the Next.js standalone server to listen on all interfaces
// This fixes the "Application failed to respond" (502 Bad Gateway) error on Railway
process.env.HOSTNAME = '0.0.0.0';
console.log('Starting Next.js standalone server on 0.0.0.0...');

require('./.next/standalone/server.js');
