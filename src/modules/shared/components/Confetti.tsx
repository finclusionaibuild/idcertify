import React, { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  rotation: number
  scale: number
  color: string
  velocity: {
    x: number
    y: number
    rotation: number
  }
}

interface ConfettiProps {
  isActive: boolean
  duration?: number
  particleCount?: number
  colors?: string[]
}

const Confetti: React.FC<ConfettiProps> = ({
  isActive,
  duration = 3000,
  particleCount = 150,
  colors = [
    '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
    '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43',
    '#10ac84', '#ee5a24', '#2f3542', '#747d8c', '#ff6348'
  ]
}) => {
  const [particles, setParticles] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    // Create confetti particles
    const newParticles: ConfettiPiece[] = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -20,
      rotation: Math.random() * 360,
      scale: Math.random() * 0.5 + 0.5,
      color: colors[Math.floor(Math.random() * colors.length)],
      velocity: {
        x: (Math.random() - 0.5) * 8,
        y: Math.random() * 3 + 2,
        rotation: (Math.random() - 0.5) * 10
      }
    }))

    setParticles(newParticles)

    // Animation loop
    const startTime = Date.now()
    const animate = () => {
      const elapsed = Date.now() - startTime
      
      if (elapsed < duration) {
        setParticles(prev => 
          prev.map(particle => ({
            ...particle,
            x: particle.x + particle.velocity.x,
            y: particle.y + particle.velocity.y,
            rotation: particle.rotation + particle.velocity.rotation,
            velocity: {
              ...particle.velocity,
              y: particle.velocity.y + 0.1, // gravity
              x: particle.velocity.x * 0.99 // air resistance
            }
          }))
        )
        requestAnimationFrame(animate)
      } else {
        setParticles([])
      }
    }

    requestAnimationFrame(animate)
  }, [isActive, duration, particleCount, colors])

  if (!isActive || particles.length === 0) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[9998] overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: particle.x,
            top: particle.y,
            transform: `rotate(${particle.rotation}deg) scale(${particle.scale})`,
            backgroundColor: particle.color,
            boxShadow: `0 0 4px ${particle.color}`,
            transition: 'none'
          }}
        />
      ))}
    </div>
  )
}

export default Confetti
