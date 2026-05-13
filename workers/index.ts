// Cloudflare Workers API Handler
// src/workers/index.ts

interface Env {
    DB: D1Database;
    ASSETS: R2Bucket;
    CACHE: KVNamespace;
    TURNSTILE_SECRET_KEY?: string;
    NEXT_PUBLIC_API_URL?: string;
}

export default {
    async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS headers
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // RSS Feed
            if (path === '/rss.xml' || path === '/feed') {
                return handleRSS(env, corsHeaders);
            }

            // Subscribe API
            if (path === '/api/subscribe' && request.method === 'POST') {
                return handleSubscribe(request, env, corsHeaders);
            }

            // Tools API
            if (path.startsWith('/api/tools')) {
                return handleTools(request, env, url, corsHeaders);
            }

            // Posts API
            if (path.startsWith('/api/posts')) {
                return handlePosts(request, env, url, corsHeaders);
            }

            // Track API
            if (path === '/api/track' && request.method === 'POST') {
                return handleTrack(request, env, corsHeaders);
            }

            // R2 Assets
            if (path.startsWith('/assets/')) {
                return handleAssets(request, env, url);
            }

            return new Response('Not Found', { status: 404 });
        } catch (error) {
            const errorInfo = {
                error: error?.message || String(error),
                errorName: error?.name,
                errorStack: error?.stack?.slice(0, 500)
            };
            return new Response(JSON.stringify(errorInfo), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};

// Tools Handler
async function handleTools(request: Request, env: Env, url: URL, corsHeaders: Record<string, string>) {
    const pathParts = url.pathname.split('/');
    const slug = pathParts[3]; // /api/tools/[slug]

    if (slug) {
        // Get single tool
        const result = await env.DB.prepare(
            'SELECT * FROM tools WHERE slug = ?'
        ).bind(slug).first();

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // Get all tools
    const result = await env.DB.prepare('SELECT * FROM tools ORDER BY created_at DESC').all();
    return new Response(JSON.stringify(result?.results ?? []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

// Posts Handler
async function handlePosts(request: Request, env: Env, url: URL, corsHeaders: Record<string, string>) {
    const pathParts = url.pathname.split('/');
    const slug = pathParts[3];

    if (slug) {
        const result = await env.DB.prepare(
            'SELECT * FROM posts WHERE slug = ? AND published = 1'
        ).bind(slug).first();

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    const result = await env.DB.prepare(
        'SELECT slug, title, excerpt, author, categories, reading_time, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC'
    ).all();

    return new Response(JSON.stringify(result?.results ?? []), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

// Track Handler
async function handleTrack(request: Request, env: Env, corsHeaders: Record<string, string>) {
    const { tool_slug, source } = await request.json();

    await env.DB.prepare(
        'INSERT INTO clicks (tool_slug, source) VALUES (?, ?)'
    ).bind(tool_slug, source).run();

    return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

// R2 Assets Handler
async function handleAssets(request: Request, env: Env, url: URL): Promise<Response> {
    const key = url.pathname.replace('/assets/', '');

    const object = await env.ASSETS.get(key);

    if (!object) {
        return new Response('Not Found', { status: 404 });
    }

    return new Response(object.body, {
        headers: {
            'Cache-Control': 'public, max-age=31536000',
            'Content-Type': object.httpMetadata?.contentType || 'application/octet-stream',
        }
    });
}

// Subscribe Handler
async function handleSubscribe(request: Request, env: Env, corsHeaders: Record<string, string>) {
    try {
        const { email, token } = await request.json();

        // Validate email
        if (!email || !email.includes('@')) {
            return new Response(JSON.stringify({ error: 'Invalid email' }), {
                status: 400,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // Verify Turnstile token (if secret is configured)
        if (env.TURNSTILE_SECRET_KEY && token) {
            const verifyResponse = await fetch(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        secret: env.TURNSTILE_SECRET_KEY,
                        response: token,
                    }),
                }
            );

            const result = await verifyResponse.json();
            if (!result.success) {
                return new Response(JSON.stringify({ error: 'Verification failed' }), {
                    status: 400,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
                });
            }
        }

        // TODO: Store subscriber (could add subscribers table)
        // For now, just return success
        return new Response(JSON.stringify({ success: true }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }
}

// RSS Feed Handler
async function handleRSS(env: Env, corsHeaders: Record<string, string>) {
    const result = await env.DB.prepare(
        'SELECT slug, title, excerpt, author, categories, created_at FROM posts WHERE published = 1 ORDER BY created_at DESC LIMIT 20'
    ).all();

    const posts = (result.results || []) as any[];
    const lastBuildDate = new Date().toUTCString();

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>aidevhub.net</title>
    <link>https://aidevhub.net</link>
    <description>AI Developer Hub - Discover the best AI tools and resources for developers</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="https://aidevhub-api.fds2003.workers.dev/rss.xml" rel="self" type="application/rss+xml"/>
    ${posts.map((post: any) => `
    <item>
      <title><![CDATA[${post.title || ''}]]></title>
      <link>https://aidevhub.net/blog/${post.slug}</link>
      <guid>https://aidevhub.net/blog/${post.slug}</guid>
      <pubDate>${new Date(post.created_at).toUTCString()}</pubDate>
      <description><![CDATA[${post.excerpt || ''}]]></description>
    </item>`).join('')}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            ...corsHeaders,
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, max-age=3600',
        }
    });
}
