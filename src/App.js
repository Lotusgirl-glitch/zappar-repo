import React, { useState } from 'react';
import {
  ZapparCanvas,
  ZapparCamera,
  InstantTracker
} from '@zappar/zappar-react-three-fiber';
import { useGLTF } from '@react-three/drei';

function Model() {
  const gltf = useGLTF(process.env.PUBLIC_URL + '/chair.glb'); // Make sure chair.glb is in public/
  return <primitive object={gltf.scene} scale={[0.5, 0.5, 0.5]} />;
}

export default function App() {
  const [placementMode, setPlacementMode] = useState(true);

  return (
    <>
      <ZapparCanvas
        style={{ width: '100vw', height: '100vh' }}
      >
        <ZapparCamera />
        <InstantTracker placementMode={placementMode}>
          <Model />
        </InstantTracker>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 4, 6]} intensity={1.2} />
      </ZapparCanvas>

      <button
        onClick={() => setPlacementMode(!placementMode)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '12px 24px',
          backgroundColor: '#333',
          color: 'white',
          borderRadius: '25px',
          zIndex: 10,
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Tap to {placementMode ? 'place' : 'move'} the object
      </button>
    </>
  );
}
