import React, { useState, useEffect } from 'react';

export default function MobileFallback() {
  const [text, setText] = useState('');
  const [socialText, setSocialText] = useState('');
  const [currentScreen, setCurrentScreen] = useState('main');
  
  const mainText = "> ERR_RESOLUTION\n> MOBILE DEVICE DETECTED.\n> PLEASE OPEN ON PC.";
  const socialTextContent = "CONNECT WITH ME ON:";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= mainText.length) {
        setText(mainText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= socialTextContent.length) {
        setSocialText(socialTextContent.slice(0, currentIndex));
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
        @keyframes pulseArrow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.15); opacity: 1; }
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
        .nav-arrow {
          animation: pulseArrow 1.5s infinite ease-in-out;
          cursor: pointer;
          transition: transform 0.2s, filter 0.2s;
        }
        .nav-arrow:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 0 8px #00ffcc);
        }
        .social-icon {
          transition: transform 0.2s, filter 0.2s;
        }
        .social-icon:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 0 8px #00ffcc);
        }
      `}</style>

      <div style={styles.circuitWrapper}>
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

        <svg style={styles.wireSvg} width="320" height="340">
          <path d="M 100 85 C 100 130, 80 140, 80 195" stroke="#222" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 118 85 C 118 135, 105 140, 103 195" stroke="#d90429" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 195 85 C 195 130, 210 140, 215 195" stroke="#ffb703" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <path d="M 212 85 C 212 145, 235 145, 238 195" stroke="#0077b5" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        </svg>

        <div style={styles.headerSocket}>
          <div style={styles.socketHoles}></div>
        </div>

        <div style={styles.oledModule}>
          <div style={{...styles.mountHole, top: '8px', left: '8px'}}></div>
          <div style={{...styles.mountHole, top: '8px', right: '8px'}}></div>
          
          <div style={styles.oledPinLabels}>GND &nbsp; VCC &nbsp; SCL &nbsp; SDA</div>

          <div style={styles.screen}>
            <div style={styles.ribbonCable}></div>

            <div style={{
              ...styles.sliderTrack,
              transform: currentScreen === 'main' ? 'translateX(0px)' : 'translateX(-220px)',
            }}>
              
              <div style={styles.screenPane}>
                <div style={styles.textContent}>
                  {text}
                  <span className="cursor"></span>
                </div>

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

                <div 
                  className="nav-arrow" 
                  style={styles.rightArrow}
                  onClick={() => setCurrentScreen('social')}
                  title="Connect"
                >
                  &gt;
                </div>
              </div>

              <div style={styles.screenPane}>
                <div style={styles.textContent}>
                  {socialText}
                </div>

                <div style={styles.socialIconsContainer}>
                  <a href="https://github.com/pratyushwinorlearn" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.iconLink} title="GitHub">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  </a>
                  <a href="https://www.linkedin.com/in/shekhar-pratyush-445362327" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.iconLink} title="LinkedIn">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                  <a href="https://www.instagram.com/shekhardgaf" target="_blank" rel="noopener noreferrer" className="social-icon" style={styles.iconLink} title="Instagram">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00ffcc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </div>

                <div 
                  className="nav-arrow" 
                  style={styles.leftArrow}
                  onClick={() => setCurrentScreen('main')}
                  title="Back"
                >
                  &lt;
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
  pageContainer: {
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#f4f4f4',
    backgroundImage: 'radial-gradient(#b0b0b0 2px, transparent 2px)',
    backgroundSize: '20px 20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  circuitWrapper: {
    position: 'relative',
    width: '320px',
    height: '370px',
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
  sliderTrack: {
    display: 'flex',
    width: '440px',
    height: '100%',
    transition: 'transform 0.35s cubic-bezier(0.1, 0.9, 0.2, 1)'
  },
  screenPane: {
    width: '220px',
    height: '100%',
    position: 'relative',
    flexShrink: 0,
    padding: '4px'
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
  rightArrow: {
    position: 'absolute',
    bottom: '6px',
    right: '8px',
    color: '#00ffcc',
    fontFamily: 'monospace',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    zIndex: 5,
    textShadow: '0 0 6px rgba(0, 255, 204, 0.8)'
  },
  leftArrow: {
    position: 'absolute',
    bottom: '6px',
    left: '8px',
    color: '#00ffcc',
    fontFamily: 'monospace',
    fontSize: '1.4rem',
    fontWeight: 'bold',
    zIndex: 5,
    textShadow: '0 0 6px rgba(0, 255, 204, 0.8)'
  },
  socialIconsContainer: {
    position: 'absolute',
    bottom: '35px',
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