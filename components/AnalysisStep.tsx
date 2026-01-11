'use client'

import { useEffect } from 'react'
import { useAppStore } from '@/lib/store'
import { generateDecisionAnalysis } from '@/lib/ai-service'
import { UserConstraints } from '@/types'
import FormStep from './FormStep'
import TechStackCard from './TechStackCard'
import LoadingSpinner from './LoadingSpinner'

export default function AnalysisStep() {
  const { constraints, analysis, isLoading, setLoading, setAnalysis, setCurrentStep, resetForm } = useAppStore()
  
  useEffect(() => {
    if (!analysis && !isLoading) {
      generateAnalysis()
    }
  }, [])
  
  const generateAnalysis = async () => {
    try {
      setLoading(true)
      const result = await generateDecisionAnalysis(constraints as UserConstraints)
      setAnalysis(result)
    } catch (error) {
      console.error('Failed to generate analysis:', error)
      // Show error message to user
      alert('Failed to generate analysis. Please check your inputs and try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const handleBack = () => {
    setCurrentStep(3)
  }
  
  const handleStartOver = () => {
    resetForm()
    // Scroll to top to show landing page again
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  if (isLoading) {
    return (
      <FormStep 
        step={4} 
        title="Generating Analysis" 
        description="Our AI referee is analyzing your constraints and comparing tech stacks..."
      >
        <div className="flex flex-col items-center justify-center py-12">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">This may take a few moments...</p>
        </div>
      </FormStep>
    )
  }
  
  if (!analysis) {
    return (
      <FormStep 
        step={4} 
        title="Analysis Error" 
        description="Something went wrong generating your analysis"
      >
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Failed to generate analysis. Please try again.</p>
          <button onClick={generateAnalysis} className="btn-primary">
            Retry Analysis
          </button>
        </div>
      </FormStep>
    )
  }
  
  return (
    <FormStep 
      step={4} 
      title="Tech Stack Decision Analysis" 
      description="Here's your personalized comparison and recommendation"
    >
      <div className="space-y-8">
        {/* Understanding Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Your Constraints</h3>
          <p className="text-blue-800">{analysis.understanding}</p>
        </div>
        
        {/* Tech Stack Options */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compared Tech Stack Options</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {analysis.options.map((option, index) => (
              <TechStackCard key={index} option={option} />
            ))}
          </div>
        </div>
        
        {/* Trade-off Analysis */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Trade-Off Analysis</h3>
          <p className="text-yellow-800 whitespace-pre-line">{analysis.tradeoff_analysis}</p>
        </div>
        
        {/* Recommendation */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-900 mb-3">Decision Steering Recommendation</h3>
          <p className="text-green-800 whitespace-pre-line">{analysis.recommendation}</p>
        </div>
        
        {/* Migration Path */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-purple-900 mb-3">Future Upgrade/Migration Path</h3>
          <p className="text-purple-800 whitespace-pre-line">{analysis.migration_path}</p>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between pt-6 border-t border-gray-200">
          <button onClick={handleBack} className="btn-secondary">
            ← Modify Constraints
          </button>
          <button onClick={handleStartOver} className="btn-primary">
            Start New Analysis
          </button>
        </div>
      </div>
    </FormStep>
  )
}