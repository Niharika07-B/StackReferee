'use client'

import { useState } from 'react'

const themes = [
  {
    name: 'Default',
    primary: 'from-primary-500 to-primary-600',
    accent: 'from-accent-500 to-accent-600',
    colors: ['#6366f1', '#d946ef']
  },
  {
    name: 'Ocean',
    primary: 'from-blue-500 to-cyan-600',
    accent: 'from-teal-500 to-emerald-600',
    colors: ['#3b82f6', '#06b6d4']
  },
  {
    name: 'Sunset',
    primary: 'from-orange-500 to-red-600',
    accent: 'from-pink-500 to-rose-600',
    colors: ['#f97316', '#dc2626']
  },
  {
    name: 'Forest',
    primary: 'from-green-500 to-emerald-600',
    accent: 'from-lime-500 to-green-600',
    colors: ['#22c55e', '#10b981']
  },
  {
    name: 'Midnight',
    primary: 'from-slate-600 to-gray-800',
    accent: 'from-indigo-500 to-purple-600',
    colors: ['#475569', '#6366f1']
  }
]

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentTheme, setCurrentTheme] = useState(themes[0])

  const handleThemeChange = (theme: typeof themes[0]) => {
    setCurrentTheme(theme)
    
    // Apply theme by updating CSS custom properties
    const root = document.documentElement
    
    // Update CSS variables based on theme
    switch (theme.name) {
      case 'Ocean':
        root.style.setProperty('--primary-500', '#3b82f6')
        root.style.setProperty('--accent-500', '#06b6d4')
        break
      case 'Sunset':
        root.style.setProperty('--primary-500', '#f97316')
        root.style.setProperty('--accent-500', '#ec4899')
        break
      case 'Forest':
        root.style.setProperty('--primary-500', '#22c55e')
        root.style.setProperty('--accent-500', '#84cc16')
        break
      case 'Midnight':
        root.style.setProperty('--primary-500', '#475569')
        root.style.setProperty('--accent-500', '#6366f1')
        break
      default:
        root.style.setProperty('--primary-500', '#6366f1')
        root.style.setProperty('--accent-500', '#d946ef')
    }
    
    setIsOpen(false)
    
    // Show feedback
    const button = document.querySelector('[data-theme-selector]')
    if (button) {
      button.classList.add('animate-pulse')
      setTimeout(() => {
        button.classList.remove('animate-pulse')
      }, 1000)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Theme Options */}
        {isOpen && (
          <div className="absolute bottom-16 right-0 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-4 min-w-[200px] animate-slide-up">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Choose Theme</h3>
            <div className="space-y-2">
              {themes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => handleThemeChange(theme)}
                  className={`w-full flex items-center space-x-3 p-2 rounded-lg transition-all duration-200 ${
                    currentTheme.name === theme.name 
                      ? 'bg-primary-100 border-2 border-primary-300' 
                      : 'hover:bg-gray-100 border-2 border-transparent'
                  }`}
                >
                  <div className="flex space-x-1">
                    {theme.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Toggle Button */}
        <button
          data-theme-selector
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-white/90 backdrop-blur-md rounded-full shadow-2xl border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300 group"
        >
          <svg className="w-6 h-6 text-gray-600 group-hover:text-primary-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v6a2 2 0 002 2h4a2 2 0 002-2V5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}