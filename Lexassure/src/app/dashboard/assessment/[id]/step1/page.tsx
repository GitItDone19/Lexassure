"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowRight, ArrowLeft, Save } from "lucide-react"

export default function Step1Page() {
  const router = useRouter()
  const params = useParams()
  const [formData, setFormData] = useState({
    systemName: "",
    systemDescription: "",
    intendedPurpose: "",
    targetUsers: "",
    deploymentContext: "",
    dataTypes: [] as string[],
    geographicScope: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchAssessment()
  }, [])

  const fetchAssessment = async () => {
    try {
      const res = await fetch(`/api/assessments/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.step1Data) {
          setFormData(data.step1Data)
        }
      }
    } catch (error) {
      console.error("Failed to fetch assessment:", error)
    } finally {
      setLoading(false)
    }
  }

  const saveProgress = async () => {
    setSaving(true)
    try {
      await fetch(`/api/assessments/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step1Data: formData })
      })
    } catch (error) {
      console.error("Failed to save:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleNext = async () => {
    await saveProgress()
    router.push(`/dashboard/assessment/${params.id}/step2`)
  }

  const dataTypeOptions = [
    "Personal Data",
    "Biometric Data",
    "Health Data",
    "Financial Data",
    "Location Data",
    "Behavioral Data",
    "Other Sensitive Data"
  ]

  const toggleDataType = (type: string) => {
    setFormData(prev => ({
      ...prev,
      dataTypes: prev.dataTypes.includes(type)
        ? prev.dataTypes.filter(t => t !== type)
        : [...prev.dataTypes, type]
    }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="bg-[#0D1B2E] border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Step 1: System Information</h1>
              <p className="text-gray-400 mt-1">Provide basic information about your AI system</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">1</div>
                <div className="w-8 h-1 bg-gray-700"></div>
                <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-400 flex items-center justify-center font-semibold">2</div>
                <div className="w-8 h-1 bg-gray-700"></div>
                <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-400 flex items-center justify-center font-semibold">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
          <div className="space-y-6">
            {/* System Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                System Name *
              </label>
              <input
                type="text"
                value={formData.systemName}
                onChange={(e) => setFormData({ ...formData, systemName: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Customer Service Chatbot"
                required
              />
            </div>

            {/* System Description */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                System Description *
              </label>
              <textarea
                value={formData.systemDescription}
                onChange={(e) => setFormData({ ...formData, systemDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe what your AI system does..."
                required
              />
            </div>

            {/* Intended Purpose */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Intended Purpose *
              </label>
              <textarea
                value={formData.intendedPurpose}
                onChange={(e) => setFormData({ ...formData, intendedPurpose: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What is the intended purpose of this system?"
                required
              />
            </div>

            {/* Target Users */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Users *
              </label>
              <input
                type="text"
                value={formData.targetUsers}
                onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., General public, Employees, Healthcare professionals"
                required
              />
            </div>

            {/* Deployment Context */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deployment Context *
              </label>
              <input
                type="text"
                value={formData.deploymentContext}
                onChange={(e) => setFormData({ ...formData, deploymentContext: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Online platform, Mobile app, Physical location"
                required
              />
            </div>

            {/* Data Types */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Types of Data Processed *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dataTypeOptions.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleDataType(type)}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      formData.dataTypes.includes(type)
                        ? "border-blue-500 bg-blue-900/30 text-blue-400"
                        : "border-gray-700 bg-gray-900 text-gray-400 hover:border-gray-600"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Geographic Scope */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Geographic Scope *
              </label>
              <select
                value={formData.geographicScope}
                onChange={(e) => setFormData({ ...formData, geographicScope: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select geographic scope</option>
                <option value="EU">European Union</option>
                <option value="EEA">European Economic Area</option>
                <option value="GLOBAL">Global</option>
                <option value="NATIONAL">National (specific country)</option>
                <option value="REGIONAL">Regional</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={() => router.push("/dashboard/dashboard")}
              className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={saveProgress}
                disabled={saving}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Progress"}
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
              >
                Next Step
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
