import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Text, Edges } from '@react-three/drei'

// 1. PRE-CALCULATE THE 27 MINI-CUBES FOR THE 3x3x3 GRID
const cubePositions = []
for (let x = -1; x <= 1; x++) {
  for (let y = -1; y <= 1; y++) {
    for (let z = -1; z <= 1; z++) {
      cubePositions.push({ x, y, z })
    }
  }
}

// 2. THE 3D RUBIK'S CUBE COMPONENT
function RubiksCube({ onFaceClick }) {
  const groupRef = useRef()

  useFrame(() => {
    // Gives the entire Rubik's cube assembly a slow cinematic spin
    if (groupRef.current) {
      groupRef.current.rotation.x += 0.002
      groupRef.current.rotation.y += 0.003
    }
  })

  // Detect exactly which side of the cube the user clicked
  const handleClick = (e) => {
    e.stopPropagation() // Prevent click from passing through
    const { normal } = e.face
    
    // R3F gives us the 'normal' (the direction the clicked face is pointing)
    if (Math.abs(normal.z) > 0.5) onFaceClick(normal.z > 0 ? 'profile' : 'schooling')
    else if (Math.abs(normal.x) > 0.5) onFaceClick(normal.x > 0 ? 'experience' : 'education')
    else if (Math.abs(normal.y) > 0.5) onFaceClick(normal.y > 0 ? 'tech' : 'projects')
  }

  return (
    <group ref={groupRef}>
      {/* Map out the 27 smaller cubes */}
      {cubePositions.map((pos, i) => (
        <mesh 
          key={i} 
          position={[pos.x * 1.05, pos.y * 1.05, pos.z * 1.05]} // 1.05 gives that nice gap between blocks
          onClick={handleClick}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#0a0a0a" />
          <Edges scale={1} threshold={15} color="#00ffcc" opacity={0.5} transparent />
        </mesh>
      ))}

      {/* Floating Labels! 'raycast={() => null}' prevents text from blocking your clicks */}
      <Text raycast={() => null} position={[0, 0, 1.7]} fontSize={0.3} color="#00ffcc" anchorX="center" anchorY="middle">PROFILE</Text>
      <Text raycast={() => null} position={[0, 0, -1.7]} rotation={[0, Math.PI, 0]} fontSize={0.3} color="#00ffcc" anchorX="center" anchorY="middle">SCHOOL</Text>
      <Text raycast={() => null} position={[1.7, 0, 0]} rotation={[0, Math.PI/2, 0]} fontSize={0.25} color="#ffb703" anchorX="center" anchorY="middle">JOB</Text>
      <Text raycast={() => null} position={[-1.7, 0, 0]} rotation={[0, -Math.PI/2, 0]} fontSize={0.25} color="#ff2a5f" anchorX="center" anchorY="middle">COLLEGE</Text>
      <Text raycast={() => null} position={[0, 1.7, 0]} rotation={[-Math.PI/2, 0, 0]} fontSize={0.3} color="#8338ec" anchorX="center" anchorY="middle">TECH</Text>
      <Text raycast={() => null} position={[0, -1.7, 0]} rotation={[Math.PI/2, 0, 0]} fontSize={0.3} color="#fff" anchorX="center" anchorY="middle">PROJECTS</Text>
    </group>
  )
}

