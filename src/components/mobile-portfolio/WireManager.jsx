import React from 'react';

export default function WireManager() {
  return (
    <svg style={styles.wireLayer} width="2400" height="2400">
      
      {/* CENTER VERTICAL: LED Heading to ESP32 */}
      <path d="M 1090 950 C 1090 975, 1082 975, 1090 1000" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 1110 950 C 1110 980, 1118 970, 1110 1000" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 1130 950 C 1130 970, 1122 980, 1130 1000" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 1150 950 C 1150 975, 1158 975, 1150 1000" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* CENTER: ESP32 to OLED */}
      <path d="M 1060 1080 C 1060 1130, 1030 1150, 1030 1180" stroke="#111" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 1080 1080 C 1080 1140, 1050 1150, 1055 1180" stroke="#d90429" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 1150 1080 C 1150 1140, 1130 1150, 1140 1180" stroke="#ffb703" strokeWidth="4" fill="none" strokeLinecap="round" />
      <path d="M 1170 1080 C 1170 1150, 1150 1160, 1160 1180" stroke="#0077b5" strokeWidth="4" fill="none" strokeLinecap="round" />

      {/* TOP RIGHT: ESP32 to AWS TFT */}
      <path d="M 1200 1010 C 1200 800, 1400 850, 1550 720" stroke="#ff5400" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 1220 1010 C 1220 780, 1450 830, 1580 720" stroke="#390099" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* BOTTOM RIGHT: ESP32 to Projects TFT */}
      <path d="M 1200 1080 C 1250 1300, 1400 1450, 1530 1510" stroke="#00ffcc" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 1220 1080 C 1280 1320, 1450 1480, 1560 1510" stroke="#ff006e" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 1240 1080 C 1310 1340, 1500 1510, 1590 1510" stroke="#8338ec" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* TOP LEFT: ESP32 to Skills Matrix */}
      <path d="M 1020 1010 C 1020 850, 800 800, 680 750" stroke="#3a86ff" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 1040 1010 C 1040 820, 850 780, 710 750" stroke="#ffbe0b" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 1060 1010 C 1060 790, 900 760, 740 750" stroke="#fb5607" strokeWidth="5" fill="none" strokeLinecap="round" />

      {/* BOTTOM LEFT: ESP32 to Resume SD Card */}
      <path d="M 1020 1080 C 1020 1300, 750 1300, 620 1450" stroke="#111" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M 1040 1080 C 1040 1320, 780 1330, 650 1450" stroke="#d90429" strokeWidth="5" fill="none" strokeLinecap="round" />

    </svg>
  );
}

const styles = { wireLayer: { position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 5 } };