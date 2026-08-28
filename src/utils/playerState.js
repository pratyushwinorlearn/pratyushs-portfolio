import * as THREE from 'three'

export function createPlayerState() {
  return {
    position: new THREE.Vector3(0.6, 2, -4.2),
    mode: 'tpp',
    
    // 🚨 REQUIRED FOR MOBILE: Prevents the NaN Black Screen crash!
    moveVector: { x: 0, y: 0 },
    touchLookDelta: { x: 0, y: 0 },
    isCrouching: false,
    
    // Sitting / interaction flags
    isSitting: false,
    sitType: null,
    hasCrowbar: false,
    hasSatDown: false,
    hasUsedTerminal: false,
    hasOpenedDoor: false
  }
}