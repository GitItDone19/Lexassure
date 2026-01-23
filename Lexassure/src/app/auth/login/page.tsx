"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Mail, Lock, ArrowRight, AlertCircle } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard/dashboard")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#F7F7F7] tracking-tight">
          Welcome back
        </h1>
        <p className="mt-3 text-[#A1A1A1]">
          Sign in to your account to continue
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#F7F7F7] mb-2">
            Email address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-[#666666]" />
            </div>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              placeholder="you@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent border border-[#252525] rounded-xl text-[#F7F7F7] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#28a2fc] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Password field */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#F7F7F7]">
              Password
            </label>
            <Link href="#" className="text-sm font-medium text-[#28a2fc] hover:text-[#5BB8FC] transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#666666]" />
            </div>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent border border-[#252525] rounded-xl text-[#F7F7F7] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#28a2fc] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 text-base font-semibold text-[#0F0F0F] bg-[#28a2fc] rounded-xl hover:bg-[#5BB8FC] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01]"
        >
          {loading ? (
            <span>Signing in...</span>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="relative my-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[#252525]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-[#0F0F0F] text-[#666666]">Or continue with</span>
        </div>
      </div>

      {/* Social logins */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3.5 px-4 border border-[#252525] rounded-xl text-sm font-medium text-[#A1A1A1] hover:bg-[#1A1A1A] hover:border-[#333] transition-all"
        >
          <span>Google</span>
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 py-3.5 px-4 border border-[#252525] rounded-xl text-sm font-medium text-[#A1A1A1] hover:bg-[#1A1A1A] hover:border-[#333] transition-all"
        >
          <span>GitHub</span>
        </button>
      </div>

      {/* Sign up link */}
      <p className="mt-10 text-center text-sm text-[#A1A1A1]">
        Don't have an account?{" "}
        <Link href="/auth/register" className="font-semibold text-[#28a2fc] hover:text-[#5BB8FC] transition-colors">
          Create an account
        </Link>
      </p>
    </div>
  )
}
