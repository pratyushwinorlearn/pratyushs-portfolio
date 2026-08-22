import React, { useRef, useState, useEffect, useMemo, useCallback, useId, useLayoutEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'

// ==========================================
// 1. ORIGINKIT COMPONENT: TEXT LIFT
// ==========================================
const useIsStaticRenderer = () => false
const DIRS = {
  topLeft: { x: -0.72, y: -0.72 },
  top: { x: 0, y: -1 },
  topRight: { x: 0.72, y: -0.72 },
  bottomLeft: { x: -0.72, y: 0.72 },
  bottom: { x: 0, y: 1 },
  bottomRight: { x: 0.72, y: 0.72 },
}

function Letter({ char, depth, spread, expand, dir, frontColor, depthColor, strokeColor, stroke, filled, fade, transition, font, isStatic }) {
  const [hover, setHover] = useState(false)
  const on = hover && !isStatic
  const space = char === " "
  const activeZ = on ? 1000 : "auto"

  return (
    <span style={{ position: "relative", display: "inline-block", whiteSpace: "pre", cursor: "default", zIndex: activeZ }}>
      <span
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        aria-hidden
        style={{ display: "inline-block", color: "transparent", ...font }}
      >
        {space ? " " : char}
      </span>
      {Array.from({ length: depth }).map((_, i) => {
        const isTop = i === depth - 1
        const restS = i * spread
        const hoverS = i * expand
        const s = on ? hoverS : restS
        const lc = isTop ? frontColor : depthColor
        return (
          <motion.span
            key={i}
            aria-hidden={!isTop}
            animate={{ x: s * dir.x, y: s * dir.y }}
            transition={transition || { type: "spring", stiffness: 320, damping: 22 }}
            style={{
              position: "absolute", left: 0, top: 0, pointerEvents: "none", color: filled ? lc : "transparent",
              WebkitTextStrokeWidth: stroke > 0 ? `${stroke}px` : undefined,
              WebkitTextStrokeColor: stroke > 0 ? strokeColor : undefined,
              opacity: fade ? Math.max(0.2, 1 - ((depth - 1 - i) / depth) * 0.85) : 1,
              zIndex: i + 1, display: "inline-block", willChange: "transform", ...font,
            }}
          >
            {space ? " " : char}
          </motion.span>
        )
      })}
    </span>
  )
}

function TextLift(props) {
  const defaults = { text: "STAND", frontColor: "#ffffff", depthColor: "#222222", strokeColor: "#ffffff", stroke: 1, filled: true, depth: 8, spread: 4, expand: 12, direction: "topRight", fade: true, font: { fontFamily: "monospace", fontSize: "4rem", fontWeight: "bold" } }
  const p = { ...defaults, ...props }
  const isStatic = useIsStaticRenderer()
  const dir = DIRS[p.direction] || DIRS.topRight
  const chars = p.text.split("")
  const safeDepth = Math.max(1, Math.round(p.depth))

  return (
    <div style={{ display: "inline-flex", flexWrap: "wrap", width: "max-content", maxWidth: "100%", ...p.font }}>
      {chars.map((c, idx) => (
        <Letter key={idx} char={c} depth={safeDepth} spread={p.spread} expand={p.expand} dir={dir} frontColor={p.frontColor} depthColor={p.depthColor} strokeColor={p.strokeColor} stroke={p.stroke} filled={p.filled} fade={p.fade} transition={p.transition} font={p.font} isStatic={isStatic} />
      ))}
    </div>
  )
}

// ==========================================
// 2. ORIGINKIT COMPONENT: SPARKLE BUTTON
// ==========================================
function Sparkle() {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M93.781 51.578C95 50.969 96 49.359 96 48c0-1.375-1-2.969-2.219-3.578 0 0-22.868-1.514-31.781-10.422-8.915-8.91-10.438-31.781-10.438-31.781C50.969 1 49.375 0 48 0s-2.969 1-3.594 2.219c0 0-1.5 22.87-10.406 31.781-8.908 8.913-31.781 10.422-31.781 10.422C1 45.031 0 46.625 0 48c0 1.359 1 2.969 2.219 3.578 0 0 22.873 1.51 31.781 10.422 8.906 8.911 10.406 31.781 10.406 31.781C45.031 95 46.625 96 48 96s2.969-1 3.562-2.219c0 0 1.523-22.871 10.438-31.781 8.913-8.908 31.781-10.422 31.781-10.422Z" />
    </svg>
  );
}

