import { useEffect, useMemo, useRef, useState, useCallback, type ReactNode } from "react"
import { QrCodeSvg } from "./qr-generator"
import {
  ArrowLeftRight,
  BarChart3,
  Bell,
  BrainCircuit,
  CheckCircle2,
  ChevronDown,
  Database,
  Download,
  ExternalLink,
  FileText,
  Fingerprint,
  Flame,
  Globe2,
  Languages,
  Layers3,
  LockKeyhole,
  MapPin,
  MonitorSmartphone,
  Network,
  Play,
  Presentation,
  QrCode,
  Radar,
  Route,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react"

/* ──────────────────────────────────────────────────────────────────────
   LOCALISATION
   ────────────────────────────────────────────────────────────────────── */
type Lang = "ar" | "en"

/* ── UPDATE THIS URL BEFORE DEPLOYMENT ── */
const PAGE_URL = "https://qr-code-zeta-mocha.vercel.app"

const content = {
  ar: {
    langLabel: "English",
    dir: "rtl" as const,
    badge: "مشروع تخرج | جامعة تعز | 2025 – 2026",
    confBadge: "4SRIC-0146",
    title: "نظام بلاغ ذكي لمساعدة الجهات المختصة في تحسين الاستجابة للطوارئ",
    shortTitle: "سند",
    subtitle:
      "منصة رقمية تربط المواطن بغرفة العمليات عبر تطبيق موبايل ولوحة تحكم مركزية، مع تحديد الموقع، تحليل ذكي للوسائط، وخرائط حرارية لدعم القرار.",
    primaryCta: "استكشاف رحلة البلاغ",
    secondaryCta: "عرض التقنيات",
    scrollHint: "اسحب للأسفل",
    stats: [
      { value: "GPS", label: "تحديد دقيق للموقع" },
      { value: "AI", label: "تحليل وتصنيف ذكي" },
      { value: "Heatmap", label: "رصد المناطق الساخنة" },
      { value: "KYC", label: "تعزيز موثوقية المستخدم" },
    ],
    nav: ["الفكرة", "المشكلة", "طريقة العمل", "الذكاء الاصطناعي", "التقنيات", "الفريق"],
    sectionEyebrow: {
      overview: "نظرة عامة على المشروع",
      problem: "التحدي",
      solution: "الحل المقترح",
      flow: "رحلة البلاغ",
      ai: "التحليل الذكي",
      architecture: "بنية النظام",
      technologies: "مكدس التقنيات",
      users: "الفئات المستهدفة",
      team: "فريق المشروع",
      resources: "الموارد",
    },
    overviewTitle: "ما هو سند؟",
    overview:
      "سند هو نظام إبلاغ ذكي للطوارئ والحوادث، يهدف إلى تحويل البلاغ من مكالمة أو وصف شفهي قد يكون ناقصًا إلى سجل رقمي موثق بالموقع والوسائط وحالة المتابعة. يعتمد النظام على تطبيق موبايل للمواطنين ولوحة تحكم للجهات المختصة، بحيث تصل المعلومات الأساسية بسرعة وبشكل منظم يساعد على تقليل زمن الاستجابة وتحسين التخطيط الأمني.",
    problemTitle: "لماذا نحتاج النظام؟",
    problems: [
      {
        title: "ضعف دقة الموقع",
        text: "البلاغات الصوتية تعتمد على وصف المستخدم، وقد يؤدي ذلك إلى تأخر الوصول أو توجيه الجهة الخاطئة.",
      },
      {
        title: "غياب قاعدة بيانات موحدة",
        text: "التوثيق الورقي أو الأنظمة المتفرقة يصعبان تحليل الأنماط واستخراج مؤشرات تساعد في القرار.",
      },
      {
        title: "صعوبة توزيع الموارد",
        text: "غياب صورة تشغيلية مباشرة يجعل تحديد الأولوية وتوجيه الوحدات الميدانية أقل كفاءة.",
      },
      {
        title: "ضعف الشفافية",
        text: "عدم قدرة المواطن على متابعة حالة بلاغه يقلل الثقة ويضعف التعاون المجتمعي.",
      },
    ],
    solutionTitle: "ما الذي يقدمه سند؟",
    solution:
      "يوفر النظام قناة رقمية موحدة لإرسال البلاغات، إرفاق الصور أو الفيديو، تسجيل الإحداثيات تلقائيًا، تحليل الوسائط والبلاغات، ثم عرضها في لوحة عمليات تحتوي على إحصائيات وخرائط حرارية وسجل متابعة. القرار النهائي يبقى بيد الجهة المختصة، بينما يساعد النظام في تنظيم المعلومات وترتيب الأولويات.",
    flow: [
      { title: "إرسال البلاغ", text: "المواطن يكتب الوصف ويرفق صورة أو فيديو من التطبيق." },
      { title: "تحديد الموقع", text: "النظام يلتقط إحداثيات GPS ويضيف بيانات الوقت والمكان." },
      { title: "تحليل ذكي", text: "وحدة الذكاء الاصطناعي تحلل الوسائط وتقدر الخطورة والموثوقية." },
      { title: "لوحة العمليات", text: "الجهة المختصة تراجع البلاغ على الخريطة وتحدث حالته." },
      { title: "المتابعة", text: "المستخدم يمكنه معرفة حالة البلاغ من الإرسال حتى الإغلاق." },
    ],
    aiTitle: "كيف يخدم الذكاء الاصطناعي المشروع؟",
    aiIntro:
      "لا يستخدم سند الذكاء الاصطناعي كزينة تقنية، بل كطبقة مساعدة تقلل العبء على المشغل وتدعم سرعة الفرز الأولي.",
    aiPoints: [
      "تصنيف نوع الحدث مثل حادث مروري، حريق، أو بلاغ أمني.",
      "تقدير مستوى الخطورة اعتمادًا على وصف البلاغ والوسائط المرفقة.",
      "مقارنة الوصف مع الصورة أو الفيديو لرصد التناقضات المحتملة.",
      "تحليل الأنماط المكانية لإنتاج خرائط حرارية للمناطق الأكثر تكرارًا.",
      "دعم كشف البلاغات غير الدقيقة أو غير المهمة قبل استنزاف الموارد.",
    ],
    architectureTitle: "مكونات النظام",
    architecture: [
      { title: "تطبيق المواطن", text: "React Native / Expo لإرسال البلاغات والوسائط والموقع." },
      { title: "واجهة API", text: "FastAPI لمعالجة الطلبات، المصادقة، وربط الخدمات." },
      { title: "قاعدة البيانات", text: "PostgreSQL مع دعم البيانات الجغرافية عبر PostGIS." },
      { title: "وحدة التحليل", text: "AI لتحليل الوسائط وتصنيف البلاغات وتقدير الخطورة." },
      { title: "لوحة التحكم", text: "React Dashboard لعرض البلاغات، الإحصائيات، والخرائط." },
    ],
    featuresTitle: "ميزات أساسية",
    features: [
      { title: "بلاغ موثق", text: "وصف، موقع، وقت، ووسائط في سجل واحد." },
      { title: "خرائط حرارية", text: "تحويل البلاغات إلى مؤشرات مكانية قابلة للتحليل." },
      { title: "إشعارات", text: "تحديثات وتنبيهات تساعد على المتابعة السريعة." },
      { title: "صلاحيات", text: "أدوار وصلاحيات لحماية العمليات داخل لوحة التحكم." },
      { title: "سجل تدقيق", text: "تتبع العمليات والتغييرات لتعزيز الشفافية." },
      { title: "تحقق هوية", text: "تصور يدعم KYC وتقنيات تحقق تقلل البلاغات العشوائية." },
    ],
    technologiesTitle: "التقنيات المستخدمة",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "React Native", category: "mobile" },
      { name: "Expo", category: "mobile" },
      { name: "FastAPI", category: "backend" },
      { name: "Python", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "PostGIS", category: "database" },
      { name: "Leaflet", category: "frontend" },
      { name: "Gemini AI", category: "ai" },
      { name: "JWT", category: "backend" },
    ],
    usersTitle: "الفئات المستفيدة",
    users: [
      { title: "المواطنون", text: "إرسال بلاغات موثقة ومتابعة الحالة بشفافية." },
      { title: "غرف العمليات", text: "استقبال البلاغات، فرزها، وتحليلها من مكان واحد." },
      { title: "الوحدات الميدانية", text: "الاستفادة من الموقع والأولوية لتسريع الاستجابة." },
      { title: "صناع القرار", text: "استخدام البيانات والخرائط في التخطيط الأمني المستدام." },
    ],
    teamTitle: "فريق المشروع",
    teamIntro: "قسم هندسة البرمجيات، كلية السعيد للهندسة وتقنية المعلومات، جامعة تعز.",
    members: [
      "عفيف الدين عبدالعزيز حميد مقبل",
      "أيمن محسن عبده حسن",
      "عزام عبدالقاهر محمد عبدالله",
      "مازن سلطان عبدالجليل عبدالنور",
      "منير علي ناجي سلمان",
    ],
    membersEn: [
      "Afif Aldin Abdulaziz Hameed Moqbel",
      "Ayman Mohsen Abdo Hasn",
      "Azzam Abdulqaher Mohmmed Abdullah",
      "Mazen Sultan Abduljalil Abdulnoor",
      "Muneer Ali Naji Salman",
    ],
    supervisor: "المشرف: د. رعد الصلوي",
    supervisorEn: "Supervisor: Raad Al-Slwai",
    resourcesTitle: "الموارد والمواد",
    resources: {
      report: "التقرير النهائي",
      slides: "العرض التقديمي",
      demo: "فيديو توضيحي",
      github: "الكود المصدري",
    },
  },
  en: {
    langLabel: "العربية",
    dir: "ltr" as const,
    badge: "Graduation Project | Taiz University | 2025 – 2026",
    confBadge: "4SRIC-0146",
    title: "Smart Reporting System to Assist Relevant Authorities in Improving Emergency Response",
    shortTitle: "Sanad",
    subtitle:
      "A digital emergency reporting platform connecting citizens with operations rooms through a mobile app, a central dashboard, GPS, AI-assisted media analysis, and heat maps for decision support.",
    primaryCta: "Explore the Report Journey",
    secondaryCta: "View Technologies",
    scrollHint: "Scroll down",
    stats: [
      { value: "GPS", label: "Accurate geolocation" },
      { value: "AI", label: "Smart analysis & classification" },
      { value: "Heatmap", label: "Hotspot visualization" },
      { value: "KYC", label: "Trusted user identity" },
    ],
    nav: ["Idea", "Problem", "Workflow", "AI", "Technologies", "Team"],
    sectionEyebrow: {
      overview: "Project Overview",
      problem: "The Challenge",
      solution: "Proposed Solution",
      flow: "Report Journey",
      ai: "Smart Analysis",
      architecture: "System Architecture",
      technologies: "Technology Stack",
      users: "Target Users",
      team: "Project Team",
      resources: "Resources",
    },
    overviewTitle: "What is Sanad?",
    overview:
      "Sanad is an intelligent emergency and incident reporting system that turns incomplete voice-based reports into structured digital records containing location, media, timestamps, and follow-up status. It combines a citizen mobile app with an authority dashboard so essential information reaches the operations room quickly, clearly, and in a form that supports faster response and better security planning.",
    problemTitle: "Why is it needed?",
    problems: [
      {
        title: "Inaccurate incident location",
        text: "Voice reports depend on verbal descriptions, which can delay arrival or route the report to the wrong authority.",
      },
      {
        title: "No unified data repository",
        text: "Paper records or disconnected systems make it difficult to analyze patterns and extract decision indicators.",
      },
      {
        title: "Inefficient resource allocation",
        text: "Without a live operational picture, prioritizing incidents and dispatching units becomes less effective.",
      },
      {
        title: "Limited transparency",
        text: "When citizens cannot track report status, trust and community cooperation decrease.",
      },
    ],
    solutionTitle: "What does Sanad provide?",
    solution:
      "The system provides a unified digital channel for submitting reports, attaching photos or videos, capturing GPS coordinates, analyzing report content, and displaying everything in an operations dashboard with statistics, heat maps, and status tracking. Final decisions remain with the competent authority, while the system organizes information and supports prioritization.",
    flow: [
      { title: "Submit report", text: "The citizen writes a description and attaches media through the mobile app." },
      { title: "Capture location", text: "The system records GPS coordinates and adds time and place context." },
      { title: "Smart analysis", text: "The AI layer analyzes media and estimates severity and credibility." },
      { title: "Operations dashboard", text: "Authorities review the report on the map and update its status." },
      { title: "Follow-up", text: "The user can track the report from submission to closure." },
    ],
    aiTitle: "How does AI help?",
    aiIntro:
      "Sanad uses AI as a practical support layer, not as decoration. It helps reduce operator workload and improves initial triage.",
    aiPoints: [
      "Classifies the event type, such as traffic accident, fire, or security incident.",
      "Estimates risk level based on the written report and attached media.",
      "Compares description with image or video content to detect possible contradictions.",
      "Analyzes spatial patterns to produce heat maps for high-frequency areas.",
      "Supports detection of inaccurate or low-value reports before resources are consumed.",
    ],
    architectureTitle: "System components",
    architecture: [
      { title: "Citizen app", text: "React Native / Expo for reporting incidents, media, and location." },
      { title: "API layer", text: "FastAPI for request handling, authentication, and service integration." },
      { title: "Database", text: "PostgreSQL with spatial data support through PostGIS." },
      { title: "Analysis layer", text: "AI-assisted media analysis, classification, and risk estimation." },
      { title: "Dashboard", text: "React dashboard for reports, statistics, and interactive maps." },
    ],
    featuresTitle: "Core features",
    features: [
      { title: "Documented report", text: "Description, location, timestamp, and media in one record." },
      { title: "Heat maps", text: "Turning reports into spatial indicators for analysis." },
      { title: "Notifications", text: "Alerts and updates that support quick follow-up." },
      { title: "Role access", text: "RBAC controls to protect dashboard operations." },
      { title: "Audit logs", text: "Tracking actions and changes to improve transparency." },
      { title: "Identity trust", text: "KYC-oriented concept to reduce random or false reporting." },
    ],
    technologiesTitle: "Technology stack",
    technologies: [
      { name: "React", category: "frontend" },
      { name: "Vite", category: "frontend" },
      { name: "Tailwind CSS", category: "frontend" },
      { name: "React Native", category: "mobile" },
      { name: "Expo", category: "mobile" },
      { name: "FastAPI", category: "backend" },
      { name: "Python", category: "backend" },
      { name: "PostgreSQL", category: "database" },
      { name: "PostGIS", category: "database" },
      { name: "Leaflet", category: "frontend" },
      { name: "Gemini AI", category: "ai" },
      { name: "JWT", category: "backend" },
    ],
    usersTitle: "Target users",
    users: [
      { title: "Citizens", text: "Submit documented reports and follow status transparently." },
      { title: "Operations rooms", text: "Receive, classify, and analyze reports from one place." },
      { title: "Field units", text: "Use location and priority data to improve response speed." },
      { title: "Decision makers", text: "Use data and maps for sustainable security planning." },
    ],
    teamTitle: "Project team",
    teamIntro: "Software Engineering Department, Al-Saeed Faculty of Engineering and IT, Taiz University.",
    members: [
      "Afif Aldin Abdulaziz Hameed Moqbel",
      "Ayman Mohsen Abdo Hasn",
      "Azzam Abdulqaher Mohmmed Abdullah",
      "Mazen Sultan Abduljalil Abdulnoor",
      "Muneer Ali Naji Salman",
    ],
    membersEn: [
      "Afif Aldin Abdulaziz Hameed Moqbel",
      "Ayman Mohsen Abdo Hasn",
      "Azzam Abdulqaher Mohmmed Abdullah",
      "Mazen Sultan Abduljalil Abdulnoor",
      "Muneer Ali Naji Salman",
    ],
    supervisor: "Supervisor: Raad Al-Slwai",
    supervisorEn: "Supervisor: Raad Al-Slwai",
    resourcesTitle: "Resources & Materials",
    resources: {
      report: "Final Report",
      slides: "Presentation",
      demo: "Demo Video",
      github: "Source Code",
    },
  },
}

