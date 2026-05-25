import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata = {
  title: '隐私政策 - AI Dev Hub',
  description: 'AI Dev Hub 隐私政策。我们尊重并致力于保护您的隐私，向您说明我们如何收集、使用和存储您的相关信息。',
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-20 md:py-28" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            隐私政策
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            AI Dev Hub 非常重视您的隐私保护。本政策向您详细说明我们在您访问本站时，如何处理与保护您的相关数据。
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <GlassCard variant="glass" padding="lg" className="text-zinc-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">一、 我们收集的信息</h2>
            <p>
              我们仅在为了优化本站浏览体验和统计访问量时，收集您极小部分的非个人标识数据：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>访问日志</strong>：当您浏览本站时，我们的服务器或托管平台（如 Cloudflare Pages）会自动记录您的 IP 地址、浏览器类型、引用页面、访问时间和操作系统。这些日志仅用于安全审计和性能调优。</li>
              <li><strong>统计与分析数据</strong>：本站集成了 Google Analytics（谷歌分析），它会收集匿名化的浏览轨迹（例如页面访问深度、停留时间、设备类型等），用于评估内容受关注程度。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">二、 Cookie 的使用</h2>
            <p>
              本站使用必要的 Cookie 以及第三方统计 Cookie 来提供基础服务并获取流量趋势。您可以通过调整浏览器的设置，拒绝或删除这些 Cookie，这不会影响您对本站核心内容和工具列表的正常访问。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">三、 信息的使用与披露</h2>
            <p>
              我们承诺绝不将收集到的任何访问数据出售、出租或交易给任何第三方。我们仅在以下情况下使用这些数据：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>改善和优化网站的排版、栏目和加载速度。</li>
              <li>统计分析读者对哪些 AI 工具或 MCP 服务更感兴趣，以便我们能产出更高质量的技术内容。</li>
              <li>根据法律法规或政府强制要求，配合提供必要的数据（如有）。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">四、 数据安全</h2>
            <p>
              我们采用业界标准的传输层安全协议（HTTPS/SSL）对全站进行加密传输，防止您的数据在网络传输中被截获或篡改。我们也将不定期评估托管商的安全机制，确保存储的安全。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">五、 第三方链接说明</h2>
            <p>
              本站包含许多指向第三方 AI 工具官网、开源 GitHub 仓库或外部博客的链接。我们不对这些第三方网站的隐私权政策或内容承担任何责任。建议您在离开本站访问外部网站时，仔细阅读其相应的隐私政策。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">六、 政策更新</h2>
            <p>
              我们保留随时修改本隐私政策的权利。如有重大变更，我们会在本页面更新“最近更新时间”。建议您定期查看本页面以了解最新条款。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">七、 联系我们</h2>
            <p>
              如果您对本隐私政策或您的访问数据有任何疑问、意见或建议，请随时通过邮箱与我们取得联系：
            </p>
            <p className="font-mono text-primary">
              <a href="mailto:hello@aidevhub.net" className="hover:underline">hello@aidevhub.net</a>
            </p>
          </section>

          <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-500 text-right font-mono">
            最近更新时间：2026年5月25日
          </div>

        </GlassCard>
      </div>
    </div>
  )
}
