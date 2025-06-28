import React, { useRef, useState } from 'react';
import {
  ZapparCanvas,
  ZapparCamera,
  InstantTracker
} from '@zappar/zappar-react-three-fiber';
import { useGLTF } from '@react-three/drei';

// Load 3D model
function Model() {
  const gltf = useGLTF(process.env.PUBLIC_URL + '/chair.glb');
  return <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} />;
}

export default function App() {
  const trackerRef = useRef();
  const [placementMode, setPlacementMode] = useState(true);

  // Handle screen tap
  const handleClick = () => {
    setPlacementMode((prev) => !prev); // Toggle place/move
  };

  return (
    <>
      <ZapparCanvas
        style={{ width: '100vw', height: '100vh' }}
        embed
        permissionsUI={false}
        loadingUI={false}
        onClick={handleClick} // 🔥 Tap to place or move
      >
        <ZapparCamera />
        <InstantTracker
          ref={trackerRef}
          placementMode={placementMode}
          placementCameraOffset={[0, 0, -5]} // Optional offset
        >
          <Model />
        </InstantTracker>

        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 6]} intensity={1.5} />
      </ZapparCanvas>

      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          borderRadius: '20px',
          fontSize: '16px',
          zIndex: 1000
        }}
      >
        Tap to {placementMode ? 'place' : 'move'} the object
      </div>
    </>
  );
}
