"use client";

import PuzzlePieceGenerator from "@/components/Puzzle/generator";

export default function Puzzle() {
  return (
    <div className="grid grid-cols-1 gap-8 p-8">
      <div className="space-y-4">
        <PuzzlePieceGenerator />
      </div>
    </div>
  );
}
