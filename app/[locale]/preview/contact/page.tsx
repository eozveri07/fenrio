import PreviewContact from "@/components/Contact";

export default function Contact() {
  return (
    <div className="grid grid-cols-1">
      <div className="w-full h-screen bg-red-500" />
      <PreviewContact />
      <div className="w-full h-screen bg-blue-500" />
    </div>
  );
}
