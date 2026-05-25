import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/glass-card'
import { Bot, Code2, Boxes, Rocket, Users, Zap } from 'lucide-react'

export const metadata = {
  title: '关于我们 - AI Dev Hub',
  description: '了解 AI Dev Hub 的愿景、产品和服务。我们致力于为现代开发者提供最前沿的 AI 编程工具和自动化工作流整合。',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <GradientSection className="py-24 md:py-32" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            关于我们
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            AI Dev Hub 致力于为现代开发者打造最专业、最全面的 AI 编程工具与自动化工作流聚合平台。我们相信，AI 将重塑软件工程的未来。
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-5xl mx-auto px-4 py-16 space-y-24">
        
        {/* 公司介绍 Company */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">我们的愿景</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <GlassCard variant="glass" padding="lg" className="prose prose-invert max-w-none">
            <p className="text-lg text-zinc-300 leading-loose">
              在这个 AI 技术日新月异的时代，开发者面临着前所未有的机遇与挑战。各种代码生成工具、智能 IDE 和自动化 Agent 层出不穷，但如何挑选最适合团队的技术栈，如何将它们无缝集成到现有工作流中，依然是一个巨大的痛点。
            </p>
            <p className="text-lg text-zinc-300 leading-loose mt-4">
              <strong>AI Dev Hub</strong> 应运而生。我们的核心使命是降低开发者拥抱 AI 的门槛，通过深度评测、前沿教程和开箱即用的 MCP (Model Context Protocol) 整合方案，帮助每一位软件工程师完成向 &quot;10x AI 开发者&quot; 的蜕变。
            </p>
          </GlassCard>
        </section>

        {/* 产品体系 Products */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">我们的核心产品</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI 编程工具导航</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  全面收录、横向评测市面上主流的 AI 编程辅助工具（Cursor, GitHub Copilot, Claude Code 等），帮您找到最契合需求的编程副驾。
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Boxes className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle>MCP 生态枢纽</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  深度解析 Model Context Protocol 协议。提供丰富的 MCP Server 搭建教程、开源整合方案及最佳实践，连接大模型与本地环境。
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle>AI Agents 剖析</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  深入探讨 Google Antigravity、AutoGPT 等顶级自主智能体框架的底层运行机制。提供从 0 到 1 打造私有化 Agent 的完整指南。
                </CardDescription>
              </CardContent>
            </GlassCard>
          </div>
        </section>

        {/* 服务内容 Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">我们提供的服务</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-primary" />
                  <CardTitle>企业级 AI 转型咨询</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  为研发团队量身定制 AI 工具链导入方案。从工具选型、安全合规评估到团队培训，全链路提升研发效能。
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <CardTitle>定制化 MCP/Agent 开发</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  根据您的特定业务系统（如内部 Jira、GitLab、云服务器），开发安全可靠的专属 MCP 接口和自动化处理 Agent。
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-purple-400" />
                  <CardTitle>前沿技术评测与专栏</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  订阅我们深度硬核的技术专栏，或邀请我们对您的 AI 开发者产品进行专业视角的体验评测与技术输出。
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <CardTitle>开发者社区与共创</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  加入极客云集的 AI 开发者社区。我们定期举办线上 Workshop、技术闭门会，与行业先锋共探 AI 编程前沿。
                </CardDescription>
              </CardContent>
            </GlassCard>
          </div>
        </section>

      </div>
    </div>
  )
}
