import React from 'react';

export default function LedHeading() {
  return (
    <div style={styles.moduleWrapper}>
      <style>{`
        @keyframes ledFlicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            opacity: 1;
            text-shadow: 0 0 4px #ff2a5f, 0 0 10px #ff2a5f, 0 0 20px #ff2a5f;
          }
          20%, 24%, 55% {
            opacity: 0.6;
            text-shadow: 0 0 2px #ff2a5f;
          }
        }
        .led-text {
          animation: ledFlicker 5s infinite;
        }
      `}</style>
      
      {/* Outer PCB/Plastic Housing */}
      <div style={styles.housing}>
        
        {/* Mounting Screws */}
        <div style={{...styles.screw, top: 6, left: 6}}></div>
        <div style={{...styles.screw, top: 6, right: 6}}></div>
        <div style={{...styles.screw, bottom: 6, left: 6}}></div>
        <div style={{...styles.screw, bottom: 6, right: 6}}></div>

        {/* Inner Dark Acrylic Glass */}
        <div style={styles.glassScreen}>
          
          {/* The Glowing Text */}
          <div className="led-text" style={styles.text}>
            PRATYUSH'S PORTFOLIO
          </div>

          {/* Dot Matrix Overlay (creates the illusion of individual LED bulbs) */}
          <div style={styles.dotMatrixOverlay}></div>
          
        </div>
      </div>
    </div>
  );
}

const styles = {
  moduleWrapper: { position: 'relative', zIndex: 10 },
  
  housing: { width: '360px', height: '70px', backgroundColor: '#1a1a1a', borderRadius: '6px', border: '2px solid #0a0a0a', boxShadow: '0 15px 30px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  
  screw: { position: 'absolute', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#333', border: '1px solid #111', boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.2)' },
  
  glassScreen: { width: '320px', height: '40px', backgroundColor: '#2b0005', border: 'inset 2px #0a0a0a', borderRadius: '3px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: 'inset 0 0 15px rgba(255,0,0,0.2)' },
  
  text: { color: '#ff2a5f', fontFamily: '"Courier New", Courier, monospace', fontSize: '22px', fontWeight: 'bold', letterSpacing: '2px', whiteSpace: 'nowrap', zIndex: 1 },
  
  // This overlay puts tiny black dots over the text to make it look like a real LED matrix board
  dotMatrixOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'radial-gradient(rgba(0,0,0,0.85) 1px, transparent 1px)', backgroundSize: '3px 3px', zIndex: 2, pointerEvents: 'none' }
};