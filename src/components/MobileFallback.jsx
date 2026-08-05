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
        @keyframes tRexJump {
          0%, 35%, 100% { bottom: 4px; }
          42%, 52% { bottom: 32px; }
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
        
        {/* 🔲 REAL ESP32 BOARD IMAGE */}
        <div style={styles.espContainer}>
          <img 
            src="/esp32.png" 
            alt="ESP32 Development Board" 
            style={styles.espImage} 
          />
        </div>

        {/* ⚡ REALISTIC JUMPER WIRES CONNECTING ESP32 TO OLED */}
        <svg style={styles.wireSvg} width="320" height="480">
          {/* GND Wire (Black) - from left side pin down to OLED GND */}
          <path d="M 90 230 C 80 270, 70 280, 75 325" stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* VCC Wire (Red) - from top right 3V3 pin down to OLED VCC */}
          <path d="M 230 75 C 250 180, 230 250, 105 325" stroke="#d90429" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* SCL Wire (Yellow) - from right side pin down to OLED SCL */}
          <path d="M 230 260 C 240 290, 160 290, 135 325" stroke="#ffb703" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* SDA Wire (Blue) - from right side pin down to OLED SDA */}
          <path d="M 230 245 C 250 280, 180 300, 165 325" stroke="#0077b5" strokeWidth="3" fill="none" strokeLinecap="round" />
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

            {/* 🦖 GOOGLE DINOSAUR GAME RUNNER */}
            <div style={styles.gameContainer}>
              <div className="pixel-ground"></div>
              
              <div className="t-rex-runner">
                <svg width="18" height="20" viewBox="0 0 16 16" fill="#00ffcc">
                  <path d="M5 2h4v2h2v1h1v1h1v2h-1v1h-2v1h1v4h-2v-2h-2v2H6v-3H4v-3H2V7h2V5h1V2z" />
                </svg>
              </div>

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
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  espContainer: {
    position: 'absolute',
    top: '10px',
    width: '140px',
    height: '300px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.35))',
    zIndex: 4
  },
  espImage: {
    width: '100%',
    height: '100%',
    objectFit: 'contain'
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