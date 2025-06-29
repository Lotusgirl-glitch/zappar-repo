// App.js
import React, { useState } from 'react';
import ModelViewerAR from './ModelViewerAR';

export default function App() {
  const [modelSrc, setModelSrc] = useState(process.env.PUBLIC_URL + "/chair.glb");
  const [color, setColor] = useState("#ffffff");

  const handleColorChange = (color) => setColor(color);

  return (
    <div>
      <ModelViewerAR src={modelSrc} color={color} />

      {/* Model Switcher */}
      <div style={{
        position: 'absolute',
        bottom: '140px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#fff',
        borderRadius: '8px',
        padding: '10px',
        display: 'flex',
        gap: '10px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        zIndex: 100
      }}>
        <button onClick={() => setModelSrc("/chair.glb")}>Chair</button>
      </div>

      {/* Color Picker */}
      <div style={{
        position: 'absolute',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '10px',
        zIndex: 100
      }}>
        <button onClick={() => handleColorChange("red")}>Red</button>
        <button onClick={() => handleColorChange("green")}>Green</button>
        <button onClick={() => handleColorChange("blue")}>Blue</button>
      </div>
    </div>
  );
}
