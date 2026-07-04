export type Lesson = {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  preview?: boolean;
  // interactive checkpoint questions triggered during video
  checkpoints?: { atSec: number; q: string; options: string[]; answer: number }[];
};

export type Module = {
  id: string;
  title: string;
  lessons: Lesson[];
};

export type Course = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  instructor: string;
  lab: string;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  level: "Beginner" | "Intermediate" | "Advanced";
  language: string;
  price: number;
  originalPrice: number;
  certificate: boolean;
  image: string;
  tags: string[];
  bestseller?: boolean;
  new?: boolean;
  updated: string;
  outcomes: string[];
  modules: Module[];
  finalTest: {
    durationMin: number;
    passPct: number;
    questions: { q: string; options: string[]; answer: number }[];
  };
};

const categories = [
  "NABL Awareness",
  "ISO/IEC 17025",
  "ISO 15189 Medical Labs",
  "Proficiency Testing",
  "Reference Materials",
  "Biobanking",
  "Quality Management",
  "Internal Auditing",
  "Method Validation",
  "Measurement Uncertainty",
  "Calibration & Traceability",
  "Quality Control",
  "Risk Management",
  "CAPA & RCA",
  "Documentation & SOP",
  "Lab Safety",
  "Good Laboratory Practices",
];

const instructors = [
  "Dr. Anjali Rao", "Dr. Rajesh Menon", "Dr. Priya Sharma", "Dr. Vikram Nair",
  "Dr. Meera Iyer", "Dr. Sanjay Gupta", "Dr. Kavita Reddy", "Dr. Arun Kulkarni",
  "Dr. Neha Bhatt", "Dr. Rohan Desai", "Dr. Sunita Pillai", "Dr. Amit Verma",
  "Dr. Deepika Joshi", "Dr. Manish Agarwal", "Dr. Shalini Kapoor", "Dr. Nikhil Rao",
  "Dr. Preeti Nanda", "Dr. Vivek Trivedi", "Dr. Ananya Ghosh", "Dr. Karthik Iyer",
  "Dr. Ritu Malhotra", "Dr. Suresh Bhandari",
];

const labs = [
  "SRL Diagnostics", "Metropolis Labs", "Dr. Lal PathLabs", "Thyrocare",
  "Neuberg Diagnostics", "AIIMS Central Lab", "CDSCO Reference Lab",
  "Vijaya Diagnostics", "Apollo Diagnostics", "NABL Reference Lab",
];

const titles = [
  "NABL Awareness Programme — Complete Foundation",
  "ISO/IEC 17025:2017 Laboratory Accreditation Masterclass",
  "ISO 15189:2022 Medical Laboratory Accreditation",
  "ISO/IEC 17043 Proficiency Testing Provider Standards",
  "ISO 17034 Reference Material Producers Certification",
  "ISO 20387 Biobanking Standards & Best Practices",
  "Laboratory Quality Management System (LQMS)",
  "NABL Internal Auditor Training Programme",
  "Method Validation & Verification for Test Labs",
  "Measurement Uncertainty — Theory & Practice",
  "Equipment Calibration, Traceability & Records",
  "Internal Quality Control (IQC) Techniques",
  "External Quality Assessment (EQA / PT) Programs",
  "Risk-Based Thinking & ISO 31000 for Labs",
  "CAPA & Root Cause Analysis for Non-Conformities",
  "Laboratory Documentation & Records Control",
  "SOP Development, Review & Rollout",
  "NABL Assessment Preparation Bootcamp",
  "Laboratory Safety & Chemical Hygiene",
  "Good Laboratory Practices (GLP) — OECD Framework",
  "Certificate Programme for Laboratory Professionals",
  "Sampling & Sub-Sampling for Test Laboratories",
];

const tagPool = ["NABL", "ISO 17025", "ISO 15189", "PT", "GLP", "QMS", "Calibration", "IQC", "EQA", "SOP", "CAPA", "Audit"];

const SAMPLE_VIDEO = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

function buildModules(i: number): Module[] {
  const themes = ["Introduction & Scope", "Standards Overview", "Documentation", "Implementation", "Auditing", "CAPA & Improvement", "Assessment Prep"];
  return themes.map((t, m) => ({
    id: `m-${i}-${m}`,
    title: `Module ${m + 1}: ${t}`,
    lessons: Array.from({ length: 3 + (m % 3) }).map((_, l) => ({
      id: `l-${i}-${m}-${l}`,
      title: `Lesson ${m + 1}.${l + 1}: ${["Overview", "Deep Dive", "Case Study", "Templates", "Worked Example"][l % 5]}`,
      duration: `${5 + ((l * 3) % 10)}:${((l * 17) % 60).toString().padStart(2, "0")}`,
      videoUrl: SAMPLE_VIDEO,
      preview: m === 0 && l === 0,
      checkpoints: l === 1 ? [
        { atSec: 20, q: "Which standard governs testing & calibration labs?", options: ["ISO 9001", "ISO/IEC 17025", "ISO 15189", "ISO 14001"], answer: 1 },
      ] : undefined,
    })),
  }));
}

