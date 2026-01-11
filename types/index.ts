export interface UserConstraints {
  project_type: 'SaaS' | 'AI App' | 'E-commerce' | 'Student Project' | 'Mobile App' | 'Enterprise Tool'
  company_stage: 'Student' | 'Startup' | 'Scale-up' | 'Enterprise'
  monthly_budget_usd: number
  team_size: number
  team_experience: string[]
  time_to_market: '1 week' | '2 weeks' | '1 month' | '3 months' | '6+ months'
  expected_users: '< 1k' | '1k-10k' | '10k-100k' | '100k-1M' | '1M+'
  compliance_needs: 'None' | 'GDPR' | 'HIPAA' | 'SOC2' | 'Multiple'
  decision_category: 'Backend' | 'Cloud' | 'Full Stack' | 'Mobile' | 'AI/ML'
}

export interface TechStackOption {
  name: string
  technologies: string[]
  description: string
  cost_analysis: {
    development_speed: number // 1-10 scale
    learning_curve: number // 1-10 scale
    monthly_cost_current: number
    monthly_cost_10x: number
  }
  technical_analysis: {
    performance: number // 1-10 scale
    scalability: number // 1-10 scale
    vendor_lockin: number // 1-10 scale
    ecosystem_maturity: number // 1-10 scale
  }
  risk_analysis: {
    migration_difficulty: number // 1-10 scale
    maintenance_burden: number // 1-10 scale
    technology_risk: number // 1-10 scale
  }
}

export interface DecisionAnalysis {
  understanding: string
  options: TechStackOption[]
  tradeoff_analysis: string
  recommendation: string
  migration_path: string
}

export interface FormStep {
  id: number
  title: string
  description: string
  fields: string[]
}