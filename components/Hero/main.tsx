"use client";

import { useEffect, useRef } from "react";
import { useHeroContext } from "./context";
import { gsap } from "gsap";

export default function HeroMain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);
  const ctaButtonsRef = useRef<HTMLDivElement>(null);
  const {
    logoAnimationCompleted,
    backgroundImageLoaded,
    setBackgroundImageLoaded,
  } = useHeroContext();

  useEffect(() => {
    if (!logoAnimationCompleted || !backgroundImageLoaded) return;

    gsap.set(containerRef.current, { display: "flex", opacity: 1 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      videoRef.current,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
      0.4
    );

    tl.fromTo(
      badgeRef.current,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
      0.5
    );

    tl.fromTo(
      titleLine1Ref.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      0.9
    );

    tl.fromTo(
      titleLine2Ref.current,
      { x: -120, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    );

    if (descriptionRef.current) {
      const desc = descriptionRef.current;
      desc.style.visibility = "hidden";
      desc.style.clipPath = "inset(0 100% 0 0)";
      desc.style.visibility = "visible";

      tl.fromTo(
        desc,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.1,
          ease: "power2.out",
        },
        "-=0.2"
      );
    }

    tl.fromTo(
      ctaButtonsRef.current,
      { x: -80, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.2)" },
      "-=0.3"
    );
  }, [logoAnimationCompleted, backgroundImageLoaded]);

  useEffect(() => {
    const video = videoElementRef.current;
    if (!video) return;

    const checkVideoReady = () => {
      if (video.readyState >= 2) {
        setBackgroundImageLoaded(true);
      }
    };

    checkVideoReady();

    const handleLoaded = () => {
      setBackgroundImageLoaded(true);
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("canplay", handleLoaded);
    video.addEventListener("loadedmetadata", handleLoaded);

    return () => {
      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("canplay", handleLoaded);
      video.removeEventListener("loadedmetadata", handleLoaded);
    };
  }, [setBackgroundImageLoaded]);

  return (
    <section
      ref={containerRef}
      className="w-full h-full min-h-screen hidden items-center relative z-10 pt-[160px] pb-24 opacity-0"
    >
      <div className="container mx-auto w-full grid grid-cols-2 items-center h-full">
        <div className="flex flex-col gap-6 relative z-20">
          <div ref={badgeRef} className="flex items-center gap-3 opacity-0">
            <div className="h-px w-12 bg-[#D63E3D] shadow-[0_0_10px_rgba(214,62,61,0.5)]"></div>
            <span className="text-[#D63E3D] font-mono text-sm tracking-[0.2em] uppercase font-bold drop-shadow-[0_0_5px_rgba(214,62,61,0.5)]">
              Digital Pit Crew
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tighter">
            <span ref={titleLine1Ref} className="inline-block opacity-0">
              SIFIRDAN
            </span>
            <br />
            <span
              ref={titleLine2Ref}
              className="text-transparent text-nowrap bg-clip-text bg-linear-to-r from-[#017AAF] via-[#D63E3D] to-[#017AAF] animate-gradient-x inline-block opacity-0"
              style={{
                backgroundSize: "200% 200%",
              }}
            >
              LİDERLİĞE
            </span>
            <br />
          </h1>

          <div
            ref={descriptionRef}
            className="relative py-2 max-w-xl opacity-0"
            style={{ visibility: "hidden", position: "relative" }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-linear-to-b from-white/50 to-transparent"></div>
            <p className="text-gray-300 text-lg font-light pl-6 leading-relaxed">
              Yüksek performanslı dijital altyapılar ve milisaniyelik
              optimizasyonlarla markanızı{" "}
              <strong className="text-white font-semibold">
                dijital dünyanın zirvesine
              </strong>{" "}
              taşıyan teknik partneriniz.
            </p>
          </div>

          <div
            ref={ctaButtonsRef}
            className="flex flex-wrap gap-4 mt-4 opacity-0"
          >
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

        <div
          ref={videoRef}
          className="relative h-full flex items-start justify-center scale-125 opacity-0"
        >
          <div className="relative w-full h-full max-h-[500px] overflow-hidden">
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
                ref={videoElementRef}
                src="/assets/hero/f1-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-contain object-center"
              />
            </div>

            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-black via-black/50 to-transparent"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-black via-black/50 to-transparent"></div>
              <div className="absolute top-0 left-0 right-0 h-24 bg-linear-to-b from-black via-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-black/90 via-black/60 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
