import { GradientSection } from '@/components/ui/gradient-section'
import { GlassCard } from '@/components/ui/glass-card'

export const metadata = {
  title: 'Privacy Policy',
  description: 'AI Dev Hub Privacy Policy. We respect your privacy and are committed to explaining how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Hero Section */}
      <GradientSection className="py-20 md:py-28" variant="gradient">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6 font-mono">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            AI Dev Hub highly values your privacy. This policy outlines how we handle and safeguard your data when you visit our website.
          </p>
        </div>
      </GradientSection>

      <div className="container max-w-4xl mx-auto px-4 py-12">
        <GlassCard variant="glass" padding="lg" className="text-zinc-300 space-y-8 leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">1. Information We Collect</h2>
            <p>
              We collect minimal, non-personally identifiable data to optimize your browsing experience and monitor site traffic:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access Logs</strong>: When you visit our website, our servers or hosting platform (such as Cloudflare Pages) automatically record information like your IP address, browser type, referring pages, access time, and operating system. These logs are used solely for security audits and performance tuning.</li>
              <li><strong>Analytics Data</strong>: We integrate Google Analytics, which collects anonymous browsing paths (e.g., page depth, session duration, device type) to help us evaluate the relevance and reach of our content.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">2. Use of Cookies</h2>
            <p>
              We use essential and third-party analytics cookies to provide core site features and analyze traffic trends. You can disable or delete cookies via your browser settings without affecting your access to our main content and tools navigation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">3. Use and Disclosure of Information</h2>
            <p>
              We promise never to sell, rent, or trade your access data to third parties. We use the collected data only to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Improve site layout, column structure, and page loading speeds.</li>
              <li>Analyze reader preferences to produce higher-quality articles on AI tools and workflows.</li>
              <li>Comply with necessary legal obligations or government requests (if applicable).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">4. Data Security</h2>
            <p>
              We implement industry-standard Transport Layer Security (HTTPS/SSL) to encrypt all data in transit, preventing interception or alteration. We also review our hosting provider’s security practices periodically to ensure data integrity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">5. Third-Party Links</h2>
            <p>
              Our website contains links to third-party tool websites, open-source GitHub repositories, or external blogs. We are not responsible for the privacy practices or content of these external sites. We encourage you to read their privacy policies upon leaving our site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">6. Policy Changes</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. When updates occur, we will revise the &quot;Last Updated&quot; date below. We recommend reviewing this page periodically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-white">7. Contact Us</h2>
            <p>
              If you have any questions or feedback regarding this Privacy Policy or your data, please contact us at:
            </p>
            <p className="font-mono text-primary">
              <a href="mailto:hello@aidevhub.net" className="hover:underline">hello@aidevhub.net</a>
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
