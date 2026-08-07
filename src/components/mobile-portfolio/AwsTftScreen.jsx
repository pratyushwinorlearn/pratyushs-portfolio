import React, { useState, useEffect, useRef } from 'react';

export default function AwsCluster() {
  const [badgeIndex, setBadgeIndex] = useState(0);
  const [activeBtn, setActiveBtn] = useState(null);
  
  // Interaction state for the prompt
  const [hasClicked, setHasClicked] = useState(false);
  const timerRef = useRef(null);

  const badges = [
    { text: "AWS AI Practitioner", sub: "Certification", src: "/awsbadges/aws-certified-ai-practitioner.png", link: "https://www.credly.com/earner/earned/badge/6e4619bd-0350-475e-a2b6-4e824075aae6", color: "#ff9900" },
    { text: "AWS Agentic AI", sub: "Assessment", src: "/awsbadges/aws-agentic-ai-demonstrated.png", link: "https://www.credly.com/earner/earned/badge/a294af11-aec9-4f6a-947c-b557cc2237bf", color: "#00ffcc" },
    { text: "AWS MLOPS", sub: "Assessment", src: "/awsbadges/aws-mlops-demonstrated.png", link: "https://www.credly.com/earner/earned/badge/780cf463-fed0-464d-9fa7-4ef31d87eebf", color: "#ff2a5f" },
    { text: "AWS Gen AI Architect", sub: "CloudQuest", src: "/awsbadges/aws-cloud-quest-generative-ai-architect-training-ba.png", link: "https://www.credly.com/earner/earned/badge/94dfc518-a2ff-4e3a-8098-4498b0e89cba", color: "#ffb703" },
    { text: "Gen AI Practitioner", sub: "CloudQuest", src: "/awsbadges/aws-cloud-quest-generative-ai-practitioner-training.png", link: "https://www.credly.com/earner/earned/badge/c4661ac0-07a9-47ad-b162-7c35b17e0f3c", color: "#3a86ff" },
    { text: "AWS AI Architect", sub: "Simulearn", src: "/awsbadges/aws-simulearn-ai-architect-training-badge.png", link: "https://www.credly.com/earner/earned/badge/bb89cf9b-dec6-4932-81c6-9e525675d856", color: "#00b4d8" },
    { text: "AWS Machine Learning", sub: "Simulearn", src: "/awsbadges/aws-simulearn-machine-learning-training-badge.png", link: "https://www.credly.com/earner/earned/badge/b23238e5-2191-4646-beb5-6458fe941243", color: "#ff006e" },
    { text: "AWS AI Practitioner", sub: "Simulearn", src: "/awsbadges/aws-simulearn-ai-practitioner-training-badge.png", link: "https://www.credly.com/earner/earned/badge/a5def58a-560d-46a7-94de-a357904574ed", color: "#8338ec" }
  ];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setBadgeIndex((prev) => (prev + 1) % badges.length);
    }, 4500);
  };

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const handleNext = (e) => {
    e.stopPropagation();
    if (!hasClicked) setHasClicked(true);
    setActiveBtn('NEXT');
    setBadgeIndex((prev) => (prev + 1) % badges.length);
    resetTimer();
    setTimeout(() => setActiveBtn(null), 150);
  };

  const handleVerify = (e) => {
    e.stopPropagation();
    if (!hasClicked) setHasClicked(true);
    setActiveBtn('VERIFY');
    window.open(badges[badgeIndex].link, '_blank');
    setTimeout(() => setActiveBtn(null), 150);
  };

  const activeBadge = badges[badgeIndex];

  return (
    <div style={styles.clusterWrapper}>
      <style>{`
        @keyframes radarSpin { 100% { transform: rotate(360deg); } }
        @keyframes lcdFlicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.85; } }
        
        /* FIXED: Added translateX(-50%) to maintain center during the bounce */
        @keyframes bouncePrompt {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-5px); }
        }
      `}</style>

      {/* Intra-Cluster Local Wires connecting the 3 nodes */}
      <svg style={styles.localWires} width="350" height="220">
        {/* Vis Node to Data Node */}
        <path d="M 110 50 C 140 50, 150 40, 170 40" stroke="#f4a261" strokeWidth="3" fill="none" />
        <path d="M 110 60 C 140 60, 140 50, 170 50" stroke="#2a9d8f" strokeWidth="3" fill="none" />
        <path d="M 110 70 C 130 70, 130 60, 170 60" stroke="#e76f51" strokeWidth="3" fill="none" />
        {/* Action Node to Data Node */}
        <path d="M 230 160 C 230 130, 220 120, 220 100" stroke="#264653" strokeWidth="3" fill="none" />
        <path d="M 240 160 C 240 130, 250 120, 250 100" stroke="#111" strokeWidth="3" fill="none" />
      </svg>

      {/* NODE 1: Visual Display (GC9A01 Round) */}
      <div style={{...styles.nodeVisual, top: 0, left: 0}}>
        <div style={{...styles.screw, top: 4, left: 4}}></div><div style={{...styles.screw, top: 4, right: 4}}></div>
        <div style={{...styles.screw, bottom: 4, left: 4}}></div><div style={{...styles.screw, bottom: 4, right: 4}}></div>
        
        <div style={{...styles.roundScreen, boxShadow: `0 0 15px ${activeBadge.color}40 inset`}}>
          <div style={{...styles.radarSweep, background: `conic-gradient(transparent 70%, ${activeBadge.color} 100%)`}}></div>
          <img key={activeBadge.src} src={activeBadge.src} alt="badge" style={styles.badgeImg} />
        </div>
        <div style={styles.silkSmall}>NODE_01:VIS</div>
      </div>

      {/* NODE 2: Data Display (16x2 LCD) */}
      <div style={{...styles.nodeData, top: 20, left: 150}}>
        <div style={{...styles.screw, top: 4, left: 4}}></div><div style={{...styles.screw, top: 4, right: 4}}></div>
        <div style={{...styles.screw, bottom: 4, left: 4}}></div><div style={{...styles.screw, bottom: 4, right: 4}}></div>
        
        <div style={styles.lcdBezel}>
          <div style={styles.lcdScreen}>
            <div key={`${badgeIndex}-1`} style={styles.lcdText}>{activeBadge.text}</div>
            <div key={`${badgeIndex}-2`} style={styles.lcdText}>[{activeBadge.sub}]</div>
          </div>
        </div>
        <div style={styles.silkSmall}>NODE_02:DAT</div>
      </div>

      {/* NODE 3: Action Buttons */}
      <div style={{...styles.nodeAction, top: 140, left: 160}}>
        
        {/* Interactive Prompt (Now perfectly centered at the bottom) */}
        {!hasClicked && (
          <div style={styles.buttonPrompt}>
            ↑ click these to explore
          </div>
        )}

        <div style={{...styles.screw, top: 4, left: 4}}></div><div style={{...styles.screw, top: 4, right: 4}}></div>
        <div style={{...styles.screw, bottom: 4, left: 4}}></div><div style={{...styles.screw, bottom: 4, right: 4}}></div>
        
        <div style={styles.buttonsWrap}>
          {/* NEXT Button */}
          <div style={styles.btnCol}>
            <div style={styles.btnSmall} onPointerDown={handleNext}>
              <div style={{...styles.btnSmallPush, transform: activeBtn === 'NEXT' ? 'scale(0.9) translateY(2px)' : 'scale(1)'}}></div>
            </div>
            <div style={styles.silkSmall}>NEXT</div>
          </div>
          
          {/* VERIFY Button */}
          <div style={styles.btnCol}>
            <div style={styles.btnBig} onPointerDown={handleVerify}>
              <div style={{...styles.btnBigPush, transform: activeBtn === 'VERIFY' ? 'scale(0.95) translateY(2px)' : 'scale(1)'}}></div>
            </div>
            <div style={styles.silkSmall}>VERIFY_LNK</div>
          </div>
        </div>
        <div style={styles.silkSmall}>NODE_03:ACT</div>
      </div>

    </div>
  );
}

