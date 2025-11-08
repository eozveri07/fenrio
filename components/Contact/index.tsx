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
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;
    const title = titleRef.current;
    if (!leftImage || !rightImage || !title) return;

    gsap.set(leftImage, { x: "-100%" });
    gsap.set(rightImage, { x: "100%" });
    gsap.set(title, { opacity: 0, y: 100 });

    gsap.to(title, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: title,
        start: "center bottom",
        end: "bottom top",
        scrub: 1,
      },
    });

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
    <div className="w-full h-auto py-6">
      <div ref={titleRef} className="text-center text-5xl font-extrabold">
        <span>
          Geleceğe Açılan <br />
          Dijital Dokunuş
        </span>
      </div>
      <div
        ref={containerRef}
        className="w-full h-auto grid grid-cols-2 overflow-hidden"
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
    </div>
  );
}
