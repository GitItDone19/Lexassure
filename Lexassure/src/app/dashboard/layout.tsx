"use client"

import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import Logo from "@/components/shared/logo"
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X } from "lucide-react"
import { useState } from "react"
import { signOut } from "next-auth/react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard/dashboard", icon: LayoutDashboard },
    { name: "Assessments", href: "/dashboard/assessments", icon: FileText },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ]

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0D1B2E] border-b border-gray-800">
        <div className="px-6 lg:px-12">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/dashboard/dashboard" className="flex items-center">
              <Logo size="md" variant="dark" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname?.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>

            {/* User Menu */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-[#0D1B2E]">
            <div className="px-6 py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname?.startsWith(item.href)
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                )
              })}
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        {children}
      </div>
    </div>
  )
}
