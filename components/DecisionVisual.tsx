'use client'

import { useEffect, useState } from 'react'

interface DecisionVisualProps {
  isDark: boolean
}

export default function DecisionVisual({ isDark }: DecisionVisualProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const techStacks = [
    { name: 'Firebase', color: '#F59E0B', angle: 0, speed: 1, radius: 120 },
    { name: 'AWS', color: '#FBBF24', angle: 60, speed: 0.8, radius: 140 },
    { name: 'Supabase', color: '#22C55E', angle: 120, speed: 1.2, radius: 110 },
    { name: 'Django', color: '#16A34A', angle: 180, speed: 0.9, radius: 130 },
    { name: 'Node.js', color: '#4ADE80', angle: 240, speed: 1.1, radius: 125 },
    { name: 'React', color: '#38BDF8', angle: 300, speed: 0.7, radius: 135 },
    { name: 'Next.js', color: isDark ? '#E5E7EB' : '#9CA3AF', angle: 45, speed: 1.3, radius: 115 },
    { name: 'PostgreSQL', color: '#60A5FA', angle: 90, speed: 0.6, radius: 145 }
  ]

  return (
    <div className="relative w-80 h-80 mx-auto flex items-center justify-center">
      {/* Central Balance Scale */}
      <div className={`relative z-10 transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div 
          className="text-6xl animate-pulse-slow"
          style={{
            animation: 'scaleThinking 8s ease-in-out infinite, scalePulse 6s ease-in-out infinite',
            filter: 'drop-shadow(0 0 20px rgba(99, 102, 241, 0.3))'
          }}
        >
          ⚖️
        </div>
      </div>

      {/* Orbiting Tech Names */}
      {techStacks.map((tech, index) => (
        <div
          key={tech.name}
          className={`absolute text-sm font-medium transition-all duration-1000 ${
            isVisible ? 'opacity-70' : 'opacity-0'
          }`}
          style={{
            color: tech.color,
            animation: `orbit${index} ${20 / tech.speed}s linear infinite`,
            animationDelay: `${index * 0.5}s`,
            filter: 'blur(0.5px)',
            textShadow: `0 0 10px ${tech.color}40`
          }}
        >
          {tech.name}
        </div>
      ))}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scaleThinking {
          0%, 100% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-2deg) scale(1.05); }
          50% { transform: rotate(0deg) scale(1); }
          75% { transform: rotate(2deg) scale(1.05); }
        }

        @keyframes scalePulse {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(99, 102, 241, 0.3)); }
          50% { filter: drop-shadow(0 0 30px rgba(99, 102, 241, 0.6)); }
        }

        ${techStacks.map((tech, index) => `
          @keyframes orbit${index} {
            0% {
              transform: rotate(${tech.angle}deg) translateX(${tech.radius}px) rotate(-${tech.angle}deg) scale(0.9);
            }
            25% {
              transform: rotate(${tech.angle + 90}deg) translateX(${tech.radius}px) rotate(-${tech.angle + 90}deg) scale(1);
            }
            50% {
              transform: rotate(${tech.angle + 180}deg) translateX(${tech.radius}px) rotate(-${tech.angle + 180}deg) scale(1.1);
            }
            75% {
              transform: rotate(${tech.angle + 270}deg) translateX(${tech.radius}px) rotate(-${tech.angle + 270}deg) scale(1);
            }
            100% {
              transform: rotate(${tech.angle + 360}deg) translateX(${tech.radius}px) rotate(-${tech.angle + 360}deg) scale(0.9);
            }
          }
        `).join('\n')}
      `}</style>
    </div>
  )
}