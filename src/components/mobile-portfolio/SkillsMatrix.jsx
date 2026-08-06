import React, { useState } from 'react';

export default function SkillsMatrix() {
  const [activeTab, setActiveTab] = useState(0);
  const skills = [
    { cat: "LANG", items: "JAVA • PYTHON • C++" },
    { cat: "WEB", items: "NEXT.JS • NODE.JS • EXPRESS" },
    { cat: "TOOLS", items: "FRAMER MOTION • ECLIPSE" }
  ];

  // Pin labels matching the staggered layout of the reference image
  const topPins = ['RES', 'CS', 'DIN', 'VCC'];
  const bottomPins = ['DC', 'CLK', 'GND'];

  return (
    <div style={styles.moduleWrapper}>
      
      {/* 🔴 BARE TACTILE BUTTONS (Green PCB Removed) */}
      <div style={styles.buttonBoard}>
        {skills.map((skill, index) => (
          <div key={index} style={styles.tactileWrapper} onPointerDown={() => setActiveTab(index)}>
            
            <div style={styles.btnNumber}>0{index + 1}</div>
            
            {/* Silver Legs */}
            <div style={{...styles.leg, top: 2, left: -4, transform: 'rotate(-15deg)'}}></div>
            <div style={{...styles.leg, top: 2, right: -4, transform: 'rotate(15deg)'}}></div>
            <div style={{...styles.leg, bottom: 2, left: -4, transform: 'rotate(-165deg)'}}></div>
            <div style={{...styles.leg, bottom: 2, right: -4, transform: 'rotate(165deg)'}}></div>
            
            {/* Black Plastic Housing */}
            <div style={styles.tactileBody}>
              {/* Red Circular Plunger */}
              <div style={{
                ...styles.tactilePlunger,
                transform: activeTab === index ? 'scale(0.9) translateY(2px)' : 'scale(1) translateY(0px)',
                boxShadow: activeTab === index 
                  ? 'inset 0 2px 4px rgba(0,0,0,0.8), 0 0 2px rgba(0,0,0,0.9)' 
                  : 'inset 0 2px 5px rgba(255,255,255,0.4), 0 3px 4px rgba(0,0,0,0.7)'
              }}></div>
            </div>

          </div>
        ))}
      </div>

      {/* 🔵 7-PIN SPI BLUE OLED SCREEN */}
      <div style={styles.oledBoard}>
        
        {/* Mounting Holes */}
        <div style={{...styles.mountHole, top: 6, left: 6}}></div>
        <div style={{...styles.mountHole, top: 6, right: 6}}></div>
        <div style={{...styles.mountHole, bottom: 6, left: 6}}></div>
        <div style={{...styles.mountHole, bottom: 6, right: 6}}></div>

        {/* Top Staggered Pin Header */}
        <div style={styles.pinHeaderArea}>
          <div style={styles.pinLabelsTop}>
            {topPins.map(pin => <span key={pin} style={styles.pinText}>{pin}</span>)}
          </div>
          
          <div style={styles.pinHoles}>
            {[...Array(7)].map((_, i) => (
              <div key={i} style={styles.silverPin}>
                <div style={styles.pinHoleDark}></div>
              </div>
            ))}
          </div>

          <div style={styles.pinLabelsBottom}>
            {bottomPins.map(pin => <span key={pin} style={styles.pinText}>{pin}</span>)}
          </div>
        </div>

        {/* Black Screen Area */}
        <div style={styles.glassScreen}>
          <div style={styles.screenInner}>
            <div style={styles.matrixCategory}>[{skills[activeTab].cat}]</div>
            <div key={activeTab} style={styles.matrixText}>
              {skills[activeTab].items}
            </div>
          </div>
        </div>

        {/* Yellow/Orange Data Ribbon */}
        <div style={styles.ribbonCable}></div>
        
      </div>

    </div>
  );
}

const styles = {
  // FIXED: Added position: 'relative' so zIndex actually works to cover the wires!
  moduleWrapper: { position: 'relative', display: 'flex', gap: '20px', alignItems: 'center', zIndex: 10 },
  
  // BUTTON BOARD STYLES
  buttonBoard: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', padding: '10px 0' },
  tactileWrapper: { position: 'relative', width: '32px', height: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' },
  btnNumber: { position: 'absolute', left: '-18px', color: '#888', fontSize: '9px', fontFamily: 'monospace', fontWeight: 'bold' },
  leg: { position: 'absolute', width: '8px', height: '3px', backgroundColor: '#e0e0e0', border: '1px solid #999', borderRadius: '1px', boxShadow: '0 2px 4px rgba(0,0,0,0.5)', zIndex: 1 },
  tactileBody: { width: '22px', height: '22px', background: 'linear-gradient(135deg, #333 0%, #111 100%)', borderRadius: '2px', border: '1px solid #000', boxShadow: '0 4px 6px rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2 },
  tactilePlunger: { width: '12px', height: '12px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 30%, #ff4d4d, #cc0000)', transition: 'all 0.1s cubic-bezier(0.4, 0.0, 0.2, 1)' },

  // OLED BOARD STYLES
  oledBoard: { width: '220px', height: '210px', backgroundColor: '#184375', borderRadius: '6px', border: '2px solid #0f2e54', boxShadow: '0 15px 30px rgba(0,0,0,0.5)', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mountHole: { position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f4f4f4', border: '2px solid #silver', boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.6)' },
  
  pinHeaderArea: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6px', marginBottom: '8px' },
  pinLabelsTop: { display: 'flex', gap: '14px', paddingLeft: '4px', marginBottom: '2px' },
  pinLabelsBottom: { display: 'flex', gap: '16px', paddingLeft: '8px', marginTop: '2px' },
  pinText: { color: '#fff', fontSize: '8px', fontFamily: 'sans-serif', fontWeight: 'bold', letterSpacing: '0.5px' },
  pinHoles: { display: 'flex', gap: '6px' },
  silverPin: { width: '12px', height: '12px', borderRadius: '50%', background: 'radial-gradient(circle, #fff, #999)', display: 'flex', justifyContent: 'center', alignItems: 'center', boxShadow: '0 2px 3px rgba(0,0,0,0.4)' },
  pinHoleDark: { width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#111', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)' },

  glassScreen: { width: '200px', height: '110px', backgroundColor: '#000', borderTop: '8px solid #050505', borderBottom: '12px solid #050505', borderLeft: '2px solid #050505', borderRight: '2px solid #050505', borderRadius: '2px', position: 'relative', boxShadow: 'inset 0 0 15px rgba(0,150,255,0.1), 0 4px 10px rgba(0,0,0,0.5)', zIndex: 3 },
  screenInner: { width: '100%', height: '100%', backgroundColor: '#0a0f1a', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', overflow: 'hidden' },
  matrixCategory: { color: '#00e5ff', fontFamily: 'monospace', fontSize: '10px', marginBottom: '12px', opacity: 0.8 },
  matrixText: { color: '#00e5ff', fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold', textShadow: '0 0 8px #00e5ff, 0 0 2px #00e5ff', animation: 'fadeIn 0.3s', textAlign: 'center', padding: '0 10px' },

  ribbonCable: { position: 'absolute', bottom: '-8px', width: '50px', height: '25px', background: 'repeating-linear-gradient(90deg, #d48b2a, #d48b2a 2px, #a66a1a 2px, #a66a1a 4px)', border: '1px solid #8c5713', borderRadius: '0 0 4px 4px', zIndex: 1, boxShadow: '0 4px 6px rgba(0,0,0,0.4)' }
};