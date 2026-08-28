import { useEffect, useRef, useState, Suspense, useMemo } from 'react' 
import { Canvas, useFrame } from '@react-three/fiber'
import { Physics, RigidBody } from '@react-three/rapier'
import { useTexture, Environment, useGLTF, Text, AdaptiveDpr, AdaptiveEvents, useProgress } from '@react-three/drei' 
import * as THREE from 'three'

import Room from './components/Room.jsx'
import Player from './components/Player.jsx'
import CameraRig from './components/CameraRig.jsx'
import { createPlayerState } from './utils/playerState.js'
import InteractiveChair from './components/InteractiveChair'
import InteractiveSofa from './components/InteractiveSofa'
import UserCursor from './components/UserCursor.jsx' 
import InteractiveCrowbar from './components/InteractiveCrowbar.jsx'
import MobileGamepad from './components/MobileGamepad.jsx'

// --- RETRO TERMINAL BOOT LOADER ---
function TerminalBootLoader({ setHasLoaded }) {
  const { progress } = useProgress()
  const [bootLog, setBootLog] = useState([])
  const [isReadyToStart, setIsReadyToStart] = useState(false)
  
  const totalBlocks = 40
  const filledBlocks = Math.floor((progress / 100) * totalBlocks)
  const barString = '█'.repeat(filledBlocks) + '░'.repeat(totalBlocks - filledBlocks)

  useEffect(() => {
    const logs = [
      "बायोस दिनांक 08/22/26 संस्करण 2.0.4",
      "सीपीयू: प्रत्युष न्यूरल कर्नेल... ठीक है",
      "मेमोरी टेस्ट: 64000K बेस... ठीक है",
      "वर्चुअल फाइल सिस्टम माउंट हो रहा है...",
      "3D एसेट्स लोड हो रहे हैं...",
      "रैपियर फिजिक्स इंजन आरंभ हो रहा है...",
      "वेबजीएल शेडर्स संकलित हो रहे हैं...",
      "टेक्सचर बफ़र्स आवंटित हो रहे हैं...",
      progress >= 100 ? "सिस्टम तैयार है. शुरू करने के लिए कोई भी कुंजी दबाएं." : "संसाधन प्राप्त किए जा रहे हैं..."
    ]
    
    const currentStep = Math.floor((progress / 100) * (logs.length - 1))
    setBootLog(logs.slice(0, currentStep + 1))

    if (progress >= 100) setIsReadyToStart(true)
  }, [progress])

  const handleStart = () => {
    if (isReadyToStart) {
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        try {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen().catch(() => {});
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          }
        } catch(e) {}
      }
      setHasLoaded(true)
    }
  }

  return (
    <div 
      onClick={handleStart}
      style={{
        position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: '#050403', zIndex: 9999, display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        color: '#ffb703', 
        fontFamily: '"Sarpanch", "Courier New", Courier, monospace',
        cursor: isReadyToStart ? 'pointer' : 'none', overflow: 'hidden'
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.3) 50%)',
        backgroundSize: '100% 4px', pointerEvents: 'none', zIndex: 10
      }} />
      
      <div style={{ width: '80%', maxWidth: '900px', zIndex: 20, textShadow: '0px 0px 6px rgba(255,183,3,0.6)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', margin: '0 0 5px 0', letterSpacing: '2px', lineHeight: '1.2' }}>
          Pratyush's Portfolio
        </h1>
        
        <p style={{ fontSize: '1rem', borderBottom: '2px solid #ffb703', paddingBottom: '15px', margin: '0 0 30px 0', letterSpacing: '1px' }}>
          (c) कॉपीराइट शेखर प्रत्युष
        </p>
        
        <div style={{ width: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginBottom: '40px', fontSize: '0.9rem', lineHeight: '1.5' }}>
          {bootLog.map((log, i) => (
            <div key={i} style={{ marginBottom: '8px' }}>{`> ${log}`}</div>
          ))}
          <div style={{ animation: 'blink 1s step-end infinite' }}>_</div>
        </div>

        <div style={{ width: '100%' }}>
          <div style={{ marginBottom: '15px', fontSize: '1rem' }}>
            लोड हो रहा है: [{barString}] {Math.round(progress)}%
          </div>
        </div>

        {isReadyToStart && (
          <div style={{ marginTop: '20px', padding: '15px 30px', border: '2px solid #ffb703', borderRadius: '8px', animation: 'pulse 1.5s infinite', backgroundColor: 'rgba(255,183,3,0.1)' }}>
            [ TAP SCREEN TO START ]
          </div>
        )}
      </div>
      
      <style>{`
        @font-face {
          font-family: 'Sarpanch';
          src: url('/fonts/Sarpanch-Regular.ttf') format('truetype');
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </div>
  )
}
// --------------------------------------------------------

function Earth() {
  const earthRef = useRef()
  const earthTexture = useTexture('/earth-texture.jpg')
  useFrame((state) => { if (earthRef.current) earthRef.current.rotation.y = state.clock.getElapsedTime() * 0.005 })
  return (
    <group ref={earthRef} position={[50, 100, 700]}>
      <mesh><sphereGeometry args={[25, 25, 25]} /><meshStandardMaterial map={earthTexture} /></mesh>
    </group>
  )
}

function RoomWall() {
  const [tex1, tex2, tex3] = useTexture(['/india-today-intern.jpg', '/moon-texture.jpg', '/earth-texture.jpg'])
  const circleTexture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 16; canvas.height = 16; const context = canvas.getContext('2d')
    context.beginPath(); context.arc(8, 8, 8, 0, 2 * Math.PI); context.fillStyle = 'white'; context.fill()
    return new THREE.CanvasTexture(canvas)
  }, [])

  const starCount = 200;
  const [starPositions, starPhases, starSpeeds, initialColors] = useMemo(() => {
    const positions = new Float32Array(starCount * 3); const phases = new Float32Array(starCount); const speeds = new Float32Array(starCount); const colors = new Float32Array(starCount * 3).fill(1); 
    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = -2.57; positions[i * 3 + 1] = 1.45 + (Math.random() - 0.5) * 3.4; positions[i * 3 + 2] = -4.4 + (Math.random() - 0.5) * 3.5; 
      phases[i] = Math.random() * Math.PI * 2; speeds[i] = 0.5 + Math.random() * 2.0; 
    }
    return [positions, phases, speeds, colors];
  }, []);

  const starsRef = useRef();

  useFrame((state) => {
    if (starsRef.current) {
      const time = state.clock.getElapsedTime(); const colors = starsRef.current.geometry.attributes.color.array;
      for (let i = 0; i < starCount; i++) {
        let brightness = (Math.sin(time * starSpeeds[i] + starPhases[i]) + 1) / 2; brightness = Math.pow(brightness, 2.5); 
        colors[i * 3] = brightness; colors[i * 3 + 1] = brightness; colors[i * 3 + 2] = brightness; 
      }
      starsRef.current.geometry.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      <RigidBody type="fixed" colliders="cuboid">
        <mesh position={[-2.6, 1.45, -4.4]}><boxGeometry args={[0.05, 3.5, 3.6]} /><meshBasicMaterial color="#000000" /></mesh>
      </RigidBody>
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starCount} array={starPositions} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={starCount} array={initialColors} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.015} map={circleTexture} vertexColors={true} transparent={true} alphaTest={0.01} sizeAttenuation={true} depthWrite={false} />
      </points>
      <group position={[-2.55, 1.6, -4.4]} rotation={[0, Math.PI / 2, 0]}>
        <group position={[-0.9, 0, 0]}>
          <mesh position={[0, 0, 0.015]}><planeGeometry args={[0.6, 0.8]} /><meshStandardMaterial map={tex1} /></mesh>
          <mesh position={[0, 0, 0]}><boxGeometry args={[0.7, 0.9, 0.02]} /><meshStandardMaterial color="#000000" /></mesh>
        </group>
        <group position={[0, 0, 0]}>
          <mesh position={[0, 0, 0.015]}><planeGeometry args={[0.6, 0.8]} /><meshStandardMaterial map={tex2} /></mesh>
          <mesh position={[0, 0, 0]}><boxGeometry args={[0.7, 0.9, 0.02]} /><meshStandardMaterial color="#000000" /></mesh>
        </group>
        <group position={[0.9, 0, 0]}>
          <mesh position={[0, 0, 0.015]}><planeGeometry args={[0.6, 0.8]} /><meshStandardMaterial map={tex3} /></mesh>
          <mesh position={[0, 0, 0]}><boxGeometry args={[0.7, 0.9, 0.02]} /><meshStandardMaterial color="#000000" /></mesh>
        </group>
      </group>
    </group>
  )
}

function LunarSurface() {
  const moonTexture = useTexture('/moon-texture.jpg')
  moonTexture.wrapS = moonTexture.wrapT = THREE.MirroredRepeatWrapping
  moonTexture.repeat.set(30, 30)
  return (
    <RigidBody type="fixed" colliders="cuboid" position={[0, -0.004, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[1000, 1000]} /><meshStandardMaterial map={moonTexture} color="#aaaaaa" /></mesh>
    </RigidBody>
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
      <primitive object={scene} position={[-0.289, 1.805, -2.616]} rotation={[0, -0.3, 0]} scale={0.003} />
      <Text position={[-0.289, 1.805, -2.645]} rotation={[0, 3.15, 0]} fontSize={0.03} color="#030303" font="/fonts/PasseroOne-Regular.ttf" lineHeight={1.4} textAlign="center" anchorX="center" anchorY="middle">
        CREDITS{"\n\n"}3D ASSETS (Sketchfab):{"\n\n"}Control Room by amogusstrikesback2{"\n"}Skybox of Constellations by tiunov.se{"\n"}Earth Texture{"\n"}Whiteboard by Reflex_Entertainment{"\n"}Old Chair by KZNYKN{"\n"}Character and its animations from Mixamo{"\n\n"}Designed & Developed by Shekhar Pratyush{"\n"}
      </Text>
    </RigidBody>
  )
}

function UIManager({ playerState, setIsUIOpen, setIsGalleryOpen, isUIOpen, isTouchDevice }) {
  useEffect(() => {
    if (isUIOpen) playerState.hasUsedTerminal = true;
  }, [isUIOpen, playerState]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase()
      
      if (key === 'i') {
        if (playerState.isSitting && playerState.mode === 'fpp') {
          if (document.pointerLockElement) document.exitPointerLock() 
          setIsUIOpen(true) 
        }
      }

      if (key === 'f') {
        const dist = playerState.position.distanceTo(new THREE.Vector3(-2.6, 0, -4.4))
        if (dist < 1.5 && !playerState.isSitting) {
          if (document.pointerLockElement) document.exitPointerLock() 
          setIsGalleryOpen(true) 
        }
      }

      if (key === 'e') {
        if (!playerState.isSitting && playerState.hasUsedTerminal && !playerState.hasOpenedDoor) {
          const doorDist = playerState.position.distanceTo(new THREE.Vector3(3.5, 0, -1.0))
          if (doorDist < 5.0) {
            playerState.hasOpenedDoor = true; 
          }
        }
      }

      if (['w', 'a', 's', 'd'].includes(key) && playerState.isSitting) {
        const warning = document.getElementById('warning-message')
        if (warning) {
          warning.style.display = 'block'
          if (window.movementWarningTimer) clearTimeout(window.movementWarningTimer)
          window.movementWarningTimer = setTimeout(() => { warning.style.display = 'none' }, 2000)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [playerState, setIsUIOpen, setIsGalleryOpen])

  useFrame(() => {
    const isGameActive = isTouchDevice || !!document.pointerLockElement

    const prompt = document.getElementById('interact-prompt')
    const canUseTerminal = playerState.isSitting && playerState.sitType === 'desk' && isGameActive
    if (prompt) prompt.style.display = canUseTerminal ? 'block' : 'none'
    if (prompt && canUseTerminal) prompt.innerText = playerState.mode === 'fpp' ? '[ I ] INTERACT WITH TERMINAL' : 'PRESS [ V ] TO ENTER FPP MODE TO INTERACT'

    const galleryPrompt = document.getElementById('gallery-prompt')
    const distToGallery = playerState.position.distanceTo(new THREE.Vector3(-2.6, 0, -4.4))
    const canViewGallery = distToGallery < 1.5 && !playerState.isSitting && isGameActive
    if (galleryPrompt) galleryPrompt.style.display = canViewGallery ? 'block' : 'none'

    const welcomeHint = document.getElementById('welcome-hint')
    const doorPrompt = document.getElementById('door-prompt')
    const dropPrompt = document.getElementById('drop-prompt')
    
    const mobileBtnAction = document.getElementById('mobile-btn-action')
    const mobileBtnDrop = document.getElementById('mobile-btn-drop')

    let showDoorText = false
    let showWelcomeText = false
    let canDrop = false

    let actionLabel = ''
    let actionColor = ''
    let actionKey = ''
    let showMobileAction = false

    if (isGameActive) {
      if (playerState.isSitting) playerState.hasSatDown = true

      canDrop = playerState.hasCrowbar

      // 🚨 FIX: E is permanent on mobile, so the dynamic button only shows OS or VIEW
      if (playerState.isSitting && playerState.sitType === 'desk') {
        showMobileAction = true; actionKey = 'i'; actionLabel = 'OS'; actionColor = '#ff2a5f';
      } else if (distToGallery < 1.5 && !playerState.isSitting) {
        showMobileAction = true; actionKey = 'f'; actionLabel = 'VIEW'; actionColor = '#ffb703';
      } 

      const doorDist = playerState.position.distanceTo(new THREE.Vector3(3.5, 0, -1.0))
      if (doorDist < 5.0 && !playerState.isSitting && playerState.hasUsedTerminal && !playerState.hasOpenedDoor) {
        showDoorText = true;
      }

      if (!playerState.hasSatDown) {
        showWelcomeText = true
        if (welcomeHint) welcomeHint.innerText = 'OBJECTIVE: Approach the main desk and press [ E ] to sit.'
      } else if (playerState.hasSatDown && playerState.hasUsedTerminal && !playerState.hasOpenedDoor) {
        showWelcomeText = true
        if (welcomeHint) welcomeHint.innerText = 'OBJECTIVE: Go to the door and press [ E ] to open it.'
      }
    }

    if (welcomeHint) welcomeHint.style.display = showWelcomeText ? 'block' : 'none'
    if (doorPrompt) doorPrompt.style.display = showDoorText ? 'block' : 'none'
    if (dropPrompt) dropPrompt.style.display = canDrop ? 'block' : 'none'

    if (mobileBtnDrop) mobileBtnDrop.style.display = canDrop ? 'flex' : 'none'
    
    if (mobileBtnAction) {
      mobileBtnAction.style.display = showMobileAction ? 'flex' : 'none'
      if (showMobileAction) {
        mobileBtnAction.innerText = actionLabel
        mobileBtnAction.style.borderColor = actionColor
        mobileBtnAction.style.color = actionColor
        mobileBtnAction.style.boxShadow = `0 0 10px ${actionColor}80`
        mobileBtnAction.setAttribute('data-key', actionKey)
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
        if (pos.y < -30) {
          playerState.isSitting = false
          playerState.sitType = null
          rigidBodyRef.current.setTranslation({ x: 0, y: 1.2, z: -4 }, true)
          rigidBodyRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true)
          rigidBodyRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true)
        }
      } catch (e) {}
    }
  })
  return null
}

export default function App() {
  const [hasLoaded, setHasLoaded] = useState(false) 
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isPortrait, setIsPortrait] = useState(false)

  const playerState = useRef(createPlayerState()).current
  const rigidBodyRef = useRef(null)
  const colliderRef = useRef(null)
  
  const [isUIOpen, setIsUIOpen] = useState(false)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false) 
  const [isLocked, setIsLocked] = useState(false)
  const [showCameraHint, setShowCameraHint] = useState(false)

  useEffect(() => {
    const checkTouchAndOrientation = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      setIsTouchDevice(hasTouch)
      setIsPortrait(window.innerHeight > window.innerWidth)
      
      if (hasTouch) {
        try {
          Object.defineProperty(document, 'pointerLockElement', {
            get: () => document.body,
            configurable: true
          });
        } catch(e) {}
      }
    }
    
    checkTouchAndOrientation() 
    window.addEventListener('resize', checkTouchAndOrientation)
    window.addEventListener('orientationchange', checkTouchAndOrientation)
    return () => {
      window.removeEventListener('resize', checkTouchAndOrientation)
      window.removeEventListener('orientationchange', checkTouchAndOrientation)
    }
  }, [])

  useEffect(() => {
    const oldHint = document.getElementById('hint')
    if (oldHint) oldHint.style.display = 'none'

    const onChange = () => {
      if (!('ontouchstart' in window)) {
        setIsLocked(!!document.pointerLockElement)
      } else {
        setIsLocked(true) 
      }
    }
    document.addEventListener('pointerlockchange', onChange)
    return () => document.removeEventListener('pointerlockchange', onChange)
  }, [])

  useEffect(() => {
    let timer;
    if (isUIOpen && !isLocked) {
      setShowCameraHint(true) 
      timer = setTimeout(() => setShowCameraHint(false), 10000)
    } else {
      setShowCameraHint(false) 
    }
    return () => clearTimeout(timer)
  }, [isUIOpen, isLocked])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsGalleryOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  if (isTouchDevice && isPortrait && hasLoaded) {
    return (
      <div style={{ width: '100vw', height: '100vh', backgroundColor: '#050403', color: '#ffb703', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: '"Sarpanch", monospace', textAlign: 'center', padding: '20px' }}>
        <div style={{ fontSize: '3rem', marginBottom: '20px', animation: 'pulse 2s infinite' }}>🔄</div>
        <h2>PLEASE ROTATE YOUR DEVICE</h2>
        <p style={{ color: '#888', marginTop: '10px' }}>Turn your phone horizontal to activate the 3D base.</p>
        <style>{`@keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }`}</style>
      </div>
    )
  }

  const cleanPromptStyle = {
    position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', color: '#ffffff', 
    fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: '1.2rem', backgroundColor: 'rgba(0,0,0,0.85)', 
    padding: '10px 24px', border: '2px solid #ffffff', borderRadius: '8px', display: 'none', zIndex: 100, 
    pointerEvents: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.5)'
  }

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      
      {!hasLoaded && (
        <TerminalBootLoader setHasLoaded={setHasLoaded} />
      )}

      {isTouchDevice && !isPortrait && hasLoaded && !isUIOpen && !isGalleryOpen && (
        <MobileGamepad playerState={playerState} />
      )}
      
      {/* 🚨 FIX: Mobile-Responsive Gallery Overlay! */}
      {isGalleryOpen && (!isLocked || isTouchDevice) && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(5, 4, 3, 0.97)', zIndex: 99999, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: '#ffb703', fontFamily: '"Sarpanch", monospace', fontSize: '1.8rem', marginTop: '20px', marginBottom: '10px', letterSpacing: '2px', flexShrink: 0 }}>ARCHIVED MEMORIES</h2>
          
          <div style={{ 
            display: 'flex', gap: '20px', alignItems: 'center', overflowX: 'auto', 
            width: '90vw', maxWidth: '1000px', padding: '10px 0', marginBottom: '20px',
            scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' 
          }}>
            {[ '/india-today-intern.jpg', '/moon-texture.jpg', '/earth-texture.jpg' ].map((src, i) => (
              <div key={i} style={{ 
                flex: '0 0 auto', scrollSnapAlign: 'center', padding: '10px', 
                backgroundColor: '#111', border: '1px solid #333', boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                margin: 'auto'
              }}>
                <img src={src} style={{ width: 'auto', height: '55vh', minHeight: '200px', objectFit: 'contain' }} alt={`Gallery ${i}`} />
              </div>
            ))}
          </div>

          <button 
            onClick={() => setIsGalleryOpen(false)} 
            style={{ padding: '10px 30px', backgroundColor: 'transparent', color: '#ff2a5f', border: '2px solid #ff2a5f', fontFamily: 'monospace', fontSize: '1.2rem', cursor: 'pointer', transition: 'all 0.2s', flexShrink: 0, marginBottom: '20px' }}
            onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255, 42, 95, 0.1)'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            [ ESC ] CLOSE GALLERY
          </button>
        </div>
      )}

      {isUIOpen && !isLocked && !isTouchDevice && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none', zIndex: 2147483647 }}>
          <UserCursor name="Pratyush" color="#890808" size={28} />
        </div>
      )}

      {isUIOpen && !isLocked && !isTouchDevice && showCameraHint && (
        <div style={{ position: 'absolute', top: '8%', left: '50%', transform: 'translateX(-50%)', color: '#ff2a5f', fontFamily: 'monospace', fontSize: '1rem', backgroundColor: 'rgba(0,0,0,0.85)', padding: '10px 20px', border: '1px solid #ff2a5f', borderRadius: '4px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 10px rgba(255, 42, 95, 0.3)', animation: 'pulse 2s infinite', textAlign: 'center' }}>
          Click outside the screen to move the camera <br/>
          <span style={{ fontSize: '0.85rem', color: '#888' }}>Press [ ESC ] anytime to unlock cursor</span>
        </div>
      )}

      {(isUIOpen || isGalleryOpen) && isLocked && !isTouchDevice && (
        <div style={{ position: 'absolute', bottom: '15%', left: '50%', transform: 'translateX(-50%)', color: '#00ffcc', fontFamily: 'monospace', fontSize: '1.2rem', backgroundColor: 'rgba(0,0,0,0.85)', padding: '10px 20px', border: '1px solid #00ffcc', borderRadius: '4px', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 10px rgba(0, 255, 204, 0.3)', animation: 'pulse 1.5s infinite' }}>
          PRESS [ ESC ] TO UNLOCK CURSOR
        </div>
      )}
      
      {!isUIOpen && !isGalleryOpen && !isTouchDevice && (
        <div id="interact-prompt" style={cleanPromptStyle}>
          [ I ] INTERACT WITH TERMINAL
        </div>
      )}

      {!isUIOpen && !isGalleryOpen && !isTouchDevice && (
        <div id="gallery-prompt" style={cleanPromptStyle}>
          [ F ] VIEW GALLERY
        </div>
      )}

      <div id="welcome-hint" style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', color: '#00ffcc', fontFamily: 'monospace', fontSize: '1.2rem', backgroundColor: 'rgba(0,0,0,0.85)', padding: '12px 24px', border: '1px solid #00ffcc', borderRadius: '4px', display: 'none', zIndex: 100, pointerEvents: 'none', boxShadow: '0 0 15px rgba(0, 255, 204, 0.4)', animation: 'pulse 2s infinite' }}>
        OBJECTIVE: Approach the main desk and press [ E ] to sit.
      </div>

      <div id="warning-message" style={{ ...cleanPromptStyle, top: '20%', bottom: 'auto', color: '#ff4444', borderColor: '#ff4444' }}>
        PRESS [ E ] TO STAND UP FIRST
      </div>

      {!isTouchDevice && (
        <div id="door-prompt" style={cleanPromptStyle}>
          [ E ] OPEN DOOR
        </div>
      )}

      {!isTouchDevice && (
        <div id="drop-prompt" style={{ ...cleanPromptStyle, right: '5%', left: 'auto', transform: 'none' }}>
          [ G ] DROP CROWBAR
        </div>
      )}

      {isLocked && !isUIOpen && !isGalleryOpen && !isTouchDevice && (
        <div style={{ position: 'absolute', bottom: '20px', right: '20px', color: 'rgba(255, 255, 255, 0.4)', fontFamily: 'monospace', fontSize: '0.85rem', zIndex: 50, pointerEvents: 'none' }}>
          [ ESC ] Controls Menu
        </div>
      )}

      {!isTouchDevice && !isLocked && !isUIOpen && !isGalleryOpen && hasLoaded && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', zIndex: 90, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'monospace', pointerEvents: 'none' }}>
          <h2 style={{ color: '#00ffcc', letterSpacing: '2px', marginBottom: '40px', fontSize: '2rem' }}>SYSTEM CONTROLS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px 40px', textTransform: 'uppercase', fontSize: '1.1rem' }}>
            <div style={{ textAlign: 'right', color: '#888' }}>[ W, A, S, D ]</div><div>Move</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ Mouse ]</div><div>Look Around</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ Shift ]</div><div>Crouch / Sneak</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ Space ]</div><div>Jump</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ V ]</div><div>Toggle Camera (FPP / TPP)</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ E ]</div><div>Sit / Stand / Open</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ I ]</div><div>Access Terminal</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ F ]</div><div>View Gallery</div>
            <div style={{ textAlign: 'right', color: '#888' }}>[ ESC ]</div><div>Pause / Release Mouse</div>
          </div>
          <div style={{ marginTop: '60px', color: '#ff2a5f', fontSize: '1.2rem', animation: 'pulse 1.5s infinite' }}>CLICK ANYWHERE TO RESUME</div>
        </div>
      )}

      <Canvas shadows dpr={[1, 1.5]} camera={{ fov: 75, near: 0.1, far: 2000 }}>
        <color attach="background" args={['#000000']} />
        
        <Suspense fallback={null}>
          <Environment preset="city" />

          <UIManager playerState={playerState} setIsUIOpen={setIsUIOpen} setIsGalleryOpen={setIsGalleryOpen} isUIOpen={isUIOpen} isTouchDevice={isTouchDevice} />
          
          <SkyboxModel />
          <Earth />
          
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          
          <ambientLight intensity={1.5} />
          <pointLight position={[0, 2.6, 0]} intensity={2} />
          <directionalLight position={[100, 50, 50]} intensity={1.5} castShadow shadow-mapSize={[1024, 1024]} />

          <Physics gravity={[0, -9.81, 0]} paused={isUIOpen || isGalleryOpen || (!isLocked && !isTouchDevice)}>
            
            <LunarSurface />
            <RoomWall />
            
            <RespawnTrigger rigidBodyRef={rigidBodyRef} playerState={playerState} />
            <CreditsWhiteboard />
            <Room playerState={playerState} isUIOpen={isUIOpen} closeUI={() => setIsUIOpen(false)} />
            <InteractiveChair playerState={playerState} rigidBodyRef={rigidBodyRef} setIsUIOpen={setIsUIOpen} />
            <InteractiveSofa playerState={playerState} rigidBodyRef={rigidBodyRef} />
            
            <InteractiveCrowbar playerState={playerState} />
            
            <Player playerState={playerState} rigidBodyRef={rigidBodyRef} colliderRef={colliderRef} />
            <CameraRig playerState={playerState} rigidBodyRef={rigidBodyRef} />
          </Physics>
        </Suspense>
      </Canvas>
    </div>
  )
}

useTexture.preload('/earth-texture.jpg')
useTexture.preload('/moon-texture.jpg')
useTexture.preload('/india-today-intern.jpg')
useGLTF.preload('/skybox_of_constellations/scene.gltf')
useGLTF.preload('/whiteboard/scene.gltf')