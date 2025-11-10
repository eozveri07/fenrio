"use client";

import PreviewPuzzle from "@/components/Puzzle";
import { useState } from "react";

export default function Puzzle() {
  const [completed, setCompleted] = useState(false);

  // Örnek 1: Görseller array olarak
  const imagePieces = [
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
    "/assets/hero/background.webp",
  ];

  // Örnek 2: Div'ler array olarak
  const divPieces = Array.from({ length: 9 }).map((_, index) => (
    <div
      key={index}
      className="w-full h-full flex items-center justify-center text-4xl font-bold"
      style={{
        backgroundColor: `hsl(${(index * 40) % 360}, 70%, 60%)`,
        color: "white",
      }}
    >
      {index + 1}
    </div>
  ));

  return (
    <div className="grid grid-cols-1 gap-8 p-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Görseller ile Puzzle</h2>
        <PreviewPuzzle
          pieces={imagePieces}
          rows={3}
          cols={3}
          onComplete={() => {
            setCompleted(true);
            alert("Puzzle tamamlandı! 🎉");
          }}
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Div'ler ile Puzzle</h2>
        <PreviewPuzzle
          pieces={divPieces}
          rows={3}
          cols={3}
          onComplete={() => {
            alert("İkinci puzzle tamamlandı! 🎉");
          }}
        />
      </div>

      {completed && (
        <div className="p-4 bg-green-100 text-green-800 rounded-lg">
          İlk puzzle tamamlandı!
        </div>
      )}

      <div className="h-screen w-full bg-slate-100" />
    </div>
  );
}
