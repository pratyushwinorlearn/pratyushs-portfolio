import React, { useState, useEffect, useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function InteractiveSofa({ playerState, rigidBodyRef }) {
  const [isNear, setIsNear] = useState(false)
  const [isSitting, setIsSitting] = useState(false)
  const isNearRef = useRef(false) 

  const sofaX = -0.74   
  const sofaZ = -5.6
  const triggerRadius = 1.5

  const playerSitOffsetX = -0.2
  const playerSitOffsetZ = 0.1
  // FIXED: Raised from 0.6 so the capsule bottom doesn't dip under the floor
  const playerSitHeight = 1.4

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'KeyE' && isNearRef.current) {
        setIsSitting((prev) => {
          const nextState = !prev
          playerState.isSitting = nextState 
          
          // FIXED: The Ejection Logic!
          // When standing up, teleport the player slightly forward and up
          // so they don't get trapped inside the Room's trimesh collider.
          if (!nextState && rigidBodyRef.current) {
            rigidBodyRef.current.setNextKinematicTranslation({
              x: sofaX,
              y: 1.5, // Drop slightly from the air so they land cleanly
              z: sofaZ + 1.5 // Teleport them +Z (forward) away from the sofa
            })
          }
          
          return nextState
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState, rigidBodyRef]) // Added rigidBodyRef as dependency

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