/* ──────────────────────────────────────────────────────────────────────
   ICON MAPS
   ────────────────────────────────────────────────────────────────────── */
const problemIcons = [MapPin, Database, Route, ArrowLeftRight]
const featureIcons = [FileText, Flame, Bell, LockKeyhole, Radar, Fingerprint]
const userIcons = [Users, MonitorSmartphone, Route, BarChart3]
const archIcons = [Smartphone, Layers3, Database, BrainCircuit, MonitorSmartphone]

const techCategoryColors: Record<string, { bg: string; text: string; border: string }> = {
  frontend: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-200" },
  mobile: { bg: "bg-violet-50", text: "text-violet-700", border: "border-violet-200" },
  backend: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
  database: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
  ai: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
}

/* ──────────────────────────────────────────────────────────────────────
   SCROLL REVEAL HOOK
   ────────────────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

/* ──────────────────────────────────────────────────────────────────────
   FLOATING PARTICLES (Hero background)
   ────────────────────────────────────────────────────────────────────── */
function FloatingParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 24 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * 10,
    })),
  [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-[#0d7c83]/20 animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ────────────────────────────────────────────────────────────────────── */
export default function ProjectQrPage() {
  const [lang, setLang] = useState<Lang>("ar")
  const t = content[lang]
  const isArabic = lang === "ar"

  const flowIcons = useMemo(
    () => [Smartphone, MapPin, BrainCircuit, MonitorSmartphone, CheckCircle2],
    [],
  )

  /* active nav tracking */
  const [activeSection, setActiveSection] = useState("")
  const sectionIds = useMemo(() => ["overview", "problem", "flow", "ai", "technologies", "team"], [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sectionIds])

  const toggleLang = useCallback(() => setLang((prev) => (prev === "ar" ? "en" : "ar")), [])

  return (
    <main className="min-h-screen bg-[#f6fbfa] text-[#07343c] selection:bg-[#0d7c83]/20" dir={t.dir}>
      {/* ─── STICKY HEADER ─── */}
      <header className="sticky top-0 z-50 border-b border-[#d9eeee]/60 bg-[#f6fbfa]/80 backdrop-blur-xl backdrop-saturate-150 transition-all">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <div className="relative">
              <img src="/sanad-logo.png" alt="Sanad" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
              <div className="absolute -inset-1 rounded-lg bg-[#0d7c83]/10 opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-black text-[#064b58]">{t.shortTitle}</p>
              <p className="text-[11px] font-bold tracking-wider text-[#53747a] uppercase">Smart Emergency Reporting</p>
            </div>
          </a>
          <nav className="hidden items-center gap-0.5 lg:flex">
            {t.nav.map((item, index) => (
              <a
                key={item}
                href={`#${sectionIds[index]}`}
                className={`relative rounded-lg px-3.5 py-2 text-sm font-bold transition-all
                  ${activeSection === sectionIds[index]
                    ? "text-[#064b58] bg-[#e1f4f2]"
                    : "text-[#53747a] hover:text-[#064b58] hover:bg-[#edf7f5]"
                  }`}
              >
                {item}
                {activeSection === sectionIds[index] && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#0d7c83] transition-all" />
                )}
              </a>
            ))}
          </nav>
          <button
            type="button"
            onClick={toggleLang}
            className="group inline-flex h-10 items-center gap-2 rounded-xl border border-[#b8dbde] bg-white/80 px-4 text-sm font-black text-[#064b58] shadow-sm backdrop-blur transition-all hover:border-[#0d7c83] hover:shadow-md hover:shadow-[#0d7c83]/10"
          >
            <Languages className="h-4 w-4 transition-transform group-hover:rotate-12" />
            {t.langLabel}
          </button>
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section id="top" className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#e8f6f3] via-[#f0faf8] to-[#e1f0f4]" />
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(6,75,88,.06)_1px,transparent_1px),linear-gradient(0deg,rgba(6,75,88,.06)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <FloatingParticles />
        {/* Gradient orbs */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#0d7c83]/15 to-transparent blur-3xl" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-tr from-[#064b58]/10 to-transparent blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-20">
          {/* Text side */}
          <div className="flex flex-col justify-center animate-fade-in-up">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#a9dadd]/60 bg-white/70 px-4 py-1.5 text-sm font-bold text-[#064b58] backdrop-blur-sm shadow-sm">
                <QrCode className="h-4 w-4 text-[#0d7c83]" />
                {t.badge}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#f2cf63] to-[#e8b830] px-4 py-1.5 text-sm font-black text-[#4c3d06] shadow-sm">
                <Sparkles className="h-3.5 w-3.5" />
                {t.confBadge}
              </span>
            </div>

            <h1 className="max-w-2xl text-3xl font-black leading-[1.2] text-[#05333c] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.18]">
              {t.title}
            </h1>

            <p className="mt-6 max-w-xl text-base font-semibold leading-8 text-[#3d6b73] sm:text-lg">
              {t.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#flow"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#064b58] to-[#0a6b72] px-6 text-sm font-black text-white shadow-lg shadow-[#064b58]/25 transition-all hover:shadow-xl hover:shadow-[#064b58]/30 hover:-translate-y-0.5"
              >
                {t.primaryCta}
                <Zap className="h-4 w-4 transition-transform group-hover:rotate-12" />
              </a>
              <a
                href="#technologies"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#b8dbde] bg-white/80 px-6 text-sm font-black text-[#064b58] backdrop-blur transition-all hover:border-[#0d7c83] hover:shadow-md hover:-translate-y-0.5"
              >
                {t.secondaryCta}
              </a>
            </div>
          </div>

          {/* Visual card side */}
          <div className="relative min-h-[460px] animate-fade-in-up" style={{ animationDelay: "200ms" }}>
            <div className="absolute inset-x-0 top-0 mx-auto max-w-[540px]">
              {/* Main card */}
              <div className="relative rounded-3xl border border-[#b8dbde]/60 bg-white/60 p-6 shadow-2xl shadow-[#064b58]/8 backdrop-blur-xl">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-[#d9eeee] pb-5">
                  <div className="flex items-center gap-4">
                    <img src="/taiz-university-logo.png" alt="Taiz University" className="h-14 w-14 object-contain" />
                    <img src="/sanad-logo.png" alt="Sanad" className="h-11 w-auto object-contain" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0d7c83] to-[#064b58] text-white shadow-lg shadow-[#064b58]/25">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                </div>

                {/* Stat cards */}
                <div className="mt-5 grid gap-2.5">
                  {t.stats.map((stat, index) => {
                    const Icon = [Globe2, BrainCircuit, Flame, Fingerprint][index]
                    return (
                      <div
                        key={stat.value}
                        className="group flex items-center gap-3 rounded-xl border border-[#e8f3f2] bg-[#fbfefd] p-3 transition-all hover:border-[#b8dbde] hover:shadow-sm"
                        style={{ animationDelay: `${400 + index * 100}ms` }}
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#064b58] to-[#0a6b72] text-white shadow-sm transition-transform group-hover:scale-110">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-mono text-lg font-black text-[#064b58]">{stat.value}</p>
                          <p className="text-xs font-bold text-[#53747a]">{stat.label}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Bottom banner */}
                <div className="mt-4 overflow-hidden rounded-2xl bg-gradient-to-r from-[#063d47] to-[#0a5a63] p-4 text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-widest text-[#75d9d2]">Live Operations</p>
                      <p className="mt-1 text-sm font-bold text-white/80">Reports, maps, analysis, status tracking</p>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                      <Network className="h-6 w-6 text-[#75d9d2]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="relative pb-8 flex justify-center">
          <a href="#overview" className="group flex flex-col items-center gap-2 text-[#53747a] transition hover:text-[#064b58]">
            <span className="text-xs font-bold">{t.scrollHint}</span>
            <ChevronDown className="h-5 w-5 animate-bounce" />
          </a>
        </div>
      </section>

      {/* ─── OVERVIEW ─── */}
      <RevealSection id="overview" eyebrow={t.sectionEyebrow.overview} title={t.overviewTitle}>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <p className="text-lg font-semibold leading-9 text-[#3d6b73]">{t.overview}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.stats.map((stat, index) => {
              const Icon = [Globe2, BrainCircuit, Flame, Fingerprint][index]
              return (
                <div key={stat.value} className="group rounded-2xl border border-[#e3f1ef] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 hover:border-[#b8dbde]">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#e1f4f2] to-[#d0ede9] text-[#0d7c83] transition-transform group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-mono text-xl font-black text-[#064b58]">{stat.value}</p>
                  <p className="mt-1 text-sm font-bold leading-6 text-[#53747a]">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </RevealSection>

      {/* ─── PROBLEM ─── */}
      <RevealSection id="problem" eyebrow={t.sectionEyebrow.problem} title={t.problemTitle} band>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.problems.map((item, index) => {
            const Icon = problemIcons[index]
            return (
              <div key={item.title} className="group rounded-2xl border border-[#f0e0dc] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#fce8e4] to-[#f8d4cc] transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6 text-[#b24c32]" />
                </div>
                <h3 className="text-lg font-black text-[#07343c]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#53747a]">{item.text}</p>
              </div>
            )
          })}
        </div>
      </RevealSection>

      {/* ─── SOLUTION ─── */}
      <RevealSection id="solution" eyebrow={t.sectionEyebrow.solution} title={t.solutionTitle}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-lg font-semibold leading-9 text-[#3d6b73]">{t.solution}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.features.map((feature, index) => {
              const Icon = featureIcons[index]
              return (
                <div key={feature.title} className="group rounded-2xl border border-[#e3f1ef] bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#e1f4f2] to-[#d0ede9] text-[#064b58] transition-transform group-hover:scale-110 group-hover:rotate-3">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-black text-[#07343c]">{feature.title}</h3>
                  <p className="mt-2 text-sm font-semibold leading-6 text-[#53747a]">{feature.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </RevealSection>

      {/* ─── FLOW (Timeline) ─── */}
      <RevealSection id="flow" eyebrow={t.sectionEyebrow.flow} title={t.sectionEyebrow.flow} band>
        <div className="relative">
          {/* Connection line */}
          <div className="absolute top-24 left-0 right-0 hidden h-0.5 bg-gradient-to-r from-[#d0ede9] via-[#0d7c83]/30 to-[#d0ede9] lg:block" />
          <div className="grid gap-4 lg:grid-cols-5">
            {t.flow.map((step, index) => {
              const Icon = flowIcons[index]
              return (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-[#cfe8e9] bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-2"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#064b58] to-[#0a6b72] text-white shadow-lg shadow-[#064b58]/20 transition-transform group-hover:scale-110">
                      <Icon className="h-7 w-7" />
                    </div>
                    <span className="font-mono text-3xl font-black text-[#e8f3f2] transition-colors group-hover:text-[#d0ede9]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-[#07343c]">{step.title}</h3>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#53747a]">{step.text}</p>
                  {/* Step connector arrow (hidden on mobile) */}
                  {index < 4 && (
                    <div className="absolute -left-3 top-[3.8rem] hidden text-[#0d7c83]/40 lg:block rtl:-right-3 rtl:left-auto rtl:rotate-180">
                      ›
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </RevealSection>

      {/* ─── AI ─── */}
      <RevealSection id="ai" eyebrow={t.sectionEyebrow.ai} title={t.aiTitle}>
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-lg font-semibold leading-9 text-[#3d6b73]">{t.aiIntro}</p>
            <div className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#063d47] to-[#0a5a63] p-6 text-white shadow-xl shadow-[#063d47]/20">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <BrainCircuit className="h-8 w-8 text-[#75d9d2]" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#75d9d2]">AI Agent</p>
                  <p className="mt-1 text-sm font-bold text-white/80">Classification, verification, risk scoring, hotspot insight</p>
                </div>
              </div>
            </div>
          </div>
          <ul className="space-y-3">
            {t.aiPoints.map((point) => (
              <li
                key={point}
                className="group flex gap-3 rounded-2xl border border-[#e3f1ef] bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[#b8dbde]"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#e1f4f2] transition-all group-hover:bg-[#0d7c83] group-hover:text-white">
                  <CheckCircle2 className="h-4 w-4 text-[#0d7c83] group-hover:text-white" />
                </div>
                <span className="text-sm font-bold leading-7 text-[#3d6b73]">{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </RevealSection>

      {/* ─── ARCHITECTURE ─── */}
      <RevealSection id="architecture" eyebrow={t.sectionEyebrow.architecture} title={t.architectureTitle} band>
        <div className="grid gap-4 lg:grid-cols-5">
          {t.architecture.map((item, index) => {
            const Icon = archIcons[index]
            return (
              <div key={item.title} className="group rounded-2xl border border-[#cfe8e9] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e1f4f2] to-[#d0ede9] transition-all group-hover:from-[#064b58] group-hover:to-[#0a6b72] group-hover:shadow-lg">
                  <Icon className="h-6 w-6 text-[#064b58] transition-colors group-hover:text-white" />
                </div>
                <h3 className="text-base font-black text-[#07343c]">{item.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-[#53747a]">{item.text}</p>
              </div>
            )
          })}
        </div>
      </RevealSection>

      {/* ─── TECHNOLOGIES ─── */}
      <RevealSection id="technologies" eyebrow={t.sectionEyebrow.technologies} title={t.technologiesTitle}>
        <div className="flex flex-wrap gap-3">
          {t.technologies.map((tech) => {
            const colors = techCategoryColors[tech.category] || techCategoryColors.frontend
            return (
              <span
                key={tech.name}
                className={`group inline-flex items-center gap-2 rounded-xl border ${colors.border} ${colors.bg} px-5 py-2.5 text-sm font-black ${colors.text} shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 cursor-default`}
              >
                <span className={`h-2 w-2 rounded-full ${colors.text === "text-sky-700" ? "bg-sky-500" : colors.text === "text-violet-700" ? "bg-violet-500" : colors.text === "text-emerald-700" ? "bg-emerald-500" : colors.text === "text-amber-700" ? "bg-amber-500" : "bg-rose-500"}`} />
                {tech.name}
              </span>
            )
          })}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-xs font-bold text-[#53747a]">
          {[
            { label: "Frontend", color: "bg-sky-500" },
            { label: "Mobile", color: "bg-violet-500" },
            { label: "Backend", color: "bg-emerald-500" },
            { label: "Database", color: "bg-amber-500" },
            { label: "AI", color: "bg-rose-500" },
          ].map(({ label, color }) => (
            <span key={label} className="inline-flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${color}`} />
              {label}
            </span>
          ))}
        </div>
      </RevealSection>

      {/* ─── USERS ─── */}
      <RevealSection id="users" eyebrow={t.sectionEyebrow.users} title={t.usersTitle} band>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {t.users.map((user, index) => {
            const Icon = userIcons[index]
            return (
              <div key={user.title} className="group rounded-2xl border border-[#e3f1ef] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#e1f4f2] to-[#d0ede9] text-[#0d7c83] transition-transform group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-black text-[#07343c]">{user.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-7 text-[#53747a]">{user.text}</p>
              </div>
            )
          })}
        </div>
      </RevealSection>

      {/* ─── TEAM ─── */}
      <RevealSection id="team" eyebrow={t.sectionEyebrow.team} title={t.teamTitle}>
        <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          {/* University info */}
          <div className="rounded-2xl border border-[#e3f1ef] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-4 border-b border-[#e8f3f2] pb-5">
              <img src="/taiz-university-logo.png" alt="Taiz University" className="h-20 w-20 object-contain" />
              <img src="/sanad-logo.png" alt="Sanad" className="h-12 w-auto object-contain" />
            </div>
            <p className="mt-5 text-base font-bold leading-8 text-[#3d6b73]">{t.teamIntro}</p>
            <div className="mt-5 rounded-xl bg-gradient-to-r from-[#e1f4f2] to-[#d6efeb] px-5 py-3.5">
              <p className="text-sm font-black text-[#064b58]">{t.supervisor}</p>
              {isArabic && <p className="mt-1 text-xs font-bold text-[#53747a]">{t.supervisorEn}</p>}
            </div>
          </div>

          {/* Members grid */}
          <div className="grid gap-3 sm:grid-cols-2">
            {t.members.map((member, index) => (
              <div
                key={member}
                className="group rounded-2xl border border-[#e3f1ef] bg-white p-4 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5 hover:border-[#b8dbde]"
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#064b58] to-[#0a6b72] font-mono text-sm font-black text-white shadow-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-base font-black leading-7 text-[#07343c]">{member}</p>
                    {isArabic && (
                      <p className="mt-0.5 text-xs font-bold text-[#7a9ca2]">{t.membersEn[index]}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ─── RESOURCES ─── */}
      <RevealSection id="resources" eyebrow={t.sectionEyebrow.resources} title={t.resourcesTitle} band>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: t.resources.report, icon: FileText, href: "/docs/project_File_English.pdf", color: "from-[#064b58] to-[#0a6b72]", actionIcon: Download },
            { label: t.resources.slides, icon: Presentation, href: "#", color: "from-[#7c3aed] to-[#6d28d9]", actionIcon: ExternalLink },
            { label: t.resources.demo, icon: Play, href: "#", color: "from-[#dc2626] to-[#b91c1c]", actionIcon: Play },
            { label: t.resources.github, icon: Globe2, href: "#", color: "from-[#1f2937] to-[#111827]", actionIcon: ExternalLink },
          ].map(({ label, icon: Icon, href, color, actionIcon: ActionIcon }) => (
            <a
              key={label}
              href={href}
              target={href !== "#" ? "_blank" : undefined}
              rel="noopener noreferrer"
              className={`group relative overflow-hidden rounded-2xl border border-[#cfe8e9] bg-white p-5 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 ${href === "#" ? "opacity-60 pointer-events-none" : ""}`}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${color} text-white shadow-lg transition-transform group-hover:scale-110`}>
                <Icon className="h-6 w-6" />
              </div>
              <p className="text-base font-black text-[#07343c]">{label}</p>
              <div className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-[#0d7c83]">
                <ActionIcon className="h-3.5 w-3.5" />
                {href !== "#" ? (isArabic ? "فتح" : "Open") : (isArabic ? "قريبًا" : "Coming soon")}
              </div>
              {href === "#" && (
                <div className="absolute top-3 right-3 rounded-full bg-[#f2cf63]/30 px-2.5 py-0.5 text-[10px] font-black text-[#8a7020]">
                  {isArabic ? "قريبًا" : "Soon"}
                </div>
              )}
            </a>
          ))}
        </div>
      </RevealSection>

      {/* ─── QR CODE SECTION ─── */}
      <RevealSection id="qrcode" eyebrow={isArabic ? "امسح الرمز" : "Scan the Code"} title={isArabic ? "شارك هذه الصفحة" : "Share this Page"}>
        <div className="flex flex-col items-center gap-6 rounded-3xl border border-[#cfe8e9] bg-white p-8 shadow-sm sm:flex-row sm:justify-center sm:gap-12">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-2xl border-2 border-[#d9eeee] bg-white p-3 shadow-lg shadow-[#064b58]/8">
              <QrCodeSvg url={PAGE_URL} size={200} />
            </div>
            <p className="text-xs font-bold text-[#53747a]">{isArabic ? "امسح للوصول للصفحة" : "Scan to visit this page"}</p>
          </div>
          <div className="text-center sm:text-start">
            <p className="text-xl font-black text-[#064b58]">{isArabic ? "شاهد تفاصيل المشروع" : "View Project Details"}</p>
            <p className="mt-2 max-w-sm text-sm font-semibold leading-7 text-[#53747a]">
              {isArabic
                ? "امسح رمز QR للوصول إلى هذه الصفحة ومشاهدة جميع تفاصيل مشروع سند، التقنيات المستخدمة، ومعلومات الفريق."
                : "Scan the QR code to access this page and explore all details about Sanad project, technologies used, and team information."}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#e1f4f2] px-4 py-2 text-xs font-black text-[#064b58]">
              <QrCode className="h-4 w-4" />
              {PAGE_URL}
            </div>
          </div>
        </div>
      </RevealSection>

      {/* ─── FOOTER ─── */}
      <footer className="relative overflow-hidden border-t border-[#0a4a53] bg-gradient-to-br from-[#063d47] to-[#042d34]">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/95 p-2 shadow-sm">
                <img src="/sanad-logo.png" alt="Sanad" className="h-9 w-auto" />
              </div>
              <div>
                <p className="font-black text-white">{t.shortTitle}</p>
                <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Smart Emergency Reporting</p>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <p className="text-sm font-bold text-white/60">{t.confBadge} | Taiz University | 2025 – 2026</p>
              <p className="text-xs font-bold text-white/40">
                {isArabic
                  ? "المؤتمر الطلابي  الرابع للبحث والابتكار - 4SRIC"
                  : "4th Scientific Research and Innovation Conference"}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

/* ──────────────────────────────────────────────────────────────────────
   SECTION COMPONENT (with scroll reveal)
   ────────────────────────────────────────────────────────────────────── */
function RevealSection({
  id,
  eyebrow,
  title,
  children,
  band = false,
}: {
  id: string
  eyebrow: string
  title: string
  children: ReactNode
  band?: boolean
}) {
  const { ref, visible } = useReveal()
  return (
    <section
      id={id}
      ref={ref}
      className={`px-4 py-14 sm:px-6 sm:py-16 lg:px-8 transition-all duration-700 ease-out
        ${band ? "bg-[#eef9f6]" : "bg-[#f6fbfa]"}
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-xs font-black uppercase tracking-widest text-[#0d7c83]">{eyebrow}</p>
          <h2 className="text-2xl font-black leading-tight text-[#07343c] sm:text-3xl lg:text-[2rem]">{title}</h2>
        </div>
        {children}
      </div>
    </section>
  )
}
