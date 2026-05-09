import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import type { Metadata } from 'next'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogType?: 'website' | 'article'
  publishedAt?: string
  modifiedAt?: string
  author?: string
  tags?: string[]
}

export function SEOHead({
  title,
  description = SITE_DESCRIPTION,
  canonical,
  ogImage = '/og-image.png',
  ogType = 'website',
  publishedAt,
  modifiedAt,
  author,
  tags,
}: SEOHeadProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL

  const metadata: Metadata = {
    title: fullTitle,
    description,
    authors: author ? [{ name: author }] : undefined,
    keywords: tags,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: ogType,
      url: canonicalUrl,
      title: fullTitle,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedAt && { publishedTime: publishedAt }),
      ...(modifiedAt && { modifiedTime: modifiedAt }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }

  return <>{JSON.stringify(metadata)}</>
}

// Schema.org structured data generators
export function generateArticleSchema({
  title,
  description,
  url,
  publishedAt,
  modifiedAt,
  author,
  image,
}: {
  title: string
  description: string
  url: string
  publishedAt: string
  modifiedAt: string
  author: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}${url}`,
    datePublished: publishedAt,
    dateModified: modifiedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(image && { image: `${SITE_URL}${image}` }),
  }
}

export function generateSoftwareSchema({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem,
  offers,
}: {
  name: string
  description: string
  url: string
  applicationCategory: string
  operatingSystem: string
  offers?: { price: string; priceCurrency: string }
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_URL}${url}`,
    applicationCategory,
    operatingSystem,
    ...(offers && { offers }),
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  }
}
