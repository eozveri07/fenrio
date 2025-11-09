import PreviewHero from "@/components/Hero";

export default function Hero() {
  return (
    <div className="grid grid-cols-1">
      <PreviewHero />
      <div className="h-screen w-full bg-slate-100" />
    </div>
  );
}
