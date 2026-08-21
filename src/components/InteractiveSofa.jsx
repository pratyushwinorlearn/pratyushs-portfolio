import React, { useState, useEffect, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function InteractiveSofa({ playerState, rigidBodyRef }) {
  const [isNear, setIsNear] = useState(false)
  const [isSitting, setIsSitting] = useState(false)
  const isNearRef = useRef(false) 
  const lastPressTime = useRef(0) // 🚨 NEW: Interaction lock timer

  const sofaX = -0.74   
  const sofaZ = -5.6
  const triggerRadius = 1.5

  const playerSitOffsetX = -0.2
  const playerSitOffsetZ = 0.1
  const playerSitHeight = 1.4

  useEffect(() => {
    const handleKeyDown = (e) => {
      // 🚨 FIX 1: Ignore operating system key repeats
      if (e.repeat) return;

      if (e.code === 'KeyE' && isNearRef.current) {
        
        // 🚨 FIX 2: Strict 500ms debounce lock
        const now = Date.now();
        if (now - lastPressTime.current < 500) return;
        lastPressTime.current = now;

        setIsSitting((prev) => {
          const nextState = !prev
          playerState.isSitting = nextState 
          
          if (!nextState && rigidBodyRef.current) {
            rigidBodyRef.current.setNextKinematicTranslation({
              x: sofaX,
              y: 1.5, 
              z: sofaZ + 1.5 
            })
          }
          
          return nextState
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState, rigidBodyRef])

  useFrame(() => {
    const distX = playerState.position.x - sofaX
    const distZ = playerState.position.z - sofaZ
    const distance = Math.sqrt(distX * distX + distZ * distZ) 

    const closeEnough = distance < triggerRadius
    if (closeEnough !== isNearRef.current) {
      isNearRef.current = closeEnough
      setIsNear(closeEnough)
    }

    if (isSitting && rigidBodyRef.current) {
      playerState.isSitting = true 
      playerState.sitType = 'sofa'
      
      rigidBodyRef.current.setNextKinematicTranslation({
        x: sofaX + playerSitOffsetX,
        y: playerSitHeight,  
        z: sofaZ + playerSitOffsetZ
      })
    }
  })

  return (
    <group position={[sofaX, 0, sofaZ]}>
      {isNear && !isSitting && (
        <Html center position={[0, 1.0, 0]}>
          <div style={{
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '8px',
            border: '2px solid white',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            pointerEvents: 'none',
            whiteSpace: 'nowrap'
          }}>
            [E] Rest on Sofa
          </div>
        </Html>
      )}
    </group>
  )
}