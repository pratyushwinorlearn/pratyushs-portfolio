import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function ProjectsTftScreen() {
  const [projectIndex, setProjectIndex] = useState(0);
  const [joystickPos, setJoystickPos] = useState({ x: 0, y: 0 });
  const [activeButton, setActiveButton] = useState(null);
  
  // Joystick Prompt State
  const [hasUsedJoystick, setHasUsedJoystick] = useState(false);
  
  // Video Modal State
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const modalVideoRef = useRef(null);
  const modalContainerRef = useRef(null);

  const projects = [
    { title: "AI INTERVIEWER", stack: "Node.js • Express • Groq AI", type: "WEB APP", video: "/videos/persona.mp4" },
    { title: "MULTIMODAL AI", stack: "Vision-Language Classify", type: "AI MODEL", video: "/videos/multimodal-ai.mp4" },
    { title: "JAVA CHESS", stack: "Java • Eclipse IDE", type: "ENGINE", video: "/videos/java-chess.mp4" },
    { title: "LAST MILE, LOST TIME", stack: "Design Thinking", type: "RESEARCH", video: "/videos/last-mile.mp4" }
  ];

  const handleNext = () => setProjectIndex((prev) => (prev + 1) % projects.length);
  const handlePrev = () => setProjectIndex((prev) => (prev - 1 + projects.length) % projects.length);

  // --- JOYSTICK LOGIC ---
  const handlePointerDown = (e) => {
    e.stopPropagation();
    
    // Hide the prompt forever once they interact with the joystick
    if (!hasUsedJoystick) {
      setHasUsedJoystick(true);
    }

    isDragging.current = true;
    startPos.current = { 
      x: e.clientX || (e.touches && e.touches[0].clientX), 
      y: e.clientY || (e.touches && e.touches[0].clientY) 
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    e.stopPropagation();
    
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    let dx = clientX - startPos.current.x;
    let dy = clientY - startPos.current.y;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 10; 
    if (distance > maxDist) {
      dx = (dx / distance) * maxDist;
      dy = (dy / distance) * maxDist;
    }
    
    setJoystickPos({ x: dx, y: dy });
  };

  const handlePointerUp = (e) => {
    if (e) e.stopPropagation();
    if (!isDragging.current) return;
    isDragging.current = false;
    
    if (joystickPos.x < -6) handlePrev();
    if (joystickPos.x > 6) handleNext();
    
    setJoystickPos({ x: 0, y: 0 });
  };

  // --- TACTILE BUTTON LOGIC ---
  const handleButtonPress = (e, btn) => {
    e.stopPropagation();
    setActiveButton(btn);
    if (btn === 'A') handlePrev();
    if (btn === 'B') handleNext();
    setTimeout(() => setActiveButton(null), 150);
  };

  // --- VIDEO CONTROLS LOGIC ---
  const togglePlay = (e) => {
    e.stopPropagation();
    if (modalVideoRef.current) {
      if (modalVideoRef.current.paused) {
        modalVideoRef.current.play();
        setIsPlaying(true);
      } else {
        modalVideoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const toggleFullscreen = (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      modalContainerRef.current?.requestFullscreen().catch(err => console.log(err));
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <>
      <div style={styles.bonnetBoard}>
        <style>{`
          .glass-overlay { background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.4) 100%); }
          .view-btn:hover { color: #fff; text-shadow: 0 0 8px #00ffcc; transform: scale(1.05); }
          @keyframes bouncePrompt {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
        `}</style>

        {/* --- JOYSTICK PROMPT --- */}
        {!hasUsedJoystick && (
          <div style={styles.joystickPrompt}>
            move left and right to see others
            <div style={styles.promptArrow}>↓</div>
          </div>
        )}

        {/* PCB Mounting Holes */}
        <div style={{...styles.mountHole, top: 4, left: 4}}><div style={styles.copperRing}></div></div>
        <div style={{...styles.mountHole, top: 4, right: 4}}><div style={styles.copperRing}></div></div>
        <div style={{...styles.mountHole, bottom: 4, left: 4}}><div style={styles.copperRing}></div></div>
        <div style={{...styles.mountHole, bottom: 4, right: 4}}><div style={styles.copperRing}></div></div>

        {/* LEFT: 5-Way Joystick */}
        <div style={styles.leftSection}>
          <div style={styles.silkscreenSmall}>Joystick GPIO:<br/>UDLR 17,22,27,23<br/>Center GPIO: 4</div>
          <div 
            style={styles.joystickHitbox}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          >
            <div style={styles.joystickBase}>
              <div style={{
                ...styles.joystickStick,
                transform: `translate(${joystickPos.x}px, ${joystickPos.y}px)`,
                boxShadow: `${-joystickPos.x * 0.5}px ${-joystickPos.y * 0.5}px 4px rgba(0,0,0,0.8)`
              }}>
                <div style={styles.stickIndent}></div>
              </div>
            </div>
          </div>
          <div style={{...styles.silkscreenLogo, marginTop: '8px'}}>Pratyush HQ</div>
        </div>

        {/* CENTER: TFT Screen & Video */}
        <div style={styles.centerSection}>
          <div style={styles.screenBezel}>
            <div className="glass-overlay" style={styles.glass}>
              
              {/* Background Autoplaying Thumbnail Video */}
              <video 
                key={projects[projectIndex].video}
                src={projects[projectIndex].video}
                style={styles.videoElement}
                autoPlay loop muted playsInline
              />

              {/* Centered Content Overlay */}
              <div style={styles.videoOverlay}>
                <div style={styles.centeredContentBox}>
                  <div style={styles.type}>[{projects[projectIndex].type}]</div>
                  <div style={styles.title}>{projects[projectIndex].title}</div>
                  <div style={styles.stack}>{projects[projectIndex].stack}</div>
                </div>
              </div>

              {/* Bottom Right View Button */}
              <div 
                className="view-btn"
                style={styles.viewButton} 
                onPointerDown={(e) => { e.stopPropagation(); setShowModal(true); setIsPlaying(true); }}
              >
                VIEW
                <svg style={{marginLeft: '4px', paddingBottom: '1px'}} width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>

            </div>
            <div style={styles.blueRibbon}></div>
          </div>
        </div>

        {/* RIGHT: Tactile Buttons */}
        <div style={styles.rightSection}>
          <div style={styles.silkscreenSmall}>Display: SPI CE0<br/>DC: 25 Lite: 26</div>
          <div style={styles.buttonsWrapper}>
            <div style={styles.btnGroup}>
              <div style={styles.tactileBase} onPointerDown={(e) => handleButtonPress(e, 'A')}>
                <div style={{
                  ...styles.tactilePusher,
                  transform: activeButton === 'A' ? 'scale(0.9) translateY(2px)' : 'scale(1)',
                  backgroundColor: activeButton === 'A' ? '#666' : '#999'
                }}></div>
              </div>
              <div style={styles.silkscreenLabel}>#1</div>
            </div>
            <div style={styles.btnGroup}>
              <div style={styles.tactileBase} onPointerDown={(e) => handleButtonPress(e, 'B')}>
                <div style={{
                  ...styles.tactilePusher,
                  transform: activeButton === 'B' ? 'scale(0.9) translateY(2px)' : 'scale(1)',
                  backgroundColor: activeButton === 'B' ? '#666' : '#999'
                }}></div>
              </div>
              <div style={styles.silkscreenLabel}>#2</div>
            </div>
          </div>
          <div style={{...styles.silkscreenLogo, fontSize: '12px'}}>✿</div>
        </div>
      </div>

      {/* --- FULLSCREEN VIDEO PORTAL MODAL --- */}
      {showModal && createPortal(
        <div style={styles.modalBackdrop} onPointerDown={(e) => e.stopPropagation()}>
          <div ref={modalContainerRef} style={styles.modalVideoContainer}>
            
            {/* Close Button (Cross) */}
            <div style={styles.closeBtn} onClick={() => setShowModal(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>

            {/* The Actual Video Player */}
            <video 
              ref={modalVideoRef}
              src={projects[projectIndex].video}
              style={styles.fullVideo}
              autoPlay 
              playsInline
              onEnded={() => setIsPlaying(false)}
            />

            {/* Bottom Controls Bar */}
            <div style={styles.controlsBar}>
              
              {/* Play/Pause Button */}
              <div style={styles.controlIcon} onClick={togglePlay}>
                {isPlaying ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                  </svg>
                )}
              </div>

              {/* Title inside Controls */}
              <div style={styles.controlsTitle}>{projects[projectIndex].title}</div>

              {/* Fullscreen Expand Button */}
              <div style={styles.controlIcon} onClick={toggleFullscreen}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                </svg>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

const styles = {
  // Main PCB Board
  bonnetBoard: { width: '340px', height: '150px', backgroundColor: '#383838', borderRadius: '10px', border: '2px solid #222', boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.1)', position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 10px', zIndex: 10, touchAction: 'none' },
  
  // Joystick Prompt Indicator
  joystickPrompt: { position: 'absolute', top: '-55px', left: '-5px', width: '100px', color: '#111', fontFamily: 'monospace', fontSize: '9px', fontWeight: 'bold', textAlign: 'center', pointerEvents: 'none', zIndex: 20, animation: 'bouncePrompt 1.5s infinite', textShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,1)' },
  promptArrow: { fontSize: '18px', marginTop: '2px' },

  // Mounting Holes
  mountHole: { position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#222', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.8)' },
  copperRing: { width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #b8860b', backgroundColor: '#1a1a1a' },

  // Silkscreen Text
  silkscreenSmall: { color: '#bbb', fontFamily: 'monospace', fontSize: '6px', lineHeight: '1.2', textAlign: 'center' },
  silkscreenLogo: { color: '#ddd', fontFamily: 'sans-serif', fontSize: '9px', fontWeight: '900', letterSpacing: '1px' },
  silkscreenLabel: { color: '#ddd', fontFamily: 'monospace', fontSize: '8px', marginTop: '4px', fontWeight: 'bold' },

  // LEFT: Joystick
  leftSection: { width: '70px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '10px' },
  joystickHitbox: { width: '50px', height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'grab', zIndex: 5 },
  joystickBase: { width: '28px', height: '28px', backgroundColor: '#d4d4d4', border: '1px solid #999', borderRadius: '2px', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  joystickStick: { width: '12px', height: '12px', backgroundColor: '#111', borderRadius: '3px', border: '1px solid #000', transition: 'box-shadow 0.1s', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  stickIndent: { width: '4px', height: '4px', backgroundColor: '#222', borderRadius: '1px', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' },

  // CENTER: Screen & New Overlay
  centerSection: { width: '150px', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  screenBezel: { width: '150px', height: '115px', backgroundColor: '#050505', border: '1px solid #000', borderRadius: '2px', boxShadow: '0 10px 15px rgba(0,0,0,0.5)', position: 'relative' },
  glass: { width: '100%', height: '100%', position: 'relative', overflow: 'hidden' },
  blueRibbon: { position: 'absolute', bottom: '2px', left: '10px', width: '130px', height: '5px', background: 'linear-gradient(90deg, #0033aa, #0066ff, #0033aa)', borderTop: '1px solid #000', borderBottom: '1px solid #002266', opacity: 0.9 },
  
  videoElement: { width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, zIndex: 1, opacity: 0.6 },
  
  // CENTERED TEXT LAYER
  videoOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  centeredContentBox: { backgroundColor: 'rgba(0,0,0,0.6)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(0, 255, 204, 0.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', backdropFilter: 'blur(2px)' },
  type: { color: '#00ffcc', fontFamily: 'monospace', fontSize: '7px', marginBottom: '3px' },
  title: { color: '#fff', fontFamily: 'sans-serif', fontSize: '11px', fontWeight: '900', textShadow: '0 2px 4px rgba(0,0,0,0.8)', textAlign: 'center' },
  stack: { color: '#ccc', fontFamily: 'monospace', fontSize: '7px', marginTop: '3px', textAlign: 'center' },

  // VIEW BUTTON
  viewButton: { position: 'absolute', bottom: '4px', right: '6px', zIndex: 5, color: '#00ffcc', fontFamily: 'monospace', fontSize: '8px', fontWeight: 'bold', display: 'flex', alignItems: 'center', cursor: 'pointer', background: 'rgba(0,0,0,0.7)', padding: '3px 6px', borderRadius: '2px', border: '1px solid #00ffcc', transition: 'all 0.2s ease' },

  // RIGHT: Buttons
  rightSection: { width: '70px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '15px' },
  buttonsWrapper: { display: 'flex', gap: '10px' },
  btnGroup: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  tactileBase: { width: '20px', height: '20px', backgroundColor: '#d4d4d4', border: '1px solid #999', borderRadius: '2px', boxShadow: '0 4px 6px rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
  tactilePusher: { width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #555', boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.5)', transition: 'all 0.1s' },

  // --- FULLSCREEN MODAL STYLES ---
  modalBackdrop: { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)', zIndex: 99999, display: 'flex', justifyContent: 'center', alignItems: 'center', touchAction: 'none' },
  modalVideoContainer: { position: 'relative', width: '90%', maxWidth: '800px', backgroundColor: '#000', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', border: '1px solid #333' },
  fullVideo: { width: '100%', height: 'auto', display: 'block', maxHeight: '80vh', objectFit: 'contain' },
  
  // Custom Video Controls
  closeBtn: { position: 'absolute', top: '15px', right: '15px', width: '36px', height: '36px', backgroundColor: 'rgba(0,0,0,0.6)', color: '#fff', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', zIndex: 10, border: '1px solid rgba(255,255,255,0.2)', transition: 'background 0.2s' },
  controlsBar: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: '15px 20px', background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#fff' },
  controlIcon: { cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transition: 'background 0.2s' },
  controlsTitle: { fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold', letterSpacing: '1px', opacity: 0.9 }
};