"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Download, CheckCircle, AlertTriangle, FileText, ArrowLeft, Share2 } from "lucide-react"

interface Assessment {
  id: string
  status: string
  overallScore: number
  step1Data: any
  step2Data: any
  step3Data: any
  createdAt: string
  completedAt: string
}

export default function ResultsPage() {
  const router = useRouter()
  const params = useParams()
  const [assessment, setAssessment] = useState<Assessment | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssessment()
  }, [])

  const fetchAssessment = async () => {
    try {
      const res = await fetch(`/api/assessments/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setAssessment(data)
      }
    } catch (error) {
      console.error("Failed to fetch assessment:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-white">Loading results...</div>
      </div>
    )
  }

  if (!assessment) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="text-white">Assessment not found</div>
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400"
    if (score >= 75) return "text-blue-400"
    if (score >= 60) return "text-amber-400"
    return "text-red-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 90) return "Excellent Compliance"
    if (score >= 75) return "Good Compliance"
    if (score >= 60) return "Moderate Compliance"
    return "Needs Improvement"
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="bg-[#0D1B2E] border-b border-gray-800">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Assessment Results</h1>
              <p className="text-gray-400 mt-1">Completed on {new Date(assessment.completedAt).toLocaleDateString()}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all">
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        {/* Overall Score Card */}
        <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 border border-blue-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-2">Overall Compliance Score</p>
              <div className="flex items-baseline gap-4">
                <span className={`text-6xl font-bold ${getScoreColor(assessment.overallScore)}`}>
                  {assessment.overallScore}%
                </span>
                <span className="text-2xl text-gray-400">{getScoreLabel(assessment.overallScore)}</span>
              </div>
            </div>
            <div className="w-32 h-32 rounded-full border-8 border-blue-500 flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-blue-400" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* System Information Summary */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">System Info</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">System Name</p>
                <p className="text-white font-medium">{assessment.step1Data?.systemName || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Geographic Scope</p>
                <p className="text-white font-medium">{assessment.step1Data?.geographicScope || "N/A"}</p>
              </div>
            </div>
          </div>

          {/* Risk Assessment Summary */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-amber-900/50 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Risk Level</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">Risk Category</p>
                <p className="text-white font-medium">{assessment.step2Data?.riskCategory || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Compliance Status</p>
                <p className="text-emerald-400 font-medium">Active</p>
              </div>
            </div>
          </div>

          {/* Completion Summary */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white">Completion</h3>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-400">All Steps</p>
                <p className="text-white font-medium">3/3 Completed</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Time Taken</p>
                <p className="text-white font-medium">
                  {Math.floor((new Date(assessment.completedAt).getTime() - new Date(assessment.createdAt).getTime()) / (1000 * 60))} minutes
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Findings */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Key Findings</h2>
          
          <div className="space-y-6">
            {/* Strengths */}
            <div>
              <h3 className="text-lg font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Strengths
              </h3>
              <ul className="space-y-2 ml-7">
                <li className="text-gray-300">✓ Comprehensive human oversight measures in place</li>
                <li className="text-gray-300">✓ Strong data governance practices</li>
                <li className="text-gray-300">✓ Well-documented transparency measures</li>
                <li className="text-gray-300">✓ Robust cybersecurity protocols</li>
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div>
              <h3 className="text-lg font-semibold text-amber-400 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Areas for Improvement
              </h3>
              <ul className="space-y-2 ml-7">
                <li className="text-gray-300">• Consider enhancing stakeholder engagement processes</li>
                <li className="text-gray-300">• Expand continuous monitoring capabilities</li>
                <li className="text-gray-300">• Strengthen incident response procedures</li>
              </ul>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Recommendations
              </h3>
              <ul className="space-y-2 ml-7">
                <li className="text-gray-300">1. Schedule quarterly compliance reviews</li>
                <li className="text-gray-300">2. Implement automated monitoring tools</li>
                <li className="text-gray-300">3. Conduct regular staff training sessions</li>
                <li className="text-gray-300">4. Maintain detailed audit logs</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/dashboard/dashboard")}
            className="flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>

          <div className="flex items-center gap-3">
            <button className="px-6 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all">
              View Detailed Report
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold">
              Start New Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
