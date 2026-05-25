import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/glass-card'
import { Mail, Building2 } from 'lucide-react'

export const metadata = {
  title: 'Contact Us - AI Dev Hub',
  description: 'Get in touch with AI Dev Hub. Contact us for business partnerships, editorial inquiries, tool submissions, or general feedback.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-24 md:py-32" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-mono">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Whether it is business partnerships, editorial inquiries, or suggestions about our content, we would love to hear from you. Feel free to contact us via the emails below.
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Business Inquiry */}
          <GlassCard hover variant="elevated" className="flex flex-col h-full justify-between">
            <div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Business Partnerships</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  For advertising, sponsored columns, article collaborations, or enterprise AI consulting, please reach out to our business email:
                </CardDescription>
              </CardContent>
            </div>
            <CardContent className="pt-0">
              <a href="mailto:business@aidevhub.net" className="inline-block text-lg font-mono font-medium text-primary hover:underline transition-all">
                business@aidevhub.net &rarr;
              </a>
            </CardContent>
          </GlassCard>

          {/* General Inquiry */}
          <GlassCard hover variant="elevated" className="flex flex-col h-full justify-between">
            <div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle>General Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  For site feedback, content corrections, or if you are an independent developer seeking to submit an AI coding tool, please contact:
                </CardDescription>
              </CardContent>
            </div>
            <CardContent className="pt-0">
              <a href="mailto:hello@aidevhub.net" className="inline-block text-lg font-mono font-medium text-purple-400 hover:underline transition-all">
                hello@aidevhub.net &rarr;
              </a>
            </CardContent>
          </GlassCard>

        </div>
      </div>
    </div>
  )
}
