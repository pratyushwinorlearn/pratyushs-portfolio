import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function AwsApp() {
  // Configured with your actual AWS badges from public/awsbadges/
  const awsBadges = [
    {
      text: "AWS AI Practitioner",
      sub: "Certification",
      src: "/awsbadges/aws-certified-ai-practitioner.png", 
      link: "https://www.credly.com/earner/earned/badge/6e4619bd-0350-475e-a2b6-4e824075aae6"
    },
    {
      text: "AWS Agentic AI Demonstrated",
      sub: "Assessment",
      src: "/awsbadges/aws-agentic-ai-demonstrated.png", // update exact filename if needed
      link: "https://www.credly.com/earner/earned/badge/a294af11-aec9-4f6a-947c-b557cc2237bf"
    },
    {
      text: "AWS MLOPS Demonstrated",
      sub: "Assessment",
      src: "/awsbadges/aws-mlops-demonstrated.png", // update exact filename if needed
      link: "https://www.credly.com/earner/earned/badge/780cf463-fed0-464d-9fa7-4ef31d87eebf"
    },
    {
      text: "AWS Generative AI Practitioner",
      sub: "CloudQuest",
      src: "/awsbadges/aws-cloud-quest-generative-ai-practitioner-training.png", 
      link: "https://www.credly.com/earner/earned/badge/c4661ac0-07a9-47ad-b162-7c35b17e0f3c"
    },
    {
      text: "AWS AI Architect",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-ai-architect-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/bb89cf9b-dec6-4932-81c6-9e525675d856"
    },
    {
      text: "AWS Machine Learning",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-machine-learning-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/b23238e5-2191-4646-beb5-6458fe941243"
    },
    {
      text: "AWS AI Practitioner",
      sub: "Simulearn",
      src: "/awsbadges/aws-simulearn-ai-practitioner-training-badge.png", 
      link: "https://www.credly.com/earner/earned/badge/a5def58a-560d-46a7-94de-a357904574ed"
    }

  ];

  const containerRef = React.useRef(null);
  const [hovered, setHovered] = React.useState(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springCfg = { stiffness: 200, damping: 28, mass: 0.5 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const onMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set(e.clientX - rect.left + 180);
    rawY.set(e.clientY - rect.top + 0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={() => setHovered(null)}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        gap: "24px",
        padding: "50px",
        boxSizing: "border-box",
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      }}
    >
      {/* Header Info inside app */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <Award size={24} color="#00ffcc" />
        <span style={{ color: '#00ffcc', fontSize: '0.85rem', fontWeight: 'bold', letterSpacing: '2px', fontFamily: 'monospace' }}>
          VERIFIED_BADGES // AWS_CLOUD_PORTFOLIO
        </span>
      </div>

      {/* Floating Reveal Image Box (Resized to 320x320 for 600px badges, border removed) */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: 320,  // ✅ Adjusted for 600x600 aspect ratio
          height: 320, // ✅ Square dimensions
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 10,
          background: 'transparent' // ✅ No background or card color
          // 🛑 Border removed completely!
        }}
        animate={{ opacity: hovered != null ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 40 }}
      >
        {awsBadges.map((item, i) => {
          const yPos =
            hovered == null
              ? "100%"
              : i < hovered
              ? "-100%"
              : i > hovered
              ? "100%"
              : "0%";
          return (
            <motion.div
              key={i}
              initial={false}
              animate={{ y: yPos }}
              transition={{ type: "spring", stiffness: 400, damping: 40 }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background: 'transparent'
              }}
            >
              <img
                src={item.src}
                alt={item.text}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // ✅ Ensures 600x600 transparent badges fit fully without cropping
                  display: "block",
                  background: 'transparent'
                }}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Interactive List Items */}
      <div
        onMouseLeave={() => setHovered(null)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "25px",
          width: "100%"
        }}
      >
        {awsBadges.map((item, i) => {
          const isHovered = hovered === i;
          const color = hovered != null ? (isHovered ? "#FFFFFF" : "#51565A") : "#FFFFFF";
          
          return (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              style={{
                overflow: "hidden",
                cursor: "none",
                width: "100%"
              }}
            >
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%"
                }}
              >
                <motion.div
                  style={{ position: "relative" }}
                  animate={{ y: isHovered ? "-100%" : "0%" }}
                  transition={{ type: "spring", stiffness: 400, damping: 40 }}
                >
                  <span style={{ fontSize: "2rem", fontWeight: 700, color, transition: "color 0.2s ease", display: "block", letterSpacing: "-0.03em" }}>
                    {item.text}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      fontSize: "2rem",
                      fontWeight: 700,
                      color,
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      width: "100%",
                      letterSpacing: "-0.03em"
                    }}
                  >
                    {item.text}
                  </span>
                </motion.div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: isHovered ? 1 : 0.3, transition: 'opacity 0.2s' }}>
                  <span style={{ fontSize: '0.85rem', color: '#00ffcc', fontFamily: 'monospace' }}>{item.sub}</span>
                  <ExternalLink size={18} color="#00ffcc" />
                </div>
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}