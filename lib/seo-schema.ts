/**
 * SEO Schema.org Structured Data Utilities
 * Implements JSON-LD markup for rich search results
 */

import type { Post, Tool } from '@/types'

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
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
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
    wordCount: post.content ? post.content.split(/\s+/).length : 0,
  }
}

/**
 * Generate SoftwareApplication schema for tools
 */
export function generateSoftwareSchema(tool: Tool, siteUrl: string) {
  const pricingType = tool.pricing === 'free' 
    ? 'https://schema.org/FreeDigitalAsset'
    : tool.pricing === 'freemium'
      ? 'https://schema.org/FreeOrAdSupportedProduct'
      : 'https://schema.org/PaidProduct'

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.website || `${siteUrl}/tools/${tool.slug}`,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: tool.pricing === 'free' ? '0' : tool.pricing === 'freemium' ? '0' : undefined,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
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
 * Generate HowTo schema for tutorials
 */
export function generateHowToSchema(
  title: string,
  description: string,
  steps: Array<{ name: string; text: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: title,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
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
