import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'

/** `output: 'export'` 下需显式声明为静态生成 */
export const dynamic = 'force-static'

function siteHost(): string {
  try {
    return new URL(SITE_URL).host
  } catch {
    return 'aidevhub.net'
  }
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: siteHost(),
  }
}
