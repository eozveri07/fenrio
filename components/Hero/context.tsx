"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface HeroContextType {
  backgroundImageLoaded: boolean;
  logoImageLoaded: boolean;
  animationCompleted: boolean;
  setBackgroundImageLoaded: (loaded: boolean) => void;
  setLogoImageLoaded: (loaded: boolean) => void;
  setAnimationCompleted: (completed: boolean) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({ children }: { children: ReactNode }) {
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(false);
  const [logoImageLoaded, setLogoImageLoaded] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);

  return (
    <HeroContext.Provider
      value={{
        backgroundImageLoaded,
        logoImageLoaded,
        animationCompleted,
        setBackgroundImageLoaded,
        setLogoImageLoaded,
        setAnimationCompleted,
      }}
    >
      {children}
    </HeroContext.Provider>
  );
}

export function useHeroContext() {
  const context = useContext(HeroContext);
  if (context === undefined) {
    throw new Error("useHeroContext must be used within a HeroProvider");
  }
  return context;
}

