'use client'

import { useState } from 'react'
import { Send, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Turnstile } from '@/components/ui/turnstile'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!turnstileToken) {
      setStatus('error')
      return
    }

    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token: turnstileToken }),
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
    <section className="py-12">
      <div className="container">
        <Card className="max-w-2xl mx-auto bg-primary text-primary-foreground">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">
              Stay Updated with AI Dev Hub
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center mb-6 opacity-90">
              Get the latest tutorials, tool reviews, and AI workflow tips
              delivered to your inbox.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  disabled={status === 'loading'}
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  {status === 'loading' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : status === 'success' ? (
                    <CheckCircle className="mr-2 h-4 w-4" />
                  ) : (
                    <Send className="mr-2 h-4 w-4" />
                  )}
                  {status === 'loading' ? 'Subscribing...' : status === 'success' ? 'Subscribed!' : 'Subscribe'}
                </Button>
              </div>
              <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || ''}
                onVerify={setTurnstileToken}
                size="compact"
              />
              {status === 'error' && (
                <p className="text-sm text-destructive">Please verify you are human</p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
