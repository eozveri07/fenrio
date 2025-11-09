import PreviewPuzzle from "@/components/Puzzle";

export default function Puzzle() {
  return (
    <div className="grid grid-cols-1">
      <PreviewPuzzle />
      <div className="h-screen w-full bg-slate-100" />
    </div>
  );
}
