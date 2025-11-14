"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const MODEL_PATH = "/assets/f1/f1.glb";

interface F1ModelProps {
  modelPath?: string;
  scrollProgress?: number;
  onModelReady?: () => void;
}

export default function F1Model({
  modelPath,
  scrollProgress = 0,
  onModelReady,
}: F1ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const actualModelPath = modelPath || MODEL_PATH;

  const gltf = useGLTF(actualModelPath);

  useEffect(() => {
    if (gltf.scene && modelRef.current) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      gltf.scene.position.x = -center.x;
      gltf.scene.position.y = -center.y;
      gltf.scene.position.z = -center.z;

      if (onModelReady) {
        onModelReady();
      }
    }
  }, [gltf.scene, onModelReady]);

  useFrame(() => {
    if (modelRef.current) {
      const startY = 0;
      const startZ = -50;
      const startX = 0;

      const endY = 0;
      const endZ = 0;
      const endX = 0;

      const currentY = startY + (endY - startY) * scrollProgress;
      const currentZ = startZ + (endZ - startZ) * scrollProgress;
      const currentX = startX + (endX - startX) * scrollProgress;

      modelRef.current.position.set(currentX, currentY, currentZ);
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 8, -15]}
      scale={[1, 1, 1]}
    />
  );
}

// Model önceden yükleme (performans için)
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_PATH);
}
