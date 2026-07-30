import React, { useEffect, useState, useRef } from 'react'
import { useFrame, useGraph, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export default function CharacterMesh({ actionRef, playerState, ...props }) {
  const group = React.useRef()
  const { scene, animations } = useGLTF('/swat_guy.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)
  
  const { camera } = useThree()
  const [currentAnim, setCurrentAnim] = useState('Idle')

  // --- NEW: Memory bank for the original bone rotations ---
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
       
       // Capture the safe, default rotation on the very first frame
       if (!hasInitialized.current) {
         initialSpineRot.current = nodes.mixamorigSpine2.rotation.x
         initialHeadRot.current = nodes.mixamorigHead.rotation.x
         hasInitialized.current = true
       }

       const dir = new THREE.Vector3()
       camera.getWorldDirection(dir)
       const pitch = Math.asin(dir.y)
       
       // Set the rotation absolutely based on the baseline, NEVER cumulatively!
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
    </group>
  )
}

useGLTF.preload('/swat_guy.glb')