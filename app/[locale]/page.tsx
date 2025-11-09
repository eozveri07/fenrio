"use client";

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <h1>{t("HomePage.title")}</h1>
      </main>
    </div>
  );
}
