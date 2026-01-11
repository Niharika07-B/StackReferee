'use client'

const features = [
  {
    icon: '🎯',
    title: 'Neutral Decision Making',
    description: 'No biased recommendations. We compare options objectively based on your specific constraints and requirements.',
    color: 'from-primary-500 to-primary-600'
  },
  {
    icon: '⚖️',
    title: 'Trade-off Analysis',
    description: 'Understand what you gain and lose with each technology choice. Make informed decisions with full transparency.',
    color: 'from-accent-500 to-accent-600'
  },
  {
    icon: '🚀',
    title: 'Context-Aware Recommendations',
    description: 'Tailored advice based on your budget, team size, timeline, and scale requirements. One size doesn\'t fit all.',
    color: 'from-success-500 to-success-600'
  },
  {
    icon: '🔮',
    title: 'Future Migration Paths',
    description: 'Plan for growth with clear upgrade and migration strategies. Know when and how to evolve your stack.',
    color: 'from-warning-500 to-warning-600'
  },
  {
    icon: '📊',
    title: 'Visual Comparisons',
    description: 'Interactive charts and scorecards make complex technical decisions easy to understand and communicate.',
    color: 'from-blue-500 to-blue-600'
  },
  {
    icon: '⚡',
    title: 'Real-time Analysis',
    description: 'Get instant recommendations powered by AI that understands the latest technology trends and best practices.',
    color: 'from-purple-500 to-purple-600'
  }
]

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose <span className="gradient-text">StackReferee</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built for companies and students who need to make real technical decisions with confidence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="card-interactive group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <button 
            onClick={() => {
              const element = document.getElementById('analysis-form')
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
              } else {
                // Trigger form if not visible
                window.dispatchEvent(new CustomEvent('startAnalysis'))
              }
            }}
            className="btn-primary text-lg px-8 py-4"
          >
            Experience the Difference
          </button>
        </div>
      </div>
    </section>
  )
}