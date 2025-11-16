"use client";

import { useEffect, useRef } from "react";
import { useHeroContext } from "./context";
import { gsap } from "gsap";
import { Highlighter } from "../ui/highlighter";
import { AnimatedShinyText } from "../ui/animated-shiny-text";
import { cn } from "@/lib/utils";

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
      id="hero"
      ref={containerRef}
      className="w-full h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden absolute top-[120px] left-0 transition-opacity duration-300 opacity-0 transform-y-100 dark"
    >
      <div className="w-full h-full items-center justify-center overflow-hidden grid grid-cols-1 gap-4">
        <div className="w-full h-full flex p-9 flex-col gap-4 items-center justify-center">
          <h1 className="text-white/80 text-3xl font-thin uppercase">
            Yazılım & Pazarlama
          </h1>
          <p className="text-white text-6xl font-semibold">
            İşletmenizin {""}
            <Highlighter action="highlight" color="#D63E3D">
              kurumsal kimliğini
            </Highlighter>{" "}
            güçlendiriyoruz.
          </p>
          <div
            className={cn(
              "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            )}
          >
            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>İnovate, Elovate, Dominate</span>
            </AnimatedShinyText>
          </div>
        </div>
      </div>
    </section>
  );
}
