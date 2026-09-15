#!/bin/bash
# Cloudflare Deployment Script (static export → Cloudflare Pages)
# NOTE: The site builds with `output: 'export'` (Next.js), so the deployable
# artifact is the `out/` directory. Earlier versions deployed `.next/static`,
# which ships JS chunks but NO HTML pages — never deploy that path.

set -euo pipefail

echo "Starting Cloudflare deployment..."

# Check for Wrangler
if ! command -v wrangler &> /dev/null; then
    echo "Installing Wrangler..."
    npm install -g wrangler
fi

# Login check
echo "Checking Cloudflare authentication..."
wrangler whoami || { echo "Not logged in. Run 'wrangler login' first."; exit 1; }

# Build the project (produces ./out)
echo "Building project..."
npm run build

# Sanity check: the export must contain the homepage and a real sitemap
if [ ! -f out/index.html ]; then
    echo "ERROR: out/index.html missing — build did not produce a static export." >&2
    exit 1
fi
URL_COUNT=$(grep -c '<loc>' out/sitemap.xml || true)
if [ "${URL_COUNT:-0}" -lt 100 ]; then
    echo "ERROR: out/sitemap.xml has ${URL_COUNT:-0} URLs (expected ≥100)." >&2
    exit 1
fi
INDEXNOW_KEY_FILE="7f9af1d9ca2e41478894f59d2a5ae8c1.txt"
if [ ! -f "out/${INDEXNOW_KEY_FILE}" ]; then
    echo "ERROR: out/${INDEXNOW_KEY_FILE} missing — IndexNow ownership verification will fail." >&2
    exit 1
fi
echo "Build OK: out/ contains index.html, sitemap with ${URL_COUNT} URLs, and the IndexNow key file."

# Deploy to Pages (full static export)
echo "Deploying to Pages..."
npx wrangler pages deploy out --project-name=aidevhub

# Post-deploy verification
echo "Verifying deployment..."
sleep 5
LIVE_URLS=$(curl -fsS https://aidevhub.net/sitemap.xml | grep -c '<loc>' || true)
echo "Live sitemap URLs: ${LIVE_URLS:-0}"
if [ "${LIVE_URLS:-0}" -lt 100 ]; then
    echo "WARNING: live sitemap looks wrong (${LIVE_URLS:-0} URLs). Check the Pages deployment." >&2
    exit 1
fi

echo "Deployment complete!"
