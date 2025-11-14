"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "./3DScene";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

export default function F1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [wheels, setWheels] = useState<{
    wheelLF: THREE.Object3D | null;
    wheelLR: THREE.Object3D | null;
    wheelRR: THREE.Object3D | null;
    wheelRF: THREE.Object3D | null;
  } | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!wheels || !containerRef.current) return;

    const { wheelLF, wheelLR, wheelRR, wheelRF } = wheels;

    // Tekerleklerin yüklendiğinden emin olmak için kısa bir gecikme
    const setupAnimation = () => {
      // Başlangıç pozisyonlarını kaydet (world pozisyonlarını al)
      const getWorldPosition = (
        obj: THREE.Object3D | null
      ): THREE.Vector3 | null => {
        if (!obj) return null;
        const worldPos = new THREE.Vector3();
        obj.getWorldPosition(worldPos);
        return worldPos;
      };

      const initialPositions = {
        wheelLF: wheelLF ? getWorldPosition(wheelLF) : null,
        wheelLR: wheelLR ? getWorldPosition(wheelLR) : null,
        wheelRR: wheelRR ? getWorldPosition(wheelRR) : null,
        wheelRF: wheelRF ? getWorldPosition(wheelRF) : null,
      };

      // Local pozisyonları da kaydet (daha doğru çalışması için)
      const localPositions = {
        wheelLF: wheelLF ? wheelLF.position.clone() : null,
        wheelLR: wheelLR ? wheelLR.position.clone() : null,
        wheelRR: wheelRR ? wheelRR.position.clone() : null,
        wheelRF: wheelRF ? wheelRF.position.clone() : null,
      };

      // ScrollTrigger ile pinleme ve animasyon
      const pinTrigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=300vh", // 3 ekran boyu - daha yavaş animasyon için
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress; // 0 ile 1 arası
          const separationDistance = 1; // Tekerleklerin ayrılma mesafesi

          // Scroll progress'i güncelle (hologram kartı için)
          setScrollProgress(progress);

          // Sol tekerlekler sola doğru (-x yönü)
          if (wheelLF && localPositions.wheelLF) {
            wheelLF.position.x =
              localPositions.wheelLF.x + progress * separationDistance;
          }
          if (wheelLR && localPositions.wheelLR) {
            wheelLR.position.x =
              localPositions.wheelLR.x + progress * separationDistance;
          }

          // Sağ tekerlekler sağa doğru (+x yönü)
          if (wheelRR && localPositions.wheelRR) {
            wheelRR.position.x =
              localPositions.wheelRR.x - progress * separationDistance;
          }
          if (wheelRF && localPositions.wheelRF) {
            wheelRF.position.x =
              localPositions.wheelRF.x - progress * separationDistance;
          }
        },
      });

      return pinTrigger;
    };

    // Model yüklendikten sonra animasyonu kur
    let pinTrigger: ScrollTrigger | null = null;
    const timer = setTimeout(() => {
      pinTrigger = setupAnimation();
    }, 100);

    return () => {
      clearTimeout(timer);
      if (pinTrigger) {
        pinTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [wheels]);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen relative"
    >
      <Scene3D
        onWheelsReady={setWheels}
        scrollProgress={scrollProgress}
        wheels={wheels || undefined}
      />
    </div>
  );
}
