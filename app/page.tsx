'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { generateDecisionAnalysis } from '@/lib/ai-service'
import { UserConstraints } from '@/types'
import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import DecisionVisual from '@/components/DecisionVisual'

export default function Home() {
  const [currentView, setCurrentView] = useState<'arena' | 'questions' | 'results'>('arena')
  const [isDark, setIsDark] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userMode, setUserMode] = useState<'student' | 'startup'>('student')
  const [hoveredStep, setHoveredStep] = useState<number | null>(null)
  
  const [answers, setAnswers] = useState({
    project_type: '',
    experience_level: '',
    main_concern: '',
    company_stage: '',
    monthly_budget_usd: 100,
    team_size: 1,
    time_to_market: '',
    expected_users: '',
    decision_category: 'Full Stack'
  })

  const techStacks = [
    { name: 'Firebase', color: 'bg-orange-500', icon: '🔥' },
    { name: 'Supabase', color: 'bg-green-500', icon: '⚡' },
    { name: 'AWS', color: 'bg-yellow-500', icon: '☁️' },
    { name: 'Django', color: 'bg-green-600', icon: '🐍' },
    { name: 'Node.js', color: 'bg-green-400', icon: '🟢' },
    { name: 'React', color: 'bg-blue-500', icon: '⚛️' },
    { name: 'Next.js', color: 'bg-black', icon: '▲' },
    { name: 'PostgreSQL', color: 'bg-blue-600', icon: '🐘' }
  ]

  const decisionSteps = [
    {
      title: 'Your Constraints',
      subtitle: 'Budget, skills, timeline',
      details: userMode === 'student' 
        ? ['Academic deadlines', 'Learning curve', 'Free tier limits']
        : ['Monthly burn rate', 'Team expertise', 'Time to market']
    },
    {
      title: 'Stack Simulation',
      subtitle: 'Real-world scenarios',
      details: userMode === 'student'
        ? ['Viva presentation prep', 'Project complexity', 'Tutorial availability']
        : ['Scaling costs', 'Vendor lock-in risk', 'Migration difficulty']
    },
    {
      title: 'Verdict + Reasoning',
      subtitle: 'AI referee decision',
      details: userMode === 'student'
        ? ['Why this choice', 'What to explain', 'Backup options']
        : ['Cost projections', 'Risk assessment', 'Growth timeline']
    }
  ]

  const questions = [
    {
      id: 'project_type',
      title: 'What are you building?',
      subtitle: 'Help us understand your project context',
      options: [
        { value: 'Student Project', label: '🎓 Final-year project', desc: 'Academic project or thesis work' },
        { value: 'SaaS', label: '🚀 Startup MVP', desc: 'Building a product to validate and scale' },
        { value: 'AI App', label: '🤖 AI Application', desc: 'AI-powered features or ML workflows' },
        { value: 'E-commerce', label: '🛒 E-commerce', desc: 'Online store or marketplace' },
        { value: 'Mobile App', label: '📱 Mobile App', desc: 'iOS/Android application' },
        { value: 'Enterprise Tool', label: '🏢 Enterprise Tool', desc: 'Internal business application' }
      ]
    },
    {
      id: 'experience_level',
      title: 'How comfortable are you with backend development?',
      subtitle: 'This helps us recommend the right complexity level',
      options: [
        { value: 'beginner', label: '🌱 I don\'t know backend', desc: 'I focus on frontend or I\'m just starting' },
        { value: 'intermediate', label: '📚 I know basics', desc: 'I can follow tutorials and modify code' },
        { value: 'advanced', label: '💪 I\'m confident', desc: 'I can build APIs and manage databases' }
      ]
    },
    {
      id: 'main_concern',
      title: 'What scares you most about this decision?',
      subtitle: 'We\'ll address your biggest worry in our recommendation',
      options: [
        { value: 'cost', label: '💸 Cost spiraling out of control', desc: 'Unexpected bills or expensive scaling' },
        { value: 'complexity', label: '🤯 Getting overwhelmed', desc: 'Too many moving parts to manage' },
        { value: 'performance', label: '🐌 Poor performance', desc: 'Slow app or bad user experience' },
        { value: 'scaling', label: '📈 Can\'t handle growth', desc: 'System breaks when users increase' },
        { value: 'wrong_choice', label: '🔄 Having to rebuild later', desc: 'Choosing something I\'ll regret' }
      ]
    },
    {
      id: 'company_stage',
      title: 'What stage are you at?',
      subtitle: 'This affects our timeline and budget recommendations',
      options: [
        { value: 'Student', label: '🎓 Student', desc: 'Academic project with tight deadlines' },
        { value: 'Startup', label: '🚀 Early Startup', desc: 'Pre-revenue or early revenue stage' },
        { value: 'Scale-up', label: '📈 Growing Company', desc: 'Established product, scaling up' },
        { value: 'Enterprise', label: '🏢 Enterprise', desc: 'Large organization with complex needs' }
      ]
    },
    {
      id: 'timeline_and_scale',
      title: 'Timeline and scale expectations',
      subtitle: 'Final details to personalize your recommendation',
      isMultiple: true
    }
  ]

  const toggleTheme = () => {
    setIsDark(!isDark)
    if (!isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const handleEnterArena = () => {
    setCurrentView('questions')
    setCurrentQuestion(0)
  }

  const toggleUserMode = (mode: 'student' | 'startup') => {
    setUserMode(mode)
  }

  const handleAnswerSelect = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
    
    // Auto-advance to next question (except for the last one)
    if (currentQuestion < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 500)
    }
  }

  const handleSubmitAnalysis = async () => {
    setIsLoading(true)
    try {
      // Map our answers to the expected format
      const constraints: UserConstraints = {
        project_type: answers.project_type as any,
        company_stage: answers.company_stage as any,
        monthly_budget_usd: answers.monthly_budget_usd,
        team_size: answers.team_size,
        team_experience: answers.experience_level === 'advanced' ? ['JavaScript', 'Node.js', 'React'] : 
                        answers.experience_level === 'intermediate' ? ['JavaScript', 'React'] : [],
        time_to_market: answers.time_to_market as any,
        expected_users: answers.expected_users as any,
        compliance_needs: 'None',
        decision_category: answers.decision_category as any
      }
      
      const result = await generateDecisionAnalysis(constraints)
      setAnalysis(result)
      setCurrentView('results')
    } catch (error) {
      alert('Failed to generate analysis. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetAll = () => {
    setCurrentView('arena')
    setCurrentQuestion(0)
    setAnalysis(null)
    setAnswers({
      project_type: '',
      experience_level: '',
      main_concern: '',
      company_stage: '',
      monthly_budget_usd: 100,
      team_size: 1,
      time_to_market: '',
      expected_users: '',
      decision_category: 'Full Stack'
    })
  }

  const getBeginnerExplanation = (text: string) => {
    // Always return simple explanations for better user experience
    const explanations: { [key: string]: string } = {
      'Firebase': 'Firebase (like renting a fully furnished apartment - everything is set up for you)',
      'AWS': 'AWS (like buying land and building your own house - more work upfront, but complete control)',
      'Node.js': 'Node.js (lets you use JavaScript for both frontend and backend)',
      'Django': 'Django (Python framework with pre-built components)',
      'PostgreSQL': 'PostgreSQL (reliable database that can handle millions of records)',
      'MongoDB': 'MongoDB (flexible database for varied data types)'
    }
    
    let result = text
    Object.entries(explanations).forEach(([term, explanation]) => {
      if (text.includes(term)) {
        result = result.replace(term, explanation)
      }
    })
    
    return result
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gray-900' : 'bg-white'}`}>
      <AppHeader 
        currentView={currentView}
        isDark={isDark}
        toggleTheme={toggleTheme}
        resetAll={resetAll}
        handleStartQuestions={handleEnterArena}
      />

      <main className="pt-16">
        {currentView === 'arena' ? (
          /* Decision Arena */
          <div className="min-h-screen">
            {/* Hero Section → Clean Decision Arena */}
            <section className="py-20 px-4">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Left Side - Clean Content */}
                  <div className="text-center lg:text-left">
                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-4xl lg:text-5xl font-bold mb-6 leading-tight ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      Choose a tech stack that won't{' '}
                      <span className="text-red-600">hurt</span> you later.
                    </motion.h1>
                    
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className={`text-lg mb-8 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      We compare trade-offs — cost, scale, skills — before you commit.
                    </motion.p>
                    
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="mb-6"
                    >
                      <button
                        onClick={handleEnterArena}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                      >
                        Enter Decision Arena
                      </button>
                    </motion.div>
                    
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-500'}`}
                    >
                      Takes 2 minutes · No signup required
                    </motion.p>
                  </div>

                  {/* Right Side - Premium Decision Visual */}
                  <div className="relative h-96 flex items-center justify-center">
                    <DecisionVisual isDark={isDark} />
                  </div>
                </div>
              </div>
            </section>

            {/* Mode Selection - Clean */}
            <section className="py-16 px-4 border-t border-gray-200 dark:border-gray-800">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-2xl font-semibold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  Choose Your Context
                </motion.h2>
                
                <div className="flex justify-center mb-12">
                  <div className={`inline-flex p-1 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <button
                      onClick={() => toggleUserMode('student')}
                      className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                        userMode === 'student'
                          ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                          : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      🎓 Student Mode
                    </button>
                    <button
                      onClick={() => toggleUserMode('startup')}
                      className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                        userMode === 'startup'
                          ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white'
                          : isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      🚀 Startup Mode
                    </button>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={userMode}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="max-w-2xl mx-auto"
                  >
                    {userMode === 'student' ? (
                      <div>
                        <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Academic Project Focus
                        </h3>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                          Get recommendations that help you learn, meet deadlines, and explain your choices in viva/interviews. 
                          We focus on free tiers, learning resources, and project complexity.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <h3 className={`text-lg font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Business Reality Check
                        </h3>
                        <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} leading-relaxed`}>
                          Get cost projections, scaling risks, and migration paths. We simulate real business constraints 
                          and help you avoid expensive mistakes as you grow.
                        </p>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>

            {/* How the Referee Thinks - Clean Flow */}
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`text-2xl font-semibold text-center mb-16 ${isDark ? 'text-white' : 'text-gray-900'}`}
                >
                  How the Referee Thinks
                </motion.h2>
                
                <div className="space-y-12">
                  {decisionSteps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      onHoverStart={() => setHoveredStep(index)}
                      onHoverEnd={() => setHoveredStep(null)}
                      className="flex items-start space-x-6 cursor-pointer group"
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors duration-200 ${
                          hoveredStep === index 
                            ? 'bg-blue-600 text-white' 
                            : isDark ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-medium mb-2 transition-colors duration-200 ${
                          hoveredStep === index 
                            ? isDark ? 'text-white' : 'text-gray-900'
                            : isDark ? 'text-gray-300' : 'text-gray-700'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm mb-3 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
                          {step.subtitle}
                        </p>
                        
                        <AnimatePresence>
                          {hoveredStep === index && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="space-y-2"
                            >
                              {step.details.map((detail, detailIndex) => (
                                <div key={detailIndex} className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} flex items-center`}>
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                                  {detail}
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : currentView === 'questions' ? (
          /* Questions Flow */
          <div className="min-h-screen py-8 px-4">
            <div className="max-w-3xl mx-auto">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className={`text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {Math.round(((currentQuestion + 1) / questions.length) * 100)}% Complete
                  </span>
                </div>
                <div className={`w-full h-2 ${isDark ? 'bg-gray-700' : 'bg-gray-200'} rounded-full`}>
                  <div 
                    className="h-2 bg-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Current Question */}
              {questions[currentQuestion] && (
                <div className={`p-8 rounded-2xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                  <div className="text-center mb-8">
                    <h2 className={`text-2xl lg:text-3xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {questions[currentQuestion].title}
                    </h2>
                    <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {questions[currentQuestion].subtitle}
                    </p>
                  </div>

                  {questions[currentQuestion].isMultiple ? (
                    /* Final Question - Multiple Inputs */
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Time to market
                        </label>
                        <select
                          value={answers.time_to_market}
                          onChange={(e) => setAnswers(prev => ({ ...prev, time_to_market: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="">Select timeline</option>
                          <option value="1 week">1 week (Hackathon/Demo)</option>
                          <option value="2 weeks">2 weeks (Quick prototype)</option>
                          <option value="1 month">1 month (Standard MVP)</option>
                          <option value="3 months">3 months (Full-featured launch)</option>
                          <option value="6+ months">6+ months (Complex project)</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Expected users (12 months)
                        </label>
                        <select
                          value={answers.expected_users}
                          onChange={(e) => setAnswers(prev => ({ ...prev, expected_users: e.target.value }))}
                          className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value="">Select scale</option>
                          <option value="< 1k">Less than 1,000 users</option>
                          <option value="1k-10k">1k - 10k users</option>
                          <option value="10k-100k">10k - 100k users</option>
                          <option value="100k-1M">100k - 1M users</option>
                          <option value="1M+">1M+ users</option>
                        </select>
                      </div>

                      <div>
                        <label className={`block text-sm font-medium mb-3 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
                          Monthly budget
                        </label>
                        <select
                          value={answers.monthly_budget_usd}
                          onChange={(e) => setAnswers(prev => ({ ...prev, monthly_budget_usd: parseInt(e.target.value) }))}
                          className={`w-full px-4 py-3 rounded-lg border ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:ring-2 focus:ring-blue-500`}
                        >
                          <option value={25}>$25/month (Student budget)</option>
                          <option value={100}>$100/month (Small startup)</option>
                          <option value={500}>$500/month (Growing business)</option>
                          <option value={2000}>$2000/month (Scale-up)</option>
                          <option value={10000}>$10000+/month (Enterprise)</option>
                        </select>
                      </div>

                      <div className="pt-6">
                        <button
                          onClick={handleSubmitAnalysis}
                          disabled={isLoading || !answers.time_to_market || !answers.expected_users}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200"
                        >
                          {isLoading ? 'Analyzing Your Needs...' : 'Get My Recommendation'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Regular Question Options */
                    <div className="grid grid-cols-1 gap-4">
                      {questions[currentQuestion].options?.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswerSelect(questions[currentQuestion].id, option.value)}
                          className={`p-6 text-left rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] ${
                            answers[questions[currentQuestion].id as keyof typeof answers] === option.value
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                              : isDark 
                              ? 'border-gray-600 bg-gray-700 hover:border-gray-500' 
                              : 'border-gray-200 bg-white hover:border-gray-300'
                          }`}
                        >
                          <div className={`text-lg font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {option.label}
                          </div>
                          <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            {option.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Navigation */}
                  {!questions[currentQuestion].isMultiple && (
                    <div className="flex justify-between mt-8">
                      <button
                        onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                        disabled={currentQuestion === 0}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                          currentQuestion === 0
                            ? 'opacity-50 cursor-not-allowed'
                            : isDark 
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {answers[questions[currentQuestion].id as keyof typeof answers] && (
                        <button
                          onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                        >
                          Next
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Clean Results with Focus on Content */
          <div className="min-h-screen py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className={`text-3xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  Your Technical Decision Verdict
                </h2>
                <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Based on your constraints, here's what the Referee recommends
                </p>
              </div>

              {analysis && (
                <div className="space-y-8">
                  {/* Regret Risk Assessment - Clean */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                  >
                    <h3 className={`text-xl font-medium mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      Regret Risk Assessment
                    </h3>
                    <div className="space-y-6">
                      {analysis.options.map((option: any, index: number) => {
                        const regretScore = Math.min(
                          (option.cost_analysis.monthly_cost_10x / 1000) * 30 +
                          (10 - option.technical_analysis.scalability) * 8 +
                          (option.technical_analysis.vendor_lockin) * 5,
                          100
                        )
                        return (
                          <div key={index} className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                {option.name}
                              </span>
                              <span className={`text-sm font-medium ${
                                regretScore < 30 ? 'text-green-600' : 
                                regretScore < 60 ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {Math.round(regretScore)}% regret risk
                              </span>
                            </div>
                            <div className={`w-full h-2 ${isDark ? 'bg-gray-800' : 'bg-gray-100'} rounded-full overflow-hidden`}>
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${regretScore}%` }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className={`h-full ${
                                  regretScore < 30 ? 'bg-green-500' : 
                                  regretScore < 60 ? 'bg-yellow-500' : 'bg-red-500'
                                }`}
                              />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>

                  {/* Referee's Reasoning - Clean Chat Style */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-12"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium flex-shrink-0">
                        🤖
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-medium mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          Referee's Reasoning
                        </h3>
                        <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-700'} leading-relaxed`}>
                          <p>
                            "I didn't recommend {analysis.options[1]?.name || 'the alternative'} because 
                            {userMode === 'student' 
                              ? ' it has a steeper learning curve and fewer beginner resources for your timeline.'
                              : ' the scaling costs would hurt your budget as you grow.'
                            }"
                          </p>
                          <p>
                            "Your choice of {analysis.options[0]?.name} fits because 
                            {userMode === 'student'
                              ? ' it has excellent documentation, free tiers, and you can explain the architecture easily in interviews.'
                              : ' it balances development speed with cost control, and migration paths exist if you outgrow it.'
                            }"
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Tech Stack Comparison Cards */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {analysis.options.map((option: any, index: number) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: index === 0 ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        className={`p-6 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg border-2 ${
                          index === 0 ? 'border-green-500' : 'border-gray-300'
                        }`}
                      >
                        {index === 0 && (
                          <div className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-lg inline-block mb-4">
                            🏆 Recommended
                          </div>
                        )}
                        
                        <h4 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {option.name}
                        </h4>
                        
                        <div className="space-y-4">
                          {/* Cost Reality */}
                          <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                            <h5 className={`font-semibold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                              💸 {userMode === 'student' ? 'Student Budget' : 'Cost Reality'}
                            </h5>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                  {userMode === 'student' ? 'Free tier:' : 'Starting cost:'}
                                </span>
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  ${option.cost_analysis.monthly_cost_current}/month
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                                  {userMode === 'student' ? 'If popular:' : 'At scale:'}
                                </span>
                                <span className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                  ${option.cost_analysis.monthly_cost_10x}/month
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* What Will Break First */}
                          <div className={`p-4 rounded-lg ${isDark ? 'bg-red-900/20' : 'bg-red-50'}`}>
                            <h5 className={`font-semibold mb-2 ${isDark ? 'text-red-300' : 'text-red-900'}`}>
                              ⚠️ What Will Break First?
                            </h5>
                            <p className={`text-sm ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                              {userMode === 'student' 
                                ? (option.technical_analysis.scalability < 7 
                                    ? 'Complex setup might slow your project timeline'
                                    : option.cost_analysis.monthly_cost_10x > 100
                                    ? 'Costs could surprise you if project gets popular'
                                    : 'Well-suited for academic projects')
                                : (option.technical_analysis.scalability < 7 
                                    ? 'Performance issues with many users' 
                                    : option.cost_analysis.monthly_cost_10x > 1000 
                                    ? 'High costs as you scale' 
                                    : 'Well-balanced for growth')
                              }
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Student Viva Prep */}
                  {userMode === 'student' && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className={`p-6 rounded-xl ${isDark ? 'bg-indigo-900/30 border-indigo-700' : 'bg-indigo-50 border-indigo-200'} border`}
                    >
                      <h3 className={`text-lg font-semibold mb-3 ${isDark ? 'text-indigo-300' : 'text-indigo-900'}`}>
                        🎓 Viva/Interview Preparation
                      </h3>
                      <div className="space-y-3">
                        <div>
                          <strong className={isDark ? 'text-indigo-200' : 'text-indigo-800'}>
                            "Why did you choose {analysis.options[0]?.name}?"
                          </strong>
                          <p className={`text-sm mt-1 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                            "I evaluated multiple options based on project timeline, learning curve, and cost constraints. 
                            {analysis.options[0]?.name} provided the best balance of development speed and educational value."
                          </p>
                        </div>
                        <div>
                          <strong className={isDark ? 'text-indigo-200' : 'text-indigo-800'}>
                            "What are the trade-offs?"
                          </strong>
                          <p className={`text-sm mt-1 ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
                            "While {analysis.options[1]?.name || 'alternatives'} might offer more control, 
                            {analysis.options[0]?.name} reduces complexity and allows me to focus on core functionality 
                            within the project deadline."
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-4 justify-center pt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetAll}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
                    >
                      New Decision
                    </motion.button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <AppFooter 
        isDark={isDark}
        setCurrentView={setCurrentView}
        handleStartQuestions={handleEnterArena}
      />
    </div>
  )
}