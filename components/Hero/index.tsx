import AnimatedLogo from "./animated-logo";
import Image from "next/image";
import ScrollDown from "./scroll-down";

export default function Hero() {
  return (
    <div className="w-full h-screen flex items-center justify-center overflow-hidden relative">
      <div className="w-full h-full absolute top-0 left-0">
        <Image
          src="/assets/hero/background.webp"
          alt="Logo"
          width={1920}
          height={1080}
          quality={100}
          className="w-full h-full object-cover"
        />
        {/* Vignette efekti - kenarlardan siyah, içe doğru transparan */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,transparent_0%,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>
      <AnimatedLogo />
      <ScrollDown />
    </div>
  );
}
