import { useEffect, useRef, useState } from 'react' 
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { useTexture, Environment, useGLTF, Text } from '@react-three/drei' 
import Room from './components/Room.jsx'
import Player from './components/Player.jsx'
import CameraRig from './components/CameraRig.jsx'
import { createPlayerState } from './utils/playerState.js'
import InteractiveChair from './components/InteractiveChair'
import InteractiveSofa from './components/InteractiveSofa'
import UserCursor from './components/UserCursor.jsx' 

function Moon() {
  const moonRef = useRef()
  const moonTexture = useTexture('/moon/textures/Material.002_diffuse.jpeg')

  useFrame((state) => {
    if (moonRef.current) {
      moonRef.current.rotation.y = state.clock.getElapsedTime() * 0.05
    }
  })

  return (
    <group ref={moonRef} position={[-100, 5, -10]}>
      <mesh>
        <sphereGeometry args={[6, 64, 64]} />
        <meshStandardMaterial map={moonTexture} />
      </mesh>
    </group>
  )
}

function SkyboxModel() {
  const { scene } = useGLTF('/skybox_of_constellations/scene.gltf')
  return <primitive object={scene} scale={[150, 150, 150]} position={[0, 0, 0]} />
}

function CreditsWhiteboard() {
  const { scene } = useGLTF('/whiteboard/scene.gltf')

  return (
    <RigidBody type="fixed" colliders="hull">
      <primitive 
        object={scene} 
        position={[-0.289, 1.805, -2.616]} 
        rotation={[0, -0.3, 0]} 
        scale={0.003} 
      />
      <Text
        position={[-0.289, 1.805, -2.645]} 
        rotation={[0, 3.15, 0]} 
        fontSize={0.03} 
        color="#030303" 
        font="/fonts/PasseroOne-Regular.ttf" 
        lineHeight={1.4}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
      >
        CREDITS{"\n\n"}
          3D ASSETS (Sketchfab):{"\n\n"}
          Control Room by amogusstrikesback2{"\n"}
          Skybox of Constellations by tiunov.se{"\n"}
          Moon by Akshat{"\n"}
          Whiteboard by Reflex_Entertainment{"\n"}
          Old Chair by KZNYKN{"\n\n"}
          Designed & Developed by Shekhar Pratyush{"\n"}
      </Text>
    </RigidBody>
  )
}

function UIManager({ playerState, setIsUIOpen }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      if (key === 'i') {
        if (playerState.isSitting && playerState.mode === 'fpp') {
          document.exitPointerLock() 
          setIsUIOpen(true) 
        }
      }

      if (['w', 'a', 's', 'd'].includes(key) && playerState.isSitting) {
        const warning = document.getElementById('warning-message')
        if (warning) {
          warning.style.display = 'block'
          
          if (window.movementWarningTimer) clearTimeout(window.movementWarningTimer)
          
          window.movementWarningTimer = setTimeout(() => {
            warning.style.display = 'none'
          }, 2000)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState, setIsUIOpen])

  useFrame(() => {
    const prompt = document.getElementById('interact-prompt')
    if (prompt) {
      if (playerState.isSitting && playerState.sitType === 'desk') {
        prompt.style.display = 'block'
        if (playerState.mode === 'fpp') {
          prompt.innerText = '[ I ] INTERACT WITH TERMINAL'
        } else {
          prompt.innerText = 'PRESS [ V ] TO ENTER FPP MODE TO INTERACT'
        }
      } else {
        prompt.style.display = 'none' 
      }
    }

    const welcomeHint = document.getElementById('welcome-hint')
    if (welcomeHint) {
      if (playerState.isSitting) {
        playerState.hasSatDown = true
      }

      if (!playerState.hasSatDown && document.pointerLockElement) {
        welcomeHint.style.display = 'block'
      } else {
        welcomeHint.style.display = 'none'
      }
    }
  })

  return null
}

function RespawnTrigger({ rigidBodyRef, playerState }) {
  useFrame(() => {
    if (rigidBodyRef.current) {
      try {
        const pos = rigidBodyRef.current.translation()
        if (pos.y < -20) {
          playerState.isSitting = false
          playerState.sitType = null
          rigidBodyRef.current.setTranslation({ x: 0, y: 1, z: -4 }, true)
          rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
          rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
        }
      } catch (e) {
        // Safe catch
      }
    }
  })
  return null
}

