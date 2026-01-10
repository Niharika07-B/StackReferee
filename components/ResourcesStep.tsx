'use client'

import { useAppStore } from '@/lib/store'
import FormStep from './FormStep'

const BUDGET_OPTIONS = [
  { value: 25, label: '$25/month', description: 'Hobby/student budget' },
  { value: 100, label: '$100/month', description: 'Small startup budget' },
  { value: 500, label: '$500/month', description: 'Growing business budget' },
  { value: 2000, label: '$2000/month', description: 'Scale-up budget' },
  { value: 10000, label: '$10000+/month', description: 'Enterprise budget' },
]

const TEAM_SIZES = [
  { value: 1, label: 'Solo developer', description: 'Just you' },
  { value: 2, label: '2-3 people', description: 'Small team' },
  { value: 5, label: '4-8 people', description: 'Medium team' },
  { value: 15, label: '10+ people', description: 'Large team' },
]

const COMMON_TECHNOLOGIES = [
  'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js', 
  'Python', 'Django', 'Flask', 'Java', 'Spring Boot', 'C#', '.NET',
  'PHP', 'Laravel', 'Ruby', 'Rails', 'Go', 'Rust', 'Swift', 'Kotlin',
  'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'AWS', 'GCP', 'Azure',
  'Docker', 'Kubernetes', 'Firebase', 'Supabase'
]

export default function ResourcesStep() {
  const { constraints, updateConstraints, setCurrentStep } = useAppStore()
  
  const handleTechToggle = (tech: string) => {
    const current = constraints.team_experience || []
    const updated = current.includes(tech)
      ? current.filter(t => t !== tech)
      : [...current, tech]
    updateConstraints({ team_experience: updated })
  }
  
  const handleNext = () => {
    if (constraints.monthly_budget_usd && constraints.team_size) {
      setCurrentStep(3)
    }
  }
  
  const handleBack = () => {
    setCurrentStep(1)
  }
  
  return (
    <FormStep 
      step={2} 
      title="Resources & Team" 
      description="Help us understand your budget and team capabilities"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Monthly budget for hosting and services
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {BUDGET_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConstraints({ monthly_budget_usd: option.value })}
                className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                  constraints.monthly_budget_usd === option.value
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Team size
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {TEAM_SIZES.map((size) => (
              <button
                key={size.value}
                onClick={() => updateConstraints({ team_size: size.value })}
                className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                  constraints.team_size === size.value
                    ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="font-medium text-gray-900">{size.label}</div>
                <div className="text-sm text-gray-600 mt-1">{size.description}</div>
              </button>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Team experience (select all that apply)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {COMMON_TECHNOLOGIES.map((tech) => (
              <button
                key={tech}
                onClick={() => handleTechToggle(tech)}
                className={`px-4 py-2 text-sm border-2 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 ${
                  constraints.team_experience?.includes(tech)
                    ? 'border-primary-500 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-md'
                    : 'border-gray-200 hover:border-primary-300 text-gray-700 bg-white hover:bg-gray-50'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <button onClick={handleBack} className="btn-secondary">
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!constraints.monthly_budget_usd || !constraints.team_size}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step →
          </button>
        </div>
      </div>
    </FormStep>
  )
}