function SparkleButton({ text = "Click!", textColor = "#FFFFFF", shadowColor = "#FFFFFF", glareColor = "rgba(255, 255, 255, 0.75)", fontSize = 16 }) {
  const transition = { type: "spring", stiffness: 400, damping: 25, mass: 1 }
  const variants = React.useMemo(() => ({
    rest: { "--hover": 0.4, "--pos": 0, transition: { "--hover": transition, "--pos": { duration: 0 } } },
    hover: { "--hover": 1, "--pos": 1, transition: { "--hover": transition, "--pos": { duration: 1, ease: "linear" } } },
    tap: { "--hover": 0 }
  }), []);

  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", marginTop: "15px" }}>
      <style>{`
        .sparkle-button { --padding: 12px 24px; padding: var(--padding); border-radius: 8px; border: 1px solid #333; background: #111; text-decoration: none; color: transparent; position: relative; cursor: pointer; display: inline-flex; align-items: center; justify-content: center; }
        .sparkle-button span { display: inline-block; font-size: var(--font-size); font-family: monospace; font-weight: bold; color: transparent; text-shadow: calc(var(--hover) * (var(--font-size) * -0)) calc(var(--hover) * (var(--font-size) * 0)) var(--shadow), calc(var(--hover) * (var(--font-size) * -0.02)) calc(var(--hover) * (var(--font-size) * 0.02)) var(--shadow), calc(var(--hover) * (var(--font-size) * -0.04)) calc(var(--hover) * (var(--font-size) * 0.04)) var(--shadow); transform: translate(calc(var(--hover) * (var(--font-size) * 0.05)), calc(var(--hover) * (var(--font-size) * -0.05))); }
        .sparkle-button span:last-of-type { position: absolute; inset: 0; padding: var(--padding); display: flex; align-items: center; justify-content: center; background: linear-gradient(108deg, transparent 0 55%, var(--glare) 55% 60%, transparent 60% 70%, var(--glare) 70% 85%, transparent 85%) calc(var(--pos) * -200%) 0% / 200% 100%, var(--color); -webkit-background-clip: text; color: transparent; z-index: 2; text-shadow: none; }
        .sparkle-button svg { position: absolute; z-index: 3; width: calc(var(--font-size) * 0.6); aspect-ratio: 1; pointer-events: none; top: calc(var(--y, 50) * 1%); left: calc(var(--x, 0) * 1%); transform: translate(-50%, -50%) scale(0); }
        .sparkle-button svg path { fill: var(--glare); }
        .sparkle-button:hover svg { animation: sparkle 0.75s calc((var(--delay-step) * var(--d)) * 1s) both; }
        @keyframes sparkle { 50% { transform: translate(-50%, -50%) scale(var(--s, 1)); } }
        .sparkle-button svg:nth-of-type(1) { --x: 0; --y: 20; --s: 1.1; --d: 1; --delay-step: 0.15; }
        .sparkle-button svg:nth-of-type(2) { --x: 15; --y: 80; --s: 1.25; --d: 2; --delay-step: 0.15; }
        .sparkle-button svg:nth-of-type(3) { --x: 45; --y: 40; --s: 1.1; --d: 3; --delay-step: 0.15; }
      `}</style>
      <motion.a className="sparkle-button" style={{ "--color": textColor, "--shadow": shadowColor, "--glare": glareColor, "--font-size": `${fontSize}px` }} initial="rest" whileHover="hover" whileTap="tap" variants={variants}>
        <Sparkle /><Sparkle /><Sparkle />
        <span>{text}</span><span aria-hidden="true">{text}</span>
      </motion.a>
    </div>
  );
}

