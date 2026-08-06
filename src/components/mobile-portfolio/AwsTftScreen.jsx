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
      color: "#ff9900"
    },
    {
      text: "AWS Agentic AI Demonstrated",
      sub: "Assessment",
      src: "/awsbadges/aws-agentic-ai-demonstrated.png",
      link: "https://www.credly.com/earner/earned/badge/a294af11-aec9-4f6a-947c-b557cc2237bf",
      color: "#00ffcc"
    },
    {
      text: "AWS MLOPS Demonstrated",
      sub: "Assessment",
      src: "/awsbadges/aws-mlops-demonstrated.png",
      link: "https://www.credly.com/earner/earned/badge/780cf463-fed0-464d-9fa7-4ef31d87eebf",
      color: "#ff2a5f"
    },
    {
      text: "AWS Generative AI Architect",
      sub: "CloudQuest",
      src: "/awsbadges/aws-cloud-quest-generative-ai-architect-training-ba.png", 
      link: "https://www.credly.com/earner/earned/badge/94dfc518-a2ff-4e3a-8098-4498b0e89cba",
      color: "#ffb703"
    },
    {
      text: "AWS Generative AI Practitioner",
      sub: "CloudQuest",
      src: "/awsbadges/aws-cloud-quest-generative-ai-practitioner-training.png", 
      link: "https://www.credly.com/earner/earned/badge/c4661ac0-07a9-47ad-b162-7c35b17e0f3c",
      color: "#3a86ff"
    },
    {
      text: "AWS AI Architect",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-ai-architect-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/bb89cf9b-dec6-4932-81c6-9e525675d856",
      color: "#00b4d8"
    },
    {
      text: "AWS Machine Learning",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-machine-learning-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/b23238e5-2191-4646-beb5-6458fe941243",
      color: "#ff006e"
    },
    {
      text: "AWS AI Practitioner",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-ai-practitioner-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/a5def58a-560d-46a7-94de-a357904574ed",
      color: "#8338ec"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % badges.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [badges.length]);

  return (
    <div style={styles.tftModule}>
      <style>{`
        @keyframes fillBar { 0% { width: 0%; } 100% { width: 100%; } }
        @keyframes popIn { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>

      {/* PCB Details */}
      <div style={{...styles.mountHole, top: 8, left: 8}}></div>
      <div style={{...styles.mountHole, top: 8, right: 8}}></div>
      <div style={{...styles.mountHole, bottom: 8, left: 8}}></div>
      <div style={{...styles.mountHole, bottom: 8, right: 8}}></div>
      <div style={styles.silkscreen}>TFT_ILI9341_AWS</div>

      {/* Display Screen */}
      <div style={styles.screen}>
        <div style={styles.scanlines}></div>
        
        {/* Clickable Badge Container */}
        <a 
          href={badges[badgeIndex].link} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={styles.badgeContainer}
          title={`View ${badges[badgeIndex].text} Credential`}
        >
          <div style={{ color: '#aaa', fontSize: '9px', marginBottom: '6px' }}>[ VERIFIED CREDENTIAL ]</div>
          
          {/* Badge Image with forced re-render for animation */}
          <img 
            key={badges[badgeIndex].src} 
            src={badges[badgeIndex].src} 
            alt={badges[badgeIndex].text}
            style={styles.badgeImage} 
          />

          <div style={{ color: badges[badgeIndex].color, fontSize: '11px', fontWeight: 'bold', textAlign: 'center', marginTop: '6px' }}>
            {badges[badgeIndex].text}
          </div>
          
          <div style={{ color: '#fff', fontSize: '9px', marginTop: '2px' }}>
            {badges[badgeIndex].sub}
          </div>
          
          {/* Faux progress/validation bar */}
          <div style={styles.loadingBar}>
            <div key={badgeIndex} style={{...styles.loadingFill, backgroundColor: badges[badgeIndex].color}}></div>
          </div>
        </a>

      </div>
    </div>
  );
}

const styles = {
  tftModule: { width: '280px', height: '200px', backgroundColor: '#8b0000', borderRadius: '4px', border: '2px solid #5a0000', boxShadow: '0 15px 30px rgba(0,0,0,0.5)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  mountHole: { position: 'absolute', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#e0e0e0', border: '2px solid #b0b0b0', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)' },
  silkscreen: { position: 'absolute', bottom: '8px', color: '#ffb3b3', fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold' },
  screen: { width: '230px', height: '150px', backgroundColor: '#050505', border: '4px solid #111', borderRadius: '2px', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  scanlines: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))', backgroundSize: '100% 4px, 6px 100%', pointerEvents: 'none', zIndex: 5 },
  badgeContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace', zIndex: 10, textDecoration: 'none', pointerEvents: 'auto', width: '100%', height: '100%' },
  badgeImage: { width: '60px', height: '60px', objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))', animation: 'popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
  loadingBar: { width: '120px', height: '4px', backgroundColor: '#222', marginTop: '10px', borderRadius: '2px', overflow: 'hidden' },
  loadingFill: { height: '100%', animation: 'fillBar 4s linear infinite' }
};