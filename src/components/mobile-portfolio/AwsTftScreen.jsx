import React, { useState, useEffect } from 'react';

export default function AwsTftScreen() {
  const [badgeIndex, setBadgeIndex] = useState(0);
  
  // ALL 8 BADGES LOADED
  const badges = [
    {
      text: "AWS AI Practitioner",
      sub: "Certification",
      src: "/awsbadges/aws-certified-ai-practitioner.png", 
      link: "https://www.credly.com/earner/earned/badge/6e4619bd-0350-475e-a2b6-4e824075aae6",
      color: "#ff9900" // Classic AWS Orange
    },
    {
      text: "AWS Agentic AI Demonstrated",
      sub: "Assessment",
      src: "/awsbadges/aws-agentic-ai-demonstrated.png",
      link: "https://www.credly.com/earner/earned/badge/a294af11-aec9-4f6a-947c-b557cc2237bf",
      color: "#00ffcc" // Cyan
    },
    {
      text: "AWS MLOPS Demonstrated",
      sub: "Assessment",
      src: "/awsbadges/aws-mlops-demonstrated.png",
      link: "https://www.credly.com/earner/earned/badge/780cf463-fed0-464d-9fa7-4ef31d87eebf",
      color: "#ff2a5f" // Red/Pink
    },
    {
      text: "AWS Generative AI Architect",
      sub: "CloudQuest",
      src: "/awsbadges/aws-cloud-quest-generative-ai-architect-training-ba.png", 
      link: "https://www.credly.com/earner/earned/badge/94dfc518-a2ff-4e3a-8098-4498b0e89cba",
      color: "#ffb703" // Amber/Yellow
    },
    {
      text: "AWS Generative AI Practitioner",
      sub: "CloudQuest",
      src: "/awsbadges/aws-cloud-quest-generative-ai-practitioner-training.png", 
      link: "https://www.credly.com/earner/earned/badge/c4661ac0-07a9-47ad-b162-7c35b17e0f3c",
      color: "#3a86ff" // Blue
    },
    {
      text: "AWS AI Architect",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-ai-architect-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/bb89cf9b-dec6-4932-81c6-9e525675d856",
      color: "#00b4d8" // Deep Sky Blue
    },
    {
      text: "AWS Machine Learning",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-machine-learning-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/b23238e5-2191-4646-beb5-6458fe941243",
      color: "#ff006e" // Magenta
    },
    {
      text: "AWS AI Practitioner",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-ai-practitioner-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/a5def58a-560d-46a7-94de-a357904574ed",
      color: "#8338ec" // Violet
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % badges.length);
    }, 4500); 
    return () => clearInterval(timer);
  }, [badges.length]);

  const currentBadgeColor = badges[badgeIndex].color;

  return (
    <div style={styles.hardwareBase}>
      <style>{`
        /* Scanlines for CRT/TFT effect */
        .tft-scanlines {
          background: linear-gradient(rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0) 50%);
          background-size: 100% 2px;
          pointer-events: none;
        }

        /* Continuous radar sweep animation */
        @keyframes radarSweep {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }

        /* Soft pulse animation for the sweep lines */
        @keyframes radarPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        /* Faux progress fill animation */
        @keyframes fillBarTft { 0% { width: 0%; } 100% { width: 100%; } }
      `}</style>

      {/* PCB details with updated silkscreen */}
      <div style={{...styles.mountHole, top: 12, left: 12}}></div>
      <div style={{...styles.mountHole, top: 12, right: 12}}></div>
      <div style={{...styles.mountHole, bottom: 12, left: 12}}></div>
      <div style={{...styles.mountHole, bottom: 12, right: 12}}></div>
      <div style={styles.silkscreen}>MOD: GC9A01_SPI_AWS</div>

      {/* Sleek Black Screen Bezel */}
      <div style={styles.screenBezel}>
        
        {/* Rounded Screen Area */}
        <div style={styles.screen}>
          
          {/* Radar Sweep Lines (Continuous background animation) */}
          <div style={{...styles.radarPulseLayer, color: currentBadgeColor, zIndex: 1}}>
            <div style={{...styles.radarLine, transform: 'translate(-50%, -50%) rotate(0deg)'}}></div>
            <div style={{...styles.radarLine, transform: 'translate(-50%, -50%) rotate(90deg)'}}></div>
            <div style={{...styles.radarLine, transform: 'translate(-50%, -50%) rotate(180deg)'}}></div>
            <div style={{...styles.radarLine, transform: 'translate(-50%, -50%) rotate(270deg)'}}></div>
          </div>
          
          {/* Radar Sweep Effect (A rotating conical gradient acting as a sweep) */}
          <div style={{...styles.radarSweepEffect, zIndex: 2, background: `conic-gradient(from 0deg at 50% 50%, transparent 80%, ${currentBadgeColor} 100%)`}}></div>

          <div style={styles.tftOverlay}></div>

          {/* Clickable Badge Container */}
          <a 
            key={badgeIndex} // Re-renders content for new animations
            href={badges[badgeIndex].link} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={styles.badgeContainer}
            title={`View ${badges[badgeIndex].text} Credential`}
          >
            <img 
              src={badges[badgeIndex].src} 
              alt={badges[badgeIndex].text}
              style={styles.badgeImage} 
            />

            <div style={{...styles.titleText, color: currentBadgeColor}}>
              {badges[badgeIndex].text}
            </div>
            
            <div style={styles.subText}>
              {badges[badgeIndex].sub}
            </div>
            
            {/* Dashed E-ink style dashed loading bar */}
            <div style={styles.loadingBar}>
              <div style={{...styles.loadingFill, backgroundColor: currentBadgeColor}}></div>
            </div>
          </a>

        </div>
      </div>
    </div>
  );
}

