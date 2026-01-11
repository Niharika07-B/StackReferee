'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function ThreeJSBackground() {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const animationIdRef = useRef<number>()

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    rendererRef.current = renderer
    
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x000000, 0)
    mountRef.current.appendChild(renderer.domElement)

    // Create floating geometric shapes representing tech stacks
    const geometries = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.7, 8, 6),
      new THREE.ConeGeometry(0.7, 1.5, 6),
      new THREE.OctahedronGeometry(0.8),
      new THREE.TetrahedronGeometry(0.9),
    ]

    const materials = [
      new THREE.MeshBasicMaterial({ 
        color: 0x6366f1, 
        transparent: true, 
        opacity: 0.6,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xd946ef, 
        transparent: true, 
        opacity: 0.4,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0x22c55e, 
        transparent: true, 
        opacity: 0.5,
        wireframe: true 
      }),
      new THREE.MeshBasicMaterial({ 
        color: 0xf59e0b, 
        transparent: true, 
        opacity: 0.3,
        wireframe: true 
      }),
    ]

    const meshes: THREE.Mesh[] = []
    
    // Create multiple floating objects
    for (let i = 0; i < 15; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)]
      const material = materials[Math.floor(Math.random() * materials.length)]
      const mesh = new THREE.Mesh(geometry, material)
      
      // Random positioning
      mesh.position.x = (Math.random() - 0.5) * 20
      mesh.position.y = (Math.random() - 0.5) * 20
      mesh.position.z = (Math.random() - 0.5) * 20
      
      // Random rotation
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.y = Math.random() * Math.PI
      
      scene.add(mesh)
      meshes.push(mesh)
    }

    // Add connecting lines between some objects
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x6366f1, 
      transparent: true, 
      opacity: 0.2 
    })
    
    for (let i = 0; i < 8; i++) {
      const points = []
      const mesh1 = meshes[Math.floor(Math.random() * meshes.length)]
      const mesh2 = meshes[Math.floor(Math.random() * meshes.length)]
      
      points.push(mesh1.position)
      points.push(mesh2.position)
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const line = new THREE.Line(geometry, lineMaterial)
      scene.add(line)
    }

    camera.position.z = 15

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)
      
      // Rotate all meshes
      meshes.forEach((mesh, index) => {
        mesh.rotation.x += 0.005 + index * 0.001
        mesh.rotation.y += 0.003 + index * 0.0005
        
        // Floating motion
        mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01
      })
      
      // Slowly rotate the entire scene
      scene.rotation.y += 0.001
      
      renderer.render(scene, camera)
    }
    
    animate()

    // Handle resize
    const handleResize = () => {
      if (!camera || !renderer) return
      
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', handleResize)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  return (
    <div 
      ref={mountRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  )
}