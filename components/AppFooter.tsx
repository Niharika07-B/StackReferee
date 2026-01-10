'use client'

interface AppFooterProps {
  isDark: boolean
  setCurrentView: (view: 'arena' | 'questions' | 'results') => void
  handleStartQuestions: () => void
}

export default function AppFooter({ isDark, setCurrentView, handleStartQuestions }: AppFooterProps) {
  return (
    <footer className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-t mt-16`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${isDark ? 'bg-blue-600' : 'bg-blue-500'} rounded-xl flex items-center justify-center text-xl`}>
                ⚖️
              </div>
              <div>
                <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>StackReferee</h3>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Your Technical Decision Judge</p>
              </div>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mb-6 max-w-md`}>
              Make technology decisions you won't regret in 6 months. 
              Get AI-powered guidance tailored for students and startups.
            </p>
            <div className="flex items-center space-x-4">
              <div className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-lg border border-green-300">
                🆓 Always Free
              </div>
              <div className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-lg border border-blue-300">
                🤖 AI-Powered
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCurrentView('arena')}
                  className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200 text-left`}
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={handleStartQuestions}
                  className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200 text-left`}
                >
                  Enter Arena
                </button>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Tech Stack Guide
                </a>
              </li>
              <li>
                <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Best Practices
                </a>
              </li>
              <li>
                <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors duration-200`}>
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={`border-t ${isDark ? 'border-gray-700' : 'border-gray-200'} mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            © 2024 StackReferee. Built for real technical decisions, not demos.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm transition-colors duration-200`}>
              Privacy Policy
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm transition-colors duration-200`}>
              Terms of Service
            </a>
            <a href="#" className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} text-sm transition-colors duration-200`}>
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}