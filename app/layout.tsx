import type { Metadata } from 'next'
import { Layout } from '@/components/layout'
import { SITE_NAME, SITE_DESCRIPTION, SITE_URL } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — AI Development Tools & Resources`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — AI Development Tools & Resources`,
    description: SITE_DESCRIPTION,
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: SITE_NAME,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — AI Development Tools & Resources`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate" type="application/rss+xml" title="AI Dev Hub" href="/rss.xml" />
        <meta name="theme-color" content="#080810" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": SITE_NAME,
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://aidevhub.net',
              "description": SITE_DESCRIPTION,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://aidevhub.net'}/tools?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="dark">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
