"use client";

import Link from "next/link";
import { useLang } from "../lang-provider";

// بيانات تجريبية: نوفمبر 2026 (من 1 إلى 12). الجمعة والسبت (6 و7) بدون مطالبات.
const DAYS = [
  { d: 1, accepted: 7, rejected: 2, recovered: 48000 },
  { d: 2, accepted: 9, rejected: 1, recovered: 63000 },
  { d: 3, accepted: 8, rejected: 3, recovered: 55000 },
  { d: 4, accepted: 10, rejected: 2, recovered: 71000 },
  { d: 5, accepted: 6, rejected: 1, recovered: 39000 },
  { d: 6, accepted: 0, rejected: 0, recovered: 0 },
  { d: 7, accepted: 0, rejected: 0, recovered: 0 },
  { d: 8, accepted: 11, rejected: 3, recovered: 82000 },
  { d: 9, accepted: 9, rejected: 2, recovered: 67000 },
  { d: 10, accepted: 12, rejected: 2, recovered: 94000 },
  { d: 11, accepted: 8, rejected: 1, recovered: 58000 },
  { d: 12, accepted: 10, rejected: 2, recovered: 76000 },
];

const sum = (k) => DAYS.reduce((s, x) => s + x[k], 0);
const fmt = (n) => n.toLocaleString("en-US");

function Stat({ label, value, unit, tone }) {
  return (
    <div className={`rounded-2xl border p-6 ${tone}`}>
      <p className="text-sm font-medium opacity-80">{label}</p>
      <p className="mt-3 text-5xl font-bold tabular-nums">{value}</p>
      {unit && <p className="mt-1 text-sm opacity-70">{unit}</p>}
    </div>
  );
}

export default function Dashboard() {
  const { t } = useLang();
  const accepted = sum("accepted");
  const rejected = sum("rejected");
  const recovered = sum("recovered");
  const rate = Math.round((accepted / (accepted + rejected)) * 100);
  const max = Math.max(...DAYS.map((x) => x.recovered));

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-4xl px-6 pb-10 pt-4">
      <Link href="/" className="text-sm text-brand-600 hover:underline">{t("home")}</Link>
      <h1 className="mt-4 text-3xl font-bold">{t("dbTitle")}</h1>
      <p className="mt-2 text-brand-900/70">{t("dbSub")}</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat label={t("dbAccepted")} value={fmt(accepted)} unit={t("claimsUnit")} tone="border-emerald-200 bg-emerald-50 text-emerald-800" />
        <Stat label={t("dbRejected")} value={fmt(rejected)} unit={t("claimsUnit")} tone="border-red-200 bg-red-50 text-red-800" />
        <Stat label={t("dbRecovered")} value={fmt(recovered)} unit={t("sarMonth")} tone="border-brand-100 bg-brand-50 text-brand-700" />
      </section>

      <section className="mt-6 rounded-2xl border border-brand-100 p-6">
        <div className="flex items-baseline justify-between">
          <h2 className="font-bold">{t("rateTitle")}</h2>
          <p className="text-2xl font-bold tabular-nums text-brand-700">{rate}%</p>
        </div>
        <div className="mt-3 flex h-3 overflow-hidden rounded-full bg-red-100" role="img" aria-label={t("rateAria", { n: rate })}>
          <div className="bg-emerald-500" style={{ width: `${rate}%` }} />
        </div>
        <p className="mt-2 text-sm text-brand-900/60">{t("rateNote")}</p>
      </section>

      <section className="mt-6 rounded-2xl border border-brand-100 p-6">
        <h2 className="font-bold">{t("chartTitle")}</h2>
        <div className="mt-6 flex h-48 items-end gap-2" role="img" aria-label={t("chartAria")}>
          {DAYS.map((x) => (
            <div key={x.d} className="flex h-full flex-1 flex-col justify-end" title={t("dayTip", { d: x.d, n: fmt(x.recovered) })}>
              <div className="rounded-t-md bg-brand-600" style={{ height: `${(x.recovered / max) * 100}%`, minHeight: x.recovered ? 4 : 0 }} />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          {DAYS.map((x) => (
            <span key={x.d} className="flex-1 text-center text-xs tabular-nums text-brand-900/60">{x.d}</span>
          ))}
        </div>
        <p className="mt-4 text-sm text-brand-900/60">{t("topDay", { n: fmt(max) })}</p>
      </section>

      <p className="mt-6 text-sm text-brand-900/60">{t("demo")}</p>
    </main>
  );
}
