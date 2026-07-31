import React, { useState, useEffect } from 'react'
import { Rnd } from 'react-rnd'
import { Folder, Terminal, Code, Briefcase, Mail, Search, FileText, Image as ImageIcon, X, Minus, Square, Award } from 'lucide-react'
import AwsApp from './AwsApp'
import GithubClone from './GithubClone'
import LinkedInClone from './LinkedInClone'
import FileExplorer from './FileExplorer'


export default function PortfolioOS({ isUIOpen, closeUI }) {
  const [time, setTime] = useState(new Date())
  const [windows, setWindows] = useState([])
  const [activeZIndex, setActiveZIndex] = useState(100)
  
  // ✅ NEW: Search state
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const desktopApps = [
    { 
      id: 'ai_interviewer', name: 'AI_Interviewer.exe', icon: <Terminal size={32} color="#00ffcc" />, 
      content: (
        <div style={{ width: '100%', height: '100%', backgroundColor: '#000' }}>
          <video src="/videos/persona.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )
    },
    { 
      id: 'aws_badges', 
      name: 'AWS_Cloud.exe', 
      icon: <Award size={32} color="#ff9900" />, // Make sure to import Award from lucide-react if needed
      content: <AwsApp />
    },
    { 
      id: 'github', name: 'GitHub', icon: <Code size={32} color="#fff" />, 
      content: <GithubClone />
    },
    { 
      id: 'linkedin', name: 'LinkedIn', icon: <Briefcase size={32} color="#0077b5" />, 
      content: <LinkedInClone />
    },
    { 
      id: 'file_explorer', name: 'Explorer.exe', icon: <Folder size={32} color="#ffaa00" />, 
      content: <FileExplorer />
    }
  ]

  // ✅ NEW: Combine apps and searchable files for the search engine
  const searchableItems = [
    ...desktopApps,
    { id: 'resume', name: 'Resume.pdf', icon: <FileText size={24} color="#ffaa00" />, isFile: true },
    { id: 'schema', name: 'Architecture_Schema.png', icon: <ImageIcon size={24} color="#ff2a5f" />, isFile: true }
  ]

  const searchResults = searchQuery.trim() === '' ? [] : searchableItems.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  return (
    <div 
      style={styles.backdrop}
      onPointerDown={(e) => e.stopPropagation()} 
      onClick={closeUI}
    >
      <style>{`
        body, html {
          cursor: none !important;
        }
        .os-container *, 
        .os-container a, 
        .os-container button, 
        .os-container input,
        .os-container [role="button"] {
          cursor: none !important;
        }
      `}</style>
      
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
              size={{ width: win.isMaximized ? '100%' : win.height ? win.width : 900, height: win.isMaximized ? '100%' : win.height || 600 }}
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
          </div>
          
          {/* ✅ SEARCH BAR WITH LIVE RESULTS DROPDOWN */}
          <div style={styles.searchArea}>
            <Search size={16} color="#888" style={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search OS (e.g. LinkedIn, Resume)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()} // Stops typing keys from leaking out
              style={styles.searchInput}
            />

            {searchResults.length > 0 && (
              <div style={styles.searchDropdown}>
                {searchResults.map((item) => (
                  <div 
                    key={item.id} 
                    style={styles.searchResultItem}
                    onClick={() => {
                      if (item.isFile) {
                        // Open File Explorer if user clicked a file search result
                        const explorer = desktopApps.find(a => a.id === 'file_explorer')
                        if (explorer) handleAppClick(explorer)
                      } else {
                        handleAppClick(item)
                      }
                      setSearchQuery('')
                    }}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            )}
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
    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', 
    zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center',
    cursor: 'none' 
  },
  osWrapper: {
    width: '100%', height: '100%', 
    display: 'flex', flexDirection: 'column',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    color: '#fff', userSelect: 'none',
    overflow: 'hidden',
    cursor: 'none' 
  },
  desktop: {
    flexGrow: 1, backgroundColor: '#0a0a0a', 
    backgroundImage: 'url("/desktopwallpaper.jpg")', 
    backgroundSize: 'cover', backgroundPosition: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  iconGrid: {
    display: 'flex', flexDirection: 'column', flexWrap: 'wrap', gap: '20px', height: '100%', alignContent: 'flex-start',
    padding: '20px'
  },
  appIcon: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', width: '90px', padding: '10px', borderRadius: '5px',
    cursor: 'none', 
    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
  },
  iconText: { marginTop: '8px', fontSize: '0.8rem', textAlign: 'center', wordBreak: 'break-word' },
  titleBar: {
    backgroundColor: '#2a2a2a', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    cursor: 'none', 
    borderBottom: '1px solid #111'
  },
  windowControls: { display: 'flex', gap: '5px' },
  controlBtn: { background: '#333', border: 'none', color: '#fff', cursor: 'none', display: 'flex', alignItems: 'center', padding: '4px', borderRadius: '3px' },
  closeBtn: { background: '#ff4444', color: '#fff' },
  windowContent: { 
    flexGrow: 1, 
    backgroundColor: '#111', 
    overflowY: 'auto',
    cursor: 'none'
  },
  taskbar: {
    position: 'relative',
    height: '50px', backgroundColor: 'rgba(15, 15, 15, 0.95)', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between',
    alignItems: 'center', padding: '0 20px', backdropFilter: 'blur(10px)', zIndex: 100
  },
  startArea: { display: 'flex', alignItems: 'center', height: '100%' },
  startBtn: { backgroundColor: '#ff2a5f', color: '#000', border: 'none', padding: '8px 16px', fontWeight: 'bold', cursor: 'none', fontFamily: 'monospace', borderRadius: '3px' },
  
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
    pointerEvents: 'none',
    zIndex: 2
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
    cursor: 'none' 
  },
  searchDropdown: {
    position: 'absolute',
    bottom: '55px',
    left: 0,
    width: '100%',
    backgroundColor: '#1e1e1e',
    border: '1px solid #333',
    borderRadius: '8px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
    overflow: 'hidden',
    zIndex: 200
  },
  searchResultItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '10px 15px',
    cursor: 'none',
    fontSize: '0.9rem',
    borderBottom: '1px solid #2a2a2a',
    transition: 'background 0.2s'
  },
  systemTray: { display: 'flex', alignItems: 'center', fontSize: '0.9rem', cursor: 'none' }
}