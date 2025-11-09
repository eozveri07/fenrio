import { Link } from "@/i18n/navigation";

export default function Preview() {
  return (
    <div className="container mx-auto pt-16">
      <h1 className="text-2xl font-bold">Component Önizleme Sayfası</h1>
      <div className="flex gap-4">
        <Link
          href="/preview/contact"
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          Contact
        </Link>
        <Link
          href="/preview/hero"
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          Hero
        </Link>
        <Link
          href="/preview/puzzle"
          className="text-blue-500 hover:text-blue-600 hover:underline"
        >
          Puzzle
        </Link>
      </div>
    </div>
  );
}
