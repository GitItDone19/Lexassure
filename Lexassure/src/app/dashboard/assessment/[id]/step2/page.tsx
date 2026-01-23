"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowRight, ArrowLeft, Save, AlertTriangle } from "lucide-react"

export default function Step2Page() {
  const router = useRouter()
  const params = useParams()
  const [formData, setFormData] = useState({
    riskCategory: "",
    humanOversight: "",
    transparencyMeasures: "",
    dataGovernance: "",
    accuracyRequirements: "",
    cybersecurityMeasures: "",
    recordKeeping: "",
    conformityAssessment: "",
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
        if (data.step2Data) {
          setFormData(data.step2Data)
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
        body: JSON.stringify({ step2Data: formData })
      })
    } catch (error) {
      console.error("Failed to save:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleNext = async () => {
    await saveProgress()
    router.push(`/dashboard/assessment/${params.id}/step3`)
  }

  const handleBack = () => {
    router.push(`/dashboard/assessment/${params.id}/step1`)
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
              <h1 className="text-2xl font-bold text-white">Step 2: Risk Assessment</h1>
              <p className="text-gray-400 mt-1">Evaluate risks and compliance requirements</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">✓</div>
                <div className="w-8 h-1 bg-blue-600"></div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">2</div>
                <div className="w-8 h-1 bg-gray-700"></div>
                <div className="w-8 h-8 rounded-full bg-gray-700 text-gray-400 flex items-center justify-center font-semibold">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
          {/* Risk Warning */}
          <div className="mb-8 p-4 bg-amber-900/20 border border-amber-700 rounded-lg flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-amber-400 font-medium">Important</p>
              <p className="text-amber-300/80 text-sm mt-1">
                Accurate risk assessment is crucial for EU AI Act compliance. Please provide detailed information.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Risk Category */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Risk Category *
              </label>
              <select
                value={formData.riskCategory}
                onChange={(e) => setFormData({ ...formData, riskCategory: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select risk category</option>
                <option value="UNACCEPTABLE">Unacceptable Risk</option>
                <option value="HIGH">High Risk</option>
                <option value="LIMITED">Limited Risk</option>
                <option value="MINIMAL">Minimal Risk</option>
              </select>
              <p className="text-sm text-gray-500 mt-2">
                High-risk systems require stricter compliance measures
              </p>
            </div>

            {/* Human Oversight */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Human Oversight Measures *
              </label>
              <textarea
                value={formData.humanOversight}
                onChange={(e) => setFormData({ ...formData, humanOversight: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe how humans oversee the AI system's decisions and operations..."
                required
              />
            </div>

            {/* Transparency Measures */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Transparency Measures *
              </label>
              <textarea
                value={formData.transparencyMeasures}
                onChange={(e) => setFormData({ ...formData, transparencyMeasures: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How do you ensure transparency in AI operations and decision-making?"
                required
              />
            </div>

            {/* Data Governance */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Data Governance Practices *
              </label>
              <textarea
                value={formData.dataGovernance}
                onChange={(e) => setFormData({ ...formData, dataGovernance: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your data quality, relevance, and bias mitigation practices..."
                required
              />
            </div>

            {/* Accuracy Requirements */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Accuracy Requirements *
              </label>
              <textarea
                value={formData.accuracyRequirements}
                onChange={(e) => setFormData({ ...formData, accuracyRequirements: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What accuracy levels are required and how do you measure them?"
                required
              />
            </div>

            {/* Cybersecurity Measures */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Cybersecurity Measures *
              </label>
              <textarea
                value={formData.cybersecurityMeasures}
                onChange={(e) => setFormData({ ...formData, cybersecurityMeasures: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe security measures to protect against attacks and unauthorized access..."
                required
              />
            </div>

            {/* Record Keeping */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Record Keeping Procedures *
              </label>
              <textarea
                value={formData.recordKeeping}
                onChange={(e) => setFormData({ ...formData, recordKeeping: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How do you maintain logs and records of AI system operations?"
                required
              />
            </div>

            {/* Conformity Assessment */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Conformity Assessment Approach *
              </label>
              <textarea
                value={formData.conformityAssessment}
                onChange={(e) => setFormData({ ...formData, conformityAssessment: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your approach to conformity assessment and certification..."
                required
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-700">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous Step
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
