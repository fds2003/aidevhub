/**
 * SEO Schema.org Structured Data Utilities
 * Implements JSON-LD markup for rich search results
 */

import type { Post, Tool } from '@/types'
import { getWordCount } from './reading-time'

/**
 * Generate Article schema for blog posts
 */
export function generateArticleSchema(post: Post, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverImage ? `${siteUrl}${post.coverImage}` : `${siteUrl}/og-image.png`,
    datePublished: post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    dateModified: post.updatedAt ? new Date(post.updatedAt).toISOString() : post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: post.author || 'AI Dev Hub',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Dev Hub',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    wordCount: post.content ? getWordCount(post.content) : 0,
    timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
  }
}

/**
 * Generate SoftwareApplication schema for tools
 */
export function generateSoftwareSchema(tool: Tool, siteUrl: string) {
  const hasFreeTier = tool.pricing === 'free' || tool.pricing === 'open-source' || tool.pricing === 'freemium'
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website || `${siteUrl}/tools/${tool.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    ...(hasFreeTier ? {
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    } : {}),
    screenshot: tool.logo ? `${siteUrl}${tool.logo}` : undefined,
  }
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.url}`,
    })),
  }
}

/**
 * Generate FAQPage schema for Q&A content
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

/**
 * Generate ItemList schema for workflow steps
 * (HowTo schema was deprecated Sept 2023; use ItemList instead)
 */
export function generateStepListSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: title,
    description,
    itemListElement: steps.map((step, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: step.name,
      description: step.text,
    })),
  }
}

/**
 * Generate WebSite schema for site search
 */
export function generateWebSiteSchema(siteName: string, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

/**
 * Generate Organization schema
 */
export function generateOrganizationSchema(siteName: string, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/aidevhub',
      'https://github.com/aidevhub',
    ],
  }
}
