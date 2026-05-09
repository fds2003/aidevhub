import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { url, affiliateId } = await request.json()

    // Log the click (in production, save to database)
    console.log('Affiliate click:', { url, affiliateId, timestamp: new Date().toISOString() })

    // TODO: Save to Supabase
    // await supabase.from('affiliate_clicks').insert({
    //   url,
    //   affiliate_id: affiliateId,
    //   clicked_at: new Date().toISOString(),
    // })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Track error:', error)
    return NextResponse.json({ error: 'Failed to track click' }, { status: 500 })
  }
}
