import { create } from 'zustand'
import { UserConstraints, DecisionAnalysis } from '@/types'

interface AppState {
  // Form state
  currentStep: number
  constraints: Partial<UserConstraints>
  isLoading: boolean
  showForm: boolean // Add flag to control form visibility
  
  // Results state
  analysis: DecisionAnalysis | null
  
  // Actions
  setCurrentStep: (step: number) => void
  updateConstraints: (updates: Partial<UserConstraints>) => void
  setLoading: (loading: boolean) => void
  setAnalysis: (analysis: DecisionAnalysis | null) => void
  setShowForm: (show: boolean) => void
  resetForm: () => void
}

const initialConstraints: Partial<UserConstraints> = {
  project_type: undefined,
  company_stage: undefined,
  monthly_budget_usd: 100,
  team_size: 1,
  team_experience: [],
  time_to_market: undefined,
  expected_users: undefined,
  compliance_needs: 'None',
  decision_category: undefined,
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentStep: 1,
  constraints: initialConstraints,
  isLoading: false,
  showForm: false,
  analysis: null,
  
  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  
  updateConstraints: (updates) => set((state) => ({
    constraints: { ...state.constraints, ...updates }
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setAnalysis: (analysis) => set({ analysis }),
  
  setShowForm: (show) => set({ showForm: show }),
  
  resetForm: () => set({
    currentStep: 1,
    constraints: initialConstraints,
    analysis: null,
    isLoading: false,
    showForm: false,
  }),
}))