import { NextResponse } from 'next/server'
import RSS from 'rss'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants'
import { getAllPosts } from '@/lib/content'

export async function GET() {
  const posts = getAllPosts()

  const feed = new RSS({
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    feed_url: `${SITE_URL}/rss.xml`,
    site_url: SITE_URL,
    language: 'en',
    pubDate: new Date(),
  })

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      categories: post.tags || [],
      date: new Date(post.publishedAt || post.createdAt),
      author: post.author || SITE_NAME,
    })
  })

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=300',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
