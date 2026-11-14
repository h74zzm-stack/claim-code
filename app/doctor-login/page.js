"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login, DEMO_DOCTORS } from "../auth";
import { useLang } from "../lang-provider";

const inputCls =
  "w-full rounded-xl border border-brand-100 bg-white px-4 py-4 text-lg placeholder:text-brand-900/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-100";

export default function DoctorLogin() {
  const { t } = useLang();
  const router = useRouter();
  const [nid, setNid] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [failed, setFailed] = useState(false);

  function submit(e) {
    e.preventDefault();
    const er = {};
    if (!/^\d{10}$/.test(nid)) er.nid = "errNid";
    if (!password) er.password = "errPassword";
    setErrors(er);
    setFailed(false);
    if (Object.keys(er).length) return;
    if (login(nid, password)) router.push("/claims");
    else setFailed(true);
  }

  const demo = DEMO_DOCTORS[0];

  return (
    <main className="mx-auto min-h-[calc(100vh-4rem)] max-w-md px-6 pb-10 pt-4">
      <Link href="/" className="text-sm text-brand-600 hover:underline">{t("home")}</Link>
      <h1 className="mt-4 text-3xl font-bold">{t("doctorLogin")}</h1>
      <p className="mt-2 text-brand-900/70">{t("loginSub")}</p>

      <form onSubmit={submit} noValidate className="mt-8 space-y-5">
        <div>
          <label htmlFor="nid" className="mb-2 block text-lg font-medium">{t("nid")}</label>
          <input id="nid" dir="ltr" className={`${inputCls} text-start`} inputMode="numeric" maxLength={10} autoComplete="username"
            value={nid} onChange={(e) => setNid(e.target.value.replace(/\D/g, ""))} placeholder={t("phNid")} />
          {errors.nid && <p className="mt-1 text-sm text-red-600">{t(errors.nid)}</p>}
        </div>
        <div>
          <label htmlFor="password" className="mb-2 block text-lg font-medium">{t("password")}</label>
          <input id="password" type="password" dir="ltr" className={`${inputCls} text-start`} autoComplete="current-password"
            value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          {errors.password && <p className="mt-1 text-sm text-red-600">{t(errors.password)}</p>}
        </div>

        {failed && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-800">{t("errLogin")}</p>}

        <button type="submit" className="w-full rounded-xl bg-brand-600 px-6 py-5 text-xl font-medium text-white transition hover:bg-brand-700">
          {t("loginBtn")}
        </button>
      </form>

      <p className="mt-6 rounded-xl border border-brand-100 bg-brand-50 p-4 text-sm text-brand-900/80">
        {t("demoAccount")} <bdi dir="ltr" className="font-medium">{demo.nid}</bdi> / <bdi dir="ltr" className="font-medium">{demo.password}</bdi>
      </p>
    </main>
  );
}
