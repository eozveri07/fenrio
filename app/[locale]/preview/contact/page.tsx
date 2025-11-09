import PreviewContact from "@/components/Contact";
import { FaArrowDown } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="grid grid-cols-1">
      <div className="w-full h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-2xl font-bold">
          Aşağı kaydırarak görüntüleyebilirsiniz.
        </h1>
        <FaArrowDown className="w-8 h-8 text-black animate-bounce" />
      </div>
      <PreviewContact />
    </div>
  );
}
