import { useEffect, useRef, useState } from 'react' 
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics } from '@react-three/rapier'
import { useTexture, Environment, Stars } from '@react-three/drei' 
import Room from './components/Room.jsx'
import Player from './components/Player.jsx'
import CameraRig from './components/CameraRig.jsx'
import { createPlayerState } from './utils/playerState.js'
import InteractiveChair from './components/InteractiveChair'
import PortfolioOS from './components/PortfolioOS.jsx' 
import InteractiveSofa from './components/InteractiveSofa'

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

function UIManager({ playerState, setIsUIOpen }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      // 1. Terminal Interaction
      if (key === 'i') {
        if (playerState.isSitting && playerState.mode === 'fpp') {
          document.exitPointerLock() 
          setIsUIOpen(true) 
        }
      }

      // 2. NEW: Blocked Movement Warning
      if (['w', 'a', 's', 'd'].includes(key) && playerState.isSitting) {
        const warning = document.getElementById('warning-message')
        if (warning) {
          warning.style.display = 'block'
          
          // Clear any existing timer so they can't bug it out by spamming W
          if (window.movementWarningTimer) clearTimeout(window.movementWarningTimer)
          
          // Hide it again after 2 seconds
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
      // FIXED: Added sitType check so it hides while on the sofa
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
  })

  return null
}

export default function App() {
  const playerState = useRef(createPlayerState()).current
  const rigidBodyRef = useRef(null)
  const colliderRef = useRef(null)
  
  const [isUIOpen, setIsUIOpen] = useState(false)
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const oldHint = document.getElementById('hint')
    if (oldHint) oldHint.style.display = 'none'

    const onChange = () => {
      setIsLocked(!!document.pointerLockElement)
    }
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      
      <PortfolioOS isUIOpen={isUIOpen} closeUI={() => setIsUIOpen(false)} />
      
      {/* Existing Interact Prompt */}
      <div 
        id="interact-prompt" 
        style={{
          position: 'absolute', bottom: '10%', left: '50%', transform: 'translateX(-50%)',
          color: '#ff2a5f', fontFamily: 'monospace', fontSize: '1.5rem',
          backgroundColor: 'rgba(0,0,0,0.7)', padding: '10px 20px',
          border: '1px solid #ff2a5f', display: 'none', zIndex: 100,
          pointerEvents: 'none' 
        }}
      >
        [ I ] INTERACT WITH TERMINAL
      </div>

      {/* NEW: The Movement Blocked Warning Toast */}
      <div 
        id="warning-message" 
        style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
          color: '#ff4444', fontFamily: 'monospace', fontSize: '1.2rem',
          backgroundColor: 'rgba(20,0,0,0.85)', padding: '8px 16px',
          border: '1px solid #ff4444', borderRadius: '4px',
          display: 'none', zIndex: 100, pointerEvents: 'none',
          boxShadow: '0 0 10px rgba(255, 0, 0, 0.3)'
        }}
      >
        PRESS [ E ] TO STAND UP FIRST
      </div>

      {/* The Persistent Mini-Hint */}
      {isLocked && !isUIOpen && (
        <div style={{
          position: 'absolute', bottom: '20px', right: '20px',
          color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace',
          fontSize: '0.85rem', zIndex: 50, pointerEvents: 'none'
        }}>
          [ ESC ] Controls Menu
        </div>
      )}

      {/* The Full Controls Menu */}
      {!isLocked && !isUIOpen && (
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 90,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontFamily: 'monospace',
          pointerEvents: 'none' 
        }}>
          <h2 style={{ color: '#00ffcc', letterSpacing: '2px', marginBottom: '40px', fontSize: '2rem' }}>
            SYSTEM CONTROLS
          </h2>
          
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

          <div style={{ marginTop: '60px', color: '#ff2a5f', fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>
            CLICK ANYWHERE TO RESUME
          </div>

          <style>{`
            @keyframes pulse {
              0% { opacity: 0.4; }
              50% { opacity: 1; }
              100% { opacity: 0.4; }
            }
          `}</style>
        </div>
      )}

      <Canvas shadows camera={{ fov: 75, near: 0.1, far: 1000 }}>
        <color attach="background" args={['#000000']} />
        
        <UIManager playerState={playerState} setIsUIOpen={setIsUIOpen} />
        
        <Stars radius={300} depth={60} count={6000} factor={4} saturation={0} fade speed={1} />
        <Moon />
        
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 2.6, 0]} intensity={2} castShadow />
        <directionalLight position={[100, 50, 50]} intensity={1.5} />

        <Physics gravity={[0, -9.81, 0]}>
          <Room playerState={playerState} />
          <Player playerState={playerState} rigidBodyRef={rigidBodyRef} colliderRef={colliderRef} />
          <CameraRig playerState={playerState} rigidBodyRef={rigidBodyRef} />
          <InteractiveChair playerState={playerState} rigidBodyRef={rigidBodyRef} />
          <InteractiveSofa playerState={playerState} rigidBodyRef={rigidBodyRef} />
        </Physics>
      </Canvas>
    </div>
  )
}

useTexture.preload('/moon/textures/Material.002_diffuse.jpeg')