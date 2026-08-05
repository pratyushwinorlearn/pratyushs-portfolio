import React, { useState, useEffect } from 'react';

export default function MobileFallback() {
  const [text, setText] = useState('');
  
  const fullText = "> ERR_RESOLUTION\n> MOBILE DEVICE DETECTED.";

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
        
        /* 🦖 T-Rex Endless Runner Animation Loop (1.8s cycle) */
        @keyframes tRexJump {
          0%, 35%, 100% { bottom: 4px; }
          42%, 52% { bottom: 32px; } /* Peak of the jump */
        }

        @keyframes cactusMove {
          0% { right: -20px; }
          100% { right: 230px; }
        }

        @keyframes groundScroll {
          0% { background-position: 0 0; }
          100% { background-position: -20px 0; }
        }

        .cursor {
          display: inline-block;
          width: 6px;
          height: 0.85rem;
          background-color: #00ffcc;
          vertical-align: middle;
          margin-left: 2px;
          animation: blink 1s step-end infinite;
          box-shadow: 0 0 4px #00ffcc;
        }

        .t-rex-runner {
          position: absolute;
          left: 20px;
          animation: tRexJump 1.6s cubic-bezier(0.3, 0, 0.7, 1) infinite;
          image-rendering: pixelated;
        }

        .cactus-obstacle {
          position: absolute;
          bottom: 4px;
          animation: cactusMove 1.6s linear infinite;
          image-rendering: pixelated;
        }

        .pixel-ground {
          position: absolute;
          bottom: 2px;
          left: 0;
          width: 100%;
          height: 2px;
          background: repeating-linear-gradient(90deg, #00ffcc, #00ffcc 4px, transparent 4px, transparent 8px);
          animation: groundScroll 0.4s linear infinite;
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

            {/* Terminal Boot Text at Top */}
            <div style={styles.textContent}>
              {text}
              <span className="cursor"></span>
            </div>

            {/* 🦖 GOOGLE DINOSAUR GAME RUNNER SECTION AT THE BOTTOM */}
            <div style={styles.gameContainer}>
              <div className="pixel-ground"></div>
              
              {/* Pixelated T-Rex */}
              <div className="t-rex-runner">
                <svg width="18" height="20" viewBox="0 0 16 16" fill="#00ffcc">
                  <path d="M5 2h4v2h2v1h1v1h1v2h-1v1h-2v1h1v4h-2v-2h-2v2H6v-3H4v-3H2V7h2V5h1V2z" />
                </svg>
              </div>

              {/* Pixelated Cactus Obstacle */}
              <div className="cactus-obstacle">
                <svg width="10" height="16" viewBox="0 0 10 16" fill="#00ffcc">
                  <path d="M3 0h4v3h2v4H7v9H3V7H1V3h2V0z" />
                </svg>
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
    fontSize: '0.75rem', 
    fontWeight: 'bold',
    whiteSpace: 'pre-wrap', 
    textShadow: '0 0 5px rgba(0, 255, 204, 0.7), 0 0 2px rgba(0, 255, 204, 0.4)', 
    zIndex: 2, 
    position: 'relative',
    lineHeight: '1.25'
  },
  gameContainer: {
    position: 'absolute',
    bottom: '8px',
    left: '8px',
    right: '8px',
    height: '42px',
    backgroundColor: '#010306',
    border: '1px solid #0a223f',
    borderRadius: '2px',
    overflow: 'hidden',
    zIndex: 4
  }
};