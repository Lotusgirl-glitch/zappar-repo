import React, { useState } from 'react';
import { 
  ZapparCanvas, 
  ZapparCamera, 
  InstantTracker 
} from "@zappar/zappar-react-three-fiber";
import { useGLTF } from '@react-three/drei';

// Load and render the 3D model
function Model() {
  const gltf = useGLTF('/chair.glb'); // Make sure chair.glb is in /public
  return (
    <primitive 
      object={gltf.scene} 
      scale={[0.5, 0.5, 0.5]} 
      position={[0, 0, 0]} 
    />
  );
}

// Main AR App
export default function ARApp() {
  const [placementMode, setPlacementMode] = useState(true);

  return (
    <>
      <ZapparCanvas style={{ width: '100vw', height: '100vh' }}>
        <ZapparCamera />
        
        <InstantTracker 
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -5]}
        >
          <Model />
        </InstantTracker>

        {/* Lights */}
        <directionalLight position={[2.5, 8, 5]} intensity={1.5} />
        <ambientLight intensity={0.5} />
      </ZapparCanvas>

      {/* Toggle Button */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '15px 30px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          borderRadius: '25px',
          cursor: 'pointer',
          fontSize: '16px',
          border: 'none',
          zIndex: 1000
        }}
        onClick={() => setPlacementMode((p) => !p)}
      >
        Tap here to {placementMode ? "place" : "pick up"} the object
      </div>
    </>
  );
}

