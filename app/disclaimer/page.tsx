import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata = {
  title: '免责声明 - AI Dev Hub',
  description: 'AI Dev Hub 免责声明。声明本站内容的客观性质，对第三方服务及工具使用中的风险与法律责任予以明晰。',
}

export default function DisclaimerPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-20 md:py-28" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            免责声明
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            在您浏览或使用 AI Dev Hub 提供的任何内容前，请仔细阅读本免责声明。
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <GlassCard variant="glass" padding="lg" className="text-zinc-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">一、 信息准确性与时效性</h2>
            <p>
              AI Dev Hub 致力于为广大开发者提供及时、客观、准确的 AI 编程工具和自动化工作流资讯。然而，AI 行业技术迭代速度极快，工具功能、定价、授权协议和 MCP 服务规范可能会随时发生变更。
            </p>
            <p>
              本站所载之全部内容（包括评测、打分、配置代码和使用教程）仅供学习与参考，我们不保证所有信息在任何时刻都是最新、完全准确或无误的。用户在做出购买或在生产环境中部署的决策前，应以各工具官方公布的最新数据为准。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">二、 第三方产品与服务免责</h2>
            <p>
              本站介绍并评测的第三方 AI 辅助工具（如 Cursor、Claude Code、GitHub Copilot 等）以及开源的 MCP 插件服务，其所有权、运营权及技术支持均归对应的第三方所有。
            </p>
            <p>
              您点击本站外链跳转到第三方网站进行下载、注册、付费或使用，均属于您与该第三方之间的直接契约关系。本站不对第三方软件的安全漏洞、停机损失、计费争议或商业纠纷承担任何直接、间接或连带责任。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">三、 AI 代码生成与工作流应用风险</h2>
            <p>
              AI 编程工具或 Agent 生成的代码和自动化脚本可能包含潜在的逻辑漏洞、安全缺陷或侵犯第三方开源协议的风险。
            </p>
            <p>
              本站提供的任何 MCP Server 部署教程、大模型接入配置及工作流方案，均以“现状（As-Is）”提供。用户在将其应用至实际开发或生产系统前，**有义务进行严格的代码审查、合规性评估与隔离测试**。本站对因直接采纳或使用本站分享的代码或工作流而导致的系统崩溃、数据丢失、代码泄露或侵权纠纷不承担任何赔偿责任。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">四、 知识产权与工具版权声明</h2>
            <p>
              AI Dev Hub 尊重并保护每一位开发者的知识产权。本站所收录工具的 LOGO、原图、产品描述及商标均属于其对应的版权所有者。
            </p>
            <p>
              本站收录这些产品纯粹是出于技术分享和开发者交流之目的。如果您是某款工具的版权所有人，且认为本站的收录、评测或展示图片侵犯了您的合法权益，请立即通过邮箱 <a href="mailto:hello@aidevhub.net" className="text-primary hover:underline">hello@aidevhub.net</a> 与我们取得联系，我们将在核实后第一时间进行修改或下架处理。
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">五、 不可抗力免责</h2>
            <p>
              因网络服务商维护、电信部门技术调整、不可抗力事件（如自然灾害、黑客攻击、政府管制等）导致本站出现临时访问中断、数据延迟或丢失的，本站对此予以免责，但将全力配合在第一时间恢复正常运营。
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
