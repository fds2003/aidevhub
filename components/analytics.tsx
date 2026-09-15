'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { GA4_MEASUREMENT_ID } from '@/lib/constants'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * Fire a GA4 page_view on client-side route changes (MPA-safe: no-op when the
 * navigation is a full page load, which gtag already records automatically).
 */
export function AnalyticsRouteTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Skip the very first render — @next/third-parties' gtag already sends the
    // initial page_view with the page load. Subsequent client navigations
    // (rare in this static-export MPA) get an explicit page_view.
    if (typeof window === 'undefined' || !window.gtag || !GA4_MEASUREMENT_ID) return
    if (!sessionStorage.getItem('ah_route_tracked')) {
      sessionStorage.setItem('ah_route_tracked', '1')
      return
    }
    window.gtag('event', 'page_view', {
      page_path: pathname,
      page_title: document.title,
    })
  }, [pathname])

  return null
}

/** Programmatic outbound click event — call from CTA handlers. */
export function trackOutboundClick(toolName: string, url: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', 'click_outbound', {
    tool_name: toolName,
    outbound_url: url,
    transport_type: 'beacon',
  })
}

/**
 * Global click delegation for external links: records click_outbound for every
 * anchor leaving the site. Beacon transport survives the page unload, keeps the
 * session engaged, and removes the need to instrument every link by hand.
 */
export function AnalyticsGlobalClickHandler() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (typeof window === 'undefined' || !window.gtag) return
      const anchor = (e.target as HTMLElement | null)?.closest?.('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return
      let target: URL
      try {
        target = new URL(href, window.location.href)
      } catch {
        return
      }
      if (target.host === window.location.host) return
      window.gtag('event', 'click_outbound', {
        link_text: (anchor.textContent || '').trim().slice(0, 80),
        outbound_url: target.toString(),
        transport_type: 'beacon',
      })
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [])

  return null
}
