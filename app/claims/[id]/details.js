"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { STATUS } from "../data";
import { useLang } from "../../lang-provider";
import BiName from "../../bi-name";
import Actions from "./actions";
import { loadLocalClaims } from "../store";

const DASH = "—";

function Field({ label, children, ltr }) {
  return (
    <div>
      <dt className="text-sm text-brand-900/60">{label}</dt>
      <dd className="mt-1 font-medium">{ltr ? <bdi dir="ltr">{children}</bdi> : children}</dd>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mt-6 rounded-2xl border border-brand-100 p-6 print:break-inside-avoid">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default function Details({ claim: initial, id }) {
  const { t, pick } = useLang();
  const [c, setC] = useState(initial);
  const [checked, setChecked] = useState(Boolean(initial));

  useEffect(() => {
    if (!initial) {
      setC(loadLocalClaims().find((x) => x.id === id) ?? null);
      setChecked(true);
    }
  }, [initial, id]);

  if (!checked) return <main className="min-h-[calc(100vh-4rem)]" />;
  if (!c) {
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

  const s = STATUS[c.status];

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-6 pb-10 pt-4">
      <Link href="/claims" className="text-sm text-brand-600 hover:underline print:hidden">{t("backClaims")}</Link>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-bold">
          {t("claimWord")} <bdi dir="ltr">{c.id}</bdi>
        </h1>
        <span className={`rounded-full px-4 py-1.5 font-medium ring-1 ${s.cls}`}>{pick(s.label)}</span>
      </div>
      <p className="mt-2 text-brand-900/70">{t("brand")} | {t("claimDate")} {c.date}</p>

      <div className="mt-5">
        <Actions codes={c.codes} />
      </div>

      <Section title={t("secStatus")}>
        <p>
          {t("curStatus")} <span className="font-bold">{pick(s.label)}</span>
        </p>
        {c.status === "rejected" && (
          <p className="mt-3 rounded-lg bg-red-50 p-3 text-red-800">
            <span className="font-medium">{t("rejectReason")}</span> {pick(c.reason)}
          </p>
        )}
      </Section>

      <Section title={t("secPatient")}>
        <dl className="grid gap-5 sm:grid-cols-3">
          <Field label={t("patientName")}>{pick(c.patient)}</Field>
          <Field label={t("nid")} ltr>{c.nid}</Field>
          <Field label={t("age")}>{c.age ? `${c.age} ${t("years")}` : DASH}</Field>
          <Field label={t("gender")}>{pick(c.gender) ?? DASH}</Field>
          <Field label={t("phone")} ltr>{c.phone ?? DASH}</Field>
          <Field label={t("doctor")}>{pick(c.doctor) ?? DASH}</Field>
          <Field label={t("insurer")}>{pick(c.insurer) ?? DASH}</Field>
          <Field label={t("policy")} ltr>{c.policy ?? DASH}</Field>
        </dl>
      </Section>

      {c.report && (
        <Section title={t("secReport")}>
          <p className="whitespace-pre-line rounded-xl bg-brand-50 p-4 leading-8">{pick(c.report)}</p>
        </Section>
      )}

      {c.files?.length > 0 && (
        <Section title={t("secFiles")}>
          <ul className="space-y-2">
            {c.files.map((f) => (
              <li key={f.label} className="rounded-xl bg-brand-50 p-3">
                <span className="font-medium">{t(f.label)}:</span> <bdi dir="ltr">{f.name}</bdi>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <Section title={t("secCodes")}>
        {c.codes.length === 0 ? (
          <p className="text-brand-900/70">{t("noCodes")}</p>
        ) : (
        <div className="overflow-x-auto rounded-xl border border-brand-100">
          <table className="w-full min-w-[32rem]">
            <thead className="bg-brand-50 text-brand-700">
              <tr>
                <th className="px-4 py-3 text-start font-medium">{t("diagnosis")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("icd")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("cpt")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("price")}</th>
              </tr>
            </thead>
            <tbody>
              {c.codes.map((x) => (
                <tr key={x.icd} className="border-t border-brand-100">
                  <td className="px-4 py-3"><BiName ar={x.name} en={x.nameEn} /></td>
                  <td className="px-4 py-3 font-medium tabular-nums"><bdi dir="ltr">{x.icd}</bdi></td>
                  <td className="px-4 py-3 font-medium tabular-nums"><bdi dir="ltr">{x.cpt}</bdi></td>
                  <td className="px-4 py-3 tabular-nums">{x.price.toLocaleString("en-US")} {t("sar")}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-brand-100 bg-brand-50/60 font-bold">
                <td className="px-4 py-3" colSpan={3}>{t("claimTotal")}</td>
                <td className="px-4 py-3 tabular-nums">{c.amount.toLocaleString("en-US")} {t("sar")}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        )}
      </Section>

      <p className="mt-6 text-sm text-brand-900/60 print:hidden">{t("demo")}</p>
    </main>
  );
}
