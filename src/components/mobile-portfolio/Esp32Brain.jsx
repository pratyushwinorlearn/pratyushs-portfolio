import React from 'react';
export default function Esp32Brain() {
  return (
    <div style={styles.espBoard}>
      <style>{`@keyframes ledPulse { 0%, 100% { opacity: 1; box-shadow: 0 0 6px #00ffcc; } 50% { opacity: 0.3; box-shadow: 0 0 2px #00ffcc; } }`}</style>
      <div style={styles.shieldCan}><div style={styles.shieldText}>ESP-32</div><div style={styles.wifiLogo}>WiFi · BT</div></div>
      <div style={styles.bootButton}></div><div style={styles.enButton}></div><div style={styles.usbPort}></div>
      <div style={styles.pinHeaderLeft}></div><div style={styles.pinHeaderRight}></div><div style={styles.powerLed}></div>
    </div>
  );
}
const styles = {
  espBoard: { width: '240px', height: '80px', backgroundColor: '#121212', borderRadius: '4px', border: '1px solid #282828', boxShadow: '0 10px 25px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.1)', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  shieldCan: { width: '100px', height: '55px', backgroundColor: '#d8d8d8', borderRadius: '2px', border: '1px solid #999', boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' },
  shieldText: { fontFamily: 'monospace', fontSize: '11px', fontWeight: 'bold', color: '#333' }, wifiLogo: { fontSize: '7px', fontFamily: 'sans-serif', color: '#555', marginTop: '2px' },
  bootButton: { position: 'absolute', bottom: '10px', right: '35px', width: '8px', height: '8px', backgroundColor: '#333', borderRadius: '50%', border: '1px solid #555' }, enButton: { position: 'absolute', bottom: '26px', right: '35px', width: '8px', height: '8px', backgroundColor: '#333', borderRadius: '50%', border: '1px solid #555' },
  usbPort: { position: 'absolute', right: '-6px', top: '25px', width: '14px', height: '24px', backgroundColor: '#c0c0c0', borderRadius: '2px', border: '1px solid #777' }, pinHeaderLeft: { position: 'absolute', left: '-4px', top: '8px', bottom: '8px', width: '6px', backgroundColor: '#ffd700', borderRadius: '1px' }, pinHeaderRight: { position: 'absolute', right: '-4px', top: '8px', bottom: '8px', width: '6px', backgroundColor: '#ffd700', borderRadius: '1px' }, powerLed: { position: 'absolute', top: '12px', right: '18px', width: '4px', height: '4px', backgroundColor: '#00ffcc', borderRadius: '50%', animation: 'ledPulse 1.5s infinite ease-in-out' },
};