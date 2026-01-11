'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const steps = [
  {
    number: '01',
    title: 'Define Your Context',
    description: 'Tell us about your project type, team size, budget, and timeline. The more context, the better our recommendations.',
    icon: '📝'
  },
  {
    number: '02',
    title: 'AI Analysis',
    description: 'Our AI referee analyzes your constraints against hundreds of technology combinations and real-world scenarios.',
    icon: '🤖'
  },
  {
    number: '03',
    title: 'Compare Options',
    description: 'Review 2-3 carefully selected tech stack options with detailed trade-off analysis and scoring across multiple dimensions.',
    icon: '⚖️'
  },
  {
    number: '04',
    title: 'Make Your Decision',
    description: 'Get actionable recommendations and future migration paths. Make confident decisions with expert guidance.',
    icon: '✅'
  }
]

export default function HowItWorksSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 600 / 400, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    })
    
    renderer.setSize(600, 400)
    renderer.setClearColor(0x000000, 0)

    // Create a flow diagram
    const stepGeometry = new THREE.RingGeometry(0.3, 0.5, 8)
    const stepMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x6366f1, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xf59e0b, transparent: true, opacity: 0.8 }),
      new THREE.MeshBasicMaterial({ color: 0xd946ef, transparent: true, opacity: 0.8 }),
    ]
    
    const stepMeshes: THREE.Mesh[] = []
    const stepPositions = [
      { x: -3, y: 1, z: 0 },
      { x: -1, y: -1, z: 0 },
      { x: 1, y: 1, z: 0 },
      { x: 3, y: -1, z: 0 },
    ]
    
    stepPositions.forEach((pos, index) => {
      const mesh = new THREE.Mesh(stepGeometry, stepMaterials[index])
      mesh.position.set(pos.x, pos.y, pos.z)
      scene.add(mesh)
      stepMeshes.push(mesh)
    })

    // Create flow arrows
    const arrowGeometry = new THREE.ConeGeometry(0.1, 0.3, 4)
    const arrowMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x6366f1, 
      transparent: true, 
      opacity: 0.6 
    })
    
    for (let i = 0; i < stepPositions.length - 1; i++) {
      const arrow = new THREE.Mesh(arrowGeometry, arrowMaterial)
      const start = stepPositions[i]
      const end = stepPositions[i + 1]
      
      arrow.position.set(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2,
        0
      )
      
      // Point arrow towards next step
      const direction = new THREE.Vector3(end.x - start.x, end.y - start.y, 0).normalize()
      arrow.lookAt(arrow.position.clone().add(direction))
      arrow.rotateX(Math.PI / 2)
      
      scene.add(arrow)
    }

    // Add data flow particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 30
    const positions = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 8
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0x6366f1, 
      size: 0.03,
      transparent: true,
      opacity: 0.4
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 6

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Pulse steps
      stepMeshes.forEach((mesh, index) => {
        const scale = 1 + Math.sin(Date.now() * 0.002 + index * 0.5) * 0.2
        mesh.scale.setScalar(scale)
        mesh.rotation.z += 0.01
      })
      
      // Flow particles
      particles.rotation.z += 0.005
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      renderer.dispose()
    }
  }, [])

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How <span className="gradient-text">StackReferee</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Four simple steps to make confident technology decisions
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="flex items-start space-x-6 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{step.icon}</span>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Three.js Visualization */}
          <div className="flex justify-center animate-float">
            <div className="relative">
              <canvas 
                ref={canvasRef}
                className="rounded-2xl shadow-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20"
                width={600}
                height={400}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div className="absolute top-4 right-4 w-4 h-4 bg-success-500 rounded-full animate-pulse" />
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
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
            className="btn-primary text-lg px-8 py-4 mr-4"
          >
            Try It Now
          </button>
          <button 
            onClick={() => {
              // Scroll to hero section to see the demo
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="btn-secondary text-lg px-8 py-4"
          >
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  )
}