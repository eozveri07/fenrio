"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;

    if (!leftImage || !rightImage) return;

    gsap.set(leftImage, { x: "-100%" });
    gsap.set(rightImage, { x: "100%" });

    gsap.to(leftImage, {
      x: "0%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: leftImage,
        start: "top bottom",
        end: "center center",
        scrub: 2,
      },
    });

    gsap.to(rightImage, {
      x: "0%",
      ease: "power2.out",
      scrollTrigger: {
        trigger: rightImage,
        start: "top bottom",
        end: "center center",
        scrub: 2,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-auto grid grid-cols-2 py-6 overflow-hidden"
    >
      <div ref={leftImageRef} className="w-full h-full flex items-end">
        <Image
          src="/assets/contact/sol-el-no-holo.png"
          alt="Contact"
          className="object-cover w-full h-auto"
          quality={100}
          width={1920}
          height={1080}
        />
      </div>
      <div ref={rightImageRef} className="w-full h-full flex items-start">
        <Image
          src="/assets/contact/sag-robot-el-no-holo.png"
          alt="Contact"
          className="object-cover w-full h-auto"
          quality={100}
          width={1920}
          height={1080}
        />
      </div>
    </div>
  );
}
