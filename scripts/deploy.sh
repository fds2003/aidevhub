#!/bin/bash
# Cloudflare Deployment Script

set -e

echo "Starting Cloudflare deployment..."

# Check for Wrangler
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler..."
    npm install -g wrangler
fi

# Login check
echo "Checking Cloudflare authentication..."
wrangler whoami || { echo "Not logged in. Run 'wrangler login' first."; exit 1; }

# Build the project
echo "Building project..."
npm run build

# Deploy Workers
echo "Deploying Workers..."
wrangler deploy

# Deploy to Pages
echo "Deploying to Pages..."
npx wrangler pages deploy .next/static --project-name=aidevhub

echo "Deployment complete!"
