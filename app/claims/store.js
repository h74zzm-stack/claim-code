import { CLAIMS } from "./data";

// المطالبات الجديدة تُحفظ في localStorage (على هذا المتصفح فقط)
const KEY = "kodak_new_claims";

export function loadLocalClaims() {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) || "[]");
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

export function saveLocalClaim(claim) {
  try {
    localStorage.setItem(KEY, JSON.stringify([claim, ...loadLocalClaims()]));
    return true;
  } catch {
    return false;
  }
}

export function nextClaimId() {
  const nums = [...CLAIMS, ...loadLocalClaims()].map((c) => Number(c.id.slice(4)) || 0);
  return "CLM-" + (Math.max(...nums) + 1);
}
