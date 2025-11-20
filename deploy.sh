#!/bin/bash

# Deployment script for Ubuntu
# This script automates the deployment process

echo "================================"
echo "Tools Website Deployment Script"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Installing..."
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "✓ Node.js is already installed ($(node -v))"
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Installing..."
    sudo apt-get install -y npm
else
    echo "✓ npm is already installed ($(npm -v))"
fi

# Install dependencies
echo ""
echo "Installing project dependencies..."
npm install

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo ""
    echo "PM2 is not installed. Installing globally..."
    sudo npm install -g pm2
else
    echo "✓ PM2 is already installed"
fi

# Stop existing PM2 process if running
echo ""
echo "Stopping existing processes..."
pm2 stop tools-website 2>/dev/null || true
pm2 delete tools-website 2>/dev/null || true

# Start the application with PM2
echo ""
echo "Starting the application..."
pm2 start server.js --name "tools-website"

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
echo ""
echo "Setting up PM2 startup script..."
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u $USER --hp $HOME

echo ""
echo "================================"
echo "Deployment completed successfully!"
echo "================================"
echo ""
echo "Application is running on http://localhost:3000"
echo ""
echo "Useful PM2 commands:"
echo "  pm2 status          - Check application status"
echo "  pm2 logs            - View application logs"
echo "  pm2 restart tools-website - Restart the application"
echo "  pm2 stop tools-website    - Stop the application"
echo ""
