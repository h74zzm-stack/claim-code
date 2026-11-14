"use client";

import { useState } from "react";
import Link from "next/link";
import { nextClaimId, saveLocalClaim } from "../store";
import { useLang } from "../../lang-provider";

const MAX = 10 * 1024 * 1024;
const OK_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const OK_EXT = /\.(pdf|jpe?g|png)$/i;

const SLOTS = [
  { key: "report", label: "docReport", required: true },
  { key: "invoice", label: "docInvoice", required: true },
  { key: "idImage", label: "docId", required: false },
  { key: "extra", label: "docExtra", required: false },
];

const inputCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-4 text-lg placeholder:text-brand-900/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function NewClaim() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [nid, setNid] = useState("");
  const [files, setFiles] = useState({});
  const [fileErr, setFileErr] = useState({});
  const [keys, setKeys] = useState({});
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(null);
  const [saveErr, setSaveErr] = useState(false);

  function size(f) {
    return f.size >= 1048576
      ? `${(f.size / 1048576).toFixed(1)} ${t("mbUnit")}`
      : `${Math.max(1, Math.round(f.size / 1024))} ${t("kbUnit")}`;
  }

  function pickFile(slot, f) {
    if (!f) return;
    const typeOk = OK_TYPES.includes(f.type) || OK_EXT.test(f.name);
    const err = !typeOk ? "errFileType" : f.size > MAX ? "errFileSize" : null;
    setFileErr((e) => ({ ...e, [slot]: err }));
    setFiles((x) => ({ ...x, [slot]: err ? null : f }));
    if (err) setKeys((k) => ({ ...k, [slot]: (k[slot] || 0) + 1 }));
  }

  function removeFile(slot) {
    setFiles((x) => ({ ...x, [slot]: null }));
    setFileErr((e) => ({ ...e, [slot]: null }));
    setKeys((k) => ({ ...k, [slot]: (k[slot] || 0) + 1 }));
  }

  function submit() {
    const e = {};
    if (!name.trim()) e.name = "errName";
    if (!/^\d{10}$/.test(nid)) e.nid = "errNid";
    const fe = { ...fileErr };
    SLOTS.forEach((s) => {
      if (s.required && !files[s.key]) fe[s.key] = fe[s.key] || "errFileRequired";
    });
    setErrors(e);
    setFileErr(fe);
    const bad = Object.keys(e).length || Object.values(fe).some(Boolean);
    if (bad) return;
    const id = nextClaimId();
    const ok = saveLocalClaim({
      id,
      patient: { ar: name.trim(), en: name.trim() },
      nid,
      date: new Date().toISOString().slice(0, 10),
      status: "review",
      diagnosis: { ar: "بانتظار تحديد التشخيص", en: "Diagnosis pending" },
      icd: "",
      amount: 0,
      codes: [],
      files: SLOTS.filter((x) => files[x.key]).map((x) => ({ label: x.label, name: files[x.key].name })),
    });
    setSaveErr(!ok);
    if (ok) setDone(id);
  }

  function reset() {
    setName(""); setNid(""); setFiles({}); setFileErr({}); setErrors({}); setDone(null); setSaveErr(false);
    setKeys((k) => Object.fromEntries(SLOTS.map((s) => [s.key, (k[s.key] || 0) + 1])));
  }

  if (done) {
    return (
      <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-xl flex-col items-center justify-center px-6 pb-16 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
        </span>
        <h1 className="mt-5 text-3xl font-bold">{t("successTitle")}</h1>
        <p className="mt-3 text-lg text-brand-900/80">{t("successText", { id: done })}</p>
        <p className="mt-2 text-sm text-brand-900/60">{t("savedLocal")}</p>
        <div className="mt-8 flex w-full flex-col gap-3">
          <Link href="/claims" className="rounded-xl bg-brand-600 px-6 py-4 text-lg font-medium text-white transition hover:bg-brand-700">
            {t("claimsDash")}
          </Link>
          <button onClick={reset} className="rounded-xl border border-brand-100 bg-brand-50 px-6 py-4 text-lg font-medium text-brand-700 transition hover:bg-brand-100">
            {t("submitAnother")}
          </button>
        </div>
        <p className="mt-6 text-sm text-brand-900/60">{t("demo")}</p>
      </main>
    );
  }

  const hasErrors = Object.keys(errors).length > 0 || Object.values(fileErr).some(Boolean);

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-3xl px-6 pb-10 pt-4">
      <Link href="/claims" className="text-sm text-brand-600 hover:underline">{t("backClaims")}</Link>
      <h1 className="mt-4 text-3xl font-bold">{t("newClaim")}</h1>
      <p className="mt-2 text-brand-900/70">{t("ncSub")}</p>

      <section className="mt-8 rounded-2xl border border-brand-100 p-6">
        <h2 className="mb-4 text-lg font-bold">{t("secPatient")}</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="mb-2 block text-lg font-medium">{t("patientName")}</label>
            <input id="name" className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder={t("phName")} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{t(errors.name)}</p>}
          </div>
          <div>
            <label htmlFor="nid" className="mb-2 block text-lg font-medium">{t("nid")}</label>
            <input id="nid" dir="ltr" className={`${inputCls} text-start`} inputMode="numeric" maxLength={10} value={nid} onChange={(e) => setNid(e.target.value.replace(/\D/g, ""))} placeholder={t("phNid")} />
            {errors.nid && <p className="mt-1 text-sm text-red-600">{t(errors.nid)}</p>}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-brand-100 p-6">
        <h2 className="text-lg font-bold">{t("secDocs")}</h2>
        <p className="mt-1 text-sm text-brand-900/70">{t("docsHint")}</p>

        <div className="mt-5 space-y-4">
          {SLOTS.map((s) => {
            const f = files[s.key];
            const err = fileErr[s.key];
            const id = `file-${s.key}`;
            return (
              <div key={s.key} className={`rounded-xl border p-4 ${err ? "border-red-300 bg-red-50/40" : "border-brand-100"}`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-lg font-medium">{t(s.label)}</p>
                  <span className={`rounded-full px-3 py-1 text-sm font-medium ${s.required ? "bg-brand-100 text-brand-700" : "bg-brand-50 text-brand-900/60"}`}>
                    {s.required ? t("required") : t("optional")}
                  </span>
                </div>

                <p className="mt-2 text-brand-900/70" dir="auto">
                  {f ? <><bdi>{f.name}</bdi> · {size(f)}</> : t("noFile")}
                </p>

                <div className="mt-3 flex flex-wrap gap-3">
                  <input
                    key={keys[s.key] || 0}
                    id={id}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
                    className="peer sr-only"
                    onChange={(e) => pickFile(s.key, e.target.files?.[0])}
                  />
                  <label
                    htmlFor={id}
                    className="cursor-pointer rounded-xl bg-brand-600 px-6 py-4 text-lg font-medium text-white transition hover:bg-brand-700 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-600"
                  >
                    {f ? t("changeFile") : t("chooseFile")}
                  </label>
                  {f && (
                    <button onClick={() => removeFile(s.key)} className="rounded-xl border border-brand-100 bg-brand-50 px-6 py-4 text-lg font-medium text-brand-700 transition hover:bg-brand-100">
                      {t("removeFile")}
                    </button>
                  )}
                </div>
                {err && <p className="mt-2 text-sm text-red-600">{t(err)}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {saveErr && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-red-800">{t("saveFail")}</p>}
      {hasErrors && <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-red-800">{t("fixErrors")}</p>}

      <button onClick={submit} className="mt-6 w-full rounded-xl bg-brand-600 px-6 py-5 text-xl font-medium text-white transition hover:bg-brand-700">
        {t("submitClaim")}
      </button>
      <p className="mt-4 text-sm text-brand-900/60">{t("noUpload")} {t("demo")}</p>
    </main>
  );
}
