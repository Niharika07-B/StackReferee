'use client'

import { useEffect, useRef } from 'react'

interface GalaxyBackgroundProps {
  isDark?: boolean
}

export default function GalaxyBackground({ isDark = true }: GalaxyBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationIdRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Only show stars in dark mode - light mode gets lower opacity
    const showStars = isDark

    // Cosmic neutral star system
    const stars: Array<{
      x: number
      y: number
      size: number
      opacity: number
      twinkleSpeed: number
      baseOpacity: number
    }> = []

    // Shooting stars - elegant and rare
    const shootingStars: Array<{
      x: number
      y: number
      length: number
      speed: number
      angle: number
      opacity: number
      life: number
      maxLife: number
    }> = []

    // Create cosmic neutral stars
    for (let i = 0; i < (showStars ? 80 : 40); i++) {
      const baseOpacity = Math.random() * 0.5 + 0.3
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        twinkleSpeed: Math.random() * 0.01 + 0.003
      })
    }

    // Create cosmic shooting stars - rare and elegant
    const createShootingStar = () => {
      if (Math.random() < (showStars ? 0.001 : 0.0005)) { // Less frequent in light mode
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height * 0.4,
          length: Math.random() * 100 + 50,
          speed: Math.random() * 6 + 4,
          angle: Math.random() * Math.PI / 6 + Math.PI / 12,
          opacity: 1,
          life: 0,
          maxLife: Math.random() * 120 + 80
        })
      }
    }

    // Cosmic neutral animation loop
    const animate = () => {
      // Gentle fade for smooth trails
      if (isDark) {
        ctx.fillStyle = 'rgba(11, 16, 32, 0.05)'
      } else {
        ctx.fillStyle = 'rgba(244, 246, 255, 0.08)'
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw cosmic neutral stars
      stars.forEach(star => {
        // Gentle twinkling
        star.opacity = star.baseOpacity + Math.sin(Date.now() * star.twinkleSpeed) * 0.3
        star.opacity = Math.max(0.1, Math.min(0.8, star.opacity))

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        
        if (isDark) {
          // Soft cosmic white - never pure white
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`
        } else {
          // Cosmic neutral for light mode
          ctx.fillStyle = `rgba(11, 16, 32, ${star.opacity * 0.4})`
        }
        
        ctx.fill()

        // Cosmic glow for larger stars
        if (star.size > 1.2) {
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2)
          
          if (isDark) {
            // Cosmic blue glow
            ctx.fillStyle = `rgba(180, 200, 255, ${star.opacity * 0.15})`
          } else {
            ctx.fillStyle = `rgba(91, 140, 255, ${star.opacity * 0.08})`
          }
          
          ctx.fill()
        }
      })

      // Create new shooting stars
      createShootingStar()

      // Draw and animate shooting stars
      shootingStars.forEach((star, index) => {
        star.life++
        star.x += Math.cos(star.angle) * star.speed
        star.y += Math.sin(star.angle) * star.speed

        // Fade out over time
        star.opacity = 1 - (star.life / star.maxLife)

        if (star.life > star.maxLife || star.x > canvas.width || star.y > canvas.height) {
          shootingStars.splice(index, 1)
          return
        }

        // Draw cosmic neutral shooting star trail
        const gradient = ctx.createLinearGradient(
          star.x, star.y,
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        
        if (isDark) {
          // Cosmic neutral gradient - soft whites and blues
          gradient.addColorStop(0, `rgba(255, 255, 255, ${star.opacity * 0.6})`)
          gradient.addColorStop(0.3, `rgba(180, 200, 255, ${star.opacity * 0.8})`)
          gradient.addColorStop(0.7, `rgba(91, 140, 255, ${star.opacity * 0.4})`)
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
        } else {
          // Light mode cosmic gradient
          gradient.addColorStop(0, `rgba(91, 140, 255, ${star.opacity * 0.8})`)
          gradient.addColorStop(0.3, `rgba(139, 124, 246, ${star.opacity * 0.6})`)
          gradient.addColorStop(0.7, `rgba(11, 16, 32, ${star.opacity * 0.3})`)
          gradient.addColorStop(1, 'rgba(91, 140, 255, 0)')
        }

        ctx.beginPath()
        ctx.moveTo(star.x, star.y)
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.length,
          star.y - Math.sin(star.angle) * star.length
        )
        ctx.strokeStyle = gradient
        ctx.lineWidth = 2.2
        ctx.stroke()

        // Draw cosmic star head
        ctx.beginPath()
        ctx.arc(star.x, star.y, 2.2, 0, Math.PI * 2)
        
        if (isDark) {
          ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.6})`
        } else {
          ctx.fillStyle = `rgba(91, 140, 255, ${star.opacity * 0.9})`
        }
        ctx.fill()

        // Cosmic glow around head
        ctx.beginPath()
        ctx.arc(star.x, star.y, 7, 0, Math.PI * 2)
        
        if (isDark) {
          ctx.fillStyle = `rgba(180, 200, 255, ${star.opacity * 0.3})`
        } else {
          ctx.fillStyle = `rgba(91, 140, 255, ${star.opacity * 0.2})`
        }
        ctx.fill()
      })

      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isDark])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -10 }}
    />
  )
}