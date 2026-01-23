import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const step1Schema = z.object({
  systemName: z.string().min(1, "System name is required"),
  systemDescription: z.string().min(10, "Description must be at least 10 characters"),
  intendedPurpose: z.string().min(10, "Purpose must be at least 10 characters"),
  targetUsers: z.string().min(1, "Target users are required"),
  deploymentContext: z.string().min(1, "Deployment context is required"),
  dataTypes: z.array(z.string()).min(1, "Select at least one data type"),
  geographicScope: z.string().min(1, "Geographic scope is required"),
})

export const step2Schema = z.object({
  riskCategory: z.string().min(1, "Risk category is required"),
  humanOversight: z.string().min(10, "Human oversight description is required"),
  transparencyMeasures: z.string().min(10, "Transparency measures are required"),
  dataGovernance: z.string().min(10, "Data governance practices are required"),
  accuracyRequirements: z.string().min(10, "Accuracy requirements are required"),
  cybersecurityMeasures: z.string().min(10, "Cybersecurity measures are required"),
  recordKeeping: z.string().min(10, "Record keeping procedures are required"),
  conformityAssessment: z.string().min(10, "Conformity assessment approach is required"),
})

export const step3Schema = z.object({
  stakeholderEngagement: z.string().min(10, "Stakeholder engagement is required"),
  impactAssessment: z.string().min(10, "Impact assessment is required"),
  mitigationStrategies: z.string().min(10, "Mitigation strategies are required"),
  monitoringPlan: z.string().min(10, "Monitoring plan is required"),
  incidentResponse: z.string().min(10, "Incident response procedures are required"),
  documentationQuality: z.string().min(10, "Documentation quality assurance is required"),
  trainingPrograms: z.string().min(10, "Training programs are required"),
  continuousImprovement: z.string().min(10, "Continuous improvement process is required"),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type Step1Input = z.infer<typeof step1Schema>
export type Step2Input = z.infer<typeof step2Schema>
export type Step3Input = z.infer<typeof step3Schema>
