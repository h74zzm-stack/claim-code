import { DIAGNOSES } from "../doctor-login/data";

// بيانات تجريبية فقط. كل نص له نسخة عربية وإنجليزية {ar, en}
export const STATUS = {
  review: { label: { ar: "قيد المراجعة", en: "Under review" }, cls: "bg-amber-50 text-amber-700 ring-amber-200" },
  approved: { label: { ar: "مقبولة", en: "Approved" }, cls: "bg-emerald-50 text-emerald-700 ring-emerald-200" },
  rejected: { label: { ar: "مرفوضة", en: "Rejected" }, cls: "bg-red-50 text-red-700 ring-red-200" },
};

const byIcd = Object.fromEntries(DIAGNOSES.map((d) => [d.icd, d]));
const F = { ar: "أنثى", en: "Female" };
const M = { ar: "ذكر", en: "Male" };
const DR_AHMED = { ar: "د. أحمد الغامدي", en: "Dr. Ahmed Al-Ghamdi" };
const DR_LAILA = { ar: "د. ليلى الشهري", en: "Dr. Laila Al-Shehri" };
const DR_FAISAL = { ar: "د. فيصل العمري", en: "Dr. Faisal Al-Omari" };
const BUPA = { ar: "بوبا العربية", en: "Bupa Arabia" };
const TAW = { ar: "التعاونية", en: "Tawuniya" };
const MEDG = { ar: "ميدغلف", en: "MedGulf" };
const MALATH = { ar: "ملاذ للتأمين", en: "Malath Insurance" };

