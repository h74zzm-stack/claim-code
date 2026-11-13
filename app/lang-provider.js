"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { DICT } from "./i18n";

const Ctx = createContext(null);

export function LangProvider({ initial, children }) {
  const [lang, setLang] = useState(initial);

  const toggle = useCallback(() => {
    const next = lang === "ar" ? "en" : "ar";
    setLang(next);
    document.cookie = `lang=${next}; path=/; max-age=31536000; samesite=lax`;
    document.documentElement.lang = next;
    document.documentElement.dir = next === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const value = useMemo(() => {
    const t = (key, vars) => {
      let s = DICT[lang][key] ?? DICT.ar[key] ?? key;
      if (vars) for (const k in vars) s = s.replaceAll(`{${k}}`, vars[k]);
      return s;
    };
    // يقبل نصاً عادياً أو كائناً {ar, en}
    const pick = (x) => (x && typeof x === "object" ? x[lang] : x);
    return { lang, t, pick, toggle };
  }, [lang, toggle]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