export default function App() {
  const playerState = useRef(createPlayerState()).current
  const rigidBodyRef = useRef(null)
  const colliderRef = useRef(null)
  
  const [isUIOpen, setIsUIOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [showCameraHint, setShowCameraHint] = useState(false)

  useEffect(() => {
    const oldHint = document.getElementById('hint')
    if (oldHint) oldHint.style.display = 'none'

    const onChange = () => {
      setIsLocked(!!document.pointerLockElement)
    }
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [])

  useEffect(() => {
    let timer;
    if (isUIOpen && !isLocked) {
      setShowCameraHint(true) 
      timer = setTimeout(() => {
        setShowCameraHint(false) 
      }, 10000)
    } else {
      setShowCameraHint(false) 
    }

    return () => clearTimeout(timer)
  }, [isUIOpen, isLocked])

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      
      {isUIOpen && !isLocked && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2147483647 }}>
          <UserCursor name="Pratyush" color="#00ffcc" size={28} />
        </div>
      )}

      {isUIOpen && !isLocked && showCameraHint && (
        <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', color: '#ff2a5f', fontFamily: 'monospace', fontSize: '1rem', backgroundColor: 'rgba(0,0,0,0.85)', padding: '10px 20px', border: '1px solid #ff2a5f', borderRadius: '4px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 10px rgba(255, 42, 95, 0.3)', animation: 'pulse 2s infinite', textAlign: 'center' }}>
          Click outside the screen to move the camera <br/>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Press [ ESC ] anytime to unlock cursor</span>
        </div>
      )}

      {isUIOpen && isLocked && (
        <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', color: '#00ffcc', fontFamily: 'monospace', fontSize: '1.2rem', backgroundColor: 'rgba(0,0,0,0.85)', padding: '10px 20px', border: '1px solid #00ffcc', borderRadius: '4px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 10px rgba(0, 255, 204, 0.3)', animation: 'pulse 1.5s infinite' }}>
          PRESS [ ESC ] TO UNLOCK CURSOR
        </div>
      )}
      
      {!isUIOpen && (
        <div id="interact-prompt" style={{ position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)', color: '#ff2a5f', fontFamily: 'monospace', fontSize: '1.5rem', backgroundColor: 'rgba(0,0,0,0.7)', padding: '10px 20px', border: '1px solid #ff2a5f', display: 'none', zIndex: 100, pointerEvents: 'none' }}>
          [ I ] INTERACT WITH TERMINAL
        </div>
      )}

      <div id="welcome-hint" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', color: '#00ffcc', fontFamily: 'monospace', fontSize: '1.2rem', backgroundColor: 'rgba(0,0,0,0.85)', padding: '12px 24px', border: '1px solid #00ffcc', borderRadius: '4px', display: 'none', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 15px rgba(0, 255, 204, 0.4)', animation: 'pulse 2s infinite' }}>
        OBJECTIVE: Approach the main desk and press [ E ] to sit.
      </div>

      <div id="warning-message" style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', color: '#ff4444', fontFamily: 'monospace', fontSize: '1.2rem', backgroundColor: 'rgba(20,0,0,0.85)', padding: '8px 16px', border: '1px solid #ff4444', borderRadius: '4px', display: 'none', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)' }}>
        PRESS [ E ] TO STAND UP FIRST
      </div>

      {isLocked && !isUIOpen && (
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', fontSize: '0.85rem', zIndex: 50, pointerEvents: 'none' }}>
          [ ESC ] Controls Menu
        </div>
      )}

      {!isLocked && !isUIOpen && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', pointerEvents: 'none' }}>
          <h2 style={{ color: '#00ffcc', letterSpacing: '2px', marginBottom: '40px', fontSize: '2rem' }}>SYSTEM CONTROLS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 40px', textTransform: 'uppercase', fontSize: '1.1rem' }}>
            <div style={{ textAlign: 'right', color: '#888' }}>[ W, A, S, D ]</div><div>Move</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ Mouse ]</div><div>Look Around</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ Shift ]</div><div>Crouch / Sneak</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ Space ]</div><div>Jump</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ V ]</div><div>Toggle Camera (FPP / TPP)</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ E ]</div><div>Sit / Stand</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ I ]</div><div>Access Terminal (When Seated)</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ ESC ]</div><div>Pause / Release Mouse</div>
          </div>
          <div style={{ marginTop: '60px', color: '#ff2a5f', fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>CLICK ANYWHERE TO RESUME</div>
          <style>{`@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }`}</style>
        </div>
      )}

      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000 }}>
        <color attach="background" args={['#000000']} />
        
        <Environment preset="city" />

        <UIManager playerState={playerState} setIsUIOpen={setIsUIOpen} />
        
        <SkyboxModel />
        <Moon />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 2.6, 0]} intensity={2} castShadow />
        <directionalLight position={[100, 50, 50]} intensity={1.5} />

        <Physics gravity={[0, -9.81, 0]}>
          <RespawnTrigger rigidBodyRef={rigidBodyRef} playerState={playerState} />
          <CreditsWhiteboard />
          <Room playerState={playerState} isUIOpen={isUIOpen} closeUI={() => setIsUIOpen(false)} />
          <InteractiveChair playerState={playerState} rigidBodyRef={rigidBodyRef} setIsUIOpen={setIsUIOpen} />
          <InteractiveSofa playerState={playerState} rigidBodyRef={rigidBodyRef} />
          <Player playerState={playerState} rigidBodyRef={rigidBodyRef} colliderRef={colliderRef} />
          <CameraRig playerState={playerState} rigidBodyRef={rigidBodyRef} />
        </Physics>
        
      </Canvas>
    </div>
  )
}

useTexture.preload('/moon/textures/Material.002_diffuse.jpeg')
useGLTF.preload('/skybox_of_constellations/scene.gltf')
useGLTF.preload('/whiteboard/scene.gltf')