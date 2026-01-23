"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Plus, FileText, Clock, CheckCircle, TrendingUp, AlertCircle } from "lucide-react"

interface Assessment {
  id: string
  status: string
  overallScore: number | null
  createdAt: string
  updatedAt: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAssessments()
  }, [])

  const fetchAssessments = async () => {
    try {
      const res = await fetch("/api/assessments")
      if (res.ok) {
        const data = await res.json()
        setAssessments(data)
      }
    } catch (error) {
      console.error("Failed to fetch assessments:", error)
    } finally {
      setLoading(false)
    }
  }

  const createNewAssessment = async () => {
    try {
      const res = await fetch("/api/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
      if (res.ok) {
        const data = await res.json()
        router.push(`/dashboard/assessment/${data.id}/step1`)
      }
    } catch (error) {
      console.error("Failed to create assessment:", error)
    }
  }

  const stats = {
    total: assessments.length,
    inProgress: assessments.filter(a => a.status === "IN_PROGRESS").length,
    completed: assessments.filter(a => a.status === "COMPLETED").length,
    avgScore: assessments.filter(a => a.overallScore).reduce((acc, a) => acc + (a.overallScore || 0), 0) / (assessments.filter(a => a.overallScore).length || 1)
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      {/* Header */}
      <div className="bg-[#0D1B2E] border-b border-gray-800">
        <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">AI Compliance Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage your EU AI Act assessments</p>
            </div>
            <button
              onClick={createNewAssessment}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold"
            >
              <Plus className="w-5 h-5" />
              New Assessment
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-6 lg:px-12 py-12">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Total Assessments</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-900/50 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.inProgress}</p>
              </div>
              <div className="w-12 h-12 bg-amber-900/50 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Completed</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.completed}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-900/50 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Average Score</p>
                <p className="text-3xl font-bold text-white mt-2">{stats.avgScore.toFixed(1)}%</p>
              </div>
              <div className="w-12 h-12 bg-violet-900/50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Assessments List */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-700">
            <h2 className="text-xl font-semibold text-white">Recent Assessments</h2>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-400">Loading...</div>
          ) : assessments.length === 0 ? (
            <div className="p-12 text-center">
              <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No assessments yet</p>
              <button
                onClick={createNewAssessment}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
              >
                Create Your First Assessment
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {assessments.map((assessment) => (
                <Link
                  key={assessment.id}
                  href={`/dashboard/assessment/${assessment.id}/step1`}
                  className="block px-6 py-4 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-2 h-2 rounded-full ${assessment.status === "COMPLETED" ? "bg-emerald-500" : "bg-amber-500"}`}></div>
                      <div>
                        <p className="text-white font-medium">Assessment #{assessment.id.slice(0, 8)}</p>
                        <p className="text-sm text-gray-400 mt-1">
                          Created {new Date(assessment.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      {assessment.overallScore && (
                        <div className="text-right">
                          <p className="text-sm text-gray-400">Score</p>
                          <p className="text-lg font-semibold text-white">{assessment.overallScore}%</p>
                        </div>
                      )}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assessment.status === "COMPLETED" 
                          ? "bg-emerald-900/50 text-emerald-400" 
                          : "bg-amber-900/50 text-amber-400"
                      }`}>
                        {assessment.status === "COMPLETED" ? "Completed" : "In Progress"}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
