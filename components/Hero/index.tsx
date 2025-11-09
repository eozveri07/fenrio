"use client";

import AnimatedLogo from "./animated-logo";
import Image from "next/image";
import ScrollDown from "./scroll-down";
import { HeroProvider, useHeroContext } from "./context";

function HeroContent() {
  const { setBackgroundImageLoaded } = useHeroContext();

  return (
    <div
      className={`w-full h-screen flex items-center justify-center overflow-hidden relative transition-opacity duration-300 bg-black`}
    >
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src="/assets/hero/background.webp"
          alt="Background"
          width={1920}
          height={1080}
          quality={100}
          className="w-full h-full object-cover"
          onLoad={() => setBackgroundImageLoaded(true)}
          priority
        />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_0%,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>
      <AnimatedLogo />
      <ScrollDown />
    </div>
  );
}

export default function Hero() {
  return (
    <HeroProvider>
      <HeroContent />
    </HeroProvider>
  );
}
