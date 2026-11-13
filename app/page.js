"use client";

import Link from "next/link";
import { useLang } from "./lang-provider";

function Mark() {
  return (
    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand-600 text-white" aria-hidden="true">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M12 5v14M5 12h14" />
      </svg>
    </span>
  );
}

export default function Home() {
  const { t } = useLang();
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6 pb-16">
      <div className="w-full max-w-md text-center">
        <div className="mb-6 flex justify-center"><Mark /></div>
        <h1 className="text-4xl font-bold">{t("brand")}</h1>
        <p className="mt-3 text-base text-brand-900/70">{t("homeSub")}</p>

        <div className="mt-10 flex flex-col gap-3">
          <Link
            href="/doctor-login"
            className="rounded-xl bg-brand-600 px-6 py-4 text-lg font-medium text-white transition hover:bg-brand-700"
          >
            {t("doctorLogin")}
          </Link>
          <Link
            href="/claims"
            className="rounded-xl border border-brand-100 bg-brand-50 px-6 py-4 text-lg font-medium text-brand-700 transition hover:bg-brand-100"
          >
            {t("claimsDash")}
          </Link>
        </div>
      </div>
    </main>
  );
}
