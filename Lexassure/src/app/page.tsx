import Link from "next/link"
import Logo from "@/components/shared/logo"
import { Shield, FileText, CheckCircle2, TrendingUp, ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="ambient-blob" style={{ top: '-200px', right: '-150px' }} />
        <div className="ambient-blob-sm animate-float" style={{ bottom: '20%', left: '-100px' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Logo size="lg" variant="dark" />
            </Link>
            <div className="flex items-center gap-6">
              <Link
                href="/auth/login"
                className="text-sm font-medium text-[#A1A1A1] hover:text-[#F7F7F7] transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="px-5 py-2.5 text-sm font-medium text-[#28a2fc] border border-[#28a2fc] rounded-lg hover:bg-[#28a2fc] hover:text-[#0F0F0F] transition-all duration-300"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Asymmetric Layout */}
      <section className="pt-36 pb-32 sm:pt-44 sm:pb-40 relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="max-w-3xl">
            {/* Badge - casual, text-only feel */}
            <div className="mb-10 inline-flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#28a2fc] animate-pulse" />
              <span className="text-sm text-[#A1A1A1] tracking-wide">EU AI Act Compliant</span>
            </div>

            {/* Headline - Mixed weights, serif + sans */}
            <h1 className="text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.05]">
              <span className="font-serif font-normal text-[#A1A1A1]">AI Compliance</span>
              <br />
              <span className="font-bold text-[#F7F7F7]">Made Clear</span>
            </h1>

            <p className="mt-10 text-lg sm:text-xl leading-relaxed text-[#A1A1A1] max-w-xl">
              Navigate the EU AI Act with confidence. Comprehensive compliance
              management, risk assessment, and documentation tools for AI systems.
            </p>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-start gap-4">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-[#0F0F0F] bg-[#28a2fc] rounded-xl hover:bg-[#5BB8FC] transition-all duration-300 hover:scale-[1.02]"
              >
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center gap-3 px-8 py-4 text-base font-medium text-[#A1A1A1] hover:text-[#F7F7F7] transition-colors duration-300"
              >
                Sign In
              </Link>
            </div>

            {/* Trust indicators - casual, text-only */}
            <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#666666]">
              <span>No credit card required</span>
              <span className="hidden sm:inline text-[#333]">•</span>
              <span>14-day free trial</span>
              <span className="hidden sm:inline text-[#333]">•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>

        {/* Ambient blob for hero - right side */}
        <div
          className="absolute top-32 right-0 w-[500px] h-[500px] bg-[#28a2fc] opacity-[0.08] blur-[150px] rounded-full pointer-events-none"
          style={{ transform: 'translateX(30%)' }}
        />
      </section>

      {/* Features Section - Asymmetric 2x2 Grid */}
      <section className="py-28 sm:py-36 relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          {/* Section header - left aligned */}
          <div className="max-w-2xl mb-20">
            <p className="text-sm font-medium uppercase tracking-widest text-[#28a2fc] mb-4">
              Features
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F7F7] leading-tight">
              Everything you need for <br className="hidden sm:block" />EU AI Act compliance
            </h2>
          </div>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="glass-card p-8 lg:p-10 group">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#252525] transition-colors duration-300">
                  <Shield className="w-5 h-5 text-[#A1A1A1] group-hover:text-[#28a2fc] transition-colors duration-300" />
                </div>
                <span className="card-number">01</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F7F7F7] mb-4">
                Risk Assessment
              </h3>
              <p className="text-[#A1A1A1] leading-relaxed">
                Automated risk classification and assessment aligned with EU AI Act requirements.
                Identify potential issues before they become problems.
              </p>
            </div>

            {/* Feature 2 - offset positioning */}
            <div className="glass-card p-8 lg:p-10 group md:mt-12">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#252525] transition-colors duration-300">
                  <FileText className="w-5 h-5 text-[#A1A1A1] group-hover:text-[#28a2fc] transition-colors duration-300" />
                </div>
                <span className="card-number">02</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F7F7F7] mb-4">
                Documentation
              </h3>
              <p className="text-[#A1A1A1] leading-relaxed">
                Generate and manage technical documentation for compliance verification.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-card p-8 lg:p-10 group">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#252525] transition-colors duration-300">
                  <CheckCircle2 className="w-5 h-5 text-[#A1A1A1] group-hover:text-[#28a2fc] transition-colors duration-300" />
                </div>
                <span className="card-number">03</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F7F7F7] mb-4">
                Compliance Tracking
              </h3>
              <p className="text-[#A1A1A1] leading-relaxed">
                Monitor compliance status and receive alerts for regulatory updates.
                Stay ahead of changing requirements with real-time monitoring.
              </p>
            </div>

            {/* Feature 4 - offset positioning */}
            <div className="glass-card p-8 lg:p-10 group md:mt-12">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center group-hover:bg-[#252525] transition-colors duration-300">
                  <TrendingUp className="w-5 h-5 text-[#A1A1A1] group-hover:text-[#28a2fc] transition-colors duration-300" />
                </div>
                <span className="card-number">04</span>
              </div>
              <h3 className="text-xl font-semibold text-[#F7F7F7] mb-4">
                Analytics
              </h3>
              <p className="text-[#A1A1A1] leading-relaxed">
                Insights and reports to demonstrate compliance to stakeholders.
              </p>
            </div>
          </div>
        </div>

        {/* Subtle ambient element */}
        <div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#28a2fc] opacity-[0.05] blur-[120px] rounded-full pointer-events-none"
          style={{ transform: 'translate(-50%, 30%)' }}
        />
      </section>

      {/* Stats Section - 3 stats, offset layout */}
      <section className="py-24 relative">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-16">
            {/* Stats - left side */}
            <div className="flex flex-wrap gap-x-16 gap-y-10 lg:gap-x-20">
              <div>
                <div className="font-serif text-5xl sm:text-6xl font-medium text-[#F7F7F7]">99.9%</div>
                <div className="mt-3 text-sm text-[#666666] tracking-wide">Uptime Guarantee</div>
              </div>
              <div>
                <div className="font-serif text-5xl sm:text-6xl font-medium text-[#F7F7F7]">500+</div>
                <div className="mt-3 text-sm text-[#666666] tracking-wide">Companies Trust Us</div>
              </div>
              <div>
                <div className="font-serif text-5xl sm:text-6xl font-medium text-[#F7F7F7]">24/7</div>
                <div className="mt-3 text-sm text-[#666666] tracking-wide">Expert Support</div>
              </div>
            </div>

            {/* Decorative element - right side */}
            <div className="hidden lg:block relative">
              <div className="w-48 h-48 rounded-full border border-[#252525] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-[#333] flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-[#28a2fc] animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thin decorative line */}
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 mt-24">
          <div className="h-px bg-gradient-to-r from-transparent via-[#252525] to-transparent" />
        </div>
      </section>

      {/* CTA Section - NO GRADIENTS, solid surface with blur */}
      <section className="py-28 sm:py-36 relative overflow-hidden">
        {/* Corner blur blobs */}
        <div
          className="absolute top-0 left-0 w-[300px] h-[300px] bg-[#28a2fc] opacity-[0.08] blur-[100px] rounded-full pointer-events-none"
          style={{ transform: 'translate(-50%, -50%)' }}
        />
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#28a2fc] opacity-[0.06] blur-[120px] rounded-full pointer-events-none"
          style={{ transform: 'translate(40%, 40%)' }}
        />

        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 relative z-10">
          <div className="glass-card p-10 sm:p-16 lg:p-20">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12">
              {/* Text content - left */}
              <div className="max-w-xl">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#F7F7F7] leading-tight">
                  Ready to ensure <br className="hidden sm:block" />compliance?
                </h2>
                <p className="mt-6 text-lg text-[#A1A1A1] leading-relaxed">
                  Start your journey to EU AI Act compliance today.
                  No credit card required.
                </p>
              </div>

              {/* CTA buttons - right */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/register"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-semibold text-[#0F0F0F] bg-[#28a2fc] rounded-xl hover:bg-[#5BB8FC] transition-all duration-300 hover:scale-[1.02]"
                >
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-[#28a2fc] border border-[#28a2fc]/30 rounded-xl hover:border-[#28a2fc] transition-all duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0A0A0A] py-16 border-t border-[#1A1A1A]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <Link href="/" className="flex items-center">
              <Logo size="md" variant="dark" />
            </Link>
            <div className="flex flex-wrap items-center gap-8">
              <Link href="#" className="text-sm text-[#666666] hover:text-[#A1A1A1] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-[#666666] hover:text-[#A1A1A1] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-[#666666] hover:text-[#A1A1A1] transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-[#1A1A1A]">
            <p className="text-sm text-[#666666]">
              © 2024 Lexassure. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
