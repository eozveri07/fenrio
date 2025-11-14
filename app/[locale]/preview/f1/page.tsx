"use client";

import F1 from "@/components/F1";

export default function F1Page() {
  return (
    <div className="w-full relative">
      {/* Üst boşluk - scroll için */}
      <div className="h-screen"></div>

      {/* F1 Komponenti - pinlenecek (3 ekran boyu scroll için) */}
      <div className="w-full border-2 border-red-500">
        <F1 />
      </div>

      {/* Alt boşluk - scroll için (3 ekran boyu pinleme için yeterli alan) */}
      <div className="h-screen"></div>
    </div>
  );
}
