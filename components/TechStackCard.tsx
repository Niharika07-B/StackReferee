'use client'

import { TechStackOption } from '@/types'

interface TechStackCardProps {
  option: TechStackOption
}

export default function TechStackCard({ option }: TechStackCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 8) return 'score-excellent'
    if (score >= 6) return 'score-good'
    if (score >= 4) return 'score-fair'
    return 'score-poor'
  }
  
  const getScoreLabel = (score: number) => {
    if (score >= 8) return 'Excellent'
    if (score >= 6) return 'Good'
    if (score >= 4) return 'Fair'
    return 'Poor'
  }
  
  return (
    <div className="card border-2 hover:border-primary-300 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-900 mb-3">{option.name}</h4>
        <p className="text-gray-600 mb-4">{option.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {option.technologies.map((tech) => (
            <span 
              key={tech}
              className="tech-badge"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="space-y-4">
        {/* Cost Analysis */}
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Cost Analysis</h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Development Speed:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(option.cost_analysis.development_speed)}`}>
                {getScoreLabel(option.cost_analysis.development_speed)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Learning Curve:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(10 - option.cost_analysis.learning_curve)}`}>
                {getScoreLabel(10 - option.cost_analysis.learning_curve)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Current Cost:</span>
              <span className="font-semibold text-primary-600">${option.cost_analysis.monthly_cost_current}/mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">10x Scale Cost:</span>
              <span className="font-semibold text-accent-600">${option.cost_analysis.monthly_cost_10x}/mo</span>
            </div>
          </div>
        </div>
        
        {/* Technical Analysis */}
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Technical Analysis</h5>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Performance:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(option.technical_analysis.performance)}`}>
                {getScoreLabel(option.technical_analysis.performance)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scalability:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(option.technical_analysis.scalability)}`}>
                {getScoreLabel(option.technical_analysis.scalability)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vendor Lock-in:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(10 - option.technical_analysis.vendor_lockin)}`}>
                {getScoreLabel(10 - option.technical_analysis.vendor_lockin)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Ecosystem:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(option.technical_analysis.ecosystem_maturity)}`}>
                {getScoreLabel(option.technical_analysis.ecosystem_maturity)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Risk Analysis */}
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Risk Analysis</h5>
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Migration Difficulty:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(10 - option.risk_analysis.migration_difficulty)}`}>
                {getScoreLabel(10 - option.risk_analysis.migration_difficulty)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Maintenance Burden:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(10 - option.risk_analysis.maintenance_burden)}`}>
                {getScoreLabel(10 - option.risk_analysis.maintenance_burden)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Technology Risk:</span>
              <span className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getScoreColor(10 - option.risk_analysis.technology_risk)}`}>
                {getScoreLabel(10 - option.risk_analysis.technology_risk)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}