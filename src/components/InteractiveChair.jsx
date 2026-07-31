import React, { useState, useEffect, useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function InteractiveChair({ playerState, rigidBodyRef, setIsUIOpen }) {
  const [isNear, setIsNear] = useState(false)
  const [isSitting, setIsSitting] = useState(false)
  const isNearRef = useRef(false) 

  // 1. CHAIR WORLD POSITION (Where the physical chair stands in the room)
  const chairX = 2.7   
  const chairZ = -4.1
  const triggerRadius = 1.4

  // 2. CHARACTER SITTING OFFSETS (Tweak these to fix overlapping/clipping)
  const playerSitOffsetX = 0.1
  const playerSitOffsetZ = 0.01

  // Load the chair model using your exact folder path inside public/
  const { scene } = useGLTF('/chair/scene.gltf')

  useEffect(() => {
    const handleKeyDown = (e) => {
      
      // ✅ Optional but recommended: Add the input guard here too, 
      // so if they type 'E' in the OS search bar, they don't accidentally stand up!
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'KeyE' && isNearRef.current) {
        setIsSitting((prev) => {
          const nextState = !prev
          playerState.isSitting = nextState
          
          // ✅ 2. THE FIX: If the player is standing up (!nextState), force the OS to close!
          if (!nextState && setIsUIOpen) {
            setIsUIOpen(false)
          }
          
          return nextState
        })
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    // ✅ 3. Add setIsUIOpen to the dependency array
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState, setIsUIOpen])

  useFrame(() => {
    const distX = playerState.position.x - chairX
    const distZ = playerState.position.z - chairZ
    const distance = Math.sqrt(distX * distX + distZ * distZ) 

    const closeEnough = distance < triggerRadius
    if (closeEnough !== isNearRef.current) {
      isNearRef.current = closeEnough
      setIsNear(closeEnough)
    }

    // UPDATED: Deleted the conflicting line and added the sitType flag!
    if (isSitting && rigidBodyRef.current) {
      playerState.isSitting = true 
      playerState.sitType = 'desk' // <-- THIS TELLS PLAYER.JSX TO USE THE TYPING ANIMATION
      
      // Snaps the player to the chair position plus the tuning offsets
      rigidBodyRef.current.setNextKinematicTranslation({
        x: chairX + playerSitOffsetX,
        y: 1.0,  
        z: chairZ + playerSitOffsetZ
      })
    }
  })

  return (
    <group position={[chairX, 0, chairZ]}>
      {/* SOLID PHYSICS COLLIDER: Blocks the player normally, disables when sitting */}
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider 
          args={[0.35, 0.5, 0.35]} 
          disabled={isSitting} 
        />
      </RigidBody>

      {/* 
        Render the 3D chair model. 
      */}
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