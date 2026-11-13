"use client";

import Link from "next/link";
import { useLang } from "./lang-provider";

export default function TopBar() {
  const { t, toggle } = useLang();
  return (
    <header className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6 print:hidden">
      <Link href="/" className="text-lg font-bold text-brand-700">{t("brand")}</Link>
      <button
        onClick={toggle}
        aria-label={t("langAria")}
        className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 transition hover:bg-brand-100"
      >
        {t("langBtn")}
      </button>
    </header>
  );
}
