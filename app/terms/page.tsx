import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata = {
  title: '服务条款 - AI Dev Hub',
  description: 'AI Dev Hub 服务条款。阅读并了解在您使用我们网站服务时所适用的各项条款与行为规范。',
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-20 md:py-28" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            服务条款
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            欢迎访问 AI Dev Hub。当您使用本站服务时，即代表您同意并接受以下服务条款。
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <GlassCard variant="glass" padding="lg" className="text-zinc-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">一、 条款的接受</h2>
            <p>
              本服务条款（以下简称“条款”）是您（以下称“用户”或“您”）与 AI Dev Hub 之间关于您浏览、使用本站内容所订立的协议。如果您不同意本条款的任何内容，请立即停止使用并离开本站。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">二、 服务内容与使用许可</h2>
            <p>
              AI Dev Hub 为用户提供 AI 编程工具导航、MCP（Model Context Protocol）生态教程、大模型工作流分享、原创评测文章等信息服务。
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>本站所有由编辑团队创作的原创文字内容、特制图表、架构设计图等，其版权均归 AI Dev Hub 所有。</li>
              <li>在保留原作者署名及本站原文链接的前提下，您可以出于非商业目的转载本站内容。任何商业性质的转载或使用必须事先获得我们的书面授权（联系邮箱：<a href="mailto:business@aidevhub.net" className="text-primary hover:underline">business@aidevhub.net</a>）。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">三、 知识产权保护</h2>
            <p>
              本站收录并展示的第三方 AI 编程软件、开源 MCP 服务等产品，其商标、版权及相应的所有权均归属于其原开发者或对应的公司所有。我们对其的收录与客观展示并不代表我们拥有其任何知识产权。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">四、 用户行为规范</h2>
            <p>
              在浏览和使用本站时，您同意不从事以下行为：
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>使用任何自动程序、脚本或爬虫工具，对本站的内容进行恶意抓取、压测或实施分布式拒绝服务（DDoS）攻击。</li>
              <li>利用本站提供的留言、联系通道发送任何垃圾邮件、商业广告或带有恶意病毒的链接。</li>
              <li>伪造或假冒本站官方人员发布不实信息。</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">五、 服务的变更与终止</h2>
            <p>
              我们致力于保障网站的稳定运行，但我们保留在无需提前通知的情况下，随时修改、暂停或永久终止本站部分或全部服务的权利。我们不对由此给用户带来的任何不便或损失承担责任。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">六、 条款的修改</h2>
            <p>
              我们可能会根据政策法规或网站功能的调整，不定期更新本服务条款。更新后的条款一旦在本页面公布即行生效。您在条款更新后继续使用本站，即代表您完全接受修改后的条款。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">七、 法律管辖与解决方式</h2>
            <p>
              本条款的解释、执行及争议解决均适用中华人民共和国法律。因使用本站服务产生的任何争议，双方应本着友好协商的原则解决；协商不成的，应提交至本站管理员所在地有管辖权的人民法院诉讼解决。
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
