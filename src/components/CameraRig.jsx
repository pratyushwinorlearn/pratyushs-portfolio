import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { useRapier } from '@react-three/rapier'
import * as THREE from 'three'

// --- TUNING KNOBS ---
const STAND_EYE_OFFSET = 0.8
const CROUCH_EYE_OFFSET = -0.15
const SIT_EYE_OFFSET = 0.5

const SOFA_EYE_OFFSET = -0.6
const TRANSITION_SPEED = 10.0

// --- TPP CAMERA SETTINGS ---
const TPP_DISTANCE = 1.5
const TPP_HEIGHT_OFFSET = 0.30

const SOFA_TPP_DISTANCE = 2.8
const SOFA_TPP_HEIGHT_OFFSET = 0.5
const TPP_MIN_DISTANCE = 0.5

const CONTROLS_MOUNT_DELAY_MS = 60

export default function CameraRig({ playerState, rigidBodyRef }) {
  const { camera } = useThree()
  const { world, rapier } = useRapier()
  const currentDistance = useRef(TPP_MIN_DISTANCE)

  const isCrouching = useRef(false)
  const currentEyeOffset = useRef(STAND_EYE_OFFSET)

  const [controlsReady, setControlsReady] = useState(false)

  useEffect(() => {
    // Ensure camera rotation order is correct for FPS/TPS look controls
    camera.rotation.order = 'YXZ'
    
    const t = setTimeout(() => setControlsReady(true), CONTROLS_MOUNT_DELAY_MS)
    return () => clearTimeout(t)
  }, [camera])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.code === 'KeyV') {
        playerState.mode = playerState.mode === 'fpp' ? 'tpp' : 'fpp'
      }
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        isCrouching.current = true
      }
    }

    const onKeyUp = (e) => {
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        isCrouching.current = false
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [playerState])

  useFrame((_, delta) => {
    // 🚨 1. MOBILE TOUCH CAMERA LOGIC
    // Reads the swipe distance from the gamepad and rotates the camera
    if (playerState.touchLookDelta.x !== 0 || playerState.touchLookDelta.y !== 0) {
      camera.rotation.y -= playerState.touchLookDelta.x
      camera.rotation.x -= playerState.touchLookDelta.y
      
      // Clamp pitch so the player doesn't break their neck looking too far up/down
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x))
      
      // Reset delta so it doesn't spin endlessly
      playerState.touchLookDelta.x = 0
      playerState.touchLookDelta.y = 0
    }

    // 2. Determine dynamic offsets based on player state
    let targetEyeOffset = STAND_EYE_OFFSET
    let targetTppDistance = TPP_DISTANCE
    let targetTppHeight = TPP_HEIGHT_OFFSET

    if (playerState.isSitting) {
      if (playerState.sitType === 'sofa') {
        targetEyeOffset = SOFA_EYE_OFFSET
        targetTppDistance = SOFA_TPP_DISTANCE
        targetTppHeight = SOFA_TPP_HEIGHT_OFFSET
      } else {
        targetEyeOffset = SIT_EYE_OFFSET
      }
    } else if (isCrouching.current) {
      targetEyeOffset = CROUCH_EYE_OFFSET
    }

    // 3. Smoothly glide the eye level (Frame-rate independent fix)
    currentEyeOffset.current = THREE.MathUtils.lerp(
      currentEyeOffset.current,
      targetEyeOffset,
      1 - Math.exp(-TRANSITION_SPEED * delta) 
    )

    const headPos = playerState.position.clone()
    headPos.y += currentEyeOffset.current

    // 4. First-Person Perspective Execution
    if (playerState.mode === 'fpp') {
      if (!isNaN(headPos.x) && !isNaN(headPos.y) && !isNaN(headPos.z)) {
        camera.position.copy(headPos)
      }
      currentDistance.current = TPP_MIN_DISTANCE
      return
    }

    // 5. Third-Person Perspective Logic
    const forward = new THREE.Vector3()
    camera.getWorldDirection(forward)

    if (isNaN(forward.x) || forward.lengthSq() === 0) {
      forward.set(0, 0, -1)
    }

    let allowedDistance = targetTppDistance

    if (rigidBodyRef.current) {
      try {
        const dir = forward.clone().multiplyScalar(-1)
        const ray = new rapier.Ray(
          { x: headPos.x, y: headPos.y, z: headPos.z },
          { x: dir.x, y: dir.y, z: dir.z }
        )

        const filterFlags = rapier.QueryFilterFlags?.EXCLUDE_KINEMATIC ?? 2
        const hit = world.castRay(ray, targetTppDistance, true, undefined, filterFlags)

        if (hit && hit.toi != null && !isNaN(hit.toi)) {
          allowedDistance = Math.max(TPP_MIN_DISTANCE, hit.toi - 0.15)
        }
      } catch (err) {
        // Safe unmount catch
      }
    }

    const nextDistance = THREE.MathUtils.lerp(
      currentDistance.current,
      allowedDistance,
      1 - Math.exp(-25 * delta)
    )

    if (!isNaN(nextDistance)) {
      currentDistance.current = nextDistance
    }

    const finalPos = headPos
      .clone()
      .addScaledVector(forward, -currentDistance.current)

    finalPos.y += targetTppHeight * (currentDistance.current / targetTppDistance)

    if (!isNaN(finalPos.x) && !isNaN(finalPos.y) && !isNaN(finalPos.z)) {
      camera.position.copy(finalPos)
    }
  })

  return controlsReady ? <PointerLockControls /> : null
}