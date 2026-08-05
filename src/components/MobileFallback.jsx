import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Instagram } from 'lucide-react';

export default function MobileFallback() {
  const [text, setText] = useState('');
  const [socialText, setSocialText] = useState('');
  
  const fullText = "> ERR_RESOLUTION\n> MOBILE DEVICE DETECTED.\n> PLEASE OPEN ON PC.";
  const fullSocialText = "CONNECT WITH ME ON:";

  // Typewriter effect for first screen
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

  // Typewriter effect for second screen
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullSocialText.length) {
        setSocialText(fullSocialText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.pageContainer}>
      <style>{`
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
        @keyframes bounceArrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
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
        .scroll-indicator {
          animation: bounceArrow 1.5s infinite ease-in-out;
        }
        .social-icon {
          transition: transform 0.2s, filter 0.2s;
        }
        .social-icon:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 0 8px #00ffcc);
        }
      `}</style>

      {/* --- SECTION 1: WARNING SCREEN --- */}
      <section style={styles.section}>
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

              {/* 🐱 SYMMETRICALLY PATROLLING PIXEL CAT */}
              <div style={styles.catContainer}>
                <div className="cat-walker">
                  <div className="pixel-cat">
                    <svg width="28" height="24" viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="10" width="12" height="10" fill="#00ffcc" />
                      <rect x="12" y="4" width="10" height="8" fill="#00ffcc" />
                      <path d="M12 4L10 1H13L14 4H12Z" fill="#00ffcc" />
                      <path d="M20 4L22 1H19L18 4H20Z" fill="#00ffcc" />
                      <rect x="14" y="6" width="2" height="2" fill="#02050a" />
                      <rect x="18" y="6" width="2" height="2" fill="#02050a" />
                      <g className="cat-tail">
                        <rect x="6" y="12" width="3" height="2" fill="#00ffcc" />
                        <rect x="4" y="10" width="2" height="3" fill="#00ffcc" />
                      </g>
                      <rect x="10" y="20" width="2" height="2" fill="#00ffcc" />
                      <rect x="16" y="20" width="2" height="2" fill="#00ffcc" />
                    </svg>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Scroll Prompt */}
        <div style={styles.scrollPrompt}>
          <span style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>SCROLL FOR LINKS</span>
          <div className="scroll-indicator" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>↓</div>
        </div>
      </section>

      {/* --- SECTION 2: SOCIAL LINKS SCREEN --- */}
      <section style={styles.section}>
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

          {/* 🖥️ REALISTIC BLUE OLED MODULE (SOCIALS) */}
          <div style={styles.oledModule}>
            <div style={{...styles.mountHole, top: '8px', left: '8px'}}></div>
            <div style={{...styles.mountHole, top: '8px', right: '8px'}}></div>
            
            <div style={styles.oledPinLabels}>GND &nbsp; VCC &nbsp; SCL &nbsp; SDA</div>

            <div style={styles.screen}>
              <div style={styles.ribbonCable}></div>
              <div style={styles.chipOnGlass}>283</div>

              <div style={styles.textContent}>
                {socialText}
                <span className="cursor"></span>
              </div>

              {/* 🌐 PIXELATED SOCIAL ICONS ROW */}
              <div style={styles.socialIconsContainer}>
                {/* GitHub */}
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.iconLink} title="GitHub">
                  <Github size={28} color="#00ffcc" />
                </a>
                {/* LinkedIn */}
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.iconLink} title="LinkedIn">
                  <Linkedin size={28} color="#00ffcc" />
                </a>
                {/* Instagram */}
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.iconLink} title="Instagram">
                  <Instagram size={28} color="#00ffcc" />
                </a>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}

const styles = {
  pageContainer: {
    width: '100vw',
    height: '100vh',
    overflowY: 'scroll',
    scrollSnapType: 'y mandatory',
    backgroundColor: '#f4f4f4',
    backgroundImage: 'radial-gradient(#b0b0b0 2px, transparent 2px)',
    backgroundSize: '20px 20px',
  },
  section: {
    width: '100vw',
    height: '100vh',
    scrollSnapAlign: 'start',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  circuitWrapper: {
    position: 'relative',
    width: '320px',
    height: '400px',
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
    left: '12px',
    zIndex: 4
  },
  scrollPrompt: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#888',
    fontFamily: 'monospace',
    pointerEvents: 'none'
  },
  socialIconsContainer: {
    position: 'absolute',
    bottom: '16px',
    left: '0',
    right: '0',
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    zIndex: 4
  },
  iconLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    filter: 'drop-shadow(0 0 4px rgba(0, 255, 204, 0.5))'
  }
};