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
        @keyframes ledPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #00ffcc; }
          50% { opacity: 0.3; box-shadow: 0 0 2px #00ffcc; }
        }
        
        /* 🐱 Smooth Cat Movement & Jump Timeline (8s cycle) */
        @keyframes catAction {
          0% { transform: translateX(0px) scaleX(1); }
          33% { transform: translateX(142px) scaleX(1); }
          37% { transform: translateX(148px) translateY(-10px) scaleX(1); } /* Smooth leap into arms */
          41% { transform: translateX(148px) translateY(-7px) scaleX(1); }  /* Held snugly */
          63% { transform: translateX(148px) translateY(-7px) scaleX(1); }  /* Hold ends */
          67% { transform: translateX(142px) translateY(0px) scaleX(-1); } /* Grounded & turns left */
          98% { transform: translateX(0px) translateY(0px) scaleX(-1); }
          100% { transform: translateX(0px) translateY(0px) scaleX(1); }
        }

        @keyframes catBob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }

        @keyframes tailWag {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(-20deg); }
        }

        /* 🧑 Human Arms Reaching Out & Catching Motion */
        @keyframes humanArms {
          0%, 28% { transform: translateX(0px); }
          35%, 65% { transform: translateX(-6px); } /* Reaches out and cradles */
          71%, 100% { transform: translateX(0px); }
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
        .cat-animator {
          animation: catAction 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        .smooth-cat {
          animation: catBob 0.3s ease-in-out infinite;
          display: inline-block;
        }
        .cat-tail {
          transform-origin: 5px 12px;
          animation: tailWag 0.6s ease-in-out infinite;
        }
        .human-reaching-arms {
          animation: humanArms 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          transform-origin: right center;
        }
      `}</style>

      {/* Circuit Workspace Container */}
      <div style={styles.circuitWrapper}>
        
        {/* 🔲 REALISTIC ESP32 MODULE */}
        <div style={styles.espBoard}>
          <div style={styles.shieldCan}>
            <div style={styles.shieldText}>ESP-32</div>
            <div style={styles.wifiLogo}>WiFi · BT</div>
          </div>
          <div style={styles.bootButton}></div>
          <div style={styles.enButton}></div>
          <div style={styles.usbPort}></div>
          <div style={styles.pinHeaderLeft}></div>
          <div style={styles.pinHeaderRight}></div>
          <div style={styles.powerLed}></div>
        </div>

        {/* ⚡ REALISTIC JUMPER WIRES */}
        <svg style={styles.wireSvg} width="320" height="340">
          <path d="M 100 85 C 100 130, 80 140, 80 195" stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 118 85 C 118 135, 105 140, 103 195" stroke="#d90429" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 195 85 C 195 130, 210 140, 215 195" stroke="#ffb703" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 212 85 C 212 145, 235 145, 238 195" stroke="#0077b5" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* 🔌 Header Socket Block */}
        <div style={styles.headerSocket}>
          <div style={styles.socketHoles}></div>
        </div>

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

            {/* 🧑 SLEEK VECTOR HUMAN (Double the height of the cat) */}
            <div style={styles.humanContainer}>
              <svg width="16" height="36" viewBox="0 0 16 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Head */}
                <circle cx="8" cy="4" r="3.5" fill="#00ffcc" />
                {/* Torso */}
                <path d="M4 9C4 8.44772 4.44772 8 5 8H11C11.5523 8 12 8.44772 12 9V22C12 22.5523 11.5523 23 11 23H5C4.44772 23 4 22.5523 4 22V9Z" fill="#00ffcc" />
                {/* Legs */}
                <line x1="5.5" y1="23" x2="5.5" y2="34" stroke="#00ffcc" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="10.5" y1="23" x2="10.5" y2="34" stroke="#00ffcc" strokeWidth="2.5" strokeLinecap="round" />
                {/* Reaching Arms Group */}
                <g className="human-reaching-arms">
                  <path d="M4 11L-1 14" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>

            {/* 🐱 SLEEK VECTOR CAT */}
            <div style={styles.catContainer}>
              <div className="cat-animator">
                <div className="smooth-cat">
                  <svg width="30" height="18" viewBox="0 0 30 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Tail */}
                    <path d="M6 12C4 12 2 8 3 4C3.5 2 5 1 6 2" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" className="cat-tail" />
                    {/* Body */}
                    <ellipse cx="14" cy="11" rx="7" ry="4.5" fill="#00ffcc" />
                    {/* Head */}
                    <circle cx="20" cy="8" r="4.5" fill="#00ffcc" />
                    {/* Ears */}
                    <path d="M17 5L15.5 1.5H18L19 4.5Z" fill="#00ffcc" />
                    <path d="M22 5L23.5 1.5H21L20 4.5Z" fill="#00ffcc" />
                    {/* Legs */}
                    <line x1="10" y1="14" x2="10" y2="17" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" />
                    <line x1="17" y1="14" x2="17" y2="17" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" />
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
    height: '450px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  espBoard: {
    position: 'absolute',
    top: '10px',
    left: '45px',
    width: '230px',
    height: '75px',
    backgroundColor: '#121212',
    borderRadius: '4px',
    border: '1px solid #282828',
    boxShadow: '0 10px 25px rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shieldCan: {
    position: 'absolute',
    top: '10px',
    left: '45px',
    width: '95px',
    height: '52px',
    backgroundColor: '#d8d8d8',
    borderRadius: '2px',
    border: '1px solid #999',
    boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  shieldText: {
    fontFamily: 'monospace',
    fontSize: '11px',
    fontWeight: 'bold',
    color: '#333',
    letterSpacing: '1px'
  },
  wifiLogo: {
    fontSize: '7px',
    fontFamily: 'sans-serif',
    color: '#555',
    marginTop: '2px'
  },
  bootButton: {
    position: 'absolute',
    bottom: '8px',
    right: '35px',
    width: '7px',
    height: '7px',
    backgroundColor: '#333',
    borderRadius: '50%',
    border: '1px solid #555'
  },
  enButton: {
    position: 'absolute',
    bottom: '22px',
    right: '35px',
    width: '7px',
    height: '7px',
    backgroundColor: '#333',
    borderRadius: '50%',
    border: '1px solid #555'
  },
  usbPort: {
    position: 'absolute',
    right: '-6px',
    top: '25px',
    width: '14px',
    height: '24px',
    backgroundColor: '#c0c0c0',
    borderRadius: '2px',
    border: '1px solid #777'
  },
  pinHeaderLeft: {
    position: 'absolute',
    left: '-4px',
    top: '6px',
    bottom: '6px',
    width: '5px',
    backgroundColor: '#ffd700',
    borderRadius: '1px'
  },
  pinHeaderRight: {
    position: 'absolute',
    right: '-4px',
    top: '6px',
    bottom: '6px',
    width: '5px',
    backgroundColor: '#ffd700',
    borderRadius: '1px'
  },
  powerLed: {
    position: 'absolute',
    top: '12px',
    right: '18px',
    width: '4px',
    height: '4px',
    backgroundColor: '#00ffcc',
    borderRadius: '50%',
    animation: 'ledPulse 1.5s infinite ease-in-out'
  },
  wireSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 5
  },
  headerSocket: {
    position: 'absolute',
    top: '185px',
    left: '95px',
    width: '130px',
    height: '14px',
    backgroundColor: '#1a1a1a',
    borderRadius: '2px',
    border: '1px solid #000',
    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    zIndex: 8
  },
  socketHoles: {
    position: 'absolute',
    top: '3px',
    left: '8px',
    right: '8px',
    height: '6px',
    backgroundColor: '#0a0a0a',
    borderRadius: '1px'
  },
  oledModule: {
    position: 'absolute',
    top: '195px',
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
    left: '10px',
    zIndex: 4
  },
  humanContainer: {
    position: 'absolute',
    bottom: '6px',
    right: '15px',
    zIndex: 3
  }
};