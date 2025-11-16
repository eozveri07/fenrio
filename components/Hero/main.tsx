"use client";

import { useEffect, useRef } from "react";
import { useHeroContext } from "./context";
import { gsap } from "gsap";
import { Highlighter } from "../ui/highlighter";

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
      className="w-full h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden absolute top-[120px] left-0 transition-opacity duration-300 opacity-0 transform-y-100"
    >
      <div className="w-full h-full items-center justify-center overflow-hidden grid grid-cols-1 gap-4">
        <div className="w-full h-full flex p-9 flex-col gap-4 items-center justify-center">
          <h1 className="text-white/80 text-3xl font-thin uppercase">
            Yazılım & Pazarlama
          </h1>
          <p className="text-white text-6xl font-semibold">
            İşletmenizin {""}
            <Highlighter action="highlight" color="#D63E3D">
              kurumsal kimliğini
            </Highlighter>{" "}
            güçlendiriyoruz.
          </p>
          <h3 className="text-white mt-5">İnovate, Elovate, Dominate</h3>
        </div>
      </div>
    </section>
  );
}
