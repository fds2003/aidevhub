/**
 * SEO Head Component
 * Handles meta tags, Open Graph, Twitter Cards, and JSON-LD schema
 */

import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from './constants'

interface SEOProps {
  title?: string
  description?: string
  canonical?: string
  image?: string
  type?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
  author?: string
  tags?: string[]
  schema?: object | object[]
}

export function generateSEOProps({
  title,
  description,
  canonical,
  image,
  type = 'website',
  publishedAt,
  modifiedAt,
  author,
  tags,
  schema,
}: SEOProps): Metadata {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const fullDescription = description || SITE_DESCRIPTION
  const fullImage = image || `${SITE_URL}/og-image.png`
  const url = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(type === 'article' && publishedAt
        ? {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt || publishedAt,
            authors: [author || SITE_NAME],
            tags: tags || [],
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: '@aidevhub',
    },
  }
}

/**
 * Generate JSON-LD script element as string (for server components)
 */
export function generateJsonLdScript(schema: object | object[]): string {
  const schemas = Array.isArray(schema) ? schema : [schema]
  
  return schemas
    .map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`)
    .join('\n')
}
