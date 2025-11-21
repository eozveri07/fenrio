"use client";
import { useEffect, useState } from "react";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { cn } from "@/lib/utils";

export default function Header({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "mx-auto fixed top-0 left-0 w-full z-200 flex border-b border-gray-400/0 items-start justify-between px-9 py-6 transition-all duration-300",
        isScrolled && "backdrop-blur-md bg-black/20 border-gray-400/50"
      )}
    >
      <div id="logo" ref={ref} />
      <LanguageSwitcher />
    </div>
  );
}
