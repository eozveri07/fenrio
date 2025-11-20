"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    
    if (nextLocale === locale) return;

    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <select
        defaultValue={locale}
        onChange={handleChange}
        disabled={isPending}
        className="appearance-none bg-transparent border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-8 cursor-pointer"
      >
        <option value="tr">TR</option>
        <option value="en">EN</option>
      </select>
      {/* Opsiyonel: Ok ikonu */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
      </div>
    </label>
  );
}

