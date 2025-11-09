"use client";

import { Inter } from "next/font/google";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useHeroContext } from "./context";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ScrollDown() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { animationCompleted } = useHeroContext();

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !animationCompleted) return;

    // Başlangıçta görünmez
    gsap.set(container, {
      opacity: 0,
      y: 20,
    });

    // Animasyon ile görünür ol
    gsap.to(container, {
      opacity: 0.5,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      delay: 0.3,
    });

    return () => {
      gsap.killTweensOf(container);
    };
  }, [animationCompleted]);

  // Animasyon tamamlanmadan görünmez
  if (!animationCompleted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4"
    >
      <div className="h-6 w-4 flex items-center justify-center border border-white rounded-full p-1">
        <div className="h-2 w-[2px] bg-white rounded-full animate-bounce" />
      </div>
      <span className={`text-white text-xl font-thin ${inter.className}`}>
        Aşağı Kaydırın
      </span>
    </div>
  );
}
