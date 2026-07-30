import * as THREE from 'three'

// A plain mutable object, not React state — position changes 60x/sec and
// we don't want a re-render for every frame. Player.jsx writes to this
// after physics resolves; CameraRig.jsx and CharacterMesh.jsx read from it
// in their own useFrame loops.
export function createPlayerState() {
  return {
    position: new THREE.Vector3(0, 1.2, 3),
    mode: 'fpp', // 'fpp' | 'tpp' — toggled by CameraRig on keypress
  }
}
