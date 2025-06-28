import React, { useRef, useState } from 'react';
import {
  ZapparCanvas,
  ZapparCamera,
  InstantTracker
} from '@zappar/zappar-react-three-fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
  const gltf = useGLTF(process.env.PUBLIC_URL + '/chair.glb');
  return (
    <primitive 
      object={gltf.scene} 
      scale={[0.3, 0.3, 0.3]} 
      position={[0, -0.5, 0]}
    />
  );
}

export default function App() {
  const trackerRef = useRef();
  const [placementMode, setPlacementMode] = useState(true);

  const handleClick = () => {
    setPlacementMode((prev) => !prev);
  };

  return (
    <>
      <ZapparCanvas
        style={{ width: '100vw', height: '100vh' }}
        embed
        permissionsUI={false}
        loadingUI={false}
        splashScreen={false}
      >
        <ZapparCamera />
        <InstantTracker
          ref={trackerRef}
          placementMode={placementMode}
          placementCameraOffset={[0, -1, -3]}
        >
          <Model />
        </InstantTracker>

        <ambientLight intensity={0.8} />
        <directionalLight position={[2, 4, 6]} intensity={1.5} />
      </ZapparCanvas>

      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '15px 30px',
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          borderRadius: '25px',
          fontSize: '18px',
          fontWeight: 'bold',
          border: '2px solid white',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          zIndex: 1000,
          userSelect: 'none',
          cursor: 'pointer'
        }}
        onClick={handleClick}
      >
        Tap to {placementMode ? 'place' : 'move'} the object
      </div>
    </>
  );
}