const styles = {
  clusterWrapper: { position: 'relative', width: '350px', height: '230px', zIndex: 10 },
  localWires: { position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' },
  
  screw: { position: 'absolute', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d4d4d4', border: '1px solid #888', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)' },
  silkSmall: { color: '#ccc', fontFamily: 'monospace', fontSize: '7px', fontWeight: 'bold', marginTop: '6px' },

  // NODE 1: VISUAL (GC9A01 Round)
  nodeVisual: { position: 'absolute', width: '120px', height: '130px', backgroundColor: '#1a1a1a', borderRadius: '4px', border: '2px solid #0a0a0a', boxShadow: '0 8px 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3 },
  roundScreen: { width: '100px', height: '100px', backgroundColor: '#103355', borderRadius: '50%', border: '4px solid #050505', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  radarSweep: { position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', animation: 'radarSpin 3s linear infinite', opacity: 0.3 },
  badgeImg: { width: '55px', height: '55px', objectFit: 'contain', zIndex: 2, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.8))' },

  // NODE 2: DATA (16x2 LCD)
  nodeData: { position: 'absolute', width: '180px', height: '90px', backgroundColor: '#003366', borderRadius: '4px', border: '2px solid #001f3f', boxShadow: '0 8px 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3 },
  lcdBezel: { width: '150px', height: '50px', backgroundColor: '#111', borderRadius: '2px', border: '2px solid #000', padding: '4px', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  lcdScreen: { width: '100%', height: '100%', backgroundColor: '#77dd77', boxShadow: 'inset 0 2px 8px rgba(0,50,0,0.5)', borderRadius: '1px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 6px', animation: 'lcdFlicker 0.1s infinite' },
  lcdText: { color: 'rgb(5, 5, 5)', fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold', textShadow: '1px 1px 0px rgba(119, 221, 119, 0.4)', textTransform: 'uppercase', whiteSpace: 'nowrap', overflow: 'hidden' },

  // NODE 3: ACTION (Buttons)
  nodeAction: { position: 'absolute', width: '140px', height: '80px', backgroundColor: '#0f0f0f', borderRadius: '4px', border: '2px solid #142b1a', boxShadow: '0 8px 15px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 3 },
  
  // FIXED: Positioned at bottom, mathematically centered with left: 50%
  buttonPrompt: { position: 'absolute', bottom: '-22px', left: '50%', color: '#111', fontFamily: 'monospace', fontSize: '10px', fontWeight: 'bold', pointerEvents: 'none', zIndex: 20, whiteSpace: 'nowrap', animation: 'bouncePrompt 1.5s infinite', textShadow: '0 0 4px rgba(255,255,255,0.8), 0 0 2px rgba(255,255,255,1)' },
  
  buttonsWrap: { display: 'flex', gap: '20px', alignItems: 'flex-end', marginTop: '4px' },
  btnCol: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  
  btnSmall: { width: '20px', height: '20px', backgroundColor: '#888', border: '2px solid #444', borderRadius: '2px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 0 #222' },
  btnSmallPush: { width: '12px', height: '12px', backgroundColor: '#830101', borderRadius: '1px', transition: 'transform 0.1s' },
  
  btnBig: { width: '36px', height: '36px', backgroundColor: '#d4d4d4', border: '2px solid #999', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 0 #666' },
  btnBigPush: { width: '26px', height: '26px', backgroundColor: '#00065e', borderRadius: '50%', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)', transition: 'transform 0.1s' }
};