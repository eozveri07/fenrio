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
      className="w-full h-[calc(100vh-80px)] pt-9 flex items-center justify-center overflow-hidden absolute bottom-[80px] left-0 transition-opacity duration-300 opacity-0 transform-y-100"
    >
      <div className="w-full h-full items-center justify-center overflow-hidden grid grid-cols-2 gap-4">
        <div className="w-full h-full flex p-9 flex-col gap-4 items-start justify-center">
          <h1 className="text-white/80 text-3xl font-thin uppercase">
            Software Marketing
          </h1>
          <p className="text-white text-5xl font-bold">
            We are a software marketing company that helps businesses grow their
            online presence.
          </p>
        </div>
      </div>
    </section>
  );
}
