import React, { useState, useEffect } from 'react';

export default function MobileFallback() {
  const [text, setText] = useState('');
  
  // The message you want to type out
  const fullText = "> ERR_RESOLUTION\n\n> MOBILE DEVICE \n  DETECTED.\n\n> PLEASE OPEN \n  ON PC AS THIS \n  IS A 3D GAME.";

  useEffect(() => {
    let currentIndex = 0;
    
    // Typewriter effect timer
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 50); // Adjust typing speed here (lower is faster)
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.breadboardBg}>
      {/* Injecting CSS for the video scanlines and blinking cursor */}
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .scanlines {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.2));
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 10;
        }
        .video-flicker {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 20%;
          background: rgba(0, 255, 204, 0.05);
          animation: scanline 4s linear infinite;
          pointer-events: none;
          z-index: 11;
        }
        .cursor {
          display: inline-block;
          width: 10px;
          height: 1.2rem;
          background-color: #00ffcc;
          vertical-align: middle;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          box-shadow: 0 0 5px #00ffcc;
        }
      `}</style>

      {/* The physical "OLED Module" */}
      <div style={styles.oledModule}>
        {/* Fake hardware pins at the top */}
        <div style={styles.pinsContainer}>
          {[1,2,3,4].map(i => <div key={i} style={styles.pin} />)}
        </div>
        <div style={{...styles.pinLabel, left: '20px'}}>GND</div>
        <div style={{...styles.pinLabel, left: '42px'}}>VCC</div>
        <div style={{...styles.pinLabel, left: '62px'}}>SCL</div>
        <div style={{...styles.pinLabel, left: '85px'}}>SDA</div>

        {/* The Actual Screen */}
        <div style={styles.screen}>
          <div className="scanlines"></div>
          <div className="video-flicker"></div>
          <div style={styles.textContent}>
            {text}
            <span className="cursor"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  breadboardBg: {
    width: '100vw', 
    height: '100vh', 
    backgroundColor: '#e5e5e5', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    // Creates a white breadboard dot grid effect
    backgroundImage: 'radial-gradient(#a0a0a0 2px, transparent 2px)',
    backgroundSize: '24px 24px',
    backgroundPosition: 'center'
  },
  oledModule: {
    padding: '20px 15px 15px 15px', 
    backgroundColor: '#1a1a24', // PCB Blue/Black
    borderRadius: '4px', 
    boxShadow: '0 20px 50px rgba(0,0,0,0.6), inset 0 2px 5px rgba(255,255,255,0.1)', 
    border: '1px solid #000',
    position: 'relative'
  },
  pinsContainer: {
    position: 'absolute',
    top: '-15px',
    left: '20px',
    display: 'flex',
    gap: '12px'
  },
  pin: {
    width: '6px',
    height: '20px',
    backgroundColor: '#b0b0b0',
    border: '1px solid #777',
    borderBottom: 'none'
  },
  pinLabel: {
    position: 'absolute',
    top: '5px',
    color: '#888',
    fontSize: '8px',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  screen: {
    width: '260px', 
    height: '140px', 
    backgroundColor: '#000814', // Deep OLED black/blue
    border: '3px solid #0a0a0a', 
    borderRadius: '2px', 
    padding: '12px', 
    position: 'relative', 
    overflow: 'hidden',
    boxShadow: 'inset 0 0 15px rgba(0,255,204,0.1)'
  },
  textContent: {
    color: '#00ffcc', // Glowing cyan pixel color
    fontFamily: '"Courier New", Courier, monospace', 
    fontSize: '1.1rem', 
    fontWeight: 'bold',
    whiteSpace: 'pre-wrap', 
    textShadow: '0 0 6px rgba(0, 255, 204, 0.8), 0 0 2px rgba(0, 255, 204, 0.4)', 
    zIndex: 2, 
    position: 'relative',
    lineHeight: '1.4'
  }
};