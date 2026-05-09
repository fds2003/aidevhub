import type { Metadata } from 'next'
import { Layout } from '@/components/layout'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://aidevhub.net'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aidevhub.net',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="dark">
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
