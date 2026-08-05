import React, { useState, useEffect } from 'react';

export default function MobileFallback() {
  const [text, setText] = useState('');
  
  const fullText = "> ERR_RESOLUTION\n> MOBILE DEVICE DETECTED.\n> PLEASE OPEN ON PC AS THIS IS A 3D GAME.";

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
          0%, 100% { opacity: 1; box-shadow: 0 0 8px #ff2a5f; }
          50% { opacity: 0.4; box-shadow: 0 0 2px #ff2a5f; }
        }
        .scanlines {
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.15));
          background-size: 100% 3px;
          pointer-events: none;
          z-index: 10;
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
      `}</style>

      {/* Hardware Container holding the circuit layout */}
      <div style={styles.circuitWrapper}>
        
        {/* 🔌 ESP32 / Microcontroller Board */}
        <div style={styles.espBoard}>
          <div style={styles.espChip}>ESP32-WROOM</div>
          <div style={styles.antenna}></div>
          <div style={styles.usbPort}></div>
          {/* Pins on ESP32 */}
          <div style={styles.espPinsLeft}></div>
          <div style={styles.espPinsRight}></div>
        </div>

        {/* ⚡ Jumper Wires (SVG Curves connecting ESP32 to OLED) */}
        <svg style={styles.wireSvg} width="320" height="300">
          {/* GND Wire (Black) */}
          <path d="M 90 85 C 90 130, 65 140, 65 175" stroke="#111" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* VCC Wire (Red) */}
          <path d="M 105 85 C 105 140, 85 140, 85 175" stroke="#ff2a5f" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* SCL Wire (Yellow) */}
          <path d="M 215 85 C 215 130, 230 140, 235 175" stroke="#ffb703" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          {/* SDA Wire (Blue) */}
          <path d="M 230 85 C 230 145, 250 145, 255 175" stroke="#0077b5" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* 🔋 Status LED */}
        <div style={styles.statusLed}></div>

        {/* 🟫 Resistor Component */}
        <div style={styles.resistor}>
          <div style={{...styles.band, backgroundColor: '#b5651d', left: '6px'}}></div>
          <div style={{...styles.band, backgroundColor: '#000', left: '12px'}}></div>
          <div style={{...styles.band, backgroundColor: '#ff0000', left: '18px'}}></div>
          <div style={{...styles.band, backgroundColor: '#ffd700', left: '24px'}}></div>
        </div>

        {/* 🖥️ OLED Display Module */}
        <div style={styles.oledModule}>
          <div style={styles.pinsContainer}>
            {[1,2,3,4].map(i => <div key={i} style={styles.pin} />)}
          </div>
          <div style={{...styles.pinLabel, left: '18px'}}>GND</div>
          <div style={{...styles.pinLabel, left: '40px'}}>VCC</div>
          <div style={{...styles.pinLabel, left: '62px'}}>SCL</div>
          <div style={{...styles.pinLabel, left: '85px'}}>SDA</div>

          <div style={styles.screen}>
            <div className="scanlines"></div>
            <div style={styles.textContent}>
              {text}
              <span className="cursor"></span>
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
    backgroundColor: '#f0f0f0', 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundImage: 'radial-gradient(#b5b5b5 2px, transparent 2px)',
    backgroundSize: '20px 20px',
    overflow: 'hidden',
    position: 'relative'
  },
  circuitWrapper: {
    position: 'relative',
    width: '320px',
    height: '420px',
    display: 'flex',
    flexDirection: 'column',
    alignItem: 'center'
  },
  espBoard: {
    position: 'absolute',
    top: '10px',
    left: '60px',
    width: '200px',
    height: '75px',
    backgroundColor: '#1b3b2b', // Classic dev board green
    borderRadius: '4px',
    border: '1px solid #112217',
    boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  espChip: {
    backgroundColor: '#111',
    color: '#aaa',
    fontSize: '9px',
    fontFamily: 'monospace',
    padding: '12px 18px',
    borderRadius: '2px',
    border: '1px solid #333'
  },
  antenna: {
    position: 'absolute',
    top: '4px',
    left: '12px',
    width: '18px',
    height: '12px',
    backgroundColor: '#d4af37',
    borderRadius: '2px'
  },
  usbPort: {
    position: 'absolute',
    bottom: '-4px',
    left: '85px',
    width: '30px',
    height: '8px',
    backgroundColor: '#ccc',
    borderRadius: '2px'
  },
  espPinsLeft: {
    position: 'absolute',
    left: '-3px',
    top: '10px',
    bottom: '10px',
    width: '4px',
    backgroundColor: '#ffd700',
    boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
  },
  espPinsRight: {
    position: 'absolute',
    right: '-3px',
    top: '10px',
    bottom: '10px',
    width: '4px',
    backgroundColor: '#ffd700',
    boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)'
  },
  wireSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 5
  },
  statusLed: {
    position: 'absolute',
    top: '140px',
    left: '180px',
    width: '8px',
    height: '8px',
    backgroundColor: '#ff2a5f',
    borderRadius: '50%',
    animation: 'ledPulse 1.5s infinite ease-in-out',
    zIndex: 6
  },
  resistor: {
    position: 'absolute',
    top: '135px',
    left: '110px',
    width: '35px',
    height: '10px',
    backgroundColor: '#e6ccb2',
    borderRadius: '5px',
    border: '1px solid #b5838d',
    zIndex: 6,
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  },
  band: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '3px'
  },
  oledModule: {
    position: 'absolute',
    top: '175px',
    left: '30px',
    padding: '18px 12px 12px 12px', 
    backgroundColor: '#121218', 
    borderRadius: '6px', 
    boxShadow: '0 15px 35px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.1)', 
    border: '1px solid #000',
    zIndex: 10
  },
  pinsContainer: {
    position: 'absolute',
    top: '-12px',
    left: '20px',
    display: 'flex',
    gap: '12px'
  },
  pin: {
    width: '5px',
    height: '16px',
    backgroundColor: '#c0c0c0',
    border: '1px solid #666',
    borderBottom: 'none'
  },
  pinLabel: {
    position: 'absolute',
    top: '4px',
    color: '#777',
    fontSize: '7px',
    fontFamily: 'monospace',
    fontWeight: 'bold'
  },
  screen: {
    width: '235px', 
    height: '115px', 
    backgroundColor: '#00050a', 
    border: '3px solid #08080c', 
    borderRadius: '2px', 
    padding: '10px', 
    position: 'relative', 
    overflow: 'hidden',
    boxShadow: 'inset 0 0 12px rgba(0,255,204,0.15)'
  },
  textContent: {
    color: '#00ffcc', 
    fontFamily: '"Courier New", Courier, monospace', 
    fontSize: '0.85rem', // Smaller font so all 3 lines fit perfectly
    fontWeight: 'bold',
    whiteSpace: 'pre-wrap', 
    textShadow: '0 0 5px rgba(0, 255, 204, 0.7), 0 0 2px rgba(0, 255, 204, 0.4)', 
    zIndex: 2, 
    position: 'relative',
    lineHeight: '1.35'
  }
};