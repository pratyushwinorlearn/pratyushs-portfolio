import React, { useState, useEffect, useRef } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useFrame } from '@react-three/fiber'

export default function InteractiveChair({ playerState, rigidBodyRef, setIsUIOpen }) {
  const [isNear, setIsNear] = useState(false)
  const [isSitting, setIsSitting] = useState(false)
  
  const [justStoodUp, setJustStoodUp] = useState(false)
  
  const isNearRef = useRef(false) 
  const lastPressTime = useRef(0) // 🚨 NEW: Interaction lock timer

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
          
          if (!nextState) {
            // 🧍 STANDING UP:
            if (setIsUIOpen) setIsUIOpen(false)
            setJustStoodUp(true)
            // 🚨 RACE FIX: don't call rigidBodyRef directly from this raw
            // DOM event handler — that competes with Player.jsx's own
            // useFrame for who last calls setNextKinematicTranslation
            // before Rapier's next physics step consumes it. Hand off
            // the eject *intent* via playerState instead; Player.jsx
            // (the only file that ever touches the rigid body's
            // kinematic translation) applies it once, at the correct
            // point in its own frame loop.
            playerState.pendingTeleport = { x: chairX - 1.0, y: 1.2, z: chairZ }
          } else {
            // 🪑 SITTING DOWN:
            setJustStoodUp(false) 
            
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