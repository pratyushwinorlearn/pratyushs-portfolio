import React, { useState, useEffect } from 'react';

export default function MobileFallback() {
  const [text, setText] = useState('');
  
  const fullText = "> ERR_RESOLUTION\n> MOBILE DEVICE DETECTED.\n> PLEASE OPEN ON PC.";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.breadboardBg}>
      <style>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes catWalk {
          0% { transform: translateX(0px) scaleX(1); }
          48% { transform: translateX(175px) scaleX(1); }
          50% { transform: translateX(175px) scaleX(-1); }
          98% { transform: translateX(0px) scaleX(-1); }
          100% { transform: translateX(0px) scaleX(1); }
        }
        @keyframes catBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes tailWag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-15deg); }
        }
        .cursor {
          display: inline-block;
          width: 7px;
          height: 0.95rem;
          background-color: #00ffcc;
          vertical-align: middle;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          box-shadow: 0 0 4px #00ffcc;
        }
        .cat-walker {
          animation: catWalk 7s ease-in-out infinite;
        }
        .pixel-cat {
          animation: catBounce 0.35s ease-in-out infinite;
          display: inline-block;
        }
        .cat-tail {
          transform-origin: bottom left;
          animation: tailWag 0.6s ease-in-out infinite;
        }
      `}</style>

      {/* Circuit Workspace Container */}
      <div style={styles.circuitWrapper}>
        
        {/* 🔲 PROPERLY PROPORTIONED HORIZONTAL ESP32 */}
        <div style={styles.espContainer}>
          <img 
            src="/esp32.png" 
            alt="ESP32 Development Board" 
            style={styles.espImage} 
          />
        </div>

        {/* ⚡ PERFECTLY ALIGNED JUMPER WIRES (Bottom ESP32 Pins to Top OLED Pins) */}
        <svg style={styles.wireSvg} width="320" height="520">
          {/* GND Wire (Black) -> Connects to left GND pin */}
          <path d="M 112 110 C 100 190, 80 230, 82 320" stroke="#111" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* VCC Wire (Red) -> Connects to 3V3 / VCC pin */}
          <path d="M 132 110 C 120 200, 100 230, 108 320" stroke="#d90429" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* SCL Wire (Yellow) -> Connects to SCL / GPIO pin */}
          <path d="M 178 110 C 160 200, 125 230, 134 320" stroke="#ffb703" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* SDA Wire (Blue) -> Connects to SDA / GPIO pin */}
          <path d="M 198 110 C 180 210, 145 240, 160 320" stroke="#0077b5" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* 🖥️ REALISTIC BLUE OLED MODULE */}
        <div style={styles.oledModule}>
          <div style={{...styles.mountHole, top: '8px', left: '8px'}}></div>
          <div style={{...styles.mountHole, top: '8px', right: '8px'}}></div>
          
          <div style={styles.oledPinLabels}>GND &nbsp; VCC &nbsp; SCL &nbsp; SDA</div>

          <div style={styles.screen}>
            <div style={styles.ribbonCable}></div>
            <div style={styles.chipOnGlass}>283</div>

            <div style={styles.textContent}>
              {text}
              <span className="cursor"></span>
            </div>

            {/* 🐱 SYMMETRICALLY PATROLLING PIXEL CAT */}
            <div style={styles.catContainer}>
              <div className="cat-walker">
                <div className="pixel-cat">
                  <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Cat Body */}
                    <rect x="8" y="10" width="12" height="10" fill="#00ffcc" />
                    {/* Cat Head */}
                    <rect x="12" y="4" width="10" height="8" fill="#00ffcc" />
                    {/* Ears */}
                    <path d="M12 4L10 1H13L14 4H12Z" fill="#00ffcc" />
                    <path d="M20 4L22 1H19L18 4H20Z" fill="#00ffcc" />
                    {/* Eyes */}
                    <rect x="14" y="6" width="2" height="2" fill="#02050a" />
                    <rect x="18" y="6" width="2" height="2" fill="#02050a" />
                    {/* Tail */}
                    <g className="cat-tail">
                      <rect x="6" y="12" width="3" height="2" fill="#00ffcc" />
                      <rect x="4" y="10" width="2" height="3" fill="#00ffcc" />
                    </g>
                    {/* Paws */}
                    <rect x="10" y="20" width="2" height="2" fill="#00ffcc" />
                    <rect x="16" y="20" width="2" height="2" fill="#00ffcc" />
                  </svg>
                </div>
              </div>
            </div>

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
    backgroundColor: '#f4f4f4', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundImage: 'radial-gradient(#b0b0b0 2px, transparent 2px)',
    backgroundSize: '20px 20px',
    overflow: 'hidden',
    position: 'relative'
  },
  circuitWrapper: {
    position: 'relative',
    width: '320px',
    height: '520px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  espContainer: {
    position: 'absolute',
    top: '25px',
    left: '20px',
    width: '280px',
    height: '115px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.35))',
    zIndex: 4
  },
  espImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    transform: 'rotate(90deg)'
  },
  wireSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 5
  },
  oledModule: {
    position: 'absolute',
    top: '320px',
    left: '35px',
    width: '250px',
    height: '160px',
    backgroundColor: '#1b3b6f',
    borderRadius: '8px', 
    boxShadow: '0 15px 35px rgba(0,0,0,0.35)', 
    border: '1px solid #0d2347',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '22px',
    zIndex: 10
  },
  mountHole: {
    position: 'absolute',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid #silver',
    backgroundColor: '#dcdcdc',
    boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)'
  },
  oledPinLabels: {
    position: 'absolute',
    top: '5px',
    color: '#d0d0d0',
    fontSize: '8px',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    letterSpacing: '0.5px'
  },
  screen: {
    width: '220px', 
    height: '115px', 
    backgroundColor: '#02050a', 
    border: '2px solid #081224', 
    borderRadius: '2px', 
    padding: '8px', 
    position: 'relative', 
    overflow: 'hidden',
    boxShadow: 'inset 0 0 10px rgba(0,255,204,0.1)'
  },
  ribbonCable: {
    position: 'absolute',
    bottom: 0,
    left: '70px',
    width: '80px',
    height: '18px',
    backgroundColor: '#111',
    borderTop: '2px solid #222',
    backgroundImage: 'repeating-linear-gradient(45deg, #111, #111 2px, #1a1a1a 2px, #1a1a1a 4px)',
    zIndex: 3
  },
  chipOnGlass: {
    position: 'absolute',
    bottom: '4px',
    left: '12px',
    backgroundColor: '#111',
    color: '#777',
    fontSize: '6px',
    padding: '1px 3px',
    fontFamily: 'monospace',
    border: '1px solid #333',
    zIndex: 3
  },
  textContent: {
    color: '#00ffcc', 
    fontFamily: '"Courier New", Courier, monospace', 
    fontSize: '0.8rem', 
    fontWeight: 'bold',
    whiteSpace: 'pre-wrap', 
    textShadow: '0 0 5px rgba(0, 255, 204, 0.7), 0 0 2px rgba(0, 255, 204, 0.4)', 
    zIndex: 2, 
    position: 'relative',
    lineHeight: '1.3'
  },
  catContainer: {
    position: 'absolute',
    bottom: '6px',
    left: '12px',
    zIndex: 4
  }
};