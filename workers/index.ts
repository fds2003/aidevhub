// Cloudflare Workers API Handler
// src/workers/index.ts

interface Env {
    DB: D1Database;
    ASSETS: R2Bucket;
    CACHE: KVNamespace;
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
            return new Response(JSON.stringify({ error: error.message }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }
    }
};

// Tools Handler
async function handleTools(request: Request, env: Env, url: URL, corsHeaders: Record<string, string>) {
    const slug = url.pathname.replace('/api/tools/', '');

    if (slug && slug !== 'tools') {
        // Get single tool
        const result = await env.DB.prepare(
            'SELECT * FROM tools WHERE slug = ?'
        ).bind(slug).first();

        return new Response(JSON.stringify(result), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
    }

    // Get all tools
    const search = url.searchParams.get('search');
    const category = url.searchParams.get('category');

    let query = 'SELECT * FROM tools WHERE 1=1';
    const bindings: string[] = [];

    if (search) {
        query += ' AND (name LIKE ? OR description LIKE ?)';
        bindings.push(`%${search}%`, `%${search}%`);
    }

    if (category) {
        query += ' AND categories LIKE ?';
        bindings.push(`%${category}%`);
    }

    query += ' ORDER BY created_at DESC';

    const result = await env.DB.prepare(query).bind(...bindings).all();

    return new Response(JSON.stringify(result.results), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
}

// Posts Handler
async function handlePosts(request: Request, env: Env, url: URL, corsHeaders: Record<string, string>) {
    const slug = url.pathname.replace('/api/posts/', '');

    if (slug && slug !== 'posts') {
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

    return new Response(JSON.stringify(result.results), {
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
