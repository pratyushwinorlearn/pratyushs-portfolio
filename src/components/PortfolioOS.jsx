import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { Folder, Terminal, MonitorPlay, Code, Briefcase, Mail, Cpu, Layout, X, Minus, Square, Search } from 'lucide-react'

import GithubClone from './GithubClone'
import LinkedInClone from './LinkedInClone'

// NEW: Import the custom cursor!
import UserCursor from './UserCursor'

export default function PortfolioOS({ isUIOpen, closeUI }) {
  const [time, setTime] = useState(new Date())
  const [windows, setWindows] = useState([])
  const [activeZIndex, setActiveZIndex] = useState(100)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  if (!isUIOpen) return null

  const desktopApps = [
    { 
      id: 'ai_interviewer', name: 'AI_Interviewer.exe', icon: <Terminal size={32} color="#00ffcc" />, 
      content: (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
          <video src="/videos/persona.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )
    },
    //{ 
    //  id: 'java_chess', name: 'Java_Chess.jar', icon: <Folder size={32} color="#4da6ff" />, 
    //  content: <div style={{ padding: '20px' }}><h3>Eclipse Debugger</h3><p>Java chess GUI initialized.</p></div> 
    //},
    { 
      id: 'github', name: 'GitHub', icon: <Code size={32} color="#fff" />, 
      content: <GithubClone />
    },
    { 
      id: 'linkedin', name: 'LinkedIn', icon: <Briefcase size={32} color="#0077b5" />, 
      content: <LinkedInClone />
    },
  ]

  const handleAppClick = (app) => {
    if (windows.find(w => w.id === app.id)) {
      focusWindow(app.id)
      return
    }
    const newWindow = {
      ...app,
      zIndex: activeZIndex + 1,
      x: 100 + (windows.length * 30),
      y: 50 + (windows.length * 30),
      width: 900,
      height: 600,
      isMaximized: false,
      isMinimized: false
    }
    setWindows([...windows, newWindow])
    setActiveZIndex(activeZIndex + 1)
  }

  const updateWindow = (id, updates) => {
    setWindows(windows.map(w => w.id === id ? { ...w, ...updates } : w))
  }

  const closeWindow = (id) => {
    setWindows(windows.filter(w => w.id !== id))
  }

  const focusWindow = (id) => {
    setWindows(windows.map(w => {
      if (w.id === id) return { ...w, zIndex: activeZIndex + 1, isMinimized: false }
      return w
    }))
    setActiveZIndex(activeZIndex + 1)
  }

  const toggleMaximize = (id) => {
    const win = windows.find(w => w.id === id)
    updateWindow(id, { isMaximized: !win.isMaximized, isMinimized: false, zIndex: activeZIndex + 1 })
    setActiveZIndex(activeZIndex + 1)
  }

  const minimizeWindow = (id) => {
    updateWindow(id, { isMinimized: true })
  }

  const handleTaskbarClick = (id) => {
    const win = windows.find(w => w.id === id)
    const isTopMost = win.zIndex === Math.max(...windows.map(w => w.zIndex))
    if (isTopMost && !win.isMinimized) {
      minimizeWindow(id)
    } else {
      focusWindow(id)
    }
  }

  return (
    <div 
      style={styles.backdrop}
      onPointerDown={(e) => e.stopPropagation()} 
      onClick={closeUI}
    >
      {/* --- ADD THIS STYLES BLOCK HERE --- */}
      <style>{`
        .os-container *, 
        .os-container a, 
        .os-container button, 
        .os-container input,
        .os-container [role="button"] {
          cursor: none !important;
        }
      `}</style>
      {/* NEW: Render your name and pick a brand color! */}
      <UserCursor name="Pratyush" color="#00ffcc" size={28} />

      <div 
        className="os-container"
        style={styles.osWrapper}
        onClick={(e) => e.stopPropagation()} 
      >
        <div style={styles.desktop}>
          
          <div style={styles.iconGrid}>
            {desktopApps.map((app) => (
              <div key={app.id} style={styles.appIcon} onClick={() => handleAppClick(app)}>
                {app.icon}
                <span style={styles.iconText}>{app.name}</span>
              </div>
            ))}
          </div>

          {windows.map((win) => (
            <Rnd
              key={win.id}
              size={{ width: win.isMaximized ? '100%' : win.width, height: win.isMaximized ? '100%' : win.height }}
              position={{ x: win.isMaximized ? 0 : win.x, y: win.isMaximized ? 0 : win.y }}
              onDragStop={(e, d) => { if (!win.isMaximized) updateWindow(win.id, { x: d.x, y: d.y }) }}
              onResizeStop={(e, direction, ref, delta, position) => {
                if (!win.isMaximized) updateWindow(win.id, { width: ref.style.width, height: ref.style.height, x: position.x, y: position.y })
              }}
              disableDragging={win.isMaximized}
              enableResizing={!win.isMaximized}
              minWidth={500}
              minHeight={400}
              bounds="parent"
              dragHandleClassName="window-title-bar"
              style={{ 
                zIndex: win.zIndex, display: win.isMinimized ? 'none' : 'flex', flexDirection: 'column', 
                backgroundColor: '#1a1a1a', border: '1px solid #444', borderRadius: win.isMaximized ? '0px' : '8px', 
                overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.7)' 
              }}
              onMouseDown={() => focusWindow(win.id)}
            >
              <div className="window-title-bar" style={styles.titleBar}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {React.cloneElement(win.icon, { size: 16 })}
                  <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>{win.name}</span>
                </div>
                <div style={styles.windowControls}>
                  <button style={styles.controlBtn} onClick={(e) => { e.stopPropagation(); minimizeWindow(win.id); }}><Minus size={14} /></button>
                  <button style={styles.controlBtn} onClick={(e) => { e.stopPropagation(); toggleMaximize(win.id); }}><Square size={12} /></button>
                  <button style={{...styles.controlBtn, ...styles.closeBtn}} onClick={(e) => { e.stopPropagation(); closeWindow(win.id); }}><X size={14} /></button>
                </div>
              </div>
              
              <div style={styles.windowContent}>
                {win.content}
              </div>
            </Rnd>
          ))}

        </div>

        <div style={styles.taskbar}>
          <div style={styles.startArea}>
            <button style={styles.startBtn} onClick={closeUI}>
              [ DISCONNECT ]
            </button>
            <div style={styles.openAppsArea}>
              {windows.map(win => {
                const isTopMost = win.zIndex === Math.max(...windows.map(w => w.zIndex)) && !win.isMinimized;
                return (
                  <div key={win.id} style={{ ...styles.taskbarApp, backgroundColor: isTopMost ? '#333' : '#222', borderBottom: isTopMost ? '2px solid #00ffcc' : '1px solid #444' }} onClick={() => handleTaskbarClick(win.id)}>
                    {React.cloneElement(win.icon, { size: 20 })}
                  </div>
                )
              })}
            </div>
          </div>
          
          <div style={styles.searchArea}>
            <Search size={16} color="#888" style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search OS..." 
              style={styles.searchInput}
            />
          </div>

          <div style={styles.systemTray}>
            <Mail 
              size={18} 
              title="Contact Me"
              style={{ marginRight: '15px', cursor: 'none', transition: 'color 0.2s' }} 
              onClick={() => window.location.href = 'mailto:pratyushqgis22@gmail.com'}
              onMouseEnter={(e) => e.currentTarget.style.color = '#00ffcc'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#fff'}
            />
            <span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  backdrop: {
    position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh',
    zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(5px)',
    cursor: 'none' // ❌ Hides the default cursor
  },
  osWrapper: {
    width: '60vw', height: '85vh', 
    display: 'flex', flexDirection: 'column',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#fff', userSelect: 'none',
    borderRadius: '12px', overflow: 'hidden',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255,255,255,0.1)',
    cursor: 'none' // ❌ Hides the default cursor
  },
  desktop: {
    flexGrow: 1, backgroundColor: '#0a0a0a', 
    backgroundImage: 'url("/desktopwallpaper.jpg")', 
    backgroundSize: 'cover', backgroundPosition: 'center',
    padding: '20px', position: 'relative'
  },
  iconGrid: {
    display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '20px', height: '100%', alignContent: 'flex-start'
  },
  appIcon: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90px', padding: '10px', borderRadius: '5px',
    cursor: 'none', // ❌ Hides the default cursor
    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
  },
  iconText: { marginTop: '8px', fontSize: '0.8rem', textAlign: 'center', wordBreak: 'break-word' },
  titleBar: {
    backgroundColor: '#2a2a2a', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    cursor: 'none', // ❌ Hides the default cursor
    borderBottom: '1px solid #111'
  },
  windowControls: { display: 'flex', gap: '5px' },
  controlBtn: { background: '#333', border: 'none', color: '#fff', cursor: 'none', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '3px' },
  closeBtn: { background: '#ff4444', color: '#fff' },
  windowContent: { 
    flexGrow: 1, 
    backgroundColor: '#111', 
    overflowY: 'auto',
    cursor: 'none', // Forces custom cursor inside all app bodies
    '& *': {
      cursor: 'none !important' // Forces custom cursor on all children elements (links, buttons, etc)
    }
  },
  taskbar: {
    position: 'relative',
    height: '50px', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '0 20px', backdropFilter: 'blur(10px)'
  },
  startArea: { display: 'flex', alignItems: 'center', height: '100%' },
  startBtn: { backgroundColor: '#ff2a5f', color: '#000', border: 'none', padding: '8px 16px', fontWeight: 'bold', cursor: 'none', fontFamily: 'monospace', borderRadius: '3px' },
  openAppsArea: { marginLeft: '20px', display: 'flex', gap: '5px' },
  taskbarApp: { padding: '5px 15px', borderRadius: '4px', cursor: 'none', display: 'flex', alignItems: 'center', transition: 'all 0.2s ease' },
  
  searchArea: {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    alignItems: 'center',
    width: '300px', 
  },
  searchIcon: {
    position: 'absolute',
    left: '12px',
    pointerEvents: 'none'
  },
  searchInput: {
    width: '100%',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '20px',
    padding: '8px 15px 8px 35px',
    color: '#fff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '0.9rem',
    outline: 'none',
    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
    transition: 'border-color 0.2s ease',
    cursor: 'none' // ❌ Hides the default text cursor
  },
  
  systemTray: { display: 'flex', alignItems: 'center', fontSize: '0.9rem', cursor: 'none' }
}