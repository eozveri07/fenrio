import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function ScrollDown() {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 opacity-50">
      <div className="h-6 w-4 flex items-center justify-center border border-white rounded-full p-1">
        <div className="h-2 w-[2px] bg-white rounded-full animate-bounce" />
      </div>
      <span className={`text-white text-xl font-thin ${inter.className}`}>
        Aşağı Kaydırın
      </span>
    </div>
  );
}
