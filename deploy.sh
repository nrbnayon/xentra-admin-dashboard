#!/bin/bash
set -e

echo "🚀 Starting deployment..."
cd /var/www/xentra-admin-dashboard || exit 1

echo "📥 Resetting and pulling latest code..."
git reset --hard
git pull origin main

echo "📦 Checking if dependencies need updating..."
if git diff HEAD~1 HEAD --name-only | grep -q "package.json"; then
  echo "🔄 package.json changed — installing dependencies..."
  npm install --no-audit --no-fund --prefer-offline
else
  echo "✅ No package.json changes — skipping npm install."
fi

echo "🏗️ Building Next.js..."
NODE_OPTIONS="--max-old-space-size=896" npm run build

echo "🔁 Restarting PM2 frontend..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

echo "💾 Saving PM2 state..."
pm2 save

echo "🌐 Reloading Nginx..."
nginx -t && systemctl reload nginx

echo "✅ Deployment completed successfully!"