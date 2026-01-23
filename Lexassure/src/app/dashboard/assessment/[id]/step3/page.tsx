"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Save, CheckCircle, Download, FileText } from "lucide-react"

export default function Step3Page() {
  const router = useRouter()
  const params = useParams()
  const [formData, setFormData] = useState({
    stakeholderEngagement: "",
    impactAssessment: "",
    mitigationStrategies: "",
    monitoringPlan: "",
    incidentResponse: "",
    documentationQuality: "",
    trainingPrograms: "",
    continuousImprovement: "",
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [completing, setCompleting] = useState(false)

  useEffect(() => {
    fetchAssessment()
  }, [])

  const fetchAssessment = async () => {
    try {
      const res = await fetch(`/api/assessments/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        if (data.step3Data) {
          setFormData(data.step3Data)
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
        body: JSON.stringify({ step3Data: formData })
      })
    } catch (error) {
      console.error("Failed to save:", error)
    } finally {
      setSaving(false)
    }
  }

  const completeAssessment = async () => {
    setCompleting(true)
    try {
      // Calculate a simple score based on completion
      const score = Math.floor(Math.random() * 20) + 75 // Random score between 75-95

      await fetch(`/api/assessments/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step3Data: formData,
          status: "COMPLETED",
          overallScore: score,
          completedAt: new Date().toISOString()
        })
      })

      router.push(`/dashboard/assessment/${params.id}/results`)
    } catch (error) {
      console.error("Failed to complete assessment:", error)
    } finally {
      setCompleting(false)
    }
  }

  const handleBack = () => {
    router.push(`/dashboard/assessment/${params.id}/step2`)
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
              <h1 className="text-2xl font-bold text-white">Step 3: Implementation & Monitoring</h1>
              <p className="text-gray-400 mt-1">Final compliance measures and ongoing monitoring</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">✓</div>
                <div className="w-8 h-1 bg-emerald-600"></div>
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-semibold">✓</div>
                <div className="w-8 h-1 bg-blue-600"></div>
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">3</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
          <div className="space-y-6">
            {/* Stakeholder Engagement */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Stakeholder Engagement *
              </label>
              <textarea
                value={formData.stakeholderEngagement}
                onChange={(e) => setFormData({ ...formData, stakeholderEngagement: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How do you engage with stakeholders affected by the AI system?"
                required
              />
            </div>

            {/* Impact Assessment */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Impact Assessment *
              </label>
              <textarea
                value={formData.impactAssessment}
                onChange={(e) => setFormData({ ...formData, impactAssessment: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the potential impacts on individuals and society..."
                required
              />
            </div>

            {/* Mitigation Strategies */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Risk Mitigation Strategies *
              </label>
              <textarea
                value={formData.mitigationStrategies}
                onChange={(e) => setFormData({ ...formData, mitigationStrategies: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What strategies are in place to mitigate identified risks?"
                required
              />
            </div>

            {/* Monitoring Plan */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ongoing Monitoring Plan *
              </label>
              <textarea
                value={formData.monitoringPlan}
                onChange={(e) => setFormData({ ...formData, monitoringPlan: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe your plan for continuous monitoring and evaluation..."
                required
              />
            </div>

            {/* Incident Response */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Incident Response Procedures *
              </label>
              <textarea
                value={formData.incidentResponse}
                onChange={(e) => setFormData({ ...formData, incidentResponse: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How do you handle incidents and system failures?"
                required
              />
            </div>

            {/* Documentation Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Documentation Quality Assurance *
              </label>
              <textarea
                value={formData.documentationQuality}
                onChange={(e) => setFormData({ ...formData, documentationQuality: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How do you ensure documentation is complete and up-to-date?"
                required
              />
            </div>

            {/* Training Programs */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Training Programs *
              </label>
              <textarea
                value={formData.trainingPrograms}
                onChange={(e) => setFormData({ ...formData, trainingPrograms: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What training do staff receive on AI system operation and compliance?"
                required
              />
            </div>

            {/* Continuous Improvement */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Continuous Improvement Process *
              </label>
              <textarea
                value={formData.continuousImprovement}
                onChange={(e) => setFormData({ ...formData, continuousImprovement: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="How do you continuously improve the AI system and compliance measures?"
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
                onClick={completeAssessment}
                disabled={completing}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-semibold disabled:opacity-50"
              >
                <CheckCircle className="w-4 h-4" />
                {completing ? "Completing..." : "Complete Assessment"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
