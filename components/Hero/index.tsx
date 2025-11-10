"use client";

import AnimatedLogo from "./animated-logo";
import Image from "next/image";
import ScrollDown from "./scroll-down";
import { HeroProvider, useHeroContext } from "./context";
import { useEffect } from "react";
import HeroMain from "./main";

function HeroContent() {
  const { setBackgroundImageLoaded, allAnimationsCompleted } = useHeroContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
    }

    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    scrollToTop();

    requestAnimationFrame(() => {
      scrollToTop();
    });

    if (document.readyState === "complete") {
      scrollToTop();
    } else {
      window.addEventListener("load", scrollToTop);
      return () => window.removeEventListener("load", scrollToTop);
    }
  }, []);

  useEffect(() => {
    if (!allAnimationsCompleted) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }

    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };
  }, [allAnimationsCompleted]);

  return (
    <section
      id="hero"
      className={`w-full h-screen flex items-center justify-center overflow-hidden relative transition-opacity duration-300 bg-black`}
    >
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src="/assets/hero/background.webp"
          alt="Background"
          width={1920}
          height={1080}
          quality={75}
          className="w-full h-full object-cover"
          onLoad={() => setBackgroundImageLoaded(true)}
          priority
        />
        <div className="absolute inset-0 pointer-events-none bg-black/80" />
      </div>
      <AnimatedLogo />
      <HeroMain />
      <ScrollDown />
    </section>
  );
}

export default function Hero({
  headerRef,
}: {
  headerRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <HeroProvider headerRef={headerRef}>
      <HeroContent />
    </HeroProvider>
  );
}
