"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PerspectiveCamera, Environment } from "@react-three/drei";
import { Suspense } from "react";
import F1Model from "./F1Model";

interface Scene3DProps {
  scrollProgress?: number;
  onModelReady?: () => void;
}

function CameraController() {
  const { camera } = useThree();

  useFrame(() => {
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function Scene3D({
  scrollProgress = 0,
  onModelReady,
}: Scene3DProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2.5]}
        style={{ background: "transparent" }}
      >
        {/* Transparan arka plan için */}
        <color attach="background" args={["transparent"]} />

        <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={50} />
        <CameraController />

        {/* Işıklandırma */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} />

        <Environment preset="city" />

        {/* F1 Modeli */}
        <Suspense fallback={null}>
          <F1Model scrollProgress={scrollProgress} onModelReady={onModelReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
