"use client";

import { gsap } from "gsap";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="w-full h-auto  grid grid-cols-2 py-6">
      <div className="w-full h-full flex items-end">
        <Image
          src="/assets/contact/sol-el.png"
          alt="Contact"
          className="object-cover w-full h-auto"
          quality={100}
          width={1920}
          height={1080}
        />
      </div>
      <div className="w-full h-full flex items-start">
        <Image
          src="/assets/contact/sag-robot-el.png"
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
