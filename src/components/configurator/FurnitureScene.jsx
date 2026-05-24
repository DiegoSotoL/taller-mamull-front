import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ShelfModel from './ShelfModel.jsx';

const BG_COLOR = '#1e1408';

/**
 * Smoothly repositions the camera so the whole model is always visible,
 * preserving the user's current orbit angle.
 */
function CameraFitter({ config, controlsRef }) {
  const targetDist = useRef(5);

  useEffect(() => {
    const maxDim = Math.max(config.width, config.height, config.depth) / 10;
    targetDist.current = Math.max(3.5, maxDim * 1.8);
  }, [config.width, config.height, config.depth]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const cam = controls.object;
    const offset = cam.position.clone().sub(controls.target);
    const currentDist = offset.length();
    const newDist = THREE.MathUtils.lerp(currentDist, targetDist.current, 0.07);
    if (Math.abs(newDist - currentDist) > 0.001) {
      offset.normalize().multiplyScalar(newDist);
      cam.position.copy(controls.target.clone().add(offset));
      controls.update();
    }
  });

  return null;
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#c08a3a" wireframe />
    </mesh>
  );
}

export default function FurnitureScene({ config }) {
  const controlsRef = useRef();

  const maxDim = Math.max(config.width, config.height, config.depth) / 10;
  const camZ = Math.max(3.5, maxDim * 1.8);

  return (
    <Canvas
      shadows={{ type: THREE.PCFShadowMap }}
      frameloop="always"
      camera={{ position: [camZ * 0.7, camZ * 0.5, camZ], fov: 45, near: 0.1, far: 200 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: false }}
      onCreated={({ gl, scene }) => {
        gl.setClearColor(BG_COLOR, 1);
        scene.background = new THREE.Color(BG_COLOR);
      }}
    >
      {/* Scene background — also set declaratively as fallback */}
      <color attach="background" args={[BG_COLOR]} />

      {/* Lighting */}
      <ambientLight intensity={0.6} color="#fff8f0" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        color="#fff5e0"
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.4} color="#e0d4c0" />
      <pointLight position={[0, 4, 3]} intensity={0.5} color="#d4a96a" />

      {/* Ground contact shadows */}
      <ContactShadows
        position={[0, -(config.height / 10) / 2 - 0.05, 0]}
        opacity={0.4}
        scale={config.width / 10 + 4}
        blur={2.5}
        far={1}
        color="#000"
      />

      {/* 3D Model */}
      <Suspense fallback={<LoadingFallback />}>
        <ShelfModel config={config} />
      </Suspense>

      {/* Environment for realistic reflections */}
      <Environment preset="apartment" />

      {/* Orbit controls — rotate only, no zoom, no pan */}
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.08}
        enableDamping
      />

      {/* Keeps camera distance fitted to model when dimensions change */}
      <CameraFitter config={config} controlsRef={controlsRef} />
    </Canvas>
  );
}
