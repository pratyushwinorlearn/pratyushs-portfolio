import React from 'react';

export default function SdCardResume() {
  const handleDownload = () => {
    // FIXED: Removed '/public' because Vite serves this at the root on Vercel
    window.open('/files/resume.pdf', '_blank');
  };

  return (
    <div style={styles.moduleWrapper} onPointerDown={handleDownload}>
      <style>{`
        .sd-hover:hover { transform: translateY(2px); filter: brightness(1.1); }
      `}</style>
      
      <div style={styles.pcb}>
        {/* PCB Traces/Styling */}
        <div style={styles.silkScreen}>MICRO_SD_SPI</div>
        <div style={{...styles.mountHole, top: 4, left: 4}}></div>
        <div style={{...styles.mountHole, bottom: 4, left: 4}}></div>
        
        <div style={styles.pins}>
          {[...Array(6)].map((_, i) => <div key={i} style={styles.goldPin} />)}
        </div>

        {/* Silver SD Slot housing */}
        <div style={styles.sdSlot}>
          {/* Black Micro SD Card sticking out */}
          <div className="sd-hover" style={styles.microSdCard}>
            <div style={styles.sdText}>64GB</div>
            <div style={styles.sdRidge}></div>
          </div>
        </div>
      </div>
      
      <div style={styles.label}>[ DOWNLOAD RESUME ]</div>
    </div>
  );
}

const styles = {
  moduleWrapper: {
    position: 'relative', 
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 10
  },
  pcb: {
    width: '120px',
    height: '140px',
    backgroundColor: '#0d2347', 
    borderRadius: '4px',
    border: '1px solid #07152b',
    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  silkScreen: { position: 'absolute', top: '10px', right: '-25px', color: '#fff', fontSize: '9px', fontFamily: 'monospace', transform: 'rotate(90deg)' },
  mountHole: { position: 'absolute', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#e0e0e0', border: '2px solid #b0b0b0', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)' },
  pins: { position: 'absolute', top: '-6px', display: 'flex', gap: '6px' },
  goldPin: { width: '6px', height: '12px', backgroundColor: '#ffd700', borderRadius: '1px', border: '1px solid #b8860b' },
  sdSlot: {
    width: '90px',
    height: '110px',
    backgroundColor: '#c0c0c0', 
    border: '2px solid #999',
    borderRadius: '2px',
    boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.4)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
  },
  microSdCard: {
    width: '70px',
    height: '90px',
    backgroundColor: '#111',
    position: 'absolute',
    bottom: '-15px', 
    borderRadius: '2px 8px 2px 2px',
    border: '1px solid #333',
    boxShadow: '0 4px 6px rgba(0,0,0,0.6)',
    transition: 'all 0.2s ease',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '40px'
  },
  sdText: { color: '#fff', fontSize: '10px', fontFamily: 'sans-serif', fontWeight: 'bold', opacity: 0.8 },
  sdRidge: { position: 'absolute', bottom: '10px', width: '100%', height: '4px', backgroundColor: '#222' },
  label: { marginTop: '15px', color: '#222', fontFamily: 'monospace', fontWeight: 'bold', fontSize: '0.9rem', backgroundColor: '#ffd700', padding: '4px 8px', borderRadius: '2px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }
};