function buildFinalTest() {
  const bank = [
    { q: "ISO/IEC 17025 is applicable to:", options: ["Only medical labs", "Testing & calibration labs", "Only calibration labs", "Manufacturing plants"], answer: 1 },
    { q: "The current version of ISO 15189 is:", options: ["2012", "2017", "2022", "2023"], answer: 2 },
    { q: "PT stands for:", options: ["Personal Training", "Proficiency Testing", "Process Testing", "Precision Testing"], answer: 1 },
    { q: "CAPA means:", options: ["Corrective And Preventive Action", "Calibrated Analytical Process Audit", "Control And Prevention Assessment", "Compliance Audit Process Action"], answer: 0 },
    { q: "Measurement uncertainty is expressed as:", options: ["A single value", "±U at a coverage factor k", "Percentage error", "Standard deviation only"], answer: 1 },
    { q: "IQC is performed:", options: ["Once a year", "By an external body", "Daily within the lab", "Only during audits"], answer: 2 },
    { q: "Traceability chain ends at:", options: ["Working standard", "SI unit via a national institute", "Reference material", "In-house standard"], answer: 1 },
    { q: "Which is a Type A uncertainty evaluation?", options: ["Manufacturer's spec", "Statistical from repeated readings", "Calibration certificate", "Handbook value"], answer: 1 },
    { q: "Non-conformity RCA typically uses:", options: ["SWOT", "5-Why / Fishbone", "PEST", "Balanced Scorecard"], answer: 1 },
    { q: "SOPs must be:", options: ["Written and controlled", "Verbal only", "Optional for small labs", "Prepared only during audit"], answer: 0 },
  ];
  return { durationMin: 15, passPct: 70, questions: bank };
}

export const courses: Course[] = titles.map((title, i) => {
  const category = categories[i % categories.length];
  const instructor = instructors[i % instructors.length];
  const lab = labs[i % labs.length];
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const price = [1499, 1999, 2499, 2999, 3499, 3999, 4499][i % 7];
  return {
    id: `c-${i + 1}`,
    slug,
    title,
    subtitle: `Comprehensive program covering ${category.toLowerCase()} — standards, templates, worked examples and real laboratory case studies.`,
    category,
    instructor,
    lab,
    rating: +(4.4 + ((i * 13) % 6) / 10).toFixed(1),
    reviews: 120 + ((i * 47) % 900),
    students: 400 + ((i * 173) % 5800),
    duration: `${6 + (i % 18)}h ${((i * 7) % 60)}m`,
    lessons: 24 + (i % 40),
    level: (["Beginner", "Intermediate", "Advanced"] as const)[i % 3],
    language: i % 5 === 0 ? "Hindi" : "English",
    price,
    originalPrice: price + 2000,
    certificate: true,
    image: `https://images.unsplash.com/photo-${[
      "1582719471384-894fbb16e074",
      "1579154204601-01588f351e67",
      "1532187863486-abf9dbad1b69",
      "1581093588401-fbb62a02f120",
      "1576091160550-2173dba999ef",
      "1587854692152-cbe660dbde88",
      "1530026405186-ed1f139313f8",
      "1554475901-4538ddfbccc2",
      "1579165466741-7f35e4755660",
      "1516549655169-df83a0774514",
    ][i % 10]}?auto=format&fit=crop&w=800&q=80`,
    tags: [tagPool[i % tagPool.length], tagPool[(i + 3) % tagPool.length]],
    bestseller: i % 4 === 0,
    new: i % 7 === 0,
    updated: ["Jun 2026", "Apr 2026", "May 2026", "Jul 2026"][i % 4],
    outcomes: [
      "Interpret NABL & ISO standards clearly",
      "Design SOPs & documented information that pass audits",
      "Perform internal audits with confidence",
      "Calculate measurement uncertainty for common tests",
      "Run CAPA and root cause analysis on non-conformities",
      "Prepare your lab for a successful NABL assessment",
    ],
    modules: buildModules(i),
    finalTest: buildFinalTest(),
  };
});

export const categoriesList = categories;

export const stats = [
  { label: "Learners", value: "18,400+" },
  { label: "Labs", value: "620+" },
  { label: "Completion", value: "97%" },
  { label: "Courses", value: "22+" },
];

