"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const logoImageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Animasyon fonksiyonu
  const startAnimation = () => {
    const container = containerRef.current;
    const textContainer = textContainerRef.current;
    const logoImage = logoImageRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!container || !textContainer || !logoImage || !title || !subtitle)
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

    return () => {
      gsap.killTweensOf(container);
      gsap.killTweensOf(textContainer);
      gsap.killTweensOf(title);
      gsap.killTweensOf(subtitle);
    };
  };

  // Görsel yüklendikten sonra animasyonu başlat
  useEffect(() => {
    if (imageLoaded) {
      const cleanup = startAnimation();
      return cleanup;
    }
  }, [imageLoaded]);

  // Görsel yükleme handler'ı
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden">
      <div
        ref={containerRef}
        className="flex items-end justify-center w-full h-[90vh]"
      >
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
            className="text-9xl font-bold relative z-10 opacity-0"
          >
            fenrio
          </h2>
          <p
            ref={subtitleRef}
            className="font-light relative z-10 uppercase text-red-800 x-[-100%] opacity-0"
          >
            Software Marketing
          </p>
        </div>
      </div>
    </div>
  );
}