// ==========================================
// 3. ORIGINKIT COMPONENT: VIDEO TEXT
// ==========================================
function VideoText({ text = "VIDEO TEXT", srcUrl = "https://cdn.magicui.design/ocean-small.webm", fontColor="#fff", fontSize="6rem" }) {
  const containerRef = useRef(null);
  const reactId = useId();
  const clipId = `video-text-clip-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const sync = () => setSize({ width: node.clientWidth, height: node.clientHeight });
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const hasSize = size.width > 0 && size.height > 0;
  const clipUrl = hasSize ? `url(#${clipId})` : undefined;

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "150px", overflow: "clip" }}>
      <svg width={0} height={0} style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <clipPath id={clipId}>
            <text x={0} y={size.height / 2} textAnchor="start" dominantBaseline="central" style={{ fontFamily: "monospace", fontSize: fontSize, fontWeight: "bold" }}>
              {text}
            </text>
          </clipPath>
        </defs>
      </svg>
      {hasSize && (
        <video src={srcUrl} autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none", clipPath: clipUrl, WebkitClipPath: clipUrl }} />
      )}
    </div>
  );
}

// ==========================================
// 4. ORIGINKIT COMPONENT: TEXT WALL (GSAP)
// ==========================================
const ALL_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
function randomInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

function TextWall({ words = [], textColor = "#333333", wordsColor = "#ffffff" }) {
  const containerRef = useRef(null);
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    const charsPerLine = Math.floor(width / 16); 
    const numLines = 10;
    let finalHtml = '';

    for (let l = 0; l < numLines; l++) {
      let lineHtml = '';
      const wordToInject = words[l] || "";
      const injectIndex = randomInt(0, charsPerLine - wordToInject.length - 1);
      
      for (let c = 0; c < charsPerLine; c++) {
        if (c >= injectIndex && c < injectIndex + wordToInject.length) {
          lineHtml += `<span style="color:${wordsColor}; font-weight:bold;">${wordToInject[c - injectIndex]}</span>`;
        } else {
          lineHtml += `<span style="color:${textColor}">${ALL_CHARS[randomInt(0, ALL_CHARS.length - 1)]}</span>`;
        }
      }
      finalHtml += `<div style="font-family: monospace; font-size: 16px; letter-spacing: 2px;">${lineHtml}</div>`;
    }
    setHtmlContent(finalHtml);
  }, [words]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }} dangerouslySetInnerHTML={{ __html: htmlContent }} />;
}

