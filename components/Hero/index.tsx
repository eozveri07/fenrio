"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const logoImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const logoImage = logoImageRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!logoImage || !title || !subtitle) return;

    // Ekran boyutunu al (responsive için)
    const viewportWidth = window.innerWidth;

    // Responsive animasyon süreleri - ekran boyutuna göre ayarla
    // Küçük ekranlarda (768px) 0.25s, büyük ekranlarda (1920px) 0.35s
    const minDuration = 0.4;
    const maxDuration = 0.6;
    const animDuration = Math.min(
      Math.max(minDuration, (viewportWidth / 1920) * maxDuration),
      maxDuration
    );

    // Responsive delay değerleri
    const delay1 = animDuration;
    const delay2 = animDuration * 2;
    const delay3 = animDuration * 3;

    gsap.set(logoImage, {
      top: "40%",
      left: "10%",
      transform: "translate(50%, 80%)",
      height: "90vh",
    });

    gsap.to(logoImage, {
      top: "0%",
      left: "0%",
      transform: "translate(0%, 0%)",
      height: "100%",
      duration: animDuration,
      ease: "power2.inOut",
      delay: delay1,
    });

    gsap.to(logoImage, {
      x: 0,
      y: 0,
      duration: animDuration,
      ease: "power2.inOut",
      delay: delay2,
    });

    // Title Animations - Responsive
    const titleStartX = Math.min(viewportWidth * 0.2, 384); // Max 384px
    gsap.set(title, {
      opacity: 0,
      x: titleStartX,
    });

    gsap.to(title, {
      opacity: 1,
      x: 0,
      duration: animDuration,
      ease: "power2.inOut",
      delay: delay2,
    });

    // Subtitle Animations - Responsive
    const subtitleStartX = Math.min(viewportWidth * -0.2, -384); // Max -384px
    gsap.set(subtitle, {
      opacity: 0,
      x: subtitleStartX,
    });

    gsap.to(subtitle, {
      opacity: 1,
      x: 0,
      duration: animDuration,
      ease: "power2.inOut",
      delay: delay3,
    });

    return () => {
      gsap.killTweensOf(logoImage);
      gsap.killTweensOf(title);
      gsap.killTweensOf(subtitle);
    };
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div className="flex items-end justify-center w-full h-[200px]">
        <div
          ref={logoImageRef}
          className="overflow-hidden flex items-center justify-center h-full relative"
        >
          <Image
            src="/fenrio-logo.png"
            alt="Fenrio Logo"
            className="object-cover w-auto h-full"
            width={1920}
            height={1080}
          />
        </div>
        <div className="relative z-10">
          <h2 ref={titleRef} className="text-9xl font-bold relative z-10">
            fenrio
          </h2>
          <p
            ref={subtitleRef}
            className="font-light relative z-10 uppercase text-red-800"
          >
            Software Marketing
          </p>
        </div>
      </div>
    </div>
  );
}
