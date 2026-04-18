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
rm -rf .next  # Clean old build
NODE_OPTIONS="--max-old-space-size=896" npm run build

# Verify build succeeded
if [ ! -d ".next" ]; then
  echo "❌ Build failed — .next directory not created!"
  exit 1
fi

echo "✅ Build completed successfully"
echo "🔁 Restarting PM2 frontend..."
pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production

# Wait for app to start
sleep 3

# Check if app is running
if ! curl -f http://localhost:3000 > /dev/null 2>&1; then
  echo "⚠️  Warning: App not responding on port 3000"
  pm2 logs frontend --lines 50
  exit 1
fi

echo "💾 Saving PM2 state..."
pm2 save

echo "🌐 Reloading Nginx..."
nginx -t && systemctl reload nginx

echo "✅ Deployment completed successfully!"