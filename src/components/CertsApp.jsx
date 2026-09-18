import React, { useMemo, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

// Pre-populated with your actual AWS certifications
const myCerts = [
  {
    name: "India Today Internship",
    role: "Official Certification",
    description: "Validates overall understanding of AI, ML, and generative AI concepts.",
    accent: "#FF9900", // AWS Orange
    initials: "Internship",
    stat: "Issued Aug 2026",
    image: "/public/india-today-intern.jpg", // Drop your image here
  },
  {
    name: "Model Context Protocol by Anthropic",
    role: "Skill Builder Credential",
    description: "Completed comprehensive training on architecting generative AI solutions and cloud operations.",
    accent: "#8c52ff", 
    initials: "MCP",
    stat: "Sprint Complete",
    image: "/public/mcp-cert.png", 
  },
  {
    name: "Adobe Hackathon 2026",
    role: "Coding Round Assessment",
    description: "Qualified the coding round consisting of DSA and SQL problems.",
    accent: "#00ffcc",
    initials: "Hackathon",
    stat: "Sprint Complete",
    image: "/public/adobe-cert.png", 
  }
];

function inRange(index, length) {
  return Math.min(Math.max(0, index), Math.max(0, length - 1));
}

function Portrait({ item }) {
  const sharedStyle = {
    position: 'relative', display: 'flex', aspectRatio: '1.36', width: '100%',
    overflow: 'hidden', borderRadius: '1.45rem', border: '1px solid rgba(0,0,0,0.08)',
    backgroundColor: 'rgba(0,0,0,0.045)'
  };

  const badgeStyle = {
    position: 'absolute', bottom: '1rem', right: '1rem', borderRadius: '9999px',
    backgroundColor: '#09090b', padding: '0.25rem 0.75rem', fontSize: '0.75rem',
    fontWeight: '600', letterSpacing: '0.18em', color: '#ffffff'
  };

  if (item.image) {
    return (
      <div style={sharedStyle}>
        <img src={item.image} alt={item.name} style={{ height: '100%', width: '100%', objectFit: 'cover' }} />
        <span style={badgeStyle}>{item.initials}</span>
      </div>
    );
  }

  // Fallback abstract certificate design if no image is uploaded
  return (
    <div style={{ ...sharedStyle, backgroundColor: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ 
        position: 'absolute', inset: 0, opacity: 0.45,
        background: `radial-gradient(circle at 22% 20%, ${item.accent}, transparent 24%), radial-gradient(circle at 85% 72%, rgba(255,255,255,0.5), transparent 28%)` 
      }} />
      <div style={{ zIndex: 10, textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: item.accent, margin: '0 auto 10px', boxShadow: `0 0 20px ${item.accent}80` }} />
      </div>
      <span style={badgeStyle}>{item.initials}</span>
    </div>
  );
}

export default function CertsApp() {
  const spread = 168;
  const lift = 34;
  
  const restingIndex = inRange(1, myCerts.length);
  const [activeIndex, setActiveIndex] = useState(restingIndex);
  const [open, setOpen] = useState(false);
  const stageRef = useRef(null);
  const midpoint = (myCerts.length - 1) / 2;

  const layouts = useMemo(() =>
    myCerts.map((_, index) => {
      const orbit = index - midpoint;
      const stack = index - restingIndex;
      return {
        open: {
          x: orbit * spread,
          y: Math.abs(orbit) * 30 + Math.max(0, Math.abs(orbit) - 1) * 10,
          rotation: orbit * 8.5,
        },
        closed: {
          x: stack * 10,
          y: Math.abs(stack) * 5,
          rotation: stack * 2.8,
        },
      };
    }),
  [midpoint, restingIndex, spread]);

  const activate = (index) => {
    const next = inRange(index, myCerts.length);
    setOpen(true);
    setActiveIndex(next);
  };

  const close = () => {
    setOpen(false);
    setActiveIndex(restingIndex);
  };

  const leaveFocus = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) close();
  };

  return (
    <div style={{ position: 'relative', display: 'flex', minHeight: '100%', width: '100%', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#0d1117' }}>
      <div
        ref={stageRef}
        style={{ position: 'relative', height: '470px', width: '100%', maxWidth: '980px' }}
        onMouseLeave={close}
        onBlur={leaveFocus}
      >
        {myCerts.map((item, index) => {
          const position = open ? layouts[index].open : layouts[index].closed;
          const active = index === activeIndex;
          
          return (
            <article
              key={`${item.name}-${index}`}
              tabIndex={0}
              style={{
                position: 'absolute', left: '50%', top: '50%',
                width: 'min(78vw, 21rem)', transformOrigin: 'bottom',
                cursor: 'none', borderRadius: '1.9rem', border: '1px solid rgba(255,255,255,0.1)',
                backgroundColor: '#e9e6df', padding: '1rem', color: '#141414',
                outline: 'none',
                zIndex: active ? 80 : 50 - Math.abs(index - activeIndex),
                transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y - (open && active ? lift : 0)}px)) rotate(${position.rotation}deg) scale(${open ? 0.985 : 0.97})`,
                transition: 'transform 420ms cubic-bezier(.2,.8,.2,1)'
              }}
              onMouseEnter={() => activate(index)}
              onFocus={() => activate(index)}
              onClick={() => activate(index)}
            >
              <div style={{ position: 'relative' }}>
                <Portrait item={item} />
                <span style={{ 
                  position: 'absolute', right: '0.75rem', top: '0.75rem', display: 'grid', placeItems: 'center', 
                  width: '2.75rem', height: '2.75rem', borderRadius: '50%', backgroundColor: '#09090b', color: '#ffffff', 
                  boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2)' 
                }}>
                  <ArrowUpRight size={16} />
                </span>
              </div>
              <div style={{ padding: '1.5rem 0.5rem 0.5rem' }}>
                <p style={{ fontSize: '0.72rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.18em', color: '#71717a', margin: 0 }}>
                  {item.role}
                </p>
                <h3 style={{ marginTop: '0.5rem', fontSize: '1.8rem', fontWeight: '600', lineHeight: 1, letterSpacing: '-0.04em', color: '#09090b', margin: '0.5rem 0 0 0' }}>
                  {item.name}
                </h3>
                <p style={{ marginTop: '1rem', maxWidth: '17rem', fontSize: '0.98rem', fontWeight: '500', lineHeight: 1.42, letterSpacing: '-0.01em', color: '#3f3f46', marginBottom: 0 }}>
                  {item.description}
                </p>
                <div style={{ marginTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.1)', paddingTop: '1rem', fontSize: '0.68rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#71717a' }}>
                  {item.stat}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}