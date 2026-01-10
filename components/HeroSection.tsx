'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useAppStore } from '@/lib/store'

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
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
  
  useEffect(() => {
    if (!canvasRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 800 / 400, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true, 
      antialias: true 
    })
    
    renderer.setSize(800, 400)
    renderer.setClearColor(0x000000, 0)

    // Create a network of connected nodes representing tech decisions
    const nodeGeometry = new THREE.SphereGeometry(0.1, 8, 6)
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x6366f1 })
    const nodes: THREE.Mesh[] = []
    
    // Create decision tree structure
    const positions = [
      { x: 0, y: 2, z: 0 },      // Root decision
      { x: -2, y: 0, z: 0 },     // Option A
      { x: 2, y: 0, z: 0 },      // Option B
      { x: 0, y: 0, z: 0 },      // Option C
      { x: -3, y: -2, z: 0 },    // Sub-option A1
      { x: -1, y: -2, z: 0 },    // Sub-option A2
      { x: 1, y: -2, z: 0 },     // Sub-option B1
      { x: 3, y: -2, z: 0 },     // Sub-option B2
    ]
    
    positions.forEach((pos, index) => {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone())
      node.position.set(pos.x, pos.y, pos.z)
      
      // Different colors for different levels
      if (index === 0) {
        (node.material as THREE.MeshBasicMaterial).color.setHex(0xd946ef) // Root - purple
      } else if (index < 4) {
        (node.material as THREE.MeshBasicMaterial).color.setHex(0x22c55e) // Main options - green
      } else {
        (node.material as THREE.MeshBasicMaterial).color.setHex(0xf59e0b) // Sub-options - orange
      }
      
      scene.add(node)
      nodes.push(node)
    })

    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x6366f1, 
      transparent: true, 
      opacity: 0.6 
    })
    
    const connections = [
      [0, 1], [0, 2], [0, 3], // Root to main options
      [1, 4], [1, 5],         // Option A to sub-options
      [2, 6], [2, 7],         // Option B to sub-options
    ]
    
    connections.forEach(([start, end]) => {
      const points = [nodes[start].position, nodes[end].position]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      scene.add(line)
    })

    // Add floating particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleCount = 50
    const positions3 = new Float32Array(particleCount * 3)
    
    for (let i = 0; i < particleCount * 3; i++) {
      positions3[i] = (Math.random() - 0.5) * 10
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions3, 3))
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0x6366f1, 
      size: 0.05,
      transparent: true,
      opacity: 0.6
    })
    const particles = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particles)

    camera.position.z = 6
    camera.position.y = 0.5

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      
      // Pulse nodes
      nodes.forEach((node, index) => {
        const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.3
        node.scale.setScalar(scale)
      })
      
      // Rotate particles
      particles.rotation.y += 0.002
      
      // Gentle scene rotation
      scene.rotation.y = Math.sin(Date.now() * 0.0005) * 0.1
      
      renderer.render(scene, camera)
    }
    
    animate()

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
      renderer.dispose()
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50" />
      
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-tech-pattern opacity-30" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">StackReferee</span>
            </h1>
            <p className="text-2xl lg:text-3xl text-gray-600 mb-4 font-light">
              An AI Tech Stack Decision Engine
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl">
              Get neutral, expert guidance on choosing the right technology stack for your project. 
              No single "best" answers—just clear trade-offs and informed recommendations.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button onClick={handleStartAnalysis} className="btn-primary text-lg px-8 py-4 animate-glow">
                Start Your Analysis
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <button 
                onClick={() => {
                  const element = document.getElementById('examples')
                  element?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-secondary text-lg px-8 py-4"
              >
                View Examples
              </button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">500+</div>
                <div className="text-sm text-gray-500">Decisions Made</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent-600">50+</div>
                <div className="text-sm text-gray-500">Tech Stacks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success-600">95%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
            </div>
          </div>
          
          {/* Three.js Visualization */}
          <div className="flex justify-center lg:justify-end animate-float">
            <div className="relative">
              <canvas 
                ref={canvasRef}
                className="rounded-2xl shadow-2xl bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border border-white/20"
                width={800}
                height={400}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-success-500 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}