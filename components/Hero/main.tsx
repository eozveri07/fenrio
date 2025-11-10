"use client";

import { useEffect, useRef } from "react";
import { useHeroContext } from "./context";
import { gsap } from "gsap";

export default function HeroMain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { logoAnimationCompleted } = useHeroContext();

  useEffect(() => {
    if (!logoAnimationCompleted) return;
    gsap.to(containerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
  }, [logoAnimationCompleted]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="w-full h-full flex items-center justify-center overflow-hidden absolute top-0 left-0 transition-opacity duration-300 opacity-0 transform-y-100"
    >
      <h3 className="text-white text-4xl font-bold">Hero Main</h3>
    </section>
  );
}
