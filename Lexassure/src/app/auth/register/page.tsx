"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { User, Mail, Lock, ArrowRight, AlertCircle, CheckCircle2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
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
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        router.push("/auth/login")
      } else {
        setError(data.error || "Registration failed")
      }
    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" }
    if (password.length < 6) return { strength: 1, label: "Weak", color: "bg-red-400" }
    if (password.length < 10) return { strength: 2, label: "Medium", color: "bg-amber-400" }
    return { strength: 3, label: "Strong", color: "bg-[#28a2fc]" }
  }

  const passwordStrength = getPasswordStrength(formData.password)

  return (
    <div>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#F7F7F7] tracking-tight">
          Create your account
        </h1>
        <p className="mt-3 text-[#A1A1A1]">
          Start your 14-day free trial today
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#F7F7F7] mb-2">
            Full name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-[#666666]" />
            </div>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent border border-[#252525] rounded-xl text-[#F7F7F7] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#28a2fc] focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Email field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#F7F7F7] mb-2">
            Work email
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
          <label htmlFor="password" className="block text-sm font-medium text-[#F7F7F7] mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-[#666666]" />
            </div>
            <input
              id="password"
              type="password"
              required
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full pl-12 pr-4 py-3.5 bg-transparent border border-[#252525] rounded-xl text-[#F7F7F7] placeholder-[#666666] focus:outline-none focus:ring-2 focus:ring-[#28a2fc] focus:border-transparent transition-all"
            />
          </div>

          {/* Password strength indicator */}
          {formData.password.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex gap-1">
                  <div className={`h-1.5 flex-1 rounded-full ${passwordStrength.strength >= 1 ? passwordStrength.color : 'bg-[#252525]'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${passwordStrength.strength >= 2 ? passwordStrength.color : 'bg-[#252525]'}`}></div>
                  <div className={`h-1.5 flex-1 rounded-full ${passwordStrength.strength >= 3 ? passwordStrength.color : 'bg-[#252525]'}`}></div>
                </div>
                <span className="text-xs font-medium text-[#A1A1A1]">
                  {passwordStrength.label}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
            <span className="text-sm text-red-400">{error}</span>
          </div>
        )}

        {/* Terms checkbox */}
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 h-4 w-4 rounded border-[#252525] bg-transparent text-[#28a2fc] focus:ring-[#28a2fc] focus:ring-offset-0"
          />
          <label htmlFor="terms" className="text-sm text-[#A1A1A1]">
            I agree to the{" "}
            <Link href="#" className="text-[#28a2fc] hover:text-[#5BB8FC] font-medium">Terms of Service</Link>
            {" "}and{" "}
            <Link href="#" className="text-[#28a2fc] hover:text-[#5BB8FC] font-medium">Privacy Policy</Link>
          </label>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-4 px-6 text-base font-semibold text-[#0F0F0F] bg-[#28a2fc] rounded-xl hover:bg-[#5BB8FC] disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-[1.01]"
        >
          {loading ? (
            <span>Creating account...</span>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Benefits */}
      <div className="mt-10 p-5 bg-[#1A1A1A]/50 rounded-xl border border-[#252525]">
        <p className="text-sm font-medium text-[#F7F7F7] mb-3">What's included:</p>
        <ul className="space-y-2">
          <li className="flex items-center gap-2 text-sm text-[#A1A1A1]">
            <CheckCircle2 className="w-4 h-4 text-[#28a2fc]" />
            Full access to all features
          </li>
          <li className="flex items-center gap-2 text-sm text-[#A1A1A1]">
            <CheckCircle2 className="w-4 h-4 text-[#28a2fc]" />
            Unlimited AI system assessments
          </li>
          <li className="flex items-center gap-2 text-sm text-[#A1A1A1]">
            <CheckCircle2 className="w-4 h-4 text-[#28a2fc]" />
            Priority email support
          </li>
        </ul>
      </div>

      {/* Sign in link */}
      <p className="mt-8 text-center text-sm text-[#A1A1A1]">
        Already have an account?{" "}
        <Link href="/auth/login" className="font-semibold text-[#28a2fc] hover:text-[#5BB8FC] transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  )
}