const styles = {
  // Red hardware base
  hardwareBase: { width: '280px', height: '280px', backgroundColor: '#8b0000', borderRadius: '4px', border: '2px solid #5a0000', boxShadow: '0 15px 30px rgba(0,0,0,0.5)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  mountHole: { position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e0e0e0', border: '2px solid #b0b0b0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)' },
  silkscreen: { position: 'absolute', bottom: '12px', color: '#ffb3b3', fontFamily: 'monospace', fontSize: '9px', fontWeight: 'bold', letterSpacing: '1px' },
  
  // Clean Black Bezel for the circular screen
  screenBezel: { width: '240px', height: '240px', backgroundColor: '#000', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '6px solid #222', boxShadow: '0 10px 20px rgba(0,0,0,0.8)' },
  
  // perfectly circular TFT screen
  screen: { width: '228px', height: '228px', backgroundColor: '#02050a', borderRadius: '50%', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid #111', boxShadow: 'inset 0 0 20px rgba(255,255,255,0.05)' },
  
  // Radar sweep animation
  radarSweepEffect: { position: 'absolute', top: '50%', left: '50%', width: '150%', height: '150%', borderRadius: '50%', transformOrigin: '50% 50%', animation: 'radarSweep 5s linear infinite', opacity: 0.15, pointerEvents: 'none' },
  
  // Pulsing cross-lines for the radar
  radarPulseLayer: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '50%', animation: 'radarPulse 2s ease-in-out infinite', pointerEvents: 'none' },
  radarLine: { position: 'absolute', top: '50%', left: '50%', width: '100%', height: '1px', backgroundColor: 'currentColor', transformOrigin: '50% 50%' },

  // CRT style scanlines and flicker
  tftOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(0,0,0,0.15) 50%, rgba(0,0,0,0) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.015), rgba(0, 255, 0, 0.005), rgba(0, 0, 255, 0.015))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', zIndex: 3 },

  // Clickable content container
  badgeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', zIndex: 10, textDecoration: 'none', pointerEvents: 'auto', width: '80%', height: '80%', transition: 'transform 0.2s', padding: '10px' },
  
  // circular badge fits naturally into the circular screen
  badgeImage: { width: '90px', height: '90px', objectFit: 'contain', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.6))', animation: 'radarPulse 4.5s ease-in-out infinite' },
  
  titleText: { fontSize: '11px', fontWeight: '900', textAlign: 'center', marginTop: '10px', textTransform: 'uppercase', textShadow: '0 0 5px currentColor, 0 0 2px #fff', letterSpacing: '0.5px' },
  subText: { color: '#ccc', fontSize: '9px', marginTop: '2px', fontWeight: 'bold' },
  
  // Chunky hardware-style progress bar
  loadingBar: { width: '100px', height: '4px', backgroundColor: '#333', marginTop: '12px', borderRadius: '2px', overflow: 'hidden', border: '1px solid #0a0a0a' },
  loadingFill: { height: '100%', animation: 'fillBarTft 4.5s linear infinite', boxShadow: '0 0 5px currentColor' }
};