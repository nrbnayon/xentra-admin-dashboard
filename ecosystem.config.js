/**
 * PM2 Ecosystem Configuration for Frontend (Next.js)
 *
 * Usage:
 *   pm2 start ecosystem.config.js --env production
 *   pm2 monit  # View real-time monitoring
 *   pm2 logs   # View logs
 */

module.exports = {
  apps: [
    {
      name: "admin-dashboard",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      node_args: "--max-old-space-size=1024", // Limit Node.js memory to 1GB
      instances: 1,

      // ✅ IMPORTANT: Do NOT use cluster mode for Next.js
      exec_mode: "fork",

      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },

      autorestart: true,
      watch: false,
      ignore_watch: ["node_modules", ".next", ".git"],

      // Node capped at 1GB — PM2 restarts at 1G before OS OOM kills it
      max_memory_restart: "1G",

      kill_timeout: 8000,
      merge_logs: true,
      output: "logs/admin-dashboard-out.log",
      error: "logs/admin-dashboard-err.log",
      log_date_format: "YYYY-MM-DD HH:mm:ss Z",

      max_restarts: 10,
      min_uptime: 30000,
    },
  ],

  deploy: {
    production: {
      user: "root",
      host: "xentrasports.com",
      ref: "origin/main",
      repo: "https://github.com/nrbnayon/xentra-admin-dashboard.git",
      path: "/var/www/xentra-admin-dashboard",
      "post-deploy":
        "npm install && npm run build && pm2 reload ecosystem.config.js --env production || pm2 start ecosystem.config.js --env production",
      "pre-deploy-local": 'echo "Deploying admin-dashboard to production"',
    },
  },
};