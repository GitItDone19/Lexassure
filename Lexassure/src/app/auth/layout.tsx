import Link from "next/link"
import Logo from "@/components/shared/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-[#0F0F0F] relative overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="ambient-blob" style={{ top: '10%', left: '-100px' }} />
        <div className="ambient-blob-sm" style={{ bottom: '20%', right: '-80px' }} />
      </div>

      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="flex flex-col justify-between w-full p-12 relative z-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Logo size="lg" variant="dark" />
          </Link>

          {/* Quote/Message */}
          <div className="max-w-md">
            <blockquote className="font-serif text-3xl font-normal text-[#F7F7F7] leading-relaxed tracking-tight">
              "AI compliance shouldn't be complex. Lexassure makes it simple, transparent, and achievable."
            </blockquote>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#28a2fc]/20 to-[#28a2fc]/5 border border-[#28a2fc]/20 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-[#28a2fc]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F7F7F7]">Dr. Sarah Chen</p>
                <p className="text-sm text-[#666666]">Chief AI Ethics Officer</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-sm text-[#666666]">
            © 2024 Lexassure. All rights reserved.
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Mobile header */}
        <div className="lg:hidden p-6 border-b border-[#252525]">
          <Link href="/" className="flex items-center">
            <Logo size="md" variant="dark" />
          </Link>
        </div>

        {/* Form container */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
