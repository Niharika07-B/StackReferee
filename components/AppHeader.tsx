'use client'

interface AppHeaderProps {
  currentView: 'arena' | 'questions' | 'results'
  isDark: boolean
  toggleTheme: () => void
  resetAll: () => void
  handleStartQuestions: () => void
}

export default function AppHeader({ 
  currentView, 
  isDark, 
  toggleTheme, 
  resetAll, 
  handleStartQuestions 
}: AppHeaderProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 ${isDark ? 'bg-gray-800/90' : 'bg-white/90'} backdrop-blur-md border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} rounded-xl flex items-center justify-center text-xl`}>
              ⚖️
            </div>
            <div>
              <h1 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>StackReferee</h1>
              <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'} -mt-1`}>Your Technical Decision Judge</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Home Button */}
            {currentView !== 'arena' && (
              <button
                onClick={resetAll}
                className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'} transition-all duration-200`}
                title="Go to Home"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </button>
            )}
            
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg ${isDark ? 'bg-gray-700 text-yellow-400' : 'bg-gray-100 text-gray-600'} hover:scale-110 transition-all duration-200`}
            >
              {isDark ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {/* Start Analysis Button */}
            {currentView === 'arena' && (
              <button
                onClick={handleStartQuestions}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Enter Arena
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}