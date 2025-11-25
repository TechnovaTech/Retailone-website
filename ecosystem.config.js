module.exports = {
  apps: [{
    name: 'retalians',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/retalians',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 2222
    },
    error_file: '/var/www/retalians/logs/err.log',
    out_file: '/var/www/retalians/logs/out.log',
    log_file: '/var/www/retalians/logs/combined.log',
    time: true
  }]
}
