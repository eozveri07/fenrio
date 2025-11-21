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
      display: "flex",
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power4.inOut",
    });
  }, [logoAnimationCompleted]);

  return (
    <section
      ref={containerRef}
      className="w-full h-full min-h-screen hidden items-center relative z-10 pt-[160px] pb-24 opacity-0"
    >
      <div className="container mx-auto w-full grid grid-cols-2 items-center h-full">
        {/* SOL TARAF - KOKPİT (İÇERİK) */}
        <div className="flex flex-col gap-6 relative z-20">
          {/* Slogan / Takım Radyosu */}
          <div className="flex items-center gap-3">
            <div className="h-px w-12 bg-[#D63E3D] shadow-[0_0_10px_rgba(214,62,61,0.5)]"></div>
            <span className="text-[#D63E3D] font-mono text-sm tracking-[0.2em] uppercase font-bold drop-shadow-[0_0_5px_rgba(214,62,61,0.5)]">
              Digital Pit Crew
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tighter">
            <span>SIFIRDAN</span>
            <br />
            <span
              className="text-transparent text-nowrap bg-clip-text bg-linear-to-r from-[#017AAF] via-[#D63E3D] to-[#017AAF] animate-gradient-x"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              LİDERLİĞE
            </span>
            <br />
          </h1>

          <div className="relative pl-6 py-2 max-w-xl">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-linear-to-b from-white/50 to-transparent"></div>
            <p className="text-gray-300 text-lg font-light leading-relaxed">
              Yüksek performanslı dijital altyapılar ve milisaniyelik
              optimizasyonlarla markanızı{" "}
              <strong className="text-white font-semibold">
                dijital dünyanın zirvesine
              </strong>{" "}
              taşıyan teknik partneriniz.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mt-4">
            <button className="group relative px-8 py-4 bg-[#D63E3D] hover:bg-[#b92b2a] text-white font-bold skew-x-[-10deg] transition-all duration-300 shadow-[0_0_20px_rgba(214,62,61,0.3)] hover:shadow-[0_0_30px_rgba(214,62,61,0.6)]">
              <span className="inline-block skew-x-10 tracking-wide">
                MOTORU ÇALIŞTIR
              </span>
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-20"></div>
            </button>

            <button className="group px-8 py-4 border border-white/10 hover:border-[#017AAF]/50 text-white font-mono text-sm skew-x-[-10deg] transition-all duration-300 bg-black/40 backdrop-blur-md hover:bg-[#017AAF]/20">
              <span className="inline-flex skew-x-10 items-center gap-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#017AAF] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#017AAF]"></span>
                </span>
                İLETİŞİME GEÇ
              </span>
            </button>
          </div>
        </div>

        <div className="relative h-full flex items-start justify-center scale-125">
          <div className="relative w-full h-full max-h-[500px] overflow-hidden">
            {/* Video Container with Mask */}
            <div
              className="relative w-full h-full"
              style={{
                maskImage:
                  "radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 80% 100% at center, black 60%, transparent 100%)",
              }}
            >
              <video
                src="/assets/hero/f1-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Kenarlardan Fade Overlay'ler */}
            <div className="absolute inset-0 pointer-events-none z-10">
              {/* Sol kenar fade */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black via-black/50 to-transparent"></div>
              {/* Sağ kenar fade */}
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black via-black/50 to-transparent"></div>
              {/* Üst kenar fade */}
              <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black via-black/50 to-transparent"></div>
              {/* Alt kenar fade */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/90 via-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