const RAW = [
  {
    id: "CLM-1048", patient: { ar: "سارة العتيبي", en: "Sara Al-Otaibi" }, nid: "1087654321", date: "2026-11-10", status: "review",
    age: 34, gender: F, phone: "0551234567", insurer: BUPA, policy: "BP-448201", doctor: DR_AHMED,
    icds: ["K35.8", "E11.9"],
    report: {
      ar: "مريضة تبلغ من العمر 34 سنة راجعت الطوارئ بألم حاد في أسفل البطن الأيمن منذ 12 ساعة، مصحوب بغثيان وارتفاع في درجة الحرارة (38.2).\nالفحص السريري والأشعة يشيران إلى التهاب الزائدة الدودية الحاد. لديها سكري من النوع الثاني منضبط بالأدوية.\nتقرر إجراء استئصال الزائدة بالمنظار.",
      en: "A 34-year-old female presented to the emergency department with severe pain in the lower right abdomen for 12 hours, accompanied by nausea and fever (38.2).\nClinical examination and imaging indicate acute appendicitis. She has type 2 diabetes controlled with medication.\nA laparoscopic appendectomy was scheduled.",
    },
  },
  {
    id: "CLM-1047", patient: { ar: "خالد القحطاني", en: "Khaled Al-Qahtani" }, nid: "1076543210", date: "2026-11-09", status: "approved",
    age: 52, gender: M, phone: "0507654321", insurer: TAW, policy: "TC-902117", doctor: DR_LAILA,
    icds: ["E11.9", "I10"],
    report: {
      ar: "زيارة متابعة لمريض سكري من النوع الثاني. قراءة السكر الصائم 178 ملغ/دل، وضغط الدم 150/95.\nتم تعديل جرعة الأدوية وطلب تحليل السكر التراكمي، مع نصيحة بالحمية والمشي اليومي.",
      en: "Follow-up visit for a patient with type 2 diabetes. Fasting glucose is 178 mg/dL and blood pressure is 150/95.\nMedication doses were adjusted and an HbA1c test was ordered, with advice on diet and daily walking.",
    },
  },
  {
    id: "CLM-1046", patient: { ar: "نورة الشمري", en: "Noura Al-Shammari" }, nid: "1065432109", date: "2026-11-08", status: "rejected",
    age: 41, gender: F, phone: "0539988776", insurer: MEDG, policy: "MG-117359", doctor: DR_AHMED,
    icds: ["K80.2"],
    reason: {
      ar: "الإجراء الجراحي يحتاج موافقة مسبقة من شركة التأمين ولم يتم إرفاقها.",
      en: "The surgical procedure requires prior approval from the insurer, and it was not attached.",
    },
    report: {
      ar: "مريضة تعاني من نوبات ألم متكررة في أعلى البطن بعد الأكل الدسم. أظهرت الأشعة بالموجات فوق الصوتية وجود حصى متعددة في المرارة.\nتقرر إجراء استئصال المرارة بالمنظار.",
      en: "The patient has recurrent episodes of upper abdominal pain after fatty meals. Ultrasound shows multiple gallstones.\nA laparoscopic cholecystectomy was scheduled.",
    },
  },
  {
    id: "CLM-1045", patient: { ar: "عبدالله الحربي", en: "Abdullah Al-Harbi" }, nid: "1054321098", date: "2026-11-07", status: "approved",
    age: 58, gender: M, phone: "0561122334", insurer: BUPA, policy: "BP-330914", doctor: DR_LAILA,
    icds: ["I10"],
    report: {
      ar: "مريض يراجع بسبب صداع متكرر صباحاً. قراءات الضغط المتكررة أعلى من 145/92.\nتشخيص ارتفاع ضغط الدم الأساسي، وبدء العلاج مع متابعة بعد أسبوعين.",
      en: "The patient presents with recurrent morning headaches. Repeated blood pressure readings are above 145/92.\nDiagnosed with essential hypertension; treatment started with a follow-up in two weeks.",
    },
  },
  {
    id: "CLM-1044", patient: { ar: "ريم الدوسري", en: "Reem Al-Dosari" }, nid: "2043210987", date: "2026-11-06", status: "rejected",
    age: 29, gender: F, phone: "0544455667", insurer: MALATH, policy: "ML-775402", doctor: DR_FAISAL,
    icds: ["M54.5"],
    reason: {
      ar: "كود CPT لا يتوافق مع التشخيص المسجّل. راجع الكود وأعد الإرسال.",
      en: "The CPT code does not match the recorded diagnosis. Review the code and resubmit.",
    },
    report: {
      ar: "ألم في أسفل الظهر منذ 3 أسابيع بعد رفع أغراض ثقيلة، دون ضعف في الساقين. الفحص السريري يدل على شد عضلي.\nتم طلب رنين مغناطيسي وصرف مسكنات ومرخٍ للعضلات.",
      en: "Lower back pain for 3 weeks after lifting heavy items, with no leg weakness. Clinical examination suggests muscle strain.\nAn MRI was requested and painkillers and a muscle relaxant were prescribed.",
    },
  },
  {
    id: "CLM-1043", patient: { ar: "فهد المطيري", en: "Fahad Al-Mutairi" }, nid: "1032109876", date: "2026-11-05", status: "review",
    age: 17, gender: M, phone: "0578899001", insurer: TAW, policy: "TC-615880", doctor: DR_FAISAL,
    icds: ["J45.9"],
    report: {
      ar: "نوبات ضيق نفس وصفير في الصدر عند الجهد وفي الليل. يوجد تاريخ عائلي للربو.\nتم إجراء فحص وظائف الرئة، والتشخيص ربو، مع صرف بخاخ موسّع للشعب الهوائية.",
      en: "Episodes of shortness of breath and wheezing on exertion and at night. There is a family history of asthma.\nA lung function test was done; diagnosis is asthma, and a bronchodilator inhaler was prescribed.",
    },
  },
  {
    id: "CLM-1042", patient: { ar: "منى الزهراني", en: "Mona Al-Zahrani" }, nid: "1021098765", date: "2026-11-04", status: "approved",
    age: 45, gender: F, phone: "0502233445", insurer: MEDG, policy: "MG-204466", doctor: DR_LAILA,
    icds: ["E03.9"],
    report: {
      ar: "إرهاق وزيادة في الوزن وجفاف في الجلد منذ شهرين. نتيجة تحليل الغدة الدرقية تدل على قصور في الغدة الدرقية.\nتم البدء بالعلاج الهرموني مع إعادة التحليل بعد 6 أسابيع.",
      en: "Fatigue, weight gain and dry skin for two months. Thyroid test results indicate an underactive thyroid (hypothyroidism).\nHormone therapy was started, with a repeat test after 6 weeks.",
    },
  },
  {
    id: "CLM-1041", patient: { ar: "يوسف السبيعي", en: "Yousef Al-Subaie" }, nid: "1010987654", date: "2026-11-03", status: "rejected",
    age: 37, gender: M, phone: "0556677889", insurer: BUPA, policy: "BP-519273", doctor: DR_AHMED,
    icds: ["K29.7"],
    reason: {
      ar: "رقم الهوية في المطالبة لا يطابق بيانات وثيقة التأمين.",
      en: "The national ID in the claim does not match the insurance policy records.",
    },
    report: {
      ar: "ألم وحرقة في أعلى المعدة مع انتفاخ منذ أسبوعين. تم إجراء منظار للمعدة مع أخذ عينة، والنتيجة تشير إلى التهاب المعدة.\nتم صرف علاج لتقليل الحموضة.",
      en: "Upper stomach pain and burning with bloating for two weeks. An endoscopy with a biopsy was done, and the result indicates gastritis.\nAcid-reducing medication was prescribed.",
    },
  },
];

export const CLAIMS = RAW.map((c) => {
  const codes = c.icds.map((i) => byIcd[i]);
  return {
    ...c,
    codes,
    diagnosis: { ar: codes[0].name, en: codes[0].nameEn },
    icd: codes[0].icd,
    amount: codes.reduce((s, x) => s + x.price, 0),
  };
});

export const getClaim = (id) => CLAIMS.find((c) => c.id === id);