export const testimonials = [
  { name: "Dr. Kavita Menon", role: "Quality Manager, SRL Diagnostics", quote: "SWIFT-NABL cut our accreditation prep time in half. The uncertainty module alone paid for the program." },
  { name: "Ravi Shankar", role: "Technical Manager, Metropolis", quote: "Every analyst on my team cleared the internal auditor test. Best structured NABL content online." },
  { name: "Dr. Meera Iyer", role: "Director, Neuberg Diagnostics", quote: "Feels like Coursera for accreditation — but built by people who actually run NABL labs." },
];

export const learningPaths = [
  { title: "NABL Internal Auditor", duration: "40 hours", courses: 6, level: "Advanced", color: "from-blue-500 to-cyan-500" },
  { title: "Quality Manager (Lab)", duration: "60 hours", courses: 9, level: "Intermediate", color: "from-emerald-500 to-teal-500" },
  { title: "Technical Signatory Track", duration: "48 hours", courses: 7, level: "Advanced", color: "from-sky-500 to-blue-500" },
  { title: "Lab Analyst Foundation", duration: "24 hours", courses: 4, level: "Beginner", color: "from-indigo-500 to-purple-500" },
];

export const faqs = [
  { q: "Is SWIFT-NABL Academy officially affiliated with NABL?", a: "We are an independent training academy specialising in NABL accreditation. Our programs are built by former assessors and quality managers to align with the latest NABL criteria." },
  { q: "Will I get a certificate?", a: "Yes. Every course ends with a proctored final test. On passing, you can download a verifiable digital certificate instantly." },
  { q: "How long do I have access to the course?", a: "Lifetime access, including all future updates for the version you enrolled in." },
  { q: "Do you offer team / lab-wide plans?", a: "Yes — bulk licenses, custom learning paths and manager dashboards are available for accredited labs and hospital chains." },
  { q: "What if I fail the final test?", a: "You can retake the test after 24 hours. Most learners pass on the second attempt after reviewing weak modules." },
];

// Dashboard mock
export const enrolledCourses = courses.slice(0, 4).map((c, i) => ({
  ...c,
  progress: [72, 45, 88, 20][i],
  lastLesson: ["Module 3.2: Uncertainty budget", "Module 2.1: Documented information", "Module 6.1: CAPA workflow", "Module 1.1: Scope of accreditation"][i],
}));

export const upcomingClasses = [
  { title: "Live Q&A: ISO 15189:2022 transition", instructor: "Dr. Anjali Rao", date: "Today, 6:00 PM", attendees: 128 },
  { title: "Workshop: Uncertainty budgets in Excel", instructor: "Dr. Rajesh Menon", date: "Tomorrow, 4:00 PM", attendees: 84 },
  { title: "Panel: PT scheme selection", instructor: "Dr. Priya Sharma", date: "Fri, 5:30 PM", attendees: 210 },
];

export const weeklyActivity = [
  { day: "Mon", hours: 1.2 }, { day: "Tue", hours: 2.1 }, { day: "Wed", hours: 0.8 },
  { day: "Thu", hours: 2.8 }, { day: "Fri", hours: 1.9 }, { day: "Sat", hours: 3.4 }, { day: "Sun", hours: 2.2 },
];

export const achievements = [
  { icon: "🏆", title: "First Certificate", desc: "Completed your first course" },
  { icon: "🔥", title: "7-Day Streak", desc: "Learn every day for a week" },
  { icon: "⭐", title: "Top 10% Learner", desc: "Among top performers this month" },
  { icon: "🎓", title: "NABL Ready", desc: "Cleared 3 accreditation courses" },
];

// Enrollment helpers (localStorage-based demo)
const KEY = "swift-nabl:enrolled";
export function isEnrolled(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try { return JSON.parse(localStorage.getItem(KEY) || "[]").includes(slug); } catch { return false; }
}
export function enroll(slug: string) {
  if (typeof window === "undefined") return;
  const list: string[] = JSON.parse(localStorage.getItem(KEY) || "[]");
  if (!list.includes(slug)) { list.push(slug); localStorage.setItem(KEY, JSON.stringify(list)); }
}

const PROG = "swift-nabl:progress";
export type Progress = { lessonsDone: string[]; notes: Record<string, string>; testScore?: number; };
export function getProgress(slug: string): Progress {
  if (typeof window === "undefined") return { lessonsDone: [], notes: {} };
  try { return JSON.parse(localStorage.getItem(`${PROG}:${slug}`) || "") || { lessonsDone: [], notes: {} }; }
  catch { return { lessonsDone: [], notes: {} }; }
}
export function saveProgress(slug: string, p: Progress) {
  if (typeof window === "undefined") return;
  localStorage.setItem(`${PROG}:${slug}`, JSON.stringify(p));
}
