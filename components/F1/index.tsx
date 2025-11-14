"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Scene3D from "./3DScene";

gsap.registerPlugin(ScrollTrigger);

export default function F1() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modelReady, setModelReady] = useState(false);

  useEffect(() => {
    if (!modelReady || !containerRef.current) return;

    const pinTrigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=1000vh",
      pin: true,
      pinSpacing: true,
      onUpdate: (self) => {
        const progress = self.progress;
        setScrollProgress(progress);
      },
    });

    return () => {
      if (pinTrigger) {
        pinTrigger.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === containerRef.current) {
          trigger.kill();
        }
      });
    };
  }, [modelReady]);

  return (
    <div ref={containerRef} className="w-full h-screen relative">
      <Scene3D
        scrollProgress={scrollProgress}
        onModelReady={() => setModelReady(true)}
      />
    </div>
  );
}
