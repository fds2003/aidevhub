'use client'

import { useState } from 'react'
import { GlassButton } from '@/components/ui/glass-button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      const res = await fetch(`${apiUrl}/api/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={handleSubmit}>
      <div className="flex-1 relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 font-mono text-sm">→</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full h-12 pl-10 pr-4 bg-surface border border-border rounded-xl text-sm font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-primary/50 focus:glow-cyan transition-all"
        />
      </div>
      <GlassButton size="lg" variant="cyan" type="submit" disabled={status === 'loading'} className="shrink-0 glow-cyan">
        {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
      </GlassButton>
    </form>
  )
}
