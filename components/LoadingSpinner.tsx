'use client'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-16 h-16 border-4 border-primary-200 rounded-full animate-spin"></div>
        {/* Inner spinning element */}
        <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-primary-600 rounded-full animate-spin"></div>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary-600 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text with animated dots */}
      <div className="flex items-center space-x-1">
        <span className="text-gray-600 font-medium">Analyzing</span>
        <div className="flex space-x-1">
          <div className="w-1 h-1 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  )
}