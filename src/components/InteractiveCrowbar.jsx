import React, { useRef, useState, useEffect } from 'react'
import { Html, useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const defaultCrowbarPos = new THREE.Vector3(-1.821, 0.895, -3.376)
const triggerRadius = 1.2

export default function InteractiveCrowbar({ playerState }) {
  const { nodes, materials } = useGLTF('/control_room_by_amogusstrikesback2/scene.gltf')
  const [isNear, setIsNear] = useState(false)
  const [isPickedUp, setIsPickedUp] = useState(false)
  
  // Track where the crowbar currently lives in the room world space
  const [currentPos, setCurrentPos] = useState(defaultCrowbarPos)
  const isNearRef = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      
      // 🟢 PICK UP WITH [ E ]
      if (e.code === 'KeyE' && isNearRef.current && !playerState.hasCrowbar) {
        playerState.hasCrowbar = true
        setIsPickedUp(true)
      }

      // 🔴 DROP WITH [ G ]
      if (e.code === 'KeyG' && playerState.hasCrowbar) {
        playerState.hasCrowbar = false
        setIsPickedUp(false)

        // Drop it cleanly on the floor right in front of the player's current position
        const dropPos = playerState.position.clone()
        dropPos.y = 0.05 // Floor level height
        setCurrentPos(dropPos)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState])

  useFrame(() => {
    // Sync local pickup state with global inventory
    if (isPickedUp !== !!playerState.hasCrowbar) {
      setIsPickedUp(!!playerState.hasCrowbar)
    }

    if (playerState.hasCrowbar) return

    const distX = playerState.position.x - currentPos.x
    const distZ = playerState.position.z - currentPos.z
    const distance = Math.sqrt(distX * distX + distZ * distZ)

    const closeEnough = distance < triggerRadius
    if (closeEnough !== isNearRef.current) {
      isNearRef.current = closeEnough
      setIsNear(closeEnough)
    }
  })

  return (
    <group position={[currentPos.x, currentPos.y, currentPos.z]} rotation={[-Math.PI / 2, 0, 0]} scale={0.01} visible={!isPickedUp}>
      <mesh geometry={nodes.Object_58.geometry} material={materials.Item_Competition_IS8_TXT_Office_Props_Mobile_0_Baked || materials.Item_Crowbar_IS8_TXT_Office_Props_Mobile_0_Baked} />
      {isNear && !isPickedUp && (
        <Html center position={[0, 30, 0]}>
          <div style={{
            background: 'rgba(0,0,0,0.8)', color: 'white', padding: '8px 16px',
            borderRadius: '8px', border: '2px solid white', fontFamily: 'monospace',
            fontWeight: 'bold', pointerEvents: 'none', whiteSpace: 'nowrap'
          }}>
            [E] Pick Up Crowbar
          </div>
        </Html>
      )}
    </group>
  )
}

useGLTF.preload('/control_room_by_amogusstrikesback2/scene.gltf')