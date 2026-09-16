import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

/** With `output: 'export'`, mark routes as statically generated. */
export const dynamic = 'force-static'

/**
 * AI/LLM crawlers we explicitly welcome (GEO strategy).
 * Allowing retrieval bots (OAI-SearchBot, PerplexityBot, Claude-SearchBot,
 * ChatGPT-User, Perplexity-User) is what actually earns citations; training
 * bots (GPTBot, CCBot, Bytespider, Google-Extended, Applebot-Extended,
 * meta-externalagent, Amazonbot) maximize corpus presence.
 */
const AI_CRAWLERS = [
  // OpenAI
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  // Anthropic
  'ClaudeBot',
  'Claude-User',
  'Claude-SearchBot',
  'anthropic-ai',
  // Perplexity
  'PerplexityBot',
  'Perplexity-User',
  // Other engines / corpus builders
  'Google-Extended',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
  'Bytespider',
  'meta-externalagent',
  'Amazonbot',
]

function siteHost(): string {
  try {
    return new URL(SITE_URL).host
  } catch {
    return 'aidevhub.net'
  }
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
      {
        // Explicit allow for AI crawlers (some default to denied on new sites).
        userAgent: AI_CRAWLERS,
        allow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    // Machine-readable site index for LLMs (llms.txt convention).
    host: siteHost(),
  }
}
