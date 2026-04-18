module.exports = {
  apps: [
    {
      name: 'frontend',
      script: 'npm',
      args: 'start',

      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },

      autorestart: true,
      watch: false,

      max_memory_restart: '1G',

      output: 'logs/frontend-out.log',
      error: 'logs/frontend-err.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    }
  ]
};