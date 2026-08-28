import * as THREE from 'three'

export function createPlayerState() {
  return {
    position: new THREE.Vector3(0.6, 2, -4.2),
    mode: 'tpp',
    
    // Joystick vector: x (-1 to 1 for strafe), y (-1 to 1 for forward/back)
    moveVector: { x: 0, y: 0 },
    
    // Camera touch swipe delta
    touchLookDelta: { x: 0, y: 0 },
    
    // Action flags for buttons
    isJumping: false,
    isCrouching: false,
    isInteracting: false,
    isDropping: false,
    isAttacking: false,
    
    // Sitting / interaction flags
    isSitting: false,
    sitType: null,
    hasCrowbar: false,
    hasSatDown: false,
    hasUsedTerminal: false,
    hasOpenedDoor: false
  }
}