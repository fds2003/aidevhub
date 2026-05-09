// Subscribe API Route - Next.js App Router
// For Cloudflare Workers deployment, see src/workers/index.ts

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    try {
        const { email, token } = await request.json();

        // Validate email
        if (!email || !email.includes('@')) {
            return NextResponse.json({ error: 'Invalid email' }, { status: 400, headers: corsHeaders });
        }

        // Verify Turnstile token
        const turnstileSecret = process.env.TURNSTILE_SECRET_KEY;
        if (turnstileSecret && token) {
            const verifyResponse = await fetch(
                'https://challenges.cloudflare.com/turnstile/v0/siteverify',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        secret: turnstileSecret,
                        response: token,
                    }),
                }
            );

            const result = await verifyResponse.json();
            if (!result.success) {
                return NextResponse.json({ error: 'Verification failed' }, { status: 400, headers: corsHeaders });
            }
        }

        // Store subscriber (using D1 or external API)
        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL;
            if (apiUrl) {
                await fetch(`${apiUrl}/api/subscribe`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });
            }
        } catch {
            // Silently handle storage errors in dev
        }

        return NextResponse.json({ success: true }, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500, headers: corsHeaders }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json({}, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
