'use client'

import { useAppStore } from '@/lib/store'
import FormStep from './FormStep'

const TIME_OPTIONS = [
  { value: '1 week', label: '1 week', description: 'Urgent prototype needed' },
  { value: '2 weeks', label: '2 weeks', description: 'Quick MVP timeline' },
  { value: '1 month', label: '1 month', description: 'Standard MVP timeline' },
  { value: '3 months', label: '3 months', description: 'Full-featured launch' },
  { value: '6+ months', label: '6+ months', description: 'Complex enterprise project' },
] as const

const USER_SCALE_OPTIONS = [
  { value: '< 1k', label: '< 1,000 users', description: 'Small user base' },
  { value: '1k-10k', label: '1k - 10k users', description: 'Growing user base' },
  { value: '10k-100k', label: '10k - 100k users', description: 'Significant scale' },
  { value: '100k-1M', label: '100k - 1M users', description: 'Large scale' },
  { value: '1M+', label: '1M+ users', description: 'Massive scale' },
] as const

const COMPLIANCE_OPTIONS = [
  { value: 'None', label: 'None', description: 'No specific compliance requirements' },
  { value: 'GDPR', label: 'GDPR', description: 'European data protection' },
  { value: 'HIPAA', label: 'HIPAA', description: 'Healthcare data protection' },
  { value: 'SOC2', label: 'SOC2', description: 'Enterprise security standards' },
  { value: 'Multiple', label: 'Multiple', description: 'Multiple compliance requirements' },
] as const

const DECISION_CATEGORIES = [
  { value: 'Full Stack', label: 'Full Stack', description: 'Complete application architecture' },
  { value: 'Backend', label: 'Backend Only', description: 'API and database decisions' },
  { value: 'Cloud', label: 'Cloud Platform', description: 'Infrastructure and hosting' },
  { value: 'Mobile', label: 'Mobile Stack', description: 'Mobile app development' },
  { value: 'AI/ML', label: 'AI/ML Stack', description: 'AI and machine learning focus' },
] as const

export default function RequirementsStep() {
  const { constraints, updateConstraints, setCurrentStep } = useAppStore()
  
  const handleNext = () => {
    if (constraints.time_to_market && constraints.expected_users && constraints.decision_category) {
      setCurrentStep(4)
    }
  }
  
  const handleBack = () => {
    setCurrentStep(2)
  }
  
  return (
    <FormStep 
      step={3} 
      title="Requirements & Scale" 
      description="Define your timeline, scale, and compliance needs"
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Time to market
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {TIME_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConstraints({ time_to_market: option.value })}
                className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                  constraints.time_to_market === option.value
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
            Expected user scale (12 months)
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {USER_SCALE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConstraints({ expected_users: option.value })}
                className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                  constraints.expected_users === option.value
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
            Compliance requirements
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {COMPLIANCE_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConstraints({ compliance_needs: option.value })}
                className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                  constraints.compliance_needs === option.value
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
            What type of decision do you need help with?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DECISION_CATEGORIES.map((option) => (
              <button
                key={option.value}
                onClick={() => updateConstraints({ decision_category: option.value })}
                className={`p-4 text-left border rounded-lg transition-all duration-200 ${
                  constraints.decision_category === option.value
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
        
        <div className="flex justify-between pt-4">
          <button onClick={handleBack} className="btn-secondary">
            ← Back
          </button>
          <button
            onClick={handleNext}
            disabled={!constraints.time_to_market || !constraints.expected_users || !constraints.decision_category}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Analysis →
          </button>
        </div>
      </div>
    </FormStep>
  )
}