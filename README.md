# Portfolio — Phase 1 + 2

Phase 1: gray-box room + WASD + collision.
Phase 2: camera rig split into physics body / camera rig / visual mesh,
with both FPP and TPP working now instead of retrofitted later.

## Setup

```bash
npm install
npm run dev
```

Click the canvas once (pointer lock needs a user gesture), then:
- **WASD** — move
- **Mouse** — look around
- **V** — toggle first-person / third-person
- **Esc** — release the cursor

## The three-layer split

- **`src/components/Player.jsx`** — physics body ONLY. Kinematic capsule +
  Rapier's `KinematicCharacterController` + WASD. Its only job is to move
  the capsule and write the result into shared `playerState.position`.
  Doesn't know or care whether the camera is in FPP or TPP.

- **`src/components/CameraRig.jsx`** — owns rotation (`PointerLockControls`)
  and mode-dependent position. FPP: camera sits at head height, basically
  *is* the head. TPP: spring-arm behind the camera's look direction, with
  a Rapier raycast (`world.castRay`, excluding the player's own rigid body)
  so it pulls in instead of clipping through walls when you back into a
  corner. Distance is smoothed (`lerp`) so the pull-in/out doesn't pop.
  **V** toggles `playerState.mode` here.

- **`src/components/CharacterMesh.jsx`** — purely cosmetic. A placeholder
  capsule + a small "nose" box so you can see which way it's facing.
  Hidden in FPP (nothing to render for your own head), visible in TPP.
  **This is the file Phase 3 replaces** with the rigged Mixamo character —
  Player.jsx and CameraRig.jsx won't need to change at all when that
  happens, since they only ever talk to `playerState`, never to the mesh.

- **`src/utils/playerState.js`** — the shared object all three read/write.
  Plain mutable object, not React state, since position updates every
  frame and we don't want 60 re-renders/sec.

## What to test before Phase 3

- Toggle V while walking, standing still, and mid-turn — should never
  snap or flip unexpectedly.
- Back into a corner in TPP — camera should pull in smoothly, not clip
  through the wall or the table.
- Movement direction should match your look direction in both modes
  (press W, you go where you're facing — that's the camera's yaw, not
  some fixed world axis).

## Then: Phase 3

Model/source a base humanoid, run it through Mixamo for rigging + idle/
walk/run clips, export `.glb`, `useAnimations` + crossfade based on the
capsule's velocity magnitude — replacing `CharacterMesh.jsx` only.
