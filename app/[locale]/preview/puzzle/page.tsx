"use client";

import PreviewPuzzle from "@/components/Puzzle";

export default function Puzzle() {
  return (
    <div className="grid grid-cols-1">
      <div className="h-screen w-full bg-slate-100" />
      <PreviewPuzzle />
      <div className="h-screen w-full bg-slate-500" />
    </div>
  );
}
