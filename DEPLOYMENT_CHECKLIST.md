# Deployment Checklist for Ubuntu

## Pre-Deployment

- [ ] Ubuntu server is accessible via SSH
- [ ] Server has at least 1GB RAM and 10GB disk space
- [ ] Domain name is configured (if using custom domain)
- [ ] DNS records are pointing to server IP

## Installation Steps

### 1. System Preparation
- [ ] Update system packages
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- [ ] Install required tools
  ```bash
  sudo apt install -y git curl build-essential
  ```

### 2. Clone Repository
- [ ] Clone the project
  ```bash
  git clone <repository-url>
  cd tools
  ```

### 3. Automated Deployment
- [ ] Make deploy script executable
  ```bash
  chmod +x deploy.sh
  ```
- [ ] Run deployment script
  ```bash
  ./deploy.sh
  ```

### 4. Verify Installation
- [ ] Check if application is running
  ```bash
  pm2 status
  ```
- [ ] Test locally
  ```bash
  curl http://localhost:3000
  ```
- [ ] Check logs
  ```bash
  pm2 logs tools-website
  ```

## Optional: Nginx Setup

### 5. Install and Configure Nginx
- [ ] Install Nginx
  ```bash
  sudo apt install nginx -y
  ```
- [ ] Copy configuration
  ```bash
  sudo cp nginx.conf /etc/nginx/sites-available/tools
  ```
- [ ] Edit configuration with your domain
  ```bash
  sudo nano /etc/nginx/sites-available/tools
  ```
- [ ] Enable site
  ```bash
  sudo ln -s /etc/nginx/sites-available/tools /etc/nginx/sites-enabled/
  ```
- [ ] Test configuration
  ```bash
  sudo nginx -t
  ```
- [ ] Restart Nginx
  ```bash
  sudo systemctl restart nginx
  ```

### 6. Firewall Configuration
- [ ] Allow HTTP
  ```bash
  sudo ufw allow 80/tcp
  ```
- [ ] Allow HTTPS
  ```bash
  sudo ufw allow 443/tcp
  ```
- [ ] Allow SSH (if not already)
  ```bash
  sudo ufw allow 22/tcp
  ```
- [ ] Enable firewall
  ```bash
  sudo ufw enable
  ```

## Optional: SSL Certificate

### 7. Install SSL Certificate
- [ ] Install Certbot
  ```bash
  sudo apt install certbot python3-certbot-nginx -y
  ```
- [ ] Obtain certificate
  ```bash
  sudo certbot --nginx -d your-domain.com -d www.your-domain.com
  ```
- [ ] Test auto-renewal
  ```bash
  sudo certbot renew --dry-run
  ```

## Post-Deployment

### 8. Testing
- [ ] Test all encoder/decoder functions
- [ ] Test hash generation
- [ ] Test text comparison
- [ ] Test on mobile devices
- [ ] Test on different browsers

### 9. Monitoring Setup
- [ ] Configure PM2 monitoring
  ```bash
  pm2 install pm2-logrotate
  ```
- [ ] Set up log rotation
  ```bash
  pm2 set pm2-logrotate:max_size 10M
  pm2 set pm2-logrotate:retain 7
  ```

### 10. Backup Configuration
- [ ] Document server configuration
- [ ] Backup Nginx configuration
- [ ] Backup PM2 configuration
  ```bash
  pm2 save
  ```

## Security Hardening

### 11. Security Measures
- [ ] Change default SSH port (optional)
- [ ] Disable root login
- [ ] Set up fail2ban
  ```bash
  sudo apt install fail2ban -y
  sudo systemctl enable fail2ban
  ```
- [ ] Keep system updated
  ```bash
  sudo apt update && sudo apt upgrade -y
  ```
- [ ] Regular security audits
  ```bash
  npm audit
  ```

## Maintenance

### 12. Regular Tasks
- [ ] Monitor application logs
  ```bash
  pm2 logs tools-website
  ```
- [ ] Check disk space
  ```bash
  df -h
  ```
- [ ] Monitor memory usage
  ```bash
  free -h
  ```
- [ ] Update dependencies monthly
  ```bash
  npm update
  ```
- [ ] Restart application after updates
  ```bash
  pm2 restart tools-website
  ```

## Troubleshooting

### Common Issues
- [ ] Application not starting
  - Check logs: `pm2 logs tools-website`
  - Check port availability: `sudo netstat -tulpn | grep 3000`
  
- [ ] Nginx errors
  - Check configuration: `sudo nginx -t`
  - Check error logs: `sudo tail -f /var/log/nginx/error.log`
  
- [ ] SSL certificate issues
  - Verify domain DNS: `nslookup your-domain.com`
  - Check certificate: `sudo certbot certificates`

## Performance Optimization

### 13. Optional Optimizations
- [ ] Enable Nginx gzip compression
- [ ] Configure browser caching
- [ ] Use PM2 cluster mode
  ```bash
  pm2 start server.js -i max --name "tools-website"
  ```
- [ ] Set up CDN for static assets (optional)

## Documentation

### 14. Final Steps
- [ ] Document custom configurations
- [ ] Update README with production URL
- [ ] Create backup and recovery procedures
- [ ] Share access credentials securely

## Success Criteria

- [ ] Application is accessible via domain/IP
- [ ] All tools are functioning correctly
- [ ] HTTPS is working (if configured)
- [ ] Application auto-starts on server reboot
- [ ] Logs are being captured
- [ ] Monitoring is in place

---

**Deployment Date:** _______________

**Deployed By:** _______________

**Production URL:** _______________

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________
