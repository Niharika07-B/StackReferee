'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

interface ContextSelectionCardsProps {
  isDark: boolean
  userMode: 'student' | 'startup'
  toggleUserMode: (mode: 'student' | 'startup') => void
}

export default function ContextSelectionCards({ isDark, userMode, toggleUserMode }: ContextSelectionCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  const cards = [
    {
      id: 'student',
      title: 'Student Mode',
      icon: '🎓',
      subtitle: 'Academic Project Focus',
      description: 'Get recommendations that help you learn, meet deadlines, and explain your choices in viva/interviews. We focus on free tiers, learning resources, and project complexity.',
      glowColor: 'from-blue-500 to-cyan-500',
      features: [
        { icon: '📚', text: 'Learning-focused recommendations' },
        { icon: '💰', text: 'Free tier optimization' },
        { icon: '🎯', text: 'Viva preparation guidance' },
        { icon: '⏰', text: 'Academic deadline awareness' }
      ]
    },
    {
      id: 'startup',
      title: 'Startup Mode',
      icon: '🚀',
      subtitle: 'Business Reality Check',
      description: 'Get cost projections, scaling risks, and migration paths. We simulate real business constraints and help you avoid expensive mistakes as you grow.',
      glowColor: 'from-purple-500 to-pink-500',
      features: [
        { icon: '💼', text: 'Business-focused analysis' },
        { icon: '📈', text: 'Scaling cost projections' },
        { icon: '⚠️', text: 'Risk assessment' },
        { icon: '🔄', text: 'Migration path planning' }
      ]
    }
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {cards.map((card) => (
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: card.id === 'student' ? 0 : 0.2, duration: 0.6 }}
          onHoverStart={() => setHoveredCard(card.id)}
          onHoverEnd={() => setHoveredCard(null)}
          onClick={() => toggleUserMode(card.id as 'student' | 'startup')}
          className="relative group cursor-pointer"
        >
          {/* Glowing border effects */}
          <div className={`
            absolute -inset-0.5 bg-gradient-to-r ${card.glowColor} rounded-3xl blur opacity-20 
            group-hover:opacity-75 transition duration-1000 group-hover:duration-200
            ${userMode === card.id ? 'opacity-60 animate-pulse' : ''}
          `} />
          
          <div className={`
            absolute -inset-1 bg-gradient-to-r ${card.glowColor} rounded-3xl blur-md opacity-10
            group-hover:opacity-40 transition duration-1000 group-hover:duration-200
            ${userMode === card.id ? 'opacity-30' : ''}
          `} />

          {/* Card content */}
          <div className={`
            relative p-12 rounded-3xl h-full min-h-[480px] glass-card
            transition-all duration-500
            ${hoveredCard === card.id ? 'transform scale-105' : ''}
            ${userMode === card.id ? 'ring-2 ring-opacity-60 ring-blue-400' : ''}
          `}
          >
            {/* Selection indicator */}
            {userMode === card.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`
                  absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center
                  bg-gradient-to-r ${card.glowColor} text-white text-sm font-bold
                `}
              >
                ✓
              </motion.div>
            )}

            {/* Card header */}
            <div className="text-center mb-6">
              <motion.div
                animate={hoveredCard === card.id ? { scale: 1.2, rotate: 5 } : { scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="text-5xl mb-4"
              >
                {card.icon}
              </motion.div>
              
              <h3 className="text-3xl font-bold mb-4 text-primary">
                {card.title}
              </h3>
              
              <p className="text-xl font-medium mb-6 gradient-text">
                {card.subtitle}
              </p>
              
              <p className="text-base leading-relaxed text-secondary mb-8">
                {card.description}
              </p>
            </div>

            {/* Features list */}
            <div className="space-y-3">
              {card.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (card.id === 'student' ? 0 : 0.2) + (index * 0.1) + 0.3 }}
                  className={`
                    flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 glass-card
                    ${hoveredCard === card.id ? 'transform translate-x-3' : ''}
                  `}
                >
                  <span className="text-xl flex-shrink-0">{feature.icon}</span>
                  <span className="text-base font-medium text-primary">
                    {feature.text}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Floating particles effect */}
            {(hoveredCard === card.id || userMode === card.id) && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
                {[...Array(8)].map((_, i) => (
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
                      duration: 3,
                      delay: i * 0.3,
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                  />
                ))}
              </div>
            )}

            {/* Pulse effect for selected card */}
            {userMode === card.id && (
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${card.glowColor} opacity-5`}
                animate={{ opacity: [0.05, 0.1, 0.05] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}