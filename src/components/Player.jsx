import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier'
import * as THREE from 'three'
import CharacterMesh from './CharacterMesh'

// --- tuning knobs ---
const SPEED = 4.2 
const CROUCH_SPEED = 2.0 
const JUMP_FORCE = 6.0 
const GRAVITY = -15.0 
const CAPSULE_HALF_HEIGHT = 0.55 
const CAPSULE_RADIUS = 0.35

export default function Player({ playerState, rigidBodyRef, colliderRef }) {
  const { camera } = useThree()
  const { world } = useRapier()

  const controllerRef = useRef(null)
  const verticalVelocity = useRef(0)
  
  const keys = useRef({ w: false, a: false, s: false, d: false, space: false, shift: false })
  
  const meshGroupRef = useRef()
  const actionRef = useRef('Idle') 

  useEffect(() => {
    const controller = world.createCharacterController(0.02)
    controller.enableAutostep(0.4, 0.2, true)
    controller.enableSnapToGround(0.4)
    controller.setSlideEnabled(true)
    controllerRef.current = controller
    return () => world.removeCharacterController(controller)
  }, [world])

  useEffect(() => {
    const setKey = (code, value) => {
      if (code === 'KeyW') keys.current.w = value
      if (code === 'KeyA') keys.current.a = value
      if (code === 'KeyS') keys.current.s = value
      if (code === 'KeyD') keys.current.d = value
      if (code === 'Space') keys.current.space = value
      if (code === 'ShiftLeft' || code === 'ShiftRight') keys.current.shift = value
    }

    const down = (e) => {
      setKey(e.code, true)
      if (e.code === 'KeyP') {
        console.log(`📍 PLAYER COORDS: X: ${playerState.position.x.toFixed(2)}, Y: ${playerState.position.y.toFixed(2)}, Z: ${playerState.position.z.toFixed(2)}`)
      }
    }

    const up = (e) => setKey(e.code, false)

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [playerState]) 

  useFrame((_, delta) => {
    const rb = rigidBodyRef.current
    const collider = colliderRef.current
    const controller = controllerRef.current
    if (!rb || !collider || !controller) return

    // --- UPGRADED: THE SITTING OVERRIDE ---
    if (playerState.isSitting) {
      
      actionRef.current = playerState.sitType === 'sofa' ? 'mixamo.com.001' : 'sitting' 
      
      const pos = rb.translation()
      playerState.position.set(pos.x, pos.y, pos.z)

      if (meshGroupRef.current) {
        
        // FIXED: Changed the sofa rotation from 0 to -Math.PI / 2 to turn him outward!
        // (If he faces the wall instead of the room, remove the minus sign!)
        meshGroupRef.current.rotation.y = playerState.sitType === 'sofa' ? Math.PI / 2 : Math.PI / 2 
        
        meshGroupRef.current.visible = playerState.mode === 'tpp'
      }
      
      return 
    }
    // --- END SITTING OVERRIDE ---

    // 1. Camera Direction
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()

    // 2. Movement Vector Math
    const move = new THREE.Vector3()
    if (keys.current.w) move.add(forward)
    if (keys.current.s) move.sub(forward)
    if (keys.current.d) move.add(right)
    if (keys.current.a) move.sub(right)
    
    const isMoving = move.lengthSq() > 0
    const currentSpeed = keys.current.shift ? CROUCH_SPEED : SPEED
    
    if (isMoving) move.normalize().multiplyScalar(currentSpeed * delta)

    // 3. Jump & Gravity Logic
    const grounded = controller.computedGrounded && controller.computedGrounded()
    if (grounded) {
      if (keys.current.space) {
        verticalVelocity.current = JUMP_FORCE
      } else {
        verticalVelocity.current = Math.max(verticalVelocity.current, -0.1)
      }
    }
    verticalVelocity.current += GRAVITY * delta
    move.y = verticalVelocity.current * delta

    // 4. Apply Physics
    controller.computeColliderMovement(collider, move)
    const corrected = controller.computedMovement()
    const pos = rb.translation()
    const next = { x: pos.x + corrected.x, y: pos.y + corrected.y, z: pos.z + corrected.z }
    rb.setNextKinematicTranslation(next)
    playerState.position.set(next.x, next.y, next.z)

    // 5. Determine the active animation state
    let nextAction = 'Idle'
    
    if (!grounded) {
      nextAction = 'jumpingcomplete' 
    } 
    else if (keys.current.shift) {
      if (isMoving) {
        if (keys.current.w) nextAction = 'crouching' 
        else if (keys.current.s) nextAction = 'backcrouching' 
        else if (keys.current.a) nextAction = 'leftcrouching' 
        else if (keys.current.d) nextAction = 'rightcrouching'
      } else {
        nextAction = 'crouchidle' 
      }
    } 
    else if (isMoving) {
      if (keys.current.w) nextAction = 'Walk'
      else if (keys.current.s) nextAction = 'Walk' 
      else if (keys.current.a) nextAction = 'leftstrafe' 
      else if (keys.current.d) nextAction = 'rightwalking' 
    }
    
    actionRef.current = nextAction

    // 6. Mesh Rotation (True Strafing Setup)
    if (meshGroupRef.current) {
      meshGroupRef.current.visible = playerState.mode === 'tpp'
      meshGroupRef.current.rotation.y = Math.atan2(forward.x, forward.z)
    }
  })

  return (
    <RigidBody
      ref={rigidBodyRef}
      type="kinematicPosition"
      colliders={false}
      position={[0.6, 2, -3.5]} 
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider ref={colliderRef} args={[CAPSULE_HALF_HEIGHT, CAPSULE_RADIUS]} />
      <group ref={meshGroupRef}>
        <CharacterMesh 
          actionRef={actionRef}
          playerState={playerState}
          position={[0, -CAPSULE_HALF_HEIGHT - CAPSULE_RADIUS, 0]} 
        />
      </group>
    </RigidBody>
  )
}