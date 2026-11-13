// تسجيل دخول تجريبي (بدون خادم): حسابات ثابتة في الكود، والجلسة في localStorage.
// هذا ليس أمناً حقيقياً — استبدله بنظام مصادقة فعلي قبل أي استخدام حقيقي.
const KEY = "kodak_session";

export const DEMO_DOCTORS = [
  { nid: "1000000001", password: "Doctor@123", name: { ar: "د. أحمد الغامدي", en: "Dr. Ahmed Al-Ghamdi" } },
  { nid: "1000000002", password: "Doctor@456", name: { ar: "د. ليلى الشهري", en: "Dr. Laila Al-Shehri" } },
];

export function login(nid, password) {
  const d = DEMO_DOCTORS.find((x) => x.nid === nid && x.password === password);
  if (!d) return false;
  try {
    localStorage.setItem(KEY, JSON.stringify({ nid: d.nid, name: d.name }));
  } catch {}
  return true;
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "null");
  } catch {
    return null;
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
