#!/bin/bash
set -e

APP_DIR="/var/www/xentra-admin-dashboard"
RELEASE_DIR="$APP_DIR/releases/$(date +%s)"

echo "🚀 Starting Zero-Downtime Deployment..."

# 1. Clone fresh copy
echo "📥 Cloning fresh release..."
git clone https://github.com/nrbnayon/xentra-admin-dashboard.git $RELEASE_DIR

cd $RELEASE_DIR

# 2. Install deps (lighter)
echo "📦 Installing dependencies..."
npm install --no-audit --no-fund --prefer-offline

# 3. Build (IMPORTANT: isolate build)
echo "🏗️ Building app..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

# 4. Point current to new release
echo "🔗 Switching to new release..."
ln -sfn $RELEASE_DIR $APP_DIR/current

cd $APP_DIR/current

# 5. Reload PM2 (zero downtime)
echo "🔁 Reloading PM2 (zero downtime)..."
pm2 start ecosystem.config.js --env production || pm2 reload frontend

# 6. Cleanup old releases (keep last 3)
echo "🧹 Cleaning old releases..."
ls -dt $APP_DIR/releases/* | tail -n +4 | xargs rm -rf || true

echo "✅ Deployment completed with ZERO downtime!"