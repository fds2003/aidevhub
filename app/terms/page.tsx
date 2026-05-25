import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata = {
  title: 'Terms of Service - AI Dev Hub',
  description: 'AI Dev Hub Terms of Service. Understand the rules, codes of conduct, and legal terms applicable to your use of our services.',
}

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-20 md:py-28" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-mono">
            Terms of Service
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Welcome to AI Dev Hub. By accessing or using our services, you agree to comply with the following Terms of Service.
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <GlassCard variant="glass" padding="lg" className="text-zinc-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Acceptance of Terms</h2>
            <p>
              These Terms of Service (&quot;Terms&quot;) constitute a legal agreement between you (&quot;User&quot; or &quot;you&quot;) and AI Dev Hub regarding your browsing and usage of our website. If you do not agree to any part of these terms, please stop using and leave this site immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Services and License</h2>
            <p>
              AI Dev Hub provides information services, including AI programming tool listings, Model Context Protocol (MCP) server tutorials, workflows, and original reviews.
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All original articles, customized architectural diagrams, and ratings created by our editorial team are protected by copyright owned by AI Dev Hub.</li>
              <li>You may reprint our content for non-commercial purposes, provided you credit AI Dev Hub and link back to the original article. Any commercial use or reproduction requires prior written consent (contact: <a href="mailto:business@aidevhub.net" className="text-primary hover:underline">business@aidevhub.net</a>).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Intellectual Property Rights</h2>
            <p>
              The third-party AI coding applications, open-source MCP repositories, and tools featured on this website belong to their respective developers or companies. Our aggregation and objective reviews of these products do not constitute ownership of their intellectual property.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. User Conduct</h2>
            <p>
              By accessing our website, you agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deploy automated scripts, scrapers, or bot tools to harvest content, perform load tests, or execute Distributed Denial of Service (DDoS) attacks.</li>
              <li>Use contact forms or email channels to send spam, advertisements, or malicious links containing viruses.</li>
              <li>Impersonate AI Dev Hub staff or post false information representing the platform.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Changes and Termination</h2>
            <p>
              We strive to keep the platform online, but we reserve the right to modify, suspend, or terminate parts or all of the services without prior notice. We shall not be liable to you or any third party for any inconvenience or losses caused.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Modification of Terms</h2>
            <p>
              We reserve the right to update these Terms at any time to reflect policy shifts or feature additions. Updated Terms will be effective immediately upon publication on this page. Your continued use of the site signifies your acceptance of the updated Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the People&apos;s Republic of China. Any disputes arising from or in connection with the use of our services shall be resolved through friendly negotiations, failing which the disputes shall be submitted to the court of competent jurisdiction in the location of the administrator of AI Dev Hub.
            </p>
          </section>

          <div className="pt-6 border-t border-zinc-800 text-xs text-zinc-500 text-right font-mono">
            Last Updated: May 25, 2026
          </div>

        </GlassCard>
      </div>
    </div>
  )
}
