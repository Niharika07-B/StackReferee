'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface RefereeThinkingCardsProps {
  isDark: boolean
  userMode: 'student' | 'startup'
}

export default function RefereeThinkingCards({ isDark, userMode }: RefereeThinkingCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const cards = [
    {
      id: 1,
      title: 'Your Constraints',
      subtitle: 'Budget • Team skill level • Timeline',
      icon: '🎯',
      glowColor: 'from-blue-500 to-cyan-500',
      details: userMode === 'student' 
        ? [
            { label: 'Budget', value: 'Free tier limits & academic deadlines', icon: '💰' },
            { label: 'Team Skill Level', value: 'Learning curve & tutorial availability', icon: '🧠' },
            { label: 'Timeline', value: 'Project submission deadlines', icon: '⏰' }
          ]
        : [
            { label: 'Budget', value: 'Monthly burn rate & scaling costs', icon: '💰' },
            { label: 'Team Skill Level', value: 'Current expertise & learning capacity', icon: '🧠' },
            { label: 'Timeline', value: 'Time to market & MVP deadlines', icon: '⏰' }
          ]
    },
    {
      id: 2,
      title: 'Stack Simulation',
      subtitle: 'Scaling behavior • Cost growth • Maintenance effort',
      icon: '⚡',
      glowColor: 'from-purple-500 to-pink-500',
      details: userMode === 'student'
        ? [
            { label: 'Scaling Behavior', value: 'Demo performance & presentation prep', icon: '📈' },
            { label: 'Cost Growth', value: 'Project complexity & resource usage', icon: '💸' },
            { label: 'Maintenance Effort', value: 'Documentation & code explanation', icon: '🔧' }
          ]
        : [
            { label: 'Scaling Behavior', value: 'User growth handling & performance', icon: '📈' },
            { label: 'Cost Growth', value: 'Vendor lock-in risk & pricing tiers', icon: '💸' },
            { label: 'Maintenance Effort', value: 'Migration difficulty & tech debt', icon: '🔧' }
          ]
    },
    {
      id: 3,
      title: 'Verdict + Reasoning',
      subtitle: 'Final recommendation • Pros and cons',
      icon: '🏆',
      glowColor: 'from-green-500 to-emerald-500',
      details: userMode === 'student'
        ? [
            { label: 'Final Recommendation', value: 'Best choice for your project goals', icon: '✅' },
            { label: 'Pros and Cons', value: 'What to highlight in viva/interviews', icon: '⚖️' },
            { label: 'Clear Explanation', value: 'Trade-offs & backup options', icon: '🔄' }
          ]
        : [
            { label: 'Final Recommendation', value: 'Optimal stack for your constraints', icon: '✅' },
            { label: 'Pros and Cons', value: 'Risk assessment & mitigation', icon: '⚖️' },
            { label: 'Clear Explanation', value: 'Growth timeline & migration paths', icon: '🔄' }
          ]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {cards.map((card, index) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          onHoverStart={() => setHoveredCard(card.id)}
          onHoverEnd={() => setHoveredCard(null)}
          className="relative group cursor-pointer"
        >
          {/* Glowing border effect */}
          <div className={`
            absolute -inset-0.5 bg-gradient-to-r ${card.glowColor} rounded-2xl blur opacity-20 
            group-hover:opacity-75 transition duration-1000 group-hover:duration-200
            ${hoveredCard === card.id ? 'animate-pulse' : ''}
          `} />
          
          {/* Secondary glow for extra depth */}
          <div className={`
            absolute -inset-1 bg-gradient-to-r ${card.glowColor} rounded-2xl blur-md opacity-10
            group-hover:opacity-40 transition duration-1000 group-hover:duration-200
          `} />
          
          {/* Card content */}
          <div className={`
            relative p-10 rounded-2xl h-full glass-card
            transition-all duration-500
            ${hoveredCard === card.id ? 'transform scale-105 shadow-2xl' : ''}
          `}>
            {/* Card header */}
            <div className="text-center mb-8">
              <motion.div
                animate={hoveredCard === card.id ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="text-4xl mb-4"
              >
                {card.icon}
              </motion.div>
              
              <div className={`
                inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mb-4
                bg-gradient-to-r ${card.glowColor} text-white
              `}>
                {card.id}
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-primary">
                {card.title}
              </h3>
              
              <p className="text-base text-secondary">
                {card.subtitle}
              </p>
            </div>

            {/* Card details */}
            <div className="space-y-4">
              {card.details.map((detail, detailIndex) => (
                <motion.div
                  key={detailIndex}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (index * 0.2) + (detailIndex * 0.1) + 0.3 }}
                  className={`
                    p-4 rounded-lg transition-all duration-300 glass-card
                    ${hoveredCard === card.id ? 'transform translate-x-3' : ''}
                  `}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-lg flex-shrink-0 mt-0.5">{detail.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium mb-1 text-primary">
                        {detail.label}
                      </div>
                      <div className="text-xs text-secondary">
                        {detail.value}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Floating particles effect */}
            {hoveredCard === card.id && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 bg-gradient-to-r ${card.glowColor} rounded-full`}
                    initial={{ 
                      x: Math.random() * 100 + '%', 
                      y: '100%',
                      opacity: 0 
                    }}
                    animate={{ 
                      y: '-10%',
                      opacity: [0, 1, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}