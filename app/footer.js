"use client";

import { useLang } from "./lang-provider";

// التذييل يعرض مفتاح codingNotice من i18n.js. عند اعتماد الأكواد فعلياً وربط نفيس
// غيّر النص هناك فقط (في اللغتين) وسيتحدث في كل الصفحات.
export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="border-t border-brand-100 bg-brand-50/60 px-6 py-4 print:hidden">
      <div className="mx-auto flex max-w-4xl items-start gap-3 text-sm leading-6 text-brand-900/70">
        <svg
          className="mt-0.5 h-5 w-5 shrink-0 text-brand-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M12 11v5" />
          <path d="M12 8h.01" />
        </svg>
        <p>{t("codingNotice")}</p>
      </div>
    </footer>
  );
}
