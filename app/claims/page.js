"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { CLAIMS, STATUS } from "./data";
import { useLang } from "../lang-provider";
import { loadLocalClaims } from "./store";

const INITIAL = CLAIMS;

const TABS = [
  { key: "all" },
  { key: "approved" },
  { key: "rejected" },
  { key: "review" },
];

// توحيد النص العربي للبحث: إزالة التشكيل وتوحيد الألف والياء والتاء المربوطة
const normalize = (s) =>
  s.toLowerCase().replace(/[\u064B-\u0652\u0640]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");

// تحويل الأرقام الهندية (٠-٩) إلى إنجليزية حتى يعمل البحث بالهوية بأي لوحة مفاتيح
const toEnDigits = (s) => s.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d));

export default function Claims() {
  const { t, pick, lang } = useLang();
  const [claims, setClaims] = useState(INITIAL);

  // المطالبات الجديدة المحفوظة في المتصفح تظهر أولاً
  useEffect(() => {
    const local = loadLocalClaims();
    if (local.length) setClaims([...local, ...INITIAL]);
  }, []);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [exporting, setExporting] = useState(false);

  const q = normalize(toEnDigits(query.trim()));
  const searched = q
    ? claims.filter(
        (c) => normalize(c.patient.ar).includes(q) || normalize(c.patient.en).includes(q) || c.nid.includes(q)
      )
    : claims;
  const count = (k) => (k === "all" ? searched.length : searched.filter((c) => c.status === k).length);
  const shown = tab === "all" ? searched : searched.filter((c) => c.status === tab);
  const tabLabel = (k) => (k === "all" ? t("tabAll") : pick(STATUS[k].label));

  function resubmit(c) {
    setClaims((list) => list.map((x) => (x.id === c.id ? { ...x, status: "review", reason: undefined } : x)));
    setNotice(t("resubmitted", { id: c.id }));
  }

  async function exportExcel() {
    setExporting(true);
    try {
      const mod = await import("exceljs");
      const ExcelJS = mod.default ?? mod;
      const wb = new ExcelJS.Workbook();
      const ws = wb.addWorksheet(t("claimsSheet"), { views: [{ rightToLeft: lang === "ar" }] });
      ws.columns = [
        { header: t("colClaimNo"), key: "id", width: 14 },
        { header: t("patientName"), key: "patient", width: 22 },
        { header: t("nid"), key: "nid", width: 14, style: { numFmt: "@" } },
        { header: t("diagnosis"), key: "diagnosis", width: 34 },
        { header: t("icd"), key: "icd", width: 12 },
        { header: t("colAmount"), key: "amount", width: 14 },
        { header: t("colDate"), key: "date", width: 13 },
        { header: t("colStatus"), key: "status", width: 16 },
        { header: t("colReason"), key: "reason", width: 55 },
      ];
      shown.forEach((c) =>
        ws.addRow({
          id: c.id,
          patient: pick(c.patient),
          nid: c.nid,
          diagnosis: pick(c.diagnosis),
          icd: c.icd,
          amount: c.amount,
          date: c.date,
          status: pick(STATUS[c.status].label),
          reason: c.reason ? pick(c.reason) : "",
        })
      );
      const head = ws.getRow(1);
      head.font = { bold: true, color: { argb: "FFFFFFFF" } };
      head.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1565D8" } };
      head.alignment = { horizontal: "center" };

      const buf = await wb.xlsx.writeBuffer();
      const blob = new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `claims-${new Date().toISOString().slice(0, 10)}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
      setNotice(t("exportedN", { n: shown.length }));
    } catch (err) {
      setNotice(t("exportFail"));
    } finally {
      setExporting(false);
    }
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-4xl px-6 pb-10 pt-4">
      <Link href="/" className="text-sm text-brand-600 hover:underline">{t("home")}</Link>
      <h1 className="mt-4 text-3xl font-bold">{t("claimsDash")}</h1>
      <p className="mt-2 text-brand-900/70">{t("claimsSub")}</p>
      <div className="mt-5 flex flex-wrap gap-3">
        <Link
          href="/claims/new"
          className="rounded-xl bg-brand-600 px-6 py-4 text-lg font-medium text-white transition hover:bg-brand-700"
        >
          {t("newClaim")}
        </Link>
        <Link
          href="/doctor/convert"
          className="rounded-xl border border-brand-100 bg-brand-50 px-6 py-4 text-lg font-medium text-brand-700 transition hover:bg-brand-100"
        >
          {t("convertReport")}
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-3">
        <div className="min-w-[14rem] flex-1">
          <label htmlFor="search" className="mb-2 block text-sm font-medium">{t("searchLabel")}</label>
          <input
            id="search"
            type="search"
            dir="auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("searchPh")}
            className="w-full rounded-xl border border-brand-100 bg-white px-4 py-3 placeholder:text-brand-900/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <button
          onClick={exportExcel}
          disabled={shown.length === 0 || exporting}
          className="rounded-xl bg-brand-600 px-5 py-3 font-medium text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {exporting ? t("exporting") : t("export")}
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2" role="tablist">
        {TABS.map((x) => (
          <button
            key={x.key}
            role="tab"
            aria-selected={tab === x.key}
            onClick={() => setTab(x.key)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === x.key ? "bg-brand-600 text-white" : "bg-brand-50 text-brand-700 hover:bg-brand-100"
            }`}
          >
            {tabLabel(x.key)} ({count(x.key)})
          </button>
        ))}
      </div>

      {notice && (
        <p role="status" className="mt-5 rounded-xl border border-brand-100 bg-brand-50 p-3 text-sm text-brand-700">
          {notice}
        </p>
      )}

      <ul className="mt-6 space-y-3">
        {shown.map((c) => {
          const s = STATUS[c.status];
          return (
            <li key={c.id} className="rounded-xl border border-brand-100 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-bold">{pick(c.patient)}</p>
                  <p className="mt-1 text-brand-900/80">
                    {pick(c.diagnosis)} {c.icd && <span className="text-brand-900/50" dir="ltr">({c.icd})</span>}
                  </p>
                  <p className="mt-1 text-sm text-brand-900/60">
                    <span dir="ltr">{c.id}</span> · {t("idShort")} <span dir="ltr">{c.nid}</span> · {c.date} {c.amount > 0 ? ` · ${c.amount.toLocaleString("en-US")} ${t("sar")}` : ""}
                  </p>
                  <Link href={`/claims/${c.id}`} className="mt-2 inline-block text-sm font-medium text-brand-600 hover:underline">
                    {t("viewDetails")}
                  </Link>
                </div>
                <span className={`rounded-full px-3 py-1 text-sm font-medium ring-1 ${s.cls}`}>{pick(s.label)}</span>
              </div>

              {c.status === "rejected" && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg bg-red-50 p-3">
                  <p className="text-sm text-red-800">
                    <span className="font-medium">{t("rejectReason")}</span> {pick(c.reason)}
                  </p>
                  <button
                    onClick={() => resubmit(c)}
                    className="rounded-lg bg-brand-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-700"
                  >
                    {t("resubmit")}
                  </button>
                </div>
              )}
            </li>
          );
        })}
        {shown.length === 0 && (
          <li className="rounded-xl border border-brand-100 bg-brand-50 p-6 text-center text-brand-900/70">
            {t("emptyClaims")}
          </li>
        )}
      </ul>

      <p className="mt-6 text-sm text-brand-900/60">{t("demo")}</p>
    </main>
  );
}
