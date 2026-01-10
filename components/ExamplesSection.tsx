'use client'

const examples = [
  {
    title: "Student Project",
    description: "Final year computer science project",
    constraints: {
      budget: "$25/month",
      team: "1 developer",
      timeline: "3 months",
      scale: "< 1k users"
    },
    recommendation: "Firebase + React",
    reasoning: "Rapid development with managed backend services, perfect for academic deadlines and learning."
  },
  {
    title: "Startup MVP",
    description: "SaaS platform for small businesses",
    constraints: {
      budget: "$500/month",
      team: "3 developers",
      timeline: "2 months",
      scale: "10k-100k users"
    },
    recommendation: "Next.js + Supabase + Vercel",
    reasoning: "Balanced approach with room for growth, open-source foundation, and excellent developer experience."
  },
  {
    title: "AI Application",
    description: "Machine learning powered analytics tool",
    constraints: {
      budget: "$2000/month",
      team: "5 developers",
      timeline: "6 months",
      scale: "100k+ users"
    },
    recommendation: "Python + FastAPI + AWS",
    reasoning: "AI-first ecosystem with Python's ML libraries, scalable infrastructure, and enterprise reliability."
  },
  {
    title: "E-commerce Platform",
    description: "Online marketplace with payments",
    constraints: {
      budget: "$1000/month",
      team: "4 developers",
      timeline: "4 months",
      scale: "50k users"
    },
    recommendation: "Shopify + React + Stripe",
    reasoning: "E-commerce focused platform with built-in payments, inventory management, and proven scalability."
  }
]

export default function ExamplesSection() {
  const handleTryExample = (example: typeof examples[0]) => {
    // Trigger analysis with pre-filled example data
    window.dispatchEvent(new CustomEvent('startAnalysisWithExample', { 
      detail: example 
    }))
  }

  return (
    <section id="examples" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-World <span className="gradient-text">Examples</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how StackReferee provides tailored recommendations for different project types and constraints
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {examples.map((example, index) => (
            <div 
              key={index}
              className="card-interactive group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {example.title}
                </h3>
                <p className="text-gray-600 mb-4">{example.description}</p>
                
                {/* Constraints */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Budget:</span>
                    <span className="ml-2 text-gray-600">{example.constraints.budget}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Team:</span>
                    <span className="ml-2 text-gray-600">{example.constraints.team}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Timeline:</span>
                    <span className="ml-2 text-gray-600">{example.constraints.timeline}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-gray-700">Scale:</span>
                    <span className="ml-2 text-gray-600">{example.constraints.scale}</span>
                  </div>
                </div>
              </div>
              
              {/* Recommendation */}
              <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-4 mb-4">
                <h4 className="font-semibold text-primary-800 mb-2">
                  Recommended Stack
                </h4>
                <div className="text-lg font-bold text-primary-900 mb-2">
                  {example.recommendation}
                </div>
                <p className="text-sm text-primary-700">
                  {example.reasoning}
                </p>
              </div>
              
              {/* Action Button */}
              <button 
                onClick={() => handleTryExample(example)}
                className="btn-primary w-full group-hover:scale-105 transition-transform duration-200"
              >
                Try This Example
                <svg className="w-4 h-4 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Ready to get personalized recommendations for your project?
          </p>
          <button 
            onClick={() => {
              window.dispatchEvent(new CustomEvent('startAnalysis'))
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            Start Your Custom Analysis
          </button>
        </div>
      </div>
    </section>
  )
}