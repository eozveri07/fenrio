"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useHeroContext } from "./context";

export default function AnimatedLogo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const logoImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { setLogoImageLoaded, setAnimationCompleted, backgroundImageLoaded } =
    useHeroContext();

  const startAnimation = () => {
    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    const logoImage = logoImageRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const overlay = overlayRef.current;
    if (
      !container ||
      !textContainer ||
      !logoImage ||
      !title ||
      !subtitle ||
      !overlay
    )
      return;

    const viewportWidth = window.innerWidth;

    const minDuration = 0.5;
    const maxDuration = 0.8;
    const baseDuration = Math.min(
      Math.max(minDuration, (viewportWidth / 1920) * maxDuration),
      maxDuration
    );

    const containerHeightDuration = baseDuration * 1.2;
    const textWidthDuration = baseDuration * 1.0;
    const textFadeDuration = baseDuration * 0.6;

    const tl = gsap.timeline();

    const pauseDuration = 0.1;

    tl.to(container, {
      delay: 0.5,
      height: "200px",
      duration: containerHeightDuration,
      ease: "power2.inOut",
    });

    tl.to(
      overlay,
      {
        opacity: 0,
        duration: containerHeightDuration,
        ease: "power2.inOut",
      },
      "<"
    );

    textContainer.style.width = "auto";
    textContainer.style.visibility = "hidden";
    const realWidth = textContainer.offsetWidth;
    textContainer.style.width = "0px";
    textContainer.style.visibility = "visible";

    tl.to(
      textContainer,
      {
        width: `${realWidth}px`,
        opacity: 1,
        duration: textWidthDuration,
        ease: "power2.inOut",
      },
      `+=${pauseDuration}`
    );

    tl.to(
      title,
      {
        opacity: 1,
        duration: textFadeDuration,
        ease: "power2.out",
      },
      `-=${textWidthDuration * 0.4}`
    );

    tl.to(
      subtitle,
      {
        opacity: 1,
        x: "0%",
        duration: textFadeDuration,
        ease: "power2.out",
      },
      `-=${textFadeDuration * 0.5}`
    );

    // Animasyon tamamlandığında context'i güncelle
    tl.call(() => {
      setAnimationCompleted(true);
    });

    return () => {
      gsap.killTweensOf(container);
      gsap.killTweensOf(textContainer);
      gsap.killTweensOf(title);
      gsap.killTweensOf(subtitle);
      gsap.killTweensOf(overlay);
    };
  };

  useEffect(() => {
    if (imageLoaded && backgroundImageLoaded) {
      const cleanup = startAnimation();
      return cleanup;
    }
  }, [imageLoaded, backgroundImageLoaded]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setLogoImageLoaded(true);
  };

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black z-50 pointer-events-none opacity-100"
      />
      <div
        ref={containerRef}
        className="flex items-end justify-center w-full h-[90vh] relative z-100"
      >
        <div
          ref={logoImageRef}
          className="overflow-hidden flex items-center justify-center h-full relative"
        >
          <Image
            src="/fenrio-logo.png"
            alt="Fenrio Logo"
            className="object-cover w-auto h-full drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
            width={1920}
            height={1080}
            onLoad={handleImageLoad}
            priority
          />
        </div>
        <div
          ref={textContainerRef}
          className="relative z-10 overflow-hidden w-0 opacity-0"
        >
          <h2
            ref={titleRef}
            className="text-9xl font-bold relative z-10 opacity-0 text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            fenrio
          </h2>
          <p
            ref={subtitleRef}
            className="font-light relative z-10 uppercase text-[#D63E3D] x-[-100%] opacity-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
          >
            Software Marketing
          </p>
        </div>
      </div>
    </>
  );
}
