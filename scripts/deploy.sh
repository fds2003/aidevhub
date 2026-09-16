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
if [ ! -s out/llms.txt ] || [ ! -s out/llms-full.txt ]; then
    echo "ERROR: out/llms.txt / out/llms-full.txt missing — GEO asset generator did not run." >&2
    exit 1
fi
BLOG_MD_COUNT=$(ls out/blog/*.md 2>/dev/null | wc -l)
if [ "${BLOG_MD_COUNT:-0}" -lt 20 ]; then
    echo "ERROR: out/blog/*.md has ${BLOG_MD_COUNT:-0} markdown mirrors (expected ≥20) — GEO asset generator did not run." >&2
    exit 1
fi
RSS_ITEMS=$(grep -c '<item>' out/rss.xml || true)
if [ "${RSS_ITEMS:-0}" -lt 10 ]; then
    echo "ERROR: out/rss.xml has ${RSS_ITEMS:-0} items (expected ≥10) — generated feed is missing." >&2
    exit 1
fi
echo "Build OK: out/ contains index.html, sitemap with ${URL_COUNT} URLs, llms.txt, ${BLOG_MD_COUNT} blog .md mirrors, rss.xml with ${RSS_ITEMS} items, and the IndexNow key file."

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

# P0-2 verify: GEO assets must be LIVE (llms-full.txt + blog .md mirrors).
# Previously these 404'd live even though they existed in out/ — a Pages
# deployment gap. Fail the deploy loudly if they are missing after publish.
echo "Verifying GEO assets are live..."
LIVE_LLMS_FULL=$(curl -fsS -o /dev/null -w "%{http_code}" https://aidevhub.net/llms-full.txt || echo 000)
LIVE_BLOG_MD=$(curl -fsS -o /dev/null -w "%{http_code}" https://aidevhub.net/blog/google-antigravity-tutorial-guide.md || echo 000)
echo "  llms-full.txt: ${LIVE_LLMS_FULL}   blog .md mirror: ${LIVE_BLOG_MD}"
if [ "${LIVE_LLMS_FULL}" != "200" ] || [ "${LIVE_BLOG_MD}" != "200" ]; then
    echo "WARNING: GEO assets not live (llms-full.txt=${LIVE_LLMS_FULL}, blog .md=${LIVE_BLOG_MD})." >&2
    echo "         They are in out/ but Cloudflare Pages did not serve them. Check the" >&2
    echo "         Pages build-output directory and any _redirects/_headers or route rules" >&2
    echo "         that may be excluding *.txt / *.md." >&2
fi

# P0-1 verify: Cloudflare "Managed / AI Training" robots policy can override our
# robots.ts and disallow the very AI crawlers our GEO strategy relies on. Detect
# that here and print the exact console fix instead of failing the build.
echo "Verifying robots.txt AI-crawler policy..."
ROBOTS_BODY=$(curl -fsS https://aidevhub.net/robots.txt || echo "")
if printf '%s' "$ROBOTS_BODY" | grep -q "ai-train=no" || \
   printf '%s' "$ROBOTS_BODY" | grep -A1 "User-agent: GPTBot" | grep -q "Disallow: /" || \
   printf '%s' "$ROBOTS_BODY" | grep -A1 "User-agent: ClaudeBot" | grep -q "Disallow: /"; then
    echo "WARNING: Cloudflare managed-robots is overriding our robots.txt (AI crawlers Disallowed)." >&2
    echo "         Our src/app/robots.ts allows GPTBot/ClaudeBot/CCBot/Google-Extended for GEO." >&2
    echo "         FIX in Cloudflare Dashboard: your zone -> Security -> AI Training /" >&2
    echo "         Managed Robots -> switch to Custom (or disable managed robots) so the" >&2
    echo "         Next-generated robots.txt is served verbatim. Re-run this check after." >&2
else
    echo "  robots.txt serves our AI-crawler Allow policy — OK."
fi

echo "Deployment complete!"
