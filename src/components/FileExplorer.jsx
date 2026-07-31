import React, { useState } from 'react'
import { Folder, FileText, Video, Image as ImageIcon, X, Download, HardDrive, ChevronRight } from 'lucide-react'

export default function FileExplorer() {
  const [currentCategory, setCurrentCategory] = useState('all')
  const [activePreview, setActivePreview] = useState(null)

  // Mock file system mapping your actual public assets and documents
  const files = [
    { 
      id: 1, 
      name: 'persona.mp4', 
      type: 'video', 
      category: 'videos', 
      size: '14.2 MB', 
      url: '/videos/persona.mp4', 
      description: 'Multimodal AI vision-language classification project demo for social media moderation.' 
    },
    { 
      id: 2, 
      name: 'network.mp4', 
      type: 'video', 
      category: 'videos', 
      size: '8.5 MB', 
      url: '/videos/network.mp4', 
      description: 'Computer Networks routing and reliable data delivery simulation breakdown.' 
    },
    { 
      id: 3, 
      name: 'isolated.mp4', 
      type: 'video', 
      category: 'videos', 
      size: '11.1 MB', 
      url: '/videos/isolated.mp4', 
      description: 'Scrollytelling parallax cinematic sequence animation preview.' 
    },
    { 
      id: 4, 
      name: 'Shekhar_Pratyush_Resume.pdf', 
      type: 'document', 
      category: 'documents', 
      size: '40 KB', 
      url: 'files/resume.pdf', 
      description: 'Official professional resume detailing full-stack development, AI/ML tools, and B.Tech CSE coursework.' 
    },
    { 
      id: 5, 
      name: 'Architecture_Schema.png', 
      type: 'image', 
      category: 'documents', 
      size: '1.2 MB', 
      url: '#', 
      description: 'System design schema for the AI Interviewer web application backend.' 
    }
  ]

  const filteredFiles = currentCategory === 'all' 
    ? files 
    : files.filter(f => f.category === currentCategory)

  const getFileIcon = (type) => {
    switch(type) {
      case 'video': return <Video size={36} color="#00ffcc" />
      case 'document': return <FileText size={36} color="#ffaa00" />
      case 'image': return <ImageIcon size={36} color="#ff2a5f" />
      default: return <FileText size={36} color="#888" />
    }
  }

  return (
    <div style={styles.container}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <HardDrive size={18} color="#00ffcc" />
          <span>Storage (C:)</span>
        </div>
        <div 
          style={{ ...styles.sidebarItem, backgroundColor: currentCategory === 'all' ? '#222' : 'transparent' }}
          onClick={() => setCurrentCategory('all')}
        >
          <Folder size={16} color="#00ffcc" /> All Files
        </div>
        <div 
          style={{ ...styles.sidebarItem, backgroundColor: currentCategory === 'videos' ? '#222' : 'transparent' }}
          onClick={() => setCurrentCategory('videos')}
        >
          <Video size={16} color="#00ffcc" /> Videos
        </div>
        <div 
          style={{ ...styles.sidebarItem, backgroundColor: currentCategory === 'documents' ? '#222' : 'transparent' }}
          onClick={() => setCurrentCategory('documents')}
        >
          <FileText size={16} color="#ffaa00" /> Documents
        </div>
      </div>

      {/* Main Content Area */}
      <div style={styles.mainContent}>
        <div style={styles.breadcrumb}>
          <span>This PC</span> <ChevronRight size={14} color="#666" /> <span>{currentCategory.toUpperCase()}</span>
        </div>

        <div style={styles.fileGrid}>
          {filteredFiles.map(file => (
            <div 
              key={file.id} 
              style={styles.fileCard}
              onDoubleClick={() => setActivePreview(file)}
              onClick={() => setActivePreview(file)}
            >
              <div style={styles.fileIconWrapper}>
                {getFileIcon(file.type)}
              </div>
              <span style={styles.fileName}>{file.name}</span>
              <span style={styles.fileSize}>{file.size}</span>
            </div>
          ))}
        </div>
      </div>

      {/* File Preview Modal */}
      {activePreview && (
        <div style={styles.modalOverlay} onClick={() => setActivePreview(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <span style={styles.modalTitle}>{activePreview.name}</span>
              <button style={styles.closeBtn} onClick={() => setActivePreview(null)}>
                <X size={16} />
              </button>
            </div>
            
            <div style={styles.modalBody}>
              {activePreview.type === 'video' ? (
                <video 
                  src={activePreview.url} 
                  controls 
                  autoPlay 
                  style={styles.previewVideo} 
                />
              ) : (
                <div style={styles.docPreviewMock}>
                  <FileText size={64} color="#ffaa00" />
                  <h3 style={{ marginTop: '15px' }}>{activePreview.name}</h3>
                  <p style={{ color: '#aaa', textAlign: 'center', maxWidth: '400px', marginTop: '10px' }}>
                    {activePreview.description}
                  </p>
                </div>
              )}
            </div>

            <div style={styles.modalFooter}>
              <span style={{ fontSize: '0.85rem', color: '#888' }}>Size: {activePreview.size}</span>
              <a 
                href={activePreview.url} 
                download 
                target="_blank" 
                rel="noreferrer"
                style={styles.downloadBtn}
              >
                <Download size={14} /> Open / Download
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundColor: '#0f0f0f',
    color: '#fff',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    userSelect: 'none'
  },
  sidebar: {
    width: '200px',
    backgroundColor: '#141414',
    borderRight: '1px solid #222',
    display: 'flex',
    flexDirection: 'column',
    padding: '15px 10px',
    gap: '5px'
  },
  sidebarHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
    padding: '8px',
    marginBottom: '10px',
    color: '#00ffcc'
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 12px',
    borderRadius: '6px',
    cursor: 'none',
    fontSize: '0.85rem',
    color: '#ccc',
    transition: 'background 0.2s'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    overflowY: 'auto'
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '0.85rem',
    color: '#888',
    marginBottom: '20px',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  },
  fileGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
    gap: '20px'
  },
  fileCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '15px 10px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255,255,255,0.02)',
    border: '1px solid transparent',
    cursor: 'none',
    transition: 'all 0.2s ease',
    textAlign: 'center'
  },
  fileIconWrapper: {
    marginBottom: '8px'
  },
  fileName: {
    fontSize: '0.8rem',
    wordBreak: 'break-word',
    color: '#ddd',
    marginBottom: '4px'
  },
  fileSize: {
    fontSize: '0.7rem',
    color: '#666'
  },
  modalOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.85)',
    backdropFilter: 'blur(5px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999
  },
  modalContent: {
    width: '650px',
    backgroundColor: '#1a1a1a',
    border: '1px solid #333',
    borderRadius: '10px',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 20px 40px rgba(0,0,0,0.8)'
  },
  modalHeader: {
    backgroundColor: '#222',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #333'
  },
  modalTitle: {
    fontSize: '0.9rem',
    fontWeight: 'bold',
    color: '#00ffcc'
  },
  closeBtn: {
    background: '#333',
    border: 'none',
    color: '#fff',
    cursor: 'none',
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'flex',
    alignItems: 'center'
  },
  modalBody: {
    padding: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    minHeight: '300px'
  },
  previewVideo: {
    width: '100%',
    maxHeight: '350px',
    outline: 'none',
    borderRadius: '6px'
  },
  docPreviewMock: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyItem: 'center',
    padding: '20px'
  },
  modalFooter: {
    backgroundColor: '#161616',
    padding: '12px 20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #333'
  },
  downloadBtn: {
    backgroundColor: '#00ffcc',
    color: '#000',
    padding: '6px 14px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    cursor: 'none'
  }
}