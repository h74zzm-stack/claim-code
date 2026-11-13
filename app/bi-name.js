"use client";

import { useLang } from "./lang-provider";

// يعرض اسم التشخيص بالعربي والإنجليزي معاً، واللغة الحالية للواجهة أولاً
export default function BiName({ ar, en }) {
  const { lang } = useLang();
  const [first, second] = lang === "ar" ? [ar, en] : [en, ar];
  return (
    <>
      <span>{first}</span>
      <span className="mt-0.5 block text-sm text-brand-900/60">{second}</span>
    </>
  );
}
