"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex items-end justify-center w-full h-[200px]">
        <div className="overflow-hidden flex items-center justify-center h-full">
          <Image
            src="/fenrio-logo.png"
            alt="Fenrio Logo"
            className="object-cover w-auto h-full"
            width={1920}
            height={1080}
          />
        </div>
        <div>
          <h2 className="text-9xl font-bold relative z-10">fenrio</h2>
          <p className="font-light relative z-10 uppercase text-red-800">
            Software Marketing
          </p>
        </div>
      </div>
    </div>
  );
}
