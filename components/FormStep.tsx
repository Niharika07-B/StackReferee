'use client'

import { UserConstraints } from '@/types'
import { useAppStore } from '@/lib/store'

interface FormStepProps {
  step: number
  title: string
  description: string
  children: React.ReactNode
}

export default function FormStep({ step, title, description, children }: FormStepProps) {
  const { currentStep } = useAppStore()
  
  const isActive = currentStep === step
  const isCompleted = currentStep > step
  
  if (!isActive) return null
  
  return (
    <div className="animate-slide-up">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
            isCompleted ? 'bg-success-500 text-white shadow-lg' : 'bg-primary-600 text-white shadow-lg'
          }`}>
            {isCompleted ? '✓' : step}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </div>
      
      <div className="card">
        {children}
      </div>
    </div>
  )
}