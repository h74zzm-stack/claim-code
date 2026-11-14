"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSession, clearSession } from "../../auth";
import { matchDiagnoses } from "../../doctor-login/data";
import { useLang } from "../../lang-provider";
import BiName from "../../bi-name";

const inputCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-3 text-base placeholder:text-brand-900/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function ConvertReport() {
  const { t } = useLang();
  const router = useRouter();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    if (!getSession()) router.replace("/doctor-login");
    else setReady(true);
  }, [router]);
  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  const [report, setReport] = useState("");
  const [errors, setErrors] = useState({});
  const [rows, setRows] = useState(null);

  function convert() {
    const e = {};
    if (!name.trim()) e.name = "errName";
    if (!/^\d{10}$/.test(nid)) e.nid = "errNid";
    if (!report.trim()) e.report = "errReport";
    setErrors(e);
    if (Object.keys(e).length) return setRows(null);
    setRows(matchDiagnoses(report));
  }

  const total = rows ? rows.reduce((s, r) => s + r.price, 0) : 0;

  if (!ready) return null;

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-6 pb-10 pt-4">
      <div className="flex items-center justify-between">
        <Link href="/claims" className="text-sm text-brand-600 hover:underline">{t("claimsDash")}</Link>
        <button onClick={() => { clearSession(); router.push("/doctor-login"); }} className="text-sm text-brand-600 hover:underline">{t("logout")}</button>
      </div>
      <h1 className="mt-4 text-3xl font-bold">{t("convertReport")}</h1>
      <p className="mt-2 text-brand-900/70">{t("dlSub")}</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block font-medium">{t("patientName")}</label>
          <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder={t("phName")} />
          {errors.name && <p className="mt-1 text-sm text-red-600">{t(errors.name)}</p>}
        </div>
        <div>
          <label htmlFor="nid" className="mb-2 block font-medium">{t("nid")}</label>
          <input id="nid" dir="ltr" className={`${inputCls} text-start`} inputMode="numeric" maxLength={10} value={nid} onChange={(e) => setNid(e.target.value.replace(/\D/g, ""))} placeholder={t("phNid")} />
          {errors.nid && <p className="mt-1 text-sm text-red-600">{t(errors.nid)}</p>}
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="report" className="mb-2 block font-medium">{t("report")}</label>
        <textarea
          id="report"
          rows={10}
          dir="auto"
          className={`${inputCls} resize-y leading-8`}
          value={report}
          onChange={(e) => setReport(e.target.value)}
          placeholder={t("phReport")}
        />
        {errors.report && <p className="mt-1 text-sm text-red-600">{t(errors.report)}</p>}
      </div>

      <button
        onClick={convert}
        className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-4 text-lg font-medium text-white transition hover:bg-brand-700 sm:w-auto"
      >
        {t("convert")}
      </button>

      {rows && rows.length === 0 && (
        <p className="mt-8 rounded-xl border border-brand-100 bg-brand-50 p-4 text-brand-900/80">{t("noMatch")}</p>
      )}

      {rows && rows.length > 0 && (
        <section className="mt-8" aria-live="polite">
          <h2 className="mb-3 text-xl font-bold">{t("resultFor", { name })}</h2>
          <div className="overflow-x-auto rounded-xl border border-brand-100">
            <table className="w-full min-w-[34rem] text-start">
              <thead className="bg-brand-50 text-brand-700">
                <tr>
                  <th className="px-4 py-3 text-start font-medium">{t("diagnosis")}</th>
                  <th className="px-4 py-3 text-start font-medium">{t("icd")}</th>
                  <th className="px-4 py-3 text-start font-medium">{t("cpt")}</th>
                  <th className="px-4 py-3 text-start font-medium">{t("price")}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.icd} className="border-t border-brand-100">
                    <td className="px-4 py-3"><BiName ar={r.name} en={r.nameEn} /></td>
                    <td className="px-4 py-3 font-medium tabular-nums"><bdi dir="ltr">{r.icd}</bdi></td>
                    <td className="px-4 py-3 font-medium tabular-nums"><bdi dir="ltr">{r.cpt}</bdi></td>
                    <td className="px-4 py-3 tabular-nums">{r.price.toLocaleString("en-US")} {t("sar")}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t border-brand-100 bg-brand-50/60 font-bold">
                  <td className="px-4 py-3" colSpan={3}>{t("estTotal")}</td>
                  <td className="px-4 py-3 tabular-nums">{total.toLocaleString("en-US")} {t("sar")}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-3 text-sm text-brand-900/60">{t("demo")}</p>
        </section>
      )}
    </main>
  );
}