// ==========================================
// 5. THE MAIN UNIFIED APP (2D Layout)
// ==========================================
export default function RibbonJourneyApp() {
  const [activeSection, setActiveSection] = useState('profile')

  const navItems = [
    { id: 'profile', label: 'Profile' },
    { id: 'education', label: 'Education' },
    { id: 'schooling', label: 'Schooling' },
    { id: 'experience', label: 'Experience' },
    { id: 'tech', label: 'Tech Stack' },
    { id: 'projects', label: 'Projects' }
  ];

  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextLift text="PRATYUSH" />
            <p style={{ color: '#aaa', fontSize: '1.2rem', lineHeight: '1.8', marginTop: '30px', maxWidth: '600px', fontFamily: 'monospace' }}>
              Welcome to my journey. Select a tab on the left to explore my background, education, and technical experience.
            </p>
            <SparkleButton text="AI / ML ENGINEER" />
          </motion.div>
        )
      case 'education':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextLift text="BENNETT" />
            <h3 style={{ color: '#fff', marginTop: '20px', fontSize: '1.5rem', fontFamily: 'monospace' }}>University (2024 - 2028)</h3>
            <p style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '1.1rem' }}>B.Tech CSE (Specialization AI)</p>
            <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.8', maxWidth: '600px', fontFamily: 'monospace', marginTop: '15px' }}>
              Focusing on advanced computational workflows, artificial intelligence, and machine learning architectures.
            </p>
          </motion.div>
        )
      case 'schooling':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextLift text="SCHOOL" />
            <h3 style={{ color: '#fff', marginTop: '20px', fontSize: '1.5rem', fontFamily: 'monospace' }}>Queen Global International</h3>
            <p style={{ color: '#aaa', fontFamily: 'monospace', fontSize: '1.1rem' }}>Delhi, India</p>
            <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.8', maxWidth: '600px', fontFamily: 'monospace', marginTop: '15px' }}>
              Foundation years and core academic development completed in Delhi.
            </p>
          </motion.div>
        )
      case 'experience':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <TextLift text="OSINT" />
            <h3 style={{ color: '#fff', marginTop: '20px', fontSize: '1.5rem', fontFamily: 'monospace' }}>India Today Group</h3>
            <p style={{ color: '#888', fontSize: '1rem', lineHeight: '1.8', maxWidth: '600px', fontFamily: 'monospace', marginTop: '15px' }}>
              Completed an intensive internship focusing on Open Source Intelligence (OSINT) data collection and analysis.
            </p>
            <SparkleButton text="INTERNSHIP" />
          </motion.div>
        )
      case 'tech':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%' }}>
            <h2 style={{ color: '#fff', marginTop: 0, fontFamily: 'monospace', fontSize: '2rem', marginBottom: '30px' }}>TECH STACK</h2>
            <div style={{ height: '300px', width: '100%', background: '#0a0a0a', padding: '20px', borderRadius: '12px', border: '1px solid #222' }}>
              <TextWall 
                words={['PYTHON', 'NEXTJS', 'NODEJS', 'REACT', 'TENSORFLOW', 'PYTORCH', 'JAVA', 'CPP', 'GROQ', 'THREEJS']} 
              />
            </div>
          </motion.div>
        )
      case 'projects':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%' }}>
            <VideoText text="PROJECTS" />
            <ul style={{ color: '#aaa', paddingLeft: '20px', lineHeight: '2', margin: 0, marginTop: '30px', fontSize: '1.1rem', fontFamily: 'monospace' }}>
              <li><strong style={{ color: '#fff' }}>Multimodal AI:</strong> Vision-language classification for social media moderation.</li>
              <li><strong style={{ color: '#fff' }}>AI Interviewer:</strong> Intelligent application utilizing Groq AI and Resend API.</li>
              <li><strong style={{ color: '#fff' }}>BlindNav:</strong> Assistive navigation technology.</li>
              <li><strong style={{ color: '#fff' }}>Game Engines:</strong> Built Java-based game engines & logic.</li>
            </ul>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div style={{ display: 'flex', width: '100%', height: '100%', backgroundColor: '#050505', color: '#fff', overflow: 'hidden' }}>
      
      {/* 🚀 Sleek Left Sidebar Navigation */}
      <div style={{ 
        width: '280px', 
        borderRight: '1px solid #1a1a1a', 
        padding: '40px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '10px',
        backgroundColor: '#020202'
      }}>
        <div style={{ marginBottom: '40px', padding: '0 15px' }}>
          <div style={{ width: '12px', height: '12px', backgroundColor: '#fff', borderRadius: '50%', marginBottom: '15px' }}></div>
          <h2 style={{ fontFamily: 'monospace', margin: 0, fontSize: '1.2rem', letterSpacing: '1px' }}>MY_JOURNEY.EXE</h2>
        </div>

        {navItems.map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            style={{
              padding: '15px 20px',
              backgroundColor: activeSection === item.id ? '#ffffff' : 'transparent',
              color: activeSection === item.id ? '#000000' : '#888888',
              border: 'none',
              borderRadius: '8px',
              textAlign: 'left',
              fontFamily: 'monospace',
              fontSize: '1rem',
              fontWeight: activeSection === item.id ? 'bold' : 'normal',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              if (activeSection !== item.id) Object.assign(e.target.style, { color: '#ffffff', backgroundColor: '#111111' })
            }}
            onMouseOut={(e) => {
              if (activeSection !== item.id) Object.assign(e.target.style, { color: '#888888', backgroundColor: 'transparent' })
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 🚀 Main Content Area */}
      <div style={{ 
        flex: 1, 
        padding: '60px 80px', 
        overflowY: 'auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
      }}>
        <div style={{ width: '100%', maxWidth: '800px' }}>
          {renderContent()}
        </div>
      </div>

    </div>
  )
}