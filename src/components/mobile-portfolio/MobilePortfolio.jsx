import React, { useState, useRef } from 'react';
import Esp32Brain from './Esp32Brain';
import OledScreen from './OledScreen';
import AwsTftScreen from './AwsTftScreen';
import ProjectsTftScreen from './ProjectsTftScreen';
import SkillsMatrix from './SkillsMatrix';
import SdCardResume from './SdCardResume';
import WireManager from './WireManager';
import LedHeading from './LedHeading';

export default function MobilePortfolio() {
  const [position, setPosition] = useState({ x: -900, y: -700 });
  const [hasDragged, setHasDragged] = useState(false); // New state to track if user has moved
  
  const isDragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: -900, y: -700 });

  const handlePointerDown = (e) => {
    isDragging.current = true;
    startPos.current = { 
      x: e.clientX || (e.touches && e.touches[0].clientX), 
      y: e.clientY || (e.touches && e.touches[0].clientY) 
    };
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    
    // As soon as the user drags, hide the prompt permanently
    if (!hasDragged) {
      setHasDragged(true);
    }

    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    
    const dx = clientX - startPos.current.x;
    const dy = clientY - startPos.current.y;
    
    // Canvas bounds to prevent dragging into the abyss
    let newX = Math.min(0, Math.max(-2000, currentPos.current.x + dx)); 
    let newY = Math.min(0, Math.max(-1600, currentPos.current.y + dy)); 

    setPosition({ x: newX, y: newY });
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    currentPos.current = { x: position.x, y: position.y };
  };

  return (
    <div 
      style={styles.viewport}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      {/* Conditionally render the drag hint so it vanishes forever */}
      {!hasDragged && (
        <div style={styles.dragHint}>
          <div style={styles.pulseArrows}>⤡</div>
          DRAG ANYWHERE TO EXPLORE
        </div>
      )}
      
      {/* 2400x2400 Infinite Breadboard Canvas */}
      <div style={{
        ...styles.canvas,
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}>
        <WireManager />

        {/* CENTER: Main Brain, Heading & Socials */}
        <div style={{ position: 'absolute', top: 880, left: 940 }}><LedHeading /></div>
        <div style={{ position: 'absolute', top: 1000, left: 1000 }}><Esp32Brain /></div>
        <div style={{ position: 'absolute', top: 1180, left: 980 }}><OledScreen /></div>
        
        {/* CENTER: Main Brain & Socials */}
        <div style={{ position: 'absolute', top: 1000, left: 1000 }}><Esp32Brain /></div>
        <div style={{ position: 'absolute', top: 1180, left: 980 }}><OledScreen /></div>

        {/* TOP RIGHT: AWS Badges */}
        <div style={{ position: 'absolute', top: 600, left: 1550 }}><AwsTftScreen /></div>

        {/* BOTTOM RIGHT: Project Demos */}
        <div style={{ position: 'absolute', top: 1500, left: 1500 }}><ProjectsTftScreen /></div>

        {/* TOP LEFT: Tech Stack / Skills (SHIFTED RIGHT TO COVER WIRES) */}
        <div style={{ position: 'absolute', top: 650, left: 540 }}><SkillsMatrix /></div>

        {/* BOTTOM LEFT: Resume SD Card */}
        <div style={{ position: 'absolute', top: 1450, left: 550 }}><SdCardResume /></div>
      </div>
    </div>
  );
}

const styles = {
  viewport: { width: '100vw', height: '100vh', overflow: 'hidden', backgroundColor: '#f4f4f4', position: 'relative', touchAction: 'none', cursor: 'grab' },
  canvas: { width: '2400px', height: '2400px', backgroundImage: 'radial-gradient(#b0b0b0 2px, transparent 2px)', backgroundSize: '20px 20px', position: 'absolute', top: 0, left: 0, willChange: 'transform' },
  dragHint: { position: 'absolute', top: '40px', width: '100%', textAlign: 'center', color: '#777', fontFamily: 'monospace', fontWeight: 'bold', zIndex: 100, pointerEvents: 'none', letterSpacing: '2px', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInOut 4s' },
  pulseArrows: { fontSize: '2rem', animation: 'pulseArrow 2s infinite ease-in-out', marginBottom: '8px' }
};