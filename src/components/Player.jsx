import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { RigidBody, CapsuleCollider, useRapier } from '@react-three/rapier'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import CharacterMesh from './CharacterMesh'

const SPEED = 1.6 
const CROUCH_SPEED = 0.8 
const JUMP_FORCE = 4.0 // 🚨 FIX: Increased from 2.5 so indoor jump animation has time to play
const GRAVITY = -15.0 
const CAPSULE_HALF_HEIGHT = 0.55 
const CAPSULE_RADIUS = 0.35
const STAND_EYE_OFFSET = 0.8
const CROUCH_EYE_OFFSET = -0.15

export default function Player({ playerState, rigidBodyRef, colliderRef }) {
  const { camera } = useThree()
  const { world } = useRapier()

  const { nodes, materials } = useGLTF('/control_room_by_amogusstrikesback2/scene.gltf')

  const controllerRef = useRef(null)
  const verticalVelocity = useRef(0)
  const keys = useRef({ w: false, a: false, s: false, d: false, space: false, shift: false })
  
  const meshGroupRef = useRef()
  const actionRef = useRef('Idle') 

  const weaponContainerRef = useRef()
  const weaponMeshRef = useRef()
  const isAttackingRef = useRef(false)
  const attackTimeRef = useRef(0)
  
  const spawnGraceTimer = useRef(0)
  const wasSitting = useRef(false)
  const standUpGraceTimer = useRef(0)

  const virtualPos = useRef(new THREE.Vector3(0.6, 2, -3.5))
  const lastPhysicsPos = useRef(new THREE.Vector3(0.6, 2, -3.5))

  useEffect(() => {
    const controller = world.createCharacterController(0.02)
    controller.enableAutostep(0.4, 0.2, true)
    controller.enableSnapToGround(0.4)
    controller.setSlideEnabled(true)
    controllerRef.current = controller
    return () => {
      try { world.removeCharacterController(controller) } catch (err) {}
    }
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

    const down = (e) => setKey(e.code, true)
    const up = (e) => setKey(e.code, false)

    const handleMouseDown = (e) => {
      if (e.button === 0 && playerState.hasCrowbar && document.pointerLockElement) {
        if (!isAttackingRef.current) {
          isAttackingRef.current = true
          attackTimeRef.current = 0
        }
      }
    }

    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('mousedown', handleMouseDown)
    
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [playerState]) 

  useFrame((_, delta) => {
    const rb = rigidBodyRef.current
    const collider = colliderRef.current
    const controller = controllerRef.current
    if (!rb || !collider || !controller) return

    if (playerState.isSitting) {
      wasSitting.current = true;
      standUpGraceTimer.current = 0.2; 

      verticalVelocity.current = 0 
      actionRef.current = playerState.sitType === 'sofa' ? 'mixamo.com.001' : 'sitting' 
      const pos = rb.translation()
      
      virtualPos.current.set(pos.x, pos.y, pos.z)
      lastPhysicsPos.current.set(pos.x, pos.y, pos.z)
      
      playerState.position.set(pos.x, pos.y, pos.z)
      if (meshGroupRef.current) {
        meshGroupRef.current.rotation.y = Math.PI / 2 
        meshGroupRef.current.visible = playerState.mode === 'tpp'
      }
      if (weaponContainerRef.current) weaponContainerRef.current.visible = false
      return 
    }

    if (standUpGraceTimer.current > 0) {
      standUpGraceTimer.current -= delta;
      const pos = rb.translation();
      virtualPos.current.set(pos.x, pos.y, pos.z);
      lastPhysicsPos.current.set(pos.x, pos.y, pos.z);
      playerState.position.set(pos.x, pos.y, pos.z);
      return;
    }

    wasSitting.current = false;

    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)
    forward.y = 0
    forward.normalize()
    const right = new THREE.Vector3().crossVectors(forward, camera.up).normalize()

    const move = new THREE.Vector3()
    
    if (keys.current.w) move.add(forward)
    if (keys.current.s) move.sub(forward)
    if (keys.current.d) move.add(right)
    if (keys.current.a) move.sub(right)
    
    const joyY = playerState.moveVector?.y || 0
    const joyX = playerState.moveVector?.x || 0

    if (joyY !== 0) move.addScaledVector(forward, joyY)
    if (joyX !== 0) move.addScaledVector(right, joyX)
    
    const isMoving = move.lengthSq() > 0
    const currentSpeed = (keys.current.shift || playerState.isCrouching) ? CROUCH_SPEED : SPEED
    if (isMoving) move.normalize().multiplyScalar(currentSpeed * delta)

    const grounded = controller.computedGrounded && controller.computedGrounded()
    
    spawnGraceTimer.current += delta
    const isSpawnGrace = spawnGraceTimer.current < 0.5

    const pos = rb.translation()
    const isOutside = pos.z > -1.5 || pos.x > 4.5 || pos.x < -3.0 || pos.z < -6.5
    
    const activeGravity = isOutside ? (GRAVITY / 6) : GRAVITY
    
    // 🚨 Modified so moon jump isn't completely broken by the new higher JUMP_FORCE
    const activeJumpForce = isOutside ? (JUMP_FORCE * 1.3) : JUMP_FORCE

    if (grounded) {
      if (keys.current.space) verticalVelocity.current = activeJumpForce
      else verticalVelocity.current = Math.max(verticalVelocity.current, -0.1)
    } else if (!isSpawnGrace) {
      verticalVelocity.current += activeGravity * delta
      verticalVelocity.current = Math.max(verticalVelocity.current, -20.0)
    } else {
      verticalVelocity.current = 0 
    }
    
    move.y = verticalVelocity.current * delta

    controller.computeColliderMovement(collider, move)
    const corrected = controller.computedMovement()

    const isPhysicsStep = pos.x !== lastPhysicsPos.current.x || pos.y !== lastPhysicsPos.current.y || pos.z !== lastPhysicsPos.current.z
    
    if (isPhysicsStep) {
      virtualPos.current.set(pos.x, pos.y, pos.z)
      lastPhysicsPos.current.set(pos.x, pos.y, pos.z)
    }

    virtualPos.current.x += corrected.x
    virtualPos.current.y += corrected.y
    virtualPos.current.z += corrected.z

    rb.setNextKinematicTranslation(virtualPos.current)
    playerState.position.set(virtualPos.current.x, virtualPos.current.y, virtualPos.current.z)
    
    const attackDuration = 0.8; 
    if (isAttackingRef.current) {
      attackTimeRef.current += delta;
      if (attackTimeRef.current >= attackDuration) {
        isAttackingRef.current = false;
        attackTimeRef.current = 0;
      }
    }

    let nextAction = 'Idle'
    
    const isMovingForward = keys.current.w || joyY > 0.1
    const isMovingBackward = keys.current.s || joyY < -0.1
    const isMovingLeft = keys.current.a || joyX < -0.1
    const isMovingRight = keys.current.d || joyX > 0.1
    
    if (!grounded) {
      nextAction = 'jumpingcomplete' 
    } 
    else if (isAttackingRef.current && playerState.hasCrowbar) {
      nextAction = 'meleeattack' 
    }
    else if (keys.current.shift || playerState.isCrouching) {
      if (isMoving) {
        if (isMovingForward) nextAction = 'crouching' 
        else if (isMovingBackward) nextAction = 'backcrouching' 
        else if (isMovingLeft) nextAction = 'leftcrouching' 
        else if (isMovingRight) nextAction = 'rightcrouching'
      } else {
        nextAction = 'crouchidle' 
      }
    } 
    else if (isMoving) {
      if (playerState.hasCrowbar) {
        if (isMovingForward) nextAction = 'walkforwardmelee'
        else if (isMovingBackward) nextAction = 'walkbackmelee' 
        else if (isMovingLeft) nextAction = 'walkleftmelee' 
        else if (isMovingRight) nextAction = 'walkrightmelee' 
      } else {
        if (isMovingForward || isMovingBackward) nextAction = 'Walk'
        else if (isMovingLeft) nextAction = 'leftstrafe' 
        else if (isMovingRight) nextAction = 'rightwalking' 
      }
    } else {
      nextAction = playerState.hasCrowbar ? 'standingidlemelee' : 'Idle'
    }
    
    actionRef.current = nextAction

    if (meshGroupRef.current) {
      meshGroupRef.current.visible = playerState.mode === 'tpp'
      meshGroupRef.current.rotation.y = Math.atan2(forward.x, forward.z)
    }

    if (weaponContainerRef.current && weaponMeshRef.current) {
      const showWeapon = !!playerState.hasCrowbar && playerState.mode === 'fpp' && !playerState.isSitting
      weaponContainerRef.current.visible = showWeapon

      if (showWeapon) {
        const headPos = playerState.position.clone()
        headPos.y += (keys.current.shift || playerState.isCrouching) ? CROUCH_EYE_OFFSET : STAND_EYE_OFFSET
        
        weaponContainerRef.current.position.copy(headPos)
        weaponContainerRef.current.quaternion.copy(camera.quaternion)
        
        weaponContainerRef.current.translateX(0.3)
        weaponContainerRef.current.translateY(-0.4)
        weaponContainerRef.current.translateZ(-0.4)

        if (isAttackingRef.current) {
          const progress = attackTimeRef.current / attackDuration
          const swing = Math.sin(progress * Math.PI) * 1.5 
          weaponMeshRef.current.rotation.x = (-Math.PI / 2) - swing 
        } else {
          weaponMeshRef.current.rotation.x = -Math.PI / 2 
        }
      }
    }
  })

  return (
    <>
      <RigidBody
        ref={rigidBodyRef}
        type="kinematicPosition"
        colliders={false}
        position={[0.6, 2, -4.2]} 
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

      <group ref={weaponContainerRef} visible={false}>
        <mesh
          ref={weaponMeshRef}
          geometry={nodes.Object_58.geometry}
          material={materials.Item_Crowbar_IS8_TXT_Office_Props_Mobile_0_Baked}
          scale={0.012} 
          rotation={[Math.PI / 1, Math.PI / 2, Math.PI / 3]} 
        />
      </group>
    </>
  )
}