"use client";

import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

// Model yolu - public klasöründen
const MODEL_PATH = "/assets/f1/f1.glb";

interface F1ModelProps {
  modelPath?: string;
  onWheelsReady?: (wheels: {
    wheelLF: THREE.Object3D | null;
    wheelLR: THREE.Object3D | null;
    wheelRR: THREE.Object3D | null;
    wheelRF: THREE.Object3D | null;
  }) => void;
}

export default function F1Model({ modelPath, onWheelsReady }: F1ModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const actualModelPath = modelPath || MODEL_PATH;

  const gltf = useGLTF(actualModelPath);

  // Modeli merkeze hizala ve tekerlekleri bul
  useEffect(() => {
    if (gltf.scene && modelRef.current) {
      const box = new THREE.Box3().setFromObject(gltf.scene);
      const center = box.getCenter(new THREE.Vector3());

      gltf.scene.position.x = -center.x;
      gltf.scene.position.y = -center.y;
      gltf.scene.position.z = -center.z;

      // Tekerlekleri bul
      if (onWheelsReady) {
        const findObjectByName = (
          obj: THREE.Object3D,
          name: string
        ): THREE.Object3D | null => {
          if (obj.name === name) return obj;
          for (const child of obj.children) {
            const found = findObjectByName(child, name);
            if (found) return found;
          }
          return null;
        };

        const wheels = {
          wheelLF: findObjectByName(gltf.scene, "WHEEL_LF_110"),
          wheelLR: findObjectByName(gltf.scene, "WHEEL_LR_120"),
          wheelRR: findObjectByName(gltf.scene, "WHEEL_RR_125"),
          wheelRF: findObjectByName(gltf.scene, "WHEEL_RF_115"),
        };

        onWheelsReady(wheels);
      }
    }
  }, [gltf.scene, onWheelsReady]);

  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 0, 0]}
      scale={[1, 1, 1]}
    />
  );
}

// Model önceden yükleme (performans için)
if (typeof window !== "undefined") {
  useGLTF.preload(MODEL_PATH);
}
