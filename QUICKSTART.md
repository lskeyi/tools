# Quick Start Guide

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Access the application:**
   Open your browser and go to `http://localhost:3000`

## Ubuntu Deployment

### Option 1: Automated Deployment (Recommended)

Run the deployment script:
```bash
chmod +x deploy.sh
./deploy.sh
```

This script will:
- Install Node.js and npm if not present
- Install project dependencies
- Install and configure PM2
- Start the application
- Configure PM2 to start on system boot

### Option 2: Manual Deployment

1. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Install PM2:**
   ```bash
   sudo npm install -g pm2
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Start with PM2:**
   ```bash
   pm2 start server.js --name "tools-website"
   pm2 save
   pm2 startup
   ```

### Setting up Nginx (Optional but Recommended)

1. **Install Nginx:**
   ```bash
   sudo apt update
   sudo apt install nginx
   ```

2. **Copy the Nginx configuration:**
   ```bash
   sudo cp nginx.conf /etc/nginx/sites-available/tools
   ```

3. **Edit the configuration:**
   ```bash
   sudo nano /etc/nginx/sites-available/tools
   ```
   Replace `your-domain.com` with your actual domain.

4. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/tools /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

5. **Configure firewall:**
   ```bash
   sudo ufw allow 'Nginx Full'
   sudo ufw enable
   ```

### SSL Certificate with Let's Encrypt (Optional)

1. **Install Certbot:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain certificate:**
   ```bash
   sudo certbot --nginx -d your-domain.com -d www.your-domain.com
   ```

3. **Auto-renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

## Managing the Application

### PM2 Commands

- **Check status:**
  ```bash
  pm2 status
  ```

- **View logs:**
  ```bash
  pm2 logs tools-website
  ```

- **Restart:**
  ```bash
  pm2 restart tools-website
  ```

- **Stop:**
  ```bash
  pm2 stop tools-website
  ```

- **Monitor:**
  ```bash
  pm2 monit
  ```

### Updating the Application

1. Pull latest changes:
   ```bash
   git pull
   ```

2. Install new dependencies (if any):
   ```bash
   npm install
   ```

3. Restart the application:
   ```bash
   pm2 restart tools-website
   ```

## Troubleshooting

### Port already in use
If port 3000 is already in use, you can change it:
```bash
PORT=8080 npm start
```

Or set it in PM2:
```bash
PORT=8080 pm2 start server.js --name "tools-website"
```

### Permission denied
If you get permission errors, make sure the deploy script is executable:
```bash
chmod +x deploy.sh
```

### PM2 not found after installation
Add npm global bin to your PATH:
```bash
export PATH=$PATH:$(npm bin -g)
```

### Nginx configuration test fails
Check the error message:
```bash
sudo nginx -t
```

Common issues:
- Syntax errors in configuration
- Port conflicts
- Missing semicolons

## Performance Tips

1. **Enable Nginx caching** for static files
2. **Use PM2 cluster mode** for better performance:
   ```bash
   pm2 start server.js -i max --name "tools-website"
   ```
3. **Monitor with PM2 Plus** for production monitoring

## Security Recommendations

1. Always use HTTPS in production
2. Keep Node.js and dependencies updated
3. Configure firewall properly
4. Use environment variables for sensitive data
5. Implement rate limiting for API endpoints
6. Regular security audits: `npm audit`

## Support

For issues or questions, please check the main README.md file or create an issue in the repository.
