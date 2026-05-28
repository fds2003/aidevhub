import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard, CardTitle, CardDescription, CardHeader, CardContent } from '@/components/ui/glass-card'
import { Bot, Code2, Boxes, Rocket, Users, Zap } from 'lucide-react'

export const metadata = {
  title: 'About Us',
  description: 'Learn about the mission, products, and services of AI Dev Hub. We are dedicated to providing modern developers with cutting-edge AI coding tools and workflow integrations.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <GradientSection className="py-24 md:py-32" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 font-mono">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            AI Dev Hub is dedicated to building the most professional and comprehensive aggregation platform for AI development tools and automated workflows. We believe AI will reshape the future of software engineering.
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-5xl mx-auto px-4 py-16 space-y-24">
        
        {/* Our Vision */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Vision</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <GlassCard variant="glass" padding="lg" className="text-zinc-300 space-y-4 leading-relaxed">
            <p className="text-lg leading-loose">
              In this rapidly evolving era of AI technology, developers face unprecedented opportunities and challenges. While code generation tools, intelligent IDEs, and autonomous Agents emerge daily, choosing the right tech stack and integrating them seamlessly into existing workflows remains a major pain point.
            </p>
            <p className="text-lg leading-loose">
              <strong>AI Dev Hub</strong> was born to lower the barrier for developers embracing AI. Through in-depth reviews, cutting-edge tutorials, and out-of-the-box Model Context Protocol (MCP) integrations, we help every software engineer evolve into a &quot;10x AI Developer.&quot;
            </p>
          </GlassCard>
        </section>

        {/* Our Core Products */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Core Products</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Code2 className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>AI Coding Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Comprehensive collections and horizontal evaluations of mainstream AI coding assistants (Cursor, GitHub Copilot, Claude Code, etc.) to help you find your perfect programming co-pilot.
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Boxes className="w-6 h-6 text-purple-400" />
                </div>
                <CardTitle>MCP Hub</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  In-depth exploration of the Model Context Protocol (MCP). We provide rich MCP Server tutorials, open-source integration recipes, and best practices to bridge LLMs and local systems.
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard hover variant="elevated" className="h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <Bot className="w-6 h-6 text-blue-400" />
                </div>
                <CardTitle>AI Agent Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  Deep dives into autonomous agent frameworks like Google Antigravity, AutoGPT, and others. We provide step-by-step guides to build private AI agents from scratch.
                </CardDescription>
              </CardContent>
            </GlassCard>
          </div>
        </section>

        {/* Our Services */}
        <section className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-white tracking-tight">Our Services</h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Rocket className="w-6 h-6 text-primary" />
                  <CardTitle>Enterprise AI Consulting</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Tailored AI toolchain integration roadmaps for development teams. From tool selection, safety compliance assessments, to team training, we elevate your engineering velocity.
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Zap className="w-6 h-6 text-yellow-400" />
                  <CardTitle>Custom MCP & Agent Development</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Develop secure, dedicated MCP interfaces and automated agents connected to your specific internal systems, such as Jira, GitLab, or cloud servers.
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Code2 className="w-6 h-6 text-purple-400" />
                  <CardTitle>Tech Reviews & Sponsored Columns</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Subscribe to our hardcore technical columns, or invite us to conduct in-depth product reviews and write sponsored technical articles for your AI developer products.
                </CardDescription>
              </CardContent>
            </GlassCard>

            <GlassCard variant="grid" hover>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <CardTitle>Developer Community & Co-creation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Join a community of tech enthusiasts. We regularly host online workshops and private meetups to explore the future of AI programming with industry pioneers.
                </CardDescription>
              </CardContent>
            </GlassCard>
          </div>
        </section>

      </div>
    </div>
  )
}
