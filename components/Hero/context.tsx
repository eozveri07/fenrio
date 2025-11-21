"use client";

import {
  createContext,
  useContext,
  useState,
  useRef,
  useMemo,
  ReactNode,
} from "react";

interface HeroContextType {
  // Refs
  headerRef: React.RefObject<HTMLDivElement | null>;
  // Image loading states
  backgroundImageLoaded: boolean;
  logoImageLoaded: boolean;
  // Animation completion states
  logoAnimationCompleted: boolean;
  flipAnimationCompleted: boolean;
  allAnimationsCompleted: boolean;
  // Setters
  setBackgroundImageLoaded: (loaded: boolean) => void;
  setLogoImageLoaded: (loaded: boolean) => void;
  setLogoAnimationCompleted: (completed: boolean) => void;
  setFlipAnimationCompleted: (completed: boolean) => void;
}

const HeroContext = createContext<HeroContextType | undefined>(undefined);

export function HeroProvider({
  children,
  headerRef: externalHeaderRef,
}: {
  children: ReactNode;
  headerRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const internalHeaderRef = useRef<HTMLDivElement | null>(null);
  const headerRef = externalHeaderRef || internalHeaderRef;
  const [backgroundImageLoaded, setBackgroundImageLoaded] = useState(true);
  const [logoImageLoaded, setLogoImageLoaded] = useState(false);
  const [logoAnimationCompleted, setLogoAnimationCompleted] = useState(false);
  const [flipAnimationCompleted, setFlipAnimationCompleted] = useState(false);

  // Tüm animasyonlar tamamlandığında true olur
  const allAnimationsCompleted = useMemo(
    () => logoAnimationCompleted && flipAnimationCompleted,
    [logoAnimationCompleted, flipAnimationCompleted]
  );

  return (
    <HeroContext.Provider
      value={{
        headerRef,
        backgroundImageLoaded,
        logoImageLoaded,
        logoAnimationCompleted,
        flipAnimationCompleted,
        allAnimationsCompleted,
        setBackgroundImageLoaded,
        setLogoImageLoaded,
        setLogoAnimationCompleted,
        setFlipAnimationCompleted,
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

