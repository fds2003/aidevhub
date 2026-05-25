import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/glass-card'
import { Mail, Building2 } from 'lucide-react'

export const metadata = {
  title: '联系我们 - AI Dev Hub',
  description: '联系 AI Dev Hub。无论是商务合作、技术交流还是网站反馈，我们都非常期待听到您的声音。',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-24 md:py-32" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            联系我们
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            无论是商务合作、技术交流还是对我们内容的反馈，我们都非常期待听到您的声音。请随时通过以下方式与我们取得联系。
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* 企业合作 */}
          <GlassCard hover variant="elevated" className="flex flex-col h-full justify-between">
            <div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>企业邮箱 (商务合作)</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  如果您有关于广告赞助、文章专栏合作、或企业级 AI 转型咨询等商务需求，请发送邮件至我们的企业邮箱：
                </CardDescription>
              </CardContent>
            </div>
            <CardContent className="pt-0">
              <a href="mailto:business@aidevhub.net" className="inline-block text-lg font-mono font-medium text-primary hover:underline transition-all">
                business@aidevhub.net &rarr;
              </a>
            </CardContent>
          </GlassCard>

          {/* 一般咨询 */}
          <GlassCard hover variant="elevated" className="flex flex-col h-full justify-between">
            <div>
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle>网站域名邮箱 (一般咨询)</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed mb-4">
                  关于网站内容的反馈、纠错，或者如果您是一名独立开发者想要向我们推荐优秀的 AI 编程工具，请联系：
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
