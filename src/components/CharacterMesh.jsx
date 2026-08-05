import React, { useEffect, useState, useRef } from 'react'
import { useFrame, useGraph, useThree, createPortal } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export default function CharacterMesh({ actionRef, playerState, ...props }) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/swat_guy.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  
  // 🚨 LOAD ROOM GLTF SO WE CAN EXTRACT THE CROWBAR MESH
  const { nodes: roomNodes, materials: roomMaterials } = useGLTF('/control_room_by_amogusstrikesback2/scene.gltf')

  const { camera } = useThree()
  const [currentAnim, setCurrentAnim] = useState('Idle')

  const initialSpineRot = useRef(0)
  const initialHeadRot = useRef(0)
  const hasInitialized = useRef(false)

  useFrame(() => {
    // 1. Crossfade Controller
    if (actionRef?.current && actionRef.current !== currentAnim) {
      setCurrentAnim(actionRef.current)
    }

    // 2. Procedural Head Tracking (IK)
    if (playerState.mode === 'tpp' && nodes.mixamorigSpine2 && nodes.mixamorigHead) {
       
       if (!hasInitialized.current) {
         initialSpineRot.current = nodes.mixamorigSpine2.rotation.x
         initialHeadRot.current = nodes.mixamorigHead.rotation.x
         hasInitialized.current = true
       }

       const dir = new THREE.Vector3()
       camera.getWorldDirection(dir)
       const pitch = Math.asin(dir.y)
       
       nodes.mixamorigSpine2.rotation.x = initialSpineRot.current - (pitch * 0.3)
       nodes.mixamorigHead.rotation.x = initialHeadRot.current - (pitch * 0.7)
    }
  })

  // 3. Animation Mixer
  useEffect(() => {
    const actionName = actions[currentAnim] ? currentAnim : Object.keys(actions)[0]
    const action = actions[actionName]

    if (action) {
      action.reset().fadeIn(0.2).play()
      return () => action.fadeOut(0.2)
    }
  }, [currentAnim, actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          <group name="Ch15">
            <skinnedMesh name="Mesh" geometry={nodes.Mesh.geometry} material={materials.Ch15_body} skeleton={nodes.Mesh.skeleton} />
            <skinnedMesh name="Mesh_1" geometry={nodes.Mesh_1.geometry} material={materials.Ch15_body1} skeleton={nodes.Mesh_1.skeleton} />
          </group>
        </group>
      </group>

      {/* 🚨 THE MAGIC: BONE ATTACHMENT PORTAL */}
      {/* If the player has the crowbar, render it directly inside the Right Hand bone! */}
      {playerState.hasCrowbar && nodes.mixamorigRightHand && createPortal(
        <group 
          // 📐 TWEAK THESE TO FIT PERFECTLY IN HIS PALM:
          // Because the armature is scaled at 0.01, we scale this container group to 100 
          // to normalize it, preventing the crowbar from becoming microscopic.
          scale={100}
          
          // Adjust these offsets to get the grip exactly right in his hand
          position={[0, 8, -5]} 
          rotation={[Math.PI / 2, -Math.PI / 2, 0]} 
        >
          <mesh
            geometry={roomNodes.Object_58.geometry}
            material={roomMaterials.Item_Crowbar_IS8_TXT_Office_Props_Mobile_0_Baked}
            scale={0.012} // Your original preferred visual size
          />
        </group>,
        nodes.mixamorigRightHand // The exact skeleton bone we are attaching it to
      )}
    </group>
  )
}

useGLTF.preload('/swat_guy.glb')
useGLTF.preload('/control_room_by_amogusstrikesback2/scene.gltf')