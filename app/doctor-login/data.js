// بيانات تجريبية فقط — الأسعار بالريال السعودي وتقديرية
// keys: كلمات عربية | keysEn: كلمات إنجليزية | unless/unlessEn: كلمات تمنع التطابق
export const DIAGNOSES = [
  { name: "التهاب الزائدة الدودية الحاد", nameEn: "Acute appendicitis", icd: "K35.8", cpt: "44950", price: 12000,
    keys: ["زائدة", "الزائدة الدودية"], keysEn: ["appendicitis", "appendix", "appendectomy"] },
  { name: "السكري من النوع الثاني", nameEn: "Type 2 diabetes mellitus", icd: "E11.9", cpt: "83036", price: 60,
    keys: ["سكري", "سكر", "النوع الثاني"], keysEn: ["diabetes", "diabetic", "type 2", "type ii"],
    unless: ["النوع الأول"], unlessEn: ["type 1", "type one"] },
  { name: "السكري من النوع الأول", nameEn: "Type 1 diabetes mellitus", icd: "E10.9", cpt: "82962", price: 40,
    keys: ["النوع الأول", "سكري الأطفال"], keysEn: ["type 1", "type one", "juvenile diabetes"] },
  { name: "ارتفاع ضغط الدم الأساسي", nameEn: "Essential hypertension", icd: "I10", cpt: "99213", price: 250,
    keys: ["ضغط", "ارتفاع الضغط"], keysEn: ["hypertension", "high blood pressure", "blood pressure"] },
  { name: "الربو", nameEn: "Asthma", icd: "J45.9", cpt: "94010", price: 200,
    keys: ["ربو", "ضيق تنفس", "صفير"], keysEn: ["asthma", "wheez", "shortness of breath"] },
  { name: "التهاب الحلق واللوزتين", nameEn: "Tonsillitis and pharyngitis", icd: "J03.9", cpt: "87880", price: 80,
    keys: ["لوزتين", "اللوزتين", "التهاب الحلق", "حلق"], keysEn: ["tonsillitis", "pharyngitis", "sore throat", "strep"] },
  { name: "التهاب المسالك البولية", nameEn: "Urinary tract infection", icd: "N39.0", cpt: "81001", price: 50,
    keys: ["مسالك", "التهاب بولي", "حرقان بول", "حرقة بول"], keysEn: ["urinary tract infection", "uti", "cystitis", "burning urination"] },
  { name: "حصى الكلى", nameEn: "Kidney stones", icd: "N20.0", cpt: "74176", price: 1200,
    keys: ["حصى الكلى", "حصوة الكلى", "حصوات الكلى", "مغص كلوي"], keysEn: ["kidney stone", "renal stone", "renal colic", "nephrolithiasis"] },
  { name: "التهاب المعدة", nameEn: "Gastritis", icd: "K29.7", cpt: "43239", price: 1800,
    keys: ["التهاب المعدة", "التهاب معدة", "قرحة"], keysEn: ["gastritis", "ulcer"] },
  { name: "ارتجاع المريء", nameEn: "Gastro-esophageal reflux disease", icd: "K21.9", cpt: "43235", price: 1500,
    keys: ["ارتجاع", "حموضة", "حرقة المعدة"], keysEn: ["reflux", "gerd", "heartburn"] },
  { name: "الصداع النصفي", nameEn: "Migraine", icd: "G43.9", cpt: "99214", price: 350,
    keys: ["صداع نصفي", "الصداع النصفي", "شقيقة"], keysEn: ["migraine"] },
  { name: "كسر في عظم الساعد (الرسغ)", nameEn: "Fracture of the forearm (wrist)", icd: "S52.5", cpt: "25600", price: 2500,
    keys: ["كسر"], keysEn: ["fracture", "broken wrist", "broken arm"] },
  { name: "التهاب الجيوب الأنفية", nameEn: "Sinusitis", icd: "J32.9", cpt: "31231", price: 600,
    keys: ["جيوب", "الجيوب الأنفية", "جيوب أنفية"], keysEn: ["sinusitis", "sinus"] },
  { name: "فقر الدم بنقص الحديد", nameEn: "Iron-deficiency anemia", icd: "D50.9", cpt: "85025", price: 40,
    keys: ["فقر الدم", "أنيميا", "نقص الحديد", "نقص حديد"], keysEn: ["anemia", "anaemia", "iron deficiency"] },
  { name: "ألم أسفل الظهر", nameEn: "Low back pain", icd: "M54.5", cpt: "72148", price: 1800,
    keys: ["أسفل الظهر", "ألم الظهر", "الم الظهر", "الظهر"], keysEn: ["low back pain", "lower back pain", "back pain"] },
  { name: "الالتهاب الرئوي", nameEn: "Pneumonia", icd: "J18.9", cpt: "71046", price: 150,
    keys: ["التهاب رئوي", "الالتهاب الرئوي", "رئوي", "نيمونيا"], keysEn: ["pneumonia"] },
  { name: "حصى المرارة", nameEn: "Gallstones", icd: "K80.2", cpt: "47562", price: 14000,
    keys: ["مرارة", "حصى المرارة", "حصوة المرارة"], keysEn: ["gallstone", "gall stone", "cholelithiasis", "cholecystitis"] },
  { name: "قصور الغدة الدرقية", nameEn: "Hypothyroidism", icd: "E03.9", cpt: "84443", price: 90,
    keys: ["غدة درقية", "الغدة الدرقية", "قصور الغدة"], keysEn: ["hypothyroid", "thyroid"] },
  { name: "ارتفاع الكوليسترول والدهون", nameEn: "Hyperlipidemia (high cholesterol)", icd: "E78.5", cpt: "80061", price: 100,
    keys: ["كوليسترول", "دهون", "الدهون الثلاثية"], keysEn: ["cholesterol", "hyperlipidemia", "dyslipidemia", "triglycerides"] },
  { name: "التهاب المعدة والأمعاء", nameEn: "Gastroenteritis", icd: "A09", cpt: "87045", price: 120,
    keys: ["أمعاء", "إسهال", "اسهال", "نزلة معوية", "قيء"], keysEn: ["gastroenteritis", "diarrhea", "diarrhoea", "vomiting", "stomach flu"] },
];

// توحيد النص العربي للمطابقة: إزالة التشكيل وتوحيد الألف والياء والتاء المربوطة
export function normalize(s) {
  return s
    .toLowerCase()
    .replace(/[\u064B-\u0652\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ة/g, "ه");
}

const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// الكلمات الإنجليزية: تبدأ عند حدود الكلمة (فيطابق wheezing لـ wheez)، والقصيرة مثل UTI كلمة كاملة
function hasEn(text, key) {
  const k = key.toLowerCase();
  return new RegExp(`\\b${esc(k)}${k.length <= 3 ? "\\b" : ""}`).test(text);
}

export function matchDiagnoses(report) {
  const ar = normalize(report);
  const en = report.toLowerCase();
  const hasAr = (k) => ar.includes(normalize(k));
  return DIAGNOSES.filter((d) => {
    const hit = d.keys.some(hasAr) || d.keysEn.some((k) => hasEn(en, k));
    const blocked = (d.unless || []).some(hasAr) || (d.unlessEn || []).some((k) => hasEn(en, k));
    return hit && !blocked;
  });
}
