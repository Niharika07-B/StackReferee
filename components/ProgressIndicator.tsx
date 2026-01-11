'use client'

import { useAppStore } from '@/lib/store'

const STEPS = [
  { id: 1, title: 'Project Context', description: 'Type & stage' },
  { id: 2, title: 'Resources', description: 'Budget & team' },
  { id: 3, title: 'Requirements', description: 'Timeline & scale' },
  { id: 4, title: 'Analysis', description: 'Results' },
]

export default function ProgressIndicator() {
  const { currentStep } = useAppStore()
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {STEPS.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                currentStep > step.id 
                  ? 'bg-green-500 text-white' 
                  : currentStep === step.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {currentStep > step.id ? '✓' : step.id}
              </div>
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            </div>
            
            {index < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-4 transition-colors duration-200 ${
                currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}