// 3. THE MAIN UNIFIED APP
export default function RibbonJourneyApp() {
  const [activeSection, setActiveSection] = useState('profile')

  // Render HTML content based on what side of the cube is clicked
  const renderContent = () => {
    switch(activeSection) {
      case 'profile':
        return (
          <div style={{ background: 'rgba(5,5,5,0.85)', padding: '35px', borderLeft: '4px solid #00ffcc', width: '100%', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#00ffcc', marginTop: 0, fontFamily: 'monospace' }}>PRATYUSH</h2>
            <h3 style={{ color: '#fff' }}>AI/ML Engineer</h3>
            <p style={{ color: '#aaa', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Welcome to my interactive portfolio. Click and drag the cube to rotate it. 
              Click on any face to explore my journey, education, and projects.
            </p>
          </div>
        )
      case 'education':
        return (
          <div style={{ background: 'rgba(5,5,5,0.85)', padding: '35px', borderLeft: '4px solid #ff2a5f', width: '100%', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#ff2a5f', marginTop: 0, fontFamily: 'monospace' }}>EDUCATION</h2>
            <h3 style={{ color: '#fff' }}>Bennett University</h3>
            <p style={{ color: '#aaa', fontFamily: 'monospace' }}>2024–28 • B.Tech CSE (Specialization AI)</p>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Focusing on advanced computational workflows, artificial intelligence, and machine learning architectures.
            </p>
          </div>
        )
      case 'schooling':
        return (
          <div style={{ background: 'rgba(5,5,5,0.85)', padding: '35px', borderLeft: '4px solid #00ffcc', width: '100%', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#00ffcc', marginTop: 0, fontFamily: 'monospace' }}>SCHOOLING</h2>
            <h3 style={{ color: '#fff' }}>Queen Global International School</h3>
            <p style={{ color: '#aaa', fontFamily: 'monospace' }}>Delhi</p>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Foundation years and core academic development completed in Delhi.
            </p>
          </div>
        )
      case 'experience':
        return (
          <div style={{ background: 'rgba(5,5,5,0.85)', padding: '35px', borderLeft: '4px solid #ffb703', width: '100%', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#ffb703', marginTop: 0, fontFamily: 'monospace' }}>EXPERIENCE</h2>
            <h3 style={{ color: '#fff' }}>India Today Group</h3>
            <p style={{ color: '#aaa', fontFamily: 'monospace' }}>OSINT Department • Internship</p>
            <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: '1.6' }}>
              Completed an intensive internship focusing on Open Source Intelligence (OSINT) data collection and analysis during July 2026.
            </p>
          </div>
        )
      case 'tech':
        return (
          <div style={{ background: 'rgba(5,5,5,0.85)', padding: '35px', borderLeft: '4px solid #8338ec', width: '100%', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#8338ec', marginTop: 0, fontFamily: 'monospace' }}>TECH STACK</h2>
            <h3 style={{ color: '#fff' }}>Languages & Frameworks</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '15px' }}>
              {['Python', 'Next.js', 'Node.js', 'React Three Fiber', 'TensorFlow', 'PyTorch', 'Java', 'C++'].map(tech => (
                <span key={tech} style={{ background: '#1a1a1a', padding: '5px 10px', borderRadius: '4px', fontSize: '0.85rem', color: '#ccc', border: '1px solid #333' }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )
      case 'projects':
        return (
          <div style={{ background: 'rgba(5,5,5,0.85)', padding: '35px', borderLeft: '4px solid #fff', width: '100%', borderRadius: '8px', backdropFilter: 'blur(10px)' }}>
            <h2 style={{ color: '#fff', marginTop: 0, fontFamily: 'monospace' }}>KEY PROJECTS</h2>
            <ul style={{ color: '#aaa', paddingLeft: '20px', lineHeight: '1.8', margin: 0 }}>
              <li><strong style={{ color: '#fff' }}>Multimodal AI:</strong> Vision-language classification for social media moderation.</li>
              <li><strong style={{ color: '#fff' }}>AI Interviewer:</strong> Intelligent application utilizing Groq AI and Resend API.</li>
              <li><strong style={{ color: '#fff' }}>BlindNav:</strong> Assistive navigation technology.</li>
              <li><strong style={{ color: '#fff' }}>Game Engines:</strong> Built Java-based game engines & logic.</li>
            </ul>
          </div>
        )
      default:
        return null
    }
  }

  return (
    // Unified container covering the whole window
    <div style={{ position: 'relative', width: '100%', height: '100%', backgroundColor: '#050505', overflow: 'hidden' }}>
      
      {/* 3D Canvas spanning the entire background */}
      <Canvas style={{ position: 'absolute', inset: 0, display: 'block', cursor: 'grab' }} camera={{ position: [0, 0, 8.5], fov: 50 }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        
        {/* Shifting the cube to the left so it balances perfectly with the text overlay on the right */}
        <group position={[-2, 0, 0]}>
          <RubiksCube onFaceClick={setActiveSection} />
        </group>
        
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>

      {/* Floating HTML Overlay Panel fixed to the right side */}
      <div style={{ 
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '45%',
        minWidth: '350px',
        maxWidth: '500px',
        display: 'flex', 
        alignItems: 'center', 
        padding: '40px',
        pointerEvents: 'none', // Lets mouse interactions pass through empty space to the canvas
        zIndex: 10
      }}>
        {/* Restoring pointer events to the text card itself so users can select text */}
        <div style={{ width: '100%', pointerEvents: 'auto' }}>
          {renderContent()}
        </div>
      </div>

    </div>
  )
}