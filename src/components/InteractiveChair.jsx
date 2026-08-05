import React, { useState, useEffect, useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function InteractiveChair({ playerState, rigidBodyRef, setIsUIOpen }) {
  const [isNear, setIsNear] = useState(false)
  const [isSitting, setIsSitting] = useState(false)
  
  // Keeps the chair non-solid temporarily when you stand up
  const [justStoodUp, setJustStoodUp] = useState(false)
  
  const isNearRef = useRef(false) 

  const chairX = 2.7   
  const chairZ = -4.1
  const triggerRadius = 1

  const playerSitOffsetX = 0.1
  const playerSitOffsetZ = 0.01

  const { scene } = useGLTF('/chair/scene.gltf')

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'KeyE' && isNearRef.current) {
        setIsSitting((prev) => {
          const nextState = !prev
          playerState.isSitting = nextState
          
          if (!nextState) {
            // 🧍 STANDING UP:
            if (setIsUIOpen) setIsUIOpen(false)
            
            // Activate the "ghost" phase so you don't get stuck!
            setJustStoodUp(true)
          } else {
            // 🪑 SITTING DOWN:
            setJustStoodUp(false) // Reset just in case
            
            if (rigidBodyRef.current) {
              playerState.sitType = 'desk'
              rigidBodyRef.current.setNextKinematicTranslation({
                x: chairX + playerSitOffsetX,
                y: 1.0,
                z: chairZ + playerSitOffsetZ
              })
            }
          }
          
          return nextState
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState, setIsUIOpen, rigidBodyRef])

  useFrame(() => {
    const distX = playerState.position.x - chairX
    const distZ = playerState.position.z - chairZ
    const distance = Math.sqrt(distX * distX + distZ * distZ) 

    const closeEnough = distance < triggerRadius
    if (closeEnough !== isNearRef.current) {
      isNearRef.current = closeEnough
      setIsNear(closeEnough)
      
      // Once you walk away from the chair, it becomes solid again!
      if (!closeEnough) {
        setJustStoodUp(false)
      }
    }

    if (isSitting) {
      playerState.isSitting = true 
      playerState.sitType = 'desk' 
    }
  })

  return (
    <group position={[chairX, 0, chairZ]}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider 
          args={[0.35, 0.5, 0.35]} 
          disabled={isSitting || justStoodUp} 
        />
      </RigidBody>

      <primitive 
        object={scene} 
        scale={0.011} 
        position={[0, 0, 0]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />

      {isNear && !isSitting && (
        <Html center position={[0, 1.2, 0]}>
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
            [E] Sit at Desk
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/chair/scene.gltf')