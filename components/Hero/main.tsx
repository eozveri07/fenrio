"use client";

import { useEffect, useRef, Suspense } from "react";
import { useHeroContext } from "./context";
import { gsap } from "gsap";
import dynamic from "next/dynamic";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";

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
      ref={containerRef}
      className="w-full h-full mt-[160px] opacity-0 translate-y-8 px-8 md:px-16 lg:px-24 mb-24"
    >
      <div className="mx-auto h-full grid grid-cols-1 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-100/80 bg-emerald-500/10 w-fit backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-white text-sm font-medium">
              Fenrio • Digital Pit Crew
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold">
              Your digital pit crew for for high-stakes brands
            </h1>
          </div>

          <p className="text-white/70 text-lg md:text-xl max-w-2xl leading-relaxed">
            Fenrio is your technical partner for high-stakes digital operations.
            We design fast websites, manage resilient infrastructure and
            optimize campaigns...
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-all duration-200">
              Explore Services
            </button>
            <button className="px-4 py-3 pr-8 border-2 border-green-600 text-green-600 rounded-full font-semibold hover:bg-cyan-500/10 transition-all duration-200 flex items-center justify-between gap-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <FaWhatsapp className="w-10 h-10 text-green-600" />
              </div>
              <span>contact us</span>
            </button>
          </div>
        </div>

        <div className="relative w-[120%] -ml-[10%] h-full ">
          <Image
            src="/assets/hero/f1.jpg"
            alt="F1"
            width={1920}
            height={1080}
            className="w-full h-full object-contain"
            quality={75}
            priority
          />
        </div>
      </div>
    </section>
  );
}
