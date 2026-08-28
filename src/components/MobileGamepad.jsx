import React, { useRef, useState } from 'react'

export default function MobileGamepad({ playerState }) {
  const [stickPos, setStickPos] = useState({ x: 0, y: 0 })
  const [joyBase, setJoyBase] = useState({ x: 0, y: 0, active: false })
  
  const touchIdRef = useRef(null)
  const basePosRef = useRef({ x: 0, y: 0 })

  // --- 🚀 BGMI/PUBG STYLE DYNAMIC JOYSTICK LOGIC ---
  const handleJoystickTouchStart = (e) => {
    if (touchIdRef.current !== null) return
    const touch = e.changedTouches[0]
    touchIdRef.current = touch.identifier

    // Lock the joystick's base position exactly where the user touched
    const startX = touch.clientX
    const startY = touch.clientY
    basePosRef.current = { x: startX, y: startY }
    
    setJoyBase({ x: startX, y: startY, active: true })
    setStickPos({ x: 0, y: 0 })
  }

  const handleJoystickTouchMove = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      const touch = e.changedTouches[i]
      if (touch.identifier === touchIdRef.current) {
        let dx = touch.clientX - basePosRef.current.x
        let dy = touch.clientY - basePosRef.current.y
        
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
        setJoyBase(prev => ({ ...prev, active: false }))
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
    if (cameraTouchId.current !== null) return
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
        
        playerState.touchLookDelta.x += dx * 0.005
        playerState.touchLookDelta.y += dy * 0.005
        
        lastTouchPos.current = { x: touch.clientX, y: touch.clientY }
      }
    }
  }

  const handleCameraTouchEnd = (e) => {
    for (let i = 0; i < e.changedTouches.length; i++) {
      if (e.changedTouches[i].identifier === cameraTouchId.current) {
        cameraTouchId.current = null
      }
    }
  }

  // --- HARDWARE KEY SIMULATOR ---
  const triggerKey = (keyStr) => {
    const codeStr = keyStr === ' ' ? 'Space' : keyStr === 'ShiftLeft' ? 'ShiftLeft' : `Key${keyStr.toUpperCase()}`;
    const event = new KeyboardEvent('keydown', { key: keyStr, code: codeStr, keyCode: keyStr === ' ' ? 32 : keyStr.toUpperCase().charCodeAt(0), bubbles: true, cancelable: true, composed: true });
    window.dispatchEvent(event);
  }

  const triggerKeyUp = (keyStr) => {
    const codeStr = keyStr === ' ' ? 'Space' : keyStr === 'ShiftLeft' ? 'ShiftLeft' : `Key${keyStr.toUpperCase()}`;
    const event = new KeyboardEvent('keyup', { key: keyStr, code: codeStr, keyCode: keyStr === ' ' ? 32 : keyStr.toUpperCase().charCodeAt(0), bubbles: true, cancelable: true, composed: true });
    window.dispatchEvent(event);
  }

  const cyberBtnStyle = {
    backgroundColor: 'rgba(10, 15, 20, 0.65)', border: '1px solid rgba(0, 255, 204, 0.4)', color: '#00ffcc',
    fontFamily: '"Sarpanch", monospace', fontWeight: 'bold', letterSpacing: '1px', display: 'flex',
    alignItems: 'center', justifyContent: 'center', userSelect: 'none', touchAction: 'none',
    backdropFilter: 'blur(4px)', clipPath: 'polygon(15% 0, 100% 0, 100% 85%, 85% 100%, 0 100%, 0 15%)', 
    transition: 'background 0.1s, box-shadow 0.1s'
  }

  // 🚨 FIX: stopPropagation() ensures the background swipe zones don't steal the button taps!
  const fireButton = (e, key, isDown) => {
    e.preventDefault(); e.stopPropagation();
    if (isDown) triggerKey(key); else triggerKeyUp(key);
  }

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1000, overflow: 'hidden', touchAction: 'none' }}>
      
      {/* 🚀 INVISIBLE SPLIT-SCREEN ZONES */}
      <div 
        style={{ position: 'absolute', top: 0, left: 0, width: '45%', height: '100%', pointerEvents: 'auto', touchAction: 'none' }}
        onTouchStart={handleJoystickTouchStart} onTouchMove={handleJoystickTouchMove} onTouchEnd={handleJoystickTouchEnd} onTouchCancel={handleJoystickTouchEnd}
      />
      <div 
        style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '100%', pointerEvents: 'auto', touchAction: 'none' }}
        onTouchStart={handleCameraTouchStart} onTouchMove={handleCameraTouchMove} onTouchEnd={handleCameraTouchEnd} onTouchCancel={handleCameraTouchEnd}
      />

      {/* 🚀 DYNAMIC TACTICAL JOYSTICK */}
      <div 
        style={{ 
          position: 'absolute', top: joyBase.y - 55, left: joyBase.x - 55, // Centers the 110px box over thumb
          width: '110px', height: '110px', backgroundColor: 'rgba(5, 10, 15, 0.5)', border: '1px solid rgba(0, 255, 204, 0.2)', 
          borderRadius: '50%', boxShadow: 'inset 0 0 20px rgba(0, 255, 204, 0.1)',
          pointerEvents: 'none', display: joyBase.active ? 'flex' : 'none', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(4px)', zIndex: 1000
        }}
      >
        <div style={{ position: 'absolute', width: '100%', height: '1px', backgroundColor: 'rgba(0, 255, 204, 0.15)' }} />
        <div style={{ position: 'absolute', width: '1px', height: '100%', backgroundColor: 'rgba(0, 255, 204, 0.15)' }} />
        
        <div style={{ 
          width: '45px', height: '45px', backgroundColor: 'rgba(0, 255, 204, 0.8)', border: '2px solid #00ffcc',
          clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', 
          transform: `translate(${stickPos.x}px, ${stickPos.y}px)`, boxShadow: '0 0 15px rgba(0,255,204,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{ width: '15px', height: '15px', backgroundColor: '#fff', borderRadius: '50%', opacity: 0.5 }} />
        </div>
      </div>

      {/* 🚀 PERMANENT CORE ACTION BUTTONS */}
      <div style={{ position: 'absolute', bottom: '30px', right: '30px', display: 'flex', gap: '15px', alignItems: 'flex-end', pointerEvents: 'auto' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <button 
            style={{ ...cyberBtnStyle, width: '45px', height: '45px', fontSize: '0.8rem', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }} 
            onTouchStart={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'; fireButton(e, 'v', true) }}
            onTouchEnd={(e) => { e.target.style.backgroundColor = 'rgba(10,15,20,0.65)' }}
          >V</button>
          
          <button 
            style={{ ...cyberBtnStyle, width: '55px', height: '55px', fontSize: '0.75rem', color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }} 
            onTouchStart={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'; playerState.isCrouching = true; fireButton(e, 'ShiftLeft', true) }}
            onTouchEnd={(e) => { e.target.style.backgroundColor = 'rgba(10,15,20,0.65)'; playerState.isCrouching = false; fireButton(e, 'ShiftLeft', false) }}
          >CRCH</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', alignItems: 'center' }}>
          <button 
            style={{ ...cyberBtnStyle, width: '65px', height: '65px', fontSize: '1.4rem', boxShadow: '0 0 15px rgba(0,255,204,0.1)' }} 
            onTouchStart={(e) => { e.target.style.backgroundColor = 'rgba(0,255,204,0.2)'; fireButton(e, 'e', true) }}
            onTouchEnd={(e) => { e.target.style.backgroundColor = 'rgba(10,15,20,0.65)' }}
          >E</button>
          
          <button 
            style={{ ...cyberBtnStyle, width: '75px', height: '75px', fontSize: '1rem', color: '#fff', borderColor: '#fff' }} 
            onTouchStart={(e) => { e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'; fireButton(e, ' ', true) }}
            onTouchEnd={(e) => { e.target.style.backgroundColor = 'rgba(10,15,20,0.65)'; fireButton(e, ' ', false) }}
          >JUMP</button>
        </div>
      </div>

      {/* 🚀 DYNAMIC CONTEXTUAL BUTTONS */}
      <div style={{ position: 'absolute', bottom: '130px', right: '190px', display: 'flex', gap: '15px', pointerEvents: 'auto' }}>
        <button 
          id="mobile-btn-drop" 
          style={{ ...cyberBtnStyle, width: '60px', height: '60px', fontSize: '0.8rem', color: '#ffb703', borderColor: '#ffb703', display: 'none' }} 
          onTouchStart={(e) => fireButton(e, 'g', true)}
        >DROP</button>
        
        <button 
          id="mobile-btn-action" 
          style={{ ...cyberBtnStyle, width: '70px', height: '70px', fontSize: '1rem', display: 'none', backgroundColor: 'rgba(0,0,0,0.8)' }} 
          onTouchStart={(e) => {
            const keyToFire = e.currentTarget.getAttribute('data-key') || 'e';
            fireButton(e, keyToFire, true);
          }}
        ></button>
      </div>
    </div>
  )
}