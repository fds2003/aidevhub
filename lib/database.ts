// Cloudflare D1 Database Client
// Cloudflare D1 instead of Supabase for this codebase path

export interface Tool {
    id: number;
    slug: string;
    name: string;
    tagline?: string;
    description?: string;
    logo?: string;
    website?: string;
    pricing?: string;
    categories?: string;
    features?: string;
    affiliate_link?: string;
    created_at: string;
    updated_at: string;
}

export interface Post {
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    content?: string;
    cover_image?: string;
    author?: string;
    categories?: string;
    tags?: string;
    reading_time?: number;
    published: number;
    created_at: string;
    updated_at: string;
}

export interface Workflow {
    id: number;
    slug: string;
    title: string;
    description?: string;
    content?: string;
    steps?: string;
    difficulty?: string;
    category?: string;
    created_at: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

class Database {
    async getTools(options?: {
        search?: string;
        category?: string;
        limit?: number;
    }): Promise<Tool[]> {
        const params = new URLSearchParams();
        if (options?.search) params.set('search', options.search);
        if (options?.category) params.set('category', options.category);
        if (options?.limit) params.set('limit', options.limit.toString());

        const res = await fetch(`${API_BASE}/tools?${params}`);
        return res.json();
    }

    async getTool(slug: string): Promise<Tool | null> {
        const res = await fetch(`${API_BASE}/tools/${slug}`);
        if (!res.ok) return null;
        return res.json();
    }

    async getPosts(options?: {
        limit?: number;
    }): Promise<Post[]> {
        const params = new URLSearchParams();
        if (options?.limit) params.set('limit', options.limit.toString());

        const res = await fetch(`${API_BASE}/posts?${params}`);
        return res.json();
    }

    async getPost(slug: string): Promise<Post | null> {
        const res = await fetch(`${API_BASE}/posts/${slug}`);
        if (!res.ok) return null;
        return res.json();
    }

    async trackClick(toolSlug: string, source: string): Promise<void> {
        await fetch(`${API_BASE}/track`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ tool_slug: toolSlug, source }),
        });
    }
}

export const db = new Database();
