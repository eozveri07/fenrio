"use client";

import PreviewHero from "@/components/Hero";
import Header from "@/components/Header";
import { useRef } from "react";
export default function Hero() {
  const headerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <Header ref={headerRef as React.RefObject<HTMLDivElement>} />
      <div className="grid grid-cols-1">
        <PreviewHero headerRef={headerRef} />
        <div className="h-screen w-full bg-slate-100" />
      </div>
    </div>
  );
}
