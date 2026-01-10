'use client'

import { useAppStore } from '@/lib/store'
import FormStep from './FormStep'

const PROJECT_TYPES = [
  { value: 'SaaS', label: 'SaaS Platform', description: 'Web application with user accounts and subscriptions' },
  { value: 'AI App', label: 'AI Application', description: 'AI-powered features, LLM integration, or ML workflows' },
  { value: 'E-commerce', label: 'E-commerce', description: 'Online store with payments and inventory' },
  { value: 'Student Project', label: 'Student Project', description: 'Academic project or learning exercise' },
  { value: 'Mobile App', label: 'Mobile App', description: 'iOS/Android application' },
  { value: 'Enterprise Tool', label: 'Enterprise Tool', description: 'Internal business application' },
] as const

const COMPANY_STAGES = [
  { value: 'Student', label: 'Student', description: 'Learning project or academic work' },
  { value: 'Startup', label: 'Startup', description: 'Early-stage company, pre-revenue or early revenue' },
  { value: 'Scale-up', label: 'Scale-up', description: 'Growing company with established product-market fit' },
  { value: 'Enterprise', label: 'Enterprise', description: 'Large organization with complex requirements' },
] as const

export default function ProjectTypeStep() {
  const { constraints, updateConstraints, setCurrentStep } = useAppStore()
  
  const handleNext = () => {
    if (constraints.project_type && constraints.company_stage) {
      setCurrentStep(2)
    }
  }
  
  return (
    <FormStep 
      step={1} 
      title="Project Context" 
      description="Tell us about your project and organization"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of project are you building?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {PROJECT_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => updateConstraints({ project_type: type.value })}
                className={`p-4 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  constraints.project_type === type.value
                    ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 ring-4 ring-primary-200 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900">{type.label}</div>
                <div className="text-sm text-gray-600 mt-1">{type.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What stage is your company/project?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {COMPANY_STAGES.map((stage) => (
              <button
                key={stage.value}
                onClick={() => updateConstraints({ company_stage: stage.value })}
                className={`p-4 text-left border-2 rounded-xl transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 ${
                  constraints.company_stage === stage.value
                    ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 ring-4 ring-primary-200 shadow-lg'
                    : 'border-gray-200 hover:border-primary-300 bg-white hover:bg-gray-50'
                }`}
              >
                <div className="font-medium text-gray-900">{stage.label}</div>
                <div className="text-sm text-gray-600 mt-1">{stage.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button
            onClick={handleNext}
            disabled={!constraints.project_type || !constraints.company_stage}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step →
          </button>
        </div>
      </div>
    </FormStep>
  )
}