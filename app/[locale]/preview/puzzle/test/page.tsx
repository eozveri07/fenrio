"use client";

import PreviewPuzzle from "@/components/Puzzle/test";

export default function Puzzle() {
  return (
    <div className="grid grid-cols-1 gap-8 p-8">
      <div className="space-y-4">
        <PreviewPuzzle />
      </div>
    </div>
  );
}
