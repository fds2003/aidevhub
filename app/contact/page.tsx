import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/glass-card'
import { Mail, Building2, MessageSquare, Twitter, Github } from 'lucide-react'

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
          
          {/* 联系方式 */}
          <div className="space-y-6">
            <GlassCard hover variant="elevated" className="h-full">
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
                <a href="mailto:business@aidevhub.net" className="text-lg font-mono font-medium text-primary hover:underline">
                  business@aidevhub.net
                </a>
              </CardContent>
            </GlassCard>

            <GlassCard hover variant="elevated" className="h-full">
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
                <a href="mailto:hello@aidevhub.net" className="text-lg font-mono font-medium text-purple-400 hover:underline">
                  hello@aidevhub.net
                </a>
              </CardContent>
            </GlassCard>
          </div>

          {/* 社交媒体与其他联系方式 */}
          <div className="space-y-6">
            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle>社交平台与即时联系方式</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <CardDescription className="text-base leading-relaxed">
                  您也可以通过各大社交平台关注我们的最新动态，或进行实时的技术交流互动。
                </CardDescription>
                
                <div className="flex flex-col gap-4">
                  <a href="https://twitter.com/aidevhub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-surface hover:border-primary/50 transition-colors group">
                    <Twitter className="w-5 h-5 text-zinc-400 group-hover:text-[#1DA1F2]" />
                    <span className="text-zinc-300 font-medium group-hover:text-white">关注我们的 X (Twitter)</span>
                  </a>
                  
                  <a href="https://github.com/aidevhub" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50 hover:bg-surface hover:border-primary/50 transition-colors group">
                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                    <span className="text-zinc-300 font-medium group-hover:text-white">访问 GitHub 组织</span>
                  </a>

                  {/* 微信占位 */}
                  <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/50">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    <div className="flex flex-col">
                      <span className="text-zinc-300 font-medium">微信小助手 (即将开放)</span>
                      <span className="text-xs text-zinc-500 mt-1">添加微信群进入开发者社区</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  )
}
