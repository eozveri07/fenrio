"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    if (newLocale !== locale) {
      router.replace(pathname, { locale: newLocale });
    }
  };

  return (
    <select
      className="w-fit text-white rounded-md p-2 border border-gray-300 dark:border-gray-700"
      value={locale}
      onChange={(e) => switchLocale(e.target.value)}
    >
      <option value="en">EN</option>
      <option value="tr">TR</option>
    </select>
  );
}
