"use client";

import { useState } from "react";
import { useLang } from "../../lang-provider";

export default function Actions({ codes }) {
  const { t } = useLang();
  const [msg, setMsg] = useState("");

  async function copy() {
    const text = codes
      .map((c) => `${c.name} / ${c.nameEn} | ICD-10: ${c.icd} | CPT: ${c.cpt}`)
      .join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setMsg(t("copied"));
    } catch {
      setMsg(t("copyFail"));
    }
    setTimeout(() => setMsg(""), 2500);
  }

  return (
    <div className="print:hidden">
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => window.print()}
          className="rounded-xl bg-brand-600 px-5 py-3 font-medium text-white transition hover:bg-brand-700"
        >
          {t("print")}
        </button>
        <button
          onClick={copy}
          disabled={codes.length === 0}
          className="rounded-xl border border-brand-100 bg-brand-50 px-5 py-3 font-medium text-brand-700 transition hover:bg-brand-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {t("copy")}
        </button>
      </div>
      {msg && <p role="status" className="mt-3 text-sm text-brand-700">{msg}</p>}
    </div>
  );
}
