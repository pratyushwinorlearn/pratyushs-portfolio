import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { PointerLockControls } from '@react-three/drei'
import { useRapier } from '@react-three/rapier'
import * as THREE from 'three'

// --- TUNING KNOBS ---
const STAND_EYE_OFFSET = 0.8
const CROUCH_EYE_OFFSET = -0.15
const SIT_EYE_OFFSET = 0.5

// Sofa specific offsets
// Drops the FPP camera down to "pillow level" since he is lying flat
const SOFA_EYE_OFFSET = -0.6

const TRANSITION_SPEED = 10.0

// --- TPP CAMERA SETTINGS ---
const TPP_DISTANCE = 1.5
const TPP_HEIGHT_OFFSET = 0.30

// Sofa specific TPP camera
// Pulls the camera further back and higher up for a wider cinematic view
const SOFA_TPP_DISTANCE = 2.8
const SOFA_TPP_HEIGHT_OFFSET = 0.5

const TPP_MIN_DISTANCE = 0.5
const SPRING_SMOOTHING = 0.35

// How long to wait after mount before attaching PointerLockControls.
// Fixes a WrongDocumentError crash when toggling journey mode: exiting
// journey mode remounts CameraRig at the same moment ScrollControls and
// the Html panels inside JourneyCameraRig are tearing down, so the DOM
// is still churning when PointerLockControls would otherwise immediately
// attach its click listener to (what turns out to be) a stale element.
const CONTROLS_MOUNT_DELAY_MS = 60

export default function CameraRig({ playerState, rigidBodyRef }) {
  const { camera } = useThree()
  const { world, rapier } = useRapier()
  const currentDistance = useRef(TPP_MIN_DISTANCE)

  const isCrouching = useRef(false)
  const currentEyeOffset = useRef(STAND_EYE_OFFSET)

  const [controlsReady, setControlsReady] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setControlsReady(true), CONTROLS_MOUNT_DELAY_MS)
    return () => clearTimeout(t)
  }, [])

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
    // 1. Determine dynamic offsets based on player state
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

    // 2. Smoothly glide the eye level
    currentEyeOffset.current = THREE.MathUtils.lerp(
      currentEyeOffset.current,
      targetEyeOffset,
      TRANSITION_SPEED * delta
    )

    const headPos = playerState.position.clone()
    headPos.y += currentEyeOffset.current

    // 3. First-Person Perspective Execution
    if (playerState.mode === 'fpp') {
      if (!isNaN(headPos.x) && !isNaN(headPos.y) && !isNaN(headPos.z)) {
        camera.position.copy(headPos)
      }
      currentDistance.current = TPP_MIN_DISTANCE
      return
    }

    // 4. Third-Person Perspective Logic
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
    // Rapier World mid-teardown for another body (e.g. Player's
    // RigidBody unmounting on the journey-mode toggle) at the exact
    // instant this raycast fires — skip this frame's raycast rather
    // than let the Rust aliasing panic crash the whole canvas.
  }
}

    const nextDistance = THREE.MathUtils.lerp(
      currentDistance.current,
      allowedDistance,
      SPRING_SMOOTHING
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