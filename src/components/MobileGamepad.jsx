import React, { useRef, useState } from 'react'

export default function MobileGamepad({ playerState }) {
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 })
  const joystickBaseRef = useRef(null)
  const touchIdRef = useRef(null)

  // --- JOYSTICK LOGIC ---
  const handleJoystickTouchStart = (e) => {
    const touch = e.changedTouches[0]
    touchIdRef.current = touch.identifier
  }

  const handleJoystickTouchMove = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier === touchIdRef.current && joystickBaseRef.current) {
        const rect = joystickBaseRef.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        
        let dx = touch.clientX - centerX
        let dy = touch.clientY - centerY
        const distance = Math.min(40, Math.hypot(dx, dy))
        const angle = Math.atan2(dy, dx)

        const clampedX = Math.cos(angle) * distance
        const clampedY = Math.sin(angle) * distance

        setStickPos({ x: clampedX, y: clampedY })
        playerState.moveVector.x = clampedX / 40
        playerState.moveVector.y = -clampedY / 40 
      }
    }
  }

  const handleJoystickTouchEnd = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === touchIdRef.current) {
        touchIdRef.current = null
        setStickPos({ x: 0, y: 0 })
        playerState.moveVector.x = 0
        playerState.moveVector.y = 0
      }
    }
  }

  // --- CAMERA LOOK LOGIC ---
  const cameraTouchId = useRef(null)
  const lastTouchPos = useRef({ x: 0, y: 0 })

  const handleCameraTouchStart = (e) => {
    const touch = e.changedTouches[0]
    cameraTouchId.current = touch.identifier
    lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
  }

  const handleCameraTouchMove = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier === cameraTouchId.current) {
        const dx = touch.clientX - lastTouchPos.current.x
        const dy = touch.clientY - lastTouchPos.current.y
        playerState.touchLookDelta.x = dx * 0.005
        playerState.touchLookDelta.y = dy * 0.005
        lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
      }
    }
  }

  const handleCameraTouchEnd = () => {
    cameraTouchId.current = null
    playerState.touchLookDelta.x = 0
    playerState.touchLookDelta.y = 0
  }

  const triggerKey = (key) => window.dispatchEvent(new KeyboardEvent('keydown', { key }))
  const triggerKeyUp = (key) => window.dispatchEvent(new KeyboardEvent('keyup', { key }))

  const btnBase = {
    borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', border: '2px solid rgba(255,255,255,0.3)',
    color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center',
    userSelect: 'none', touchAction: 'none'
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1000, overflow: 'hidden' }}>
      <div 
        style={{ position: 'absolute', top: 0, right: 0, width: '60%', height: '100%', pointerEvents: 'auto', touchAction: 'none' }}
        onTouchStart={handleCameraTouchStart} onTouchMove={handleCameraTouchMove} onTouchEnd={handleCameraTouchEnd}
      />

      <div 
        ref={joystickBaseRef}
        style={{ position: 'absolute', bottom: '40px', left: '40px', width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', pointerEvents: 'auto', touchAction: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onTouchStart={handleJoystickTouchStart} onTouchMove={handleJoystickTouchMove} onTouchEnd={handleJoystickTouchEnd}
      >
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ffb703', transform: `translate(${stickPos.x}px, ${stickPos.y}px)`, boxShadow: '0 0 10px rgba(255,183,3,0.8)' }} />
      </div>

      <div style={{ position: 'absolute', bottom: '30px', right: '30px', display: 'flex', gap: '15px', alignItems: 'flex-end', pointerEvents: 'auto' }}>
        <button style={{ ...btnBase, width: '40px', height: '40px', fontSize: '0.7rem' }} onTouchStart={(e) => { e.preventDefault(); triggerKey('v') }}>V</button>
        
        <button 
          style={{ ...btnBase, width: '55px', height: '55px', fontSize: '0.7rem' }} 
          onTouchStart={(e) => { e.preventDefault(); playerState.isCrouching = true; triggerKey('ShiftLeft') }}
          onTouchEnd={(e) => { e.preventDefault(); playerState.isCrouching = false; triggerKeyUp('ShiftLeft') }}
        >CRCH</button>
        
        <button style={{ ...btnBase, width: '70px', height: '70px', fontSize: '0.9rem', borderColor: 'rgba(255,255,255,0.6)' }} onTouchStart={(e) => { e.preventDefault(); triggerKey(' ') }}>JUMP</button>
      </div>

      {/* 🚨 SMART CONTEXTUAL BUTTONS: Driven directly by UIManager in App.jsx */}
      <div style={{ position: 'absolute', bottom: '130px', right: '40px', display: 'flex', gap: '15px', pointerEvents: 'auto' }}>
        <button 
          id="mobile-btn-drop" 
          style={{ ...btnBase, width: '55px', height: '55px', fontSize: '0.8rem', display: 'none' }} 
          onTouchStart={(e) => { e.preventDefault(); triggerKey('g') }}
        >
          DROP
        </button>
        
        <button 
          id="mobile-btn-action" 
          data-key="e" // Dynamically updated by UIManager
          style={{ ...btnBase, width: '65px', height: '65px', fontSize: '1rem', display: 'none' }} 
          onTouchStart={(e) => { 
            e.preventDefault(); 
            // Reads whatever key the UIManager assigned to this button (e, f, i)
            triggerKey(e.currentTarget.getAttribute('data-key'));
          }}
        >
          {/* Text injected by UIManager */}
        </button>
      </div>
    </div>
  )
}