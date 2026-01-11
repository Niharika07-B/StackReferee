'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAppStore } from '@/lib/store'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { setCurrentStep, setShowForm } = useAppStore()
  
  const handleStartAnalysis = () => {
    setShowForm(true)
    setCurrentStep(1)
    
    // Scroll to form after state update
    setTimeout(() => {
      const element = document.getElementById('analysis-form')
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
      }
    }, 300)
  }
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-lg">SR</span>
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">StackReferee</h1>
              <p className="text-xs text-gray-500 -mt-1">AI Decision Engine</p>
            </div>
          </Link>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => {
                const element = document.getElementById('features')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Features
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('how-it-works')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              How It Works
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('examples')
                element?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="text-gray-600 hover:text-primary-600 font-medium transition-colors duration-200"
            >
              Examples
            </button>
            <button onClick={handleStartAnalysis} className="btn-primary text-sm">
              Start Analysis
            </button>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => {
                  const element = document.getElementById('features')
                  element?.scrollIntoView({ behavior: 'smooth' })
                  setIsMenuOpen(false)
                }}
                className="text-gray-600 hover:text-primary-600 font-medium text-left"
              >
                Features
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('how-it-works')
                  element?.scrollIntoView({ behavior: 'smooth' })
                  setIsMenuOpen(false)
                }}
                className="text-gray-600 hover:text-primary-600 font-medium text-left"
              >
                How It Works
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('examples')
                  element?.scrollIntoView({ behavior: 'smooth' })
                  setIsMenuOpen(false)
                }}
                className="text-gray-600 hover:text-primary-600 font-medium text-left"
              >
                Examples
              </button>
              <button 
                onClick={() => {
                  handleStartAnalysis()
                  setIsMenuOpen(false)
                }}
                className="btn-primary text-sm w-full"
              >
                Start Analysis
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}