"use client";

export default function Header({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div className="fixed top-0 left-0 w-full z-200 flex items-start justify-between p-9">
      <div id="logo" ref={ref} />
    </div>
  );
}
