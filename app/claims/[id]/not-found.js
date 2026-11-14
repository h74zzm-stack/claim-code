"use client";

import Link from "next/link";
import { useLang } from "../../lang-provider";

export default function NotFound() {
  const { t } = useLang();
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 pb-16 text-center">
      <h1 className="text-2xl font-bold">{t("nfTitle")}</h1>
      <p className="mt-2 text-brand-900/70">{t("nfText")}</p>
      <Link href="/claims" className="mt-6 rounded-xl bg-brand-600 px-5 py-3 font-medium text-white hover:bg-brand-700">
        {t("claimsDash")}
      </Link>
    </main>
  );
}
