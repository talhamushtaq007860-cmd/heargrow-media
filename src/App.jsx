import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Waves, ArrowRight, Check, Star, Menu, X, ChevronDown, ChevronUp,
  Sparkles, Video, FileText, Search, Calendar, Mail, Send, Sun, Moon,
  ArrowUp, Quote, ExternalLink, Clock, Tag, Ear, TrendingUp, Users,
  Award, Target, Heart, Eye, Zap, Shield, MapPin, Facebook, Instagram,
  Linkedin, Twitter
} from "lucide-react";

/* ========================================================================
   HEARGROW MEDIA — Premium Digital Marketing Agency Website
   Signature motif: the sound waveform — hearing care's own visual language,
   used as dividers, loaders, and ambient texture. Everything else stays
   quiet: navy authority, a single emerald accent, restrained gold for the
   one "most popular" moment.
   ======================================================================== */

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@500;600&display=swap');`;

/* ---------------------------- Reveal on scroll --------------------------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        transition: `opacity 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform 0.7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ Waveform SVG ------------------------------ */
function Waveform({ className = "", bars = 40, animate = true, color = "currentColor" }) {
  const seed = useRef(
    Array.from({ length: bars }, (_, i) => {
      const wave = Math.sin(i * 0.5) * 0.5 + Math.sin(i * 0.23) * 0.3;
      return 0.25 + Math.abs(wave) * 0.75;
    })
  ).current;
  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {seed.map((h, i) => (
        <div
          key={i}
          style={{
            height: `${h * 100}%`,
            background: color,
            animationDelay: `${i * 0.045}s`,
          }}
          className={`w-[3px] rounded-full ${animate ? "animate-wave" : ""}`}
        />
      ))}
    </div>
  );
}

function WaveDivider({ dark }) {
  return (
    <div className="flex justify-center py-10">
      <Waveform bars={56} className="h-6 w-56 opacity-40" color={dark ? "#34D399" : "#0F9D74"} />
    </div>
  );
}

/* --------------------------------- Data ---------------------------------- */
const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "pricing", label: "Pricing" },
  { id: "portfolio", label: "Portfolio" },
  { id: "blog", label: "Blog" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

const SERVICES = [
  {
    icon: Video,
    title: "AI Short Videos",
    tagline: "Bite-sized clips that make hearing care feel human.",
    benefits: [
      "Turns patient education into scroll-stopping video",
      "Builds trust before a patient ever books a visit",
      "Consistent posting without hiring an in-house editor",
    ],
    features: ["Script + AI voiceover", "Branded captions", "Platform-ready cuts (Reels, TikTok, Shorts)", "Monthly batch delivery"],
  },
  {
    icon: FileText,
    title: "SEO Blog Writing",
    tagline: "Long-form content that ranks and reassures.",
    benefits: [
      "Answers the questions new patients are already Googling",
      "Builds long-term organic traffic, not rented reach",
      "Positions your clinic as the local hearing authority",
    ],
    features: ["1000+ word clinical-friendly articles", "On-page SEO built in", "Human-edited, fact-checked", "Topic clusters, not one-offs"],
  },
  {
    icon: Search,
    title: "Keyword Research",
    tagline: "Find what patients search before they search for you.",
    benefits: [
      "Uncovers local, high-intent search terms",
      "Prioritizes keywords by real booking potential",
      "Feeds directly into blog and video topics",
    ],
    features: ["Local + national keyword mapping", "Competitor gap analysis", "Search intent grouping", "Monthly refresh"],
  },
  {
    icon: Calendar,
    title: "Monthly Content Calendar",
    tagline: "A clear plan, delivered before the month begins.",
    benefits: [
      "No more guessing what to post or write",
      "Aligns video and blog output around real events",
      "Gives your team full visibility, always",
    ],
    features: ["Topic + format mapping", "Publish-date scheduling", "Seasonal & awareness-day tie-ins", "Shared calendar file"],
  },
];

const PLANS = [
  {
    name: "Starter",
    price: 399,
    blurb: "Perfect for small clinics",
    popular: false,
    features: [
      "50 AI Short Videos", "4 SEO Blogs (1000 words)", "Keyword Research",
      "SEO Titles", "Meta Descriptions", "Monthly Content Calendar",
      "Delivery in 7 Days", "2 Revisions",
    ],
    cta: "Get Started",
  },
  {
    name: "Growth",
    price: 699,
    blurb: "Perfect for growing clinics",
    popular: true,
    features: [
      "75 AI Short Videos", "6 SEO Blogs (1000 words)", "Keyword Research",
      "SEO Optimization", "Meta Descriptions", "Monthly Content Calendar",
      "Delivery in 8 Days", "4 Revisions",
    ],
    cta: "Get Started",
  },
  {
    name: "Premium",
    price: 999,
    blurb: "Perfect for established clinics",
    popular: false,
    features: [
      "100 AI Short Videos", "10 SEO Blogs (1000 words)", "Keyword Research",
      "SEO Titles", "Meta Descriptions", "Monthly Content Calendar",
      "Priority Support", "Delivery in 10–14 Days", "6 Revisions",
    ],
    cta: "Book Strategy Session",
  },
];

const TESTIMONIALS = [
  { name: "Dr. Melissa Carter", role: "Owner, Clearwater Audiology (TX)", quote: "Our blog traffic tripled in four months and it's finally patients searching for hearing tests near them, not random visitors." },
  { name: "James Whitfield", role: "Marketing Lead, SoundPath Hearing Clinics (UK)", quote: "The short videos gave us content we actually looked forward to posting. Bookings from Instagram alone went up noticeably." },
  { name: "Dr. Anika Rehman", role: "Director, Horizon Hearing Care (AU)", quote: "HearGrow understood our industry from message one. No generic marketing fluff, just content our patients actually read." },
];

const PORTFOLIO = [
  { title: "Local SEO Blog Series", type: "SEO Blogs", niche: "Audiology Clinic — Ontario, CA", desc: "A 10-part blog cluster targeting local hearing-test searches, built around real patient questions." },
  { title: "\"Signs You Might Need a Hearing Test\" Series", type: "AI Short Videos", niche: "Hearing Care Center — Texas, US", desc: "A 12-video educational series designed for Reels and TikTok, built to earn trust before the first appointment." },
  { title: "Tinnitus Awareness Content Sprint", type: "Blog + Video", niche: "Hearing Aid Company — Manchester, UK", desc: "A coordinated blog-and-video push timed around Tinnitus Awareness Week." },
  { title: "New Patient Onboarding Explainers", type: "AI Short Videos", niche: "Multi-location Clinic Group — Melbourne, AU", desc: "Short explainer videos walking new patients through their first hearing aid fitting." },
  { title: "\"Hearing Aid Myths\" Blog Cluster", type: "SEO Blogs", niche: "Audiology Practice — British Columbia, CA", desc: "Myth-busting long-form content targeting high-volume informational search queries." },
  { title: "Monthly Content Calendar Rebuild", type: "Content Strategy", niche: "Independent Hearing Clinic — Ohio, US", desc: "A full content-calendar overhaul aligning blog and video output with seasonal patient search trends." },
];

const BLOG_POSTS = [
  { title: "Why Local SEO Matters More Than Ever for Hearing Clinics", category: "SEO", readTime: "6 min read", excerpt: "Most patients now find their audiologist through a search, not a referral. Here's how local SEO changes the growth math for hearing clinics." },
  { title: "5 Video Ideas Every Hearing Aid Clinic Should Be Posting", category: "Video Marketing", readTime: "5 min read", excerpt: "Short-form video works differently for healthcare than it does for retail. These five formats consistently earn trust and bookings." },
  { title: "How to Turn One Blog Post Into a Month of Content", category: "Content Strategy", readTime: "7 min read", excerpt: "A single well-researched article can fuel weeks of social captions, short videos, and email content. Here's the breakdown." },
  { title: "The Keywords Hearing Clinics Are Missing", category: "SEO", readTime: "8 min read", excerpt: "Beyond \"hearing aids near me,\" there's a layer of long-tail search terms most clinics never target — and it's where the easiest wins live." },
];

const FAQS = [
  { q: "What exactly does HearGrow Media do?", a: "We create AI-produced short videos and SEO-optimized blog content specifically for hearing aid clinics, audiology practices, and hearing care companies, built around what patients are actually searching for." },
  { q: "Do you only work with hearing aid clinics?", a: "Yes — we specialize exclusively in the hearing care industry, across the US, UK, Canada, and Australia. That focus is what lets us write and script content that actually sounds like it belongs in your field." },
  { q: "What are AI Short Videos exactly?", a: "Short, platform-ready video content (Reels, TikTok, YouTube Shorts) built using AI-assisted scripting, voiceover, and editing, then branded and formatted for your clinic." },
  { q: "Will the content sound robotic or generic?", a: "No. Every script and blog is written around real patient questions and reviewed for clinical tone and accuracy before delivery. AI speeds up production, it doesn't replace editorial judgment." },
  { q: "How many blog posts do I get per month?", a: "That depends on your package: 4 blogs on Starter, 6 on Growth, and 10 on Premium, each around 1000 words and optimized for search." },
  { q: "Do you provide keyword research?", a: "Yes, every package includes keyword research to make sure your content targets terms patients in your area are actually searching for." },
  { q: "How long does delivery take?", a: "Starter is delivered in 7 days, Growth in 8 days, and Premium in 10–14 days, depending on scope and revisions requested." },
  { q: "How many revisions are included?", a: "2 revisions on Starter, 4 on Growth, and 6 on Premium. Additional revisions can be arranged if needed." },
  { q: "Can I request specific topics for my blogs and videos?", a: "Absolutely. We build a monthly content calendar collaboratively, and you can prioritize topics relevant to your clinic or current promotions." },
  { q: "Do you write the content yourselves or just generate it with AI?", a: "It's a hybrid process: AI accelerates drafting and video production, but every piece is human-reviewed for accuracy, tone, and SEO before it reaches you." },
  { q: "Is this a one-time project or an ongoing service?", a: "HearGrow Media is built as an ongoing monthly service, since consistent content is what actually moves SEO rankings and audience trust over time." },
  { q: "Which countries do you work with?", a: "We currently work with hearing care clinics and companies across the United States, United Kingdom, Canada, and Australia." },
  { q: "How do I communicate with your team?", a: "All communication happens over email at heargrowmedia@gmail.com, so every request and revision stays clearly documented." },
  { q: "What's included in the Monthly Content Calendar?", a: "A clear month-ahead plan mapping every blog and video topic to a publish date, so your team always knows what's coming and when." },
  { q: "How do I get started?", a: "Choose a package on our Pricing page and send us a message through the Contact page with your clinic's website and goals — we'll reply within 24 business hours." },
];

const STATS = [
  { value: 120, suffix: "+", label: "Clinics & practices served" },
  { value: 4, suffix: "", label: "Countries served" },
  { value: 3200, suffix: "+", label: "AI short videos produced" },
  { value: 96, suffix: "%", label: "Client retention rate" },
];

/* ------------------------------ Small pieces ------------------------------ */
function Eyebrow({ children, dark }) {
  return (
    <div className={`inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.18em] uppercase mb-4 ${dark ? "text-emerald-300" : "text-emerald-600"}`}>
      <Waves size={13} strokeWidth={2.5} />
      {children}
    </div>
  );
}

function Counter({ value, suffix, dark }) {
  const [ref, visible] = useReveal();
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 1400;
    const startTime = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * value));
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [visible, value]);
  return (
    <div ref={ref} className="text-center">
      <div className={`font-mono text-4xl md:text-5xl font-semibold ${dark ? "text-white" : "text-navy-900"}`} style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
        {n}{suffix}
      </div>
    </div>
  );
}

function Button({ children, variant = "primary", onClick, className = "", icon: Icon = ArrowRight, disabled = false, type }) {
  const base = "inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 group disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none";
  const styles = {
    primary: "bg-emerald-500 text-navy-950 hover:bg-emerald-400 hover:shadow-[0_8px_30px_rgba(16,185,129,0.35)] hover:-translate-y-0.5",
    outline: "border border-white/25 text-white hover:bg-white/10 hover:border-white/50",
    outlineDark: "border border-navy-900/20 text-navy-900 hover:bg-navy-900/5",
    ghost: "text-emerald-600 hover:text-emerald-700",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${styles[variant]} ${className}`}>
      {children}
      <Icon size={16} className={`transition-transform duration-300 group-hover:translate-x-1 ${disabled ? "animate-spin group-hover:translate-x-0" : ""}`} />
    </button>
  );
}

/* --------------------------------- Navbar --------------------------------- */
function Navbar({ page, setPage, dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => { setPage(id); setOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "backdrop-blur-xl bg-navy-950/80 shadow-[0_1px_0_rgba(255,255,255,0.08)]" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[72px] flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
            <Ear size={18} className="text-emerald-400" />
          </span>
          <span className="text-white font-semibold text-lg tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>HearGrow <span className="text-emerald-400">Media</span></span>
        </button>
        <nav className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className={`px-4 py-2 text-sm rounded-full transition-colors duration-200 ${page === item.id ? "text-emerald-400 font-semibold" : "text-white/70 hover:text-white"}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <button onClick={() => setDark(!dark)} aria-label="Toggle theme" className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:text-white hover:border-white/30 transition-colors">
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <Button onClick={() => go("contact")} className="!py-2.5 !px-5 !text-[13px]">Get Started</Button>
        </div>
        <button className="lg:hidden text-white" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-navy-950/97 backdrop-blur-xl border-t border-white/10 px-5 py-4">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => go(item.id)} className={`block w-full text-left py-3 text-sm border-b border-white/5 ${page === item.id ? "text-emerald-400 font-semibold" : "text-white/80"}`}>
              {item.label}
            </button>
          ))}
          <Button onClick={() => go("contact")} className="w-full mt-4 justify-center">Get Started</Button>
        </div>
      )}
    </header>
  );
}

/* ---------------------------------- Hero ---------------------------------- */
function Hero({ setPage }) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pt-40 pb-28 md:pt-48 md:pb-36">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
      <div className="absolute -top-32 right-[-10%] w-[540px] h-[540px] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="max-w-7xl mx-auto px-5 md:px-8 relative grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <Reveal>
            <Eyebrow dark>AI Content Marketing for Hearing Care</Eyebrow>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="text-white text-[2.6rem] leading-[1.08] md:text-6xl md:leading-[1.06] font-medium tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Helping hearing aid clinics grow with content that gets heard
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-white/60 text-lg mt-6 max-w-xl leading-relaxed">
              We create AI short videos and SEO blogs that help hearing aid clinics strengthen their online presence and connect with more potential patients — across the US, UK, Canada, and Australia.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="flex flex-wrap gap-4 mt-9">
              <Button onClick={() => setPage("contact")}>Get Started</Button>
              <Button variant="outline" onClick={() => setPage("pricing")} icon={ArrowRight}>View Pricing</Button>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="flex items-center gap-6 mt-12 text-white/40 text-xs tracking-wide">
              <span>TRUSTED ACROSS</span>
              <span className="text-white/70 font-medium">United States</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/70 font-medium">United Kingdom</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/70 font-medium">Canada</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-white/70 font-medium">Australia</span>
            </div>
          </Reveal>
        </div>
        <Reveal delay={200}>
          <div className="relative">
            <div className="rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl p-8 md:p-10">
              <div className="flex items-center justify-between mb-8">
                <span className="text-white/50 text-xs tracking-widest uppercase">Live content signal</span>
                <span className="flex items-center gap-1.5 text-emerald-400 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Active
                </span>
              </div>
              <Waveform bars={44} className="h-40 w-full mb-8" color="#34D399" />
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Video, label: "AI Shorts", val: "50–100/mo" },
                  { icon: FileText, label: "SEO Blogs", val: "4–10/mo" },
                ].map((c, i) => (
                  <div key={i} className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
                    <c.icon size={16} className="text-emerald-400 mb-2" />
                    <div className="text-white text-sm font-semibold">{c.val}</div>
                    <div className="text-white/40 text-xs">{c.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Sections -------------------------------- */
function StatsBar() {
  return (
    <section className="bg-navy-900 py-16 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-10">
        {STATS.map((s, i) => (
          <Reveal key={i} delay={i * 80}>
            <Counter value={s.value} suffix={s.suffix} dark />
            <div className="text-white/45 text-xs mt-2 text-center tracking-wide">{s.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function WhyChooseUs() {
  const items = [
    { icon: Ear, title: "Built only for hearing care", desc: "Every script and post is written for audiology, never repurposed from a generic template." },
    { icon: Zap, title: "AI speed, human judgment", desc: "AI accelerates production; our editors keep every piece clinically sound and on-brand." },
    { icon: TrendingUp, title: "Content built to compound", desc: "SEO blogs and short videos designed to keep earning visibility months after publishing." },
    { icon: Shield, title: "Honest reporting, no fluff", desc: "You always know exactly what's been delivered — no inflated claims, no vague metrics." },
  ];
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <Eyebrow>Why Clinics Choose Us</Eyebrow>
          <h2 className="text-navy-900 text-3xl md:text-4xl font-medium max-w-xl" style={{ fontFamily: "'Fraunces', serif" }}>
            Marketing that understands hearing care from the inside
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {items.map((it, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="h-full rounded-2xl border border-navy-900/8 p-7 hover:shadow-[0_20px_50px_-20px_rgba(10,31,61,0.18)] hover:-translate-y-1 transition-all duration-300 bg-white">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 flex items-center justify-center mb-5">
                  <it.icon size={19} className="text-emerald-600" />
                </div>
                <h3 className="text-navy-900 font-semibold mb-2">{it.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{it.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowWeWork() {
  const steps = [
    { title: "Discover", desc: "We learn your clinic, patients, and current content gaps." },
    { title: "Research", desc: "Keyword and topic research built around real patient search behavior." },
    { title: "Produce", desc: "AI-assisted blogs and short videos, human-reviewed before delivery." },
    { title: "Deliver & Refine", desc: "Monthly delivery on schedule, with revisions built into every package." },
  ];
  return (
    <section className="bg-navy-950 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <Eyebrow dark>How We Work</Eyebrow>
          <h2 className="text-white text-3xl md:text-4xl font-medium max-w-xl" style={{ fontFamily: "'Fraunces', serif" }}>
            A steady rhythm, month after month
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-6 mt-14 relative">
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-white/10" />
          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center mb-5 relative z-10 backdrop-blur-xl">
                  <span className="font-mono text-emerald-400 text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>0{i + 1}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesPreview({ setPage }) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Our Services</Eyebrow>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Fraunces', serif" }}>Four services. One growth engine.</h2>
          </div>
          <Button variant="outlineDark" onClick={() => setPage("services")}>See all services</Button>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="h-full rounded-2xl bg-navy-950 p-7 hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 flex items-center justify-center mb-6 group-hover:bg-emerald-500/25 transition-colors">
                  <s.icon size={19} className="text-emerald-400" />
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{s.tagline}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPreview({ setPage }) {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-xl mx-auto">
          <Eyebrow>Pricing Preview</Eyebrow>
          <h2 className="text-navy-900 text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Fraunces', serif" }}>Simple packages, built to scale with your clinic</h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-14 items-start">
          {PLANS.map((p, i) => <PricingCard key={i} plan={p} delay={i * 100} />)}
        </div>
        <Reveal className="text-center mt-10">
          <Button variant="ghost" onClick={() => setPage("pricing")}>Compare full plan details</Button>
        </Reveal>
      </div>
    </section>
  );
}

function PricingCard({ plan, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className={`h-full rounded-[26px] p-8 relative transition-all duration-300 hover:-translate-y-2 ${plan.popular ? "bg-navy-950 border border-emerald-400/40 shadow-[0_30px_70px_-25px_rgba(16,185,129,0.35)]" : "bg-white border border-navy-900/8"}`}>
        {plan.popular && (
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-amber-300 text-navy-950 text-[11px] font-bold px-4 py-1.5 rounded-full">
            <Star size={11} fill="currentColor" /> MOST POPULAR
          </div>
        )}
        <h3 className={`font-semibold text-lg ${plan.popular ? "text-white" : "text-navy-900"}`}>{plan.name}</h3>
        <p className={`text-sm mt-1 ${plan.popular ? "text-white/50" : "text-slate-500"}`}>{plan.blurb}</p>
        <div className="flex items-baseline gap-1 mt-6 mb-7">
          <span className={`text-4xl font-semibold ${plan.popular ? "text-white" : "text-navy-900"}`} style={{ fontFamily: "'Fraunces', serif" }}>${plan.price}</span>
          <span className={plan.popular ? "text-white/40 text-sm" : "text-slate-400 text-sm"}>/month</span>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <Check size={15} className={`mt-0.5 shrink-0 ${plan.popular ? "text-emerald-400" : "text-emerald-600"}`} />
              <span className={plan.popular ? "text-white/75" : "text-slate-600"}>{f}</span>
            </li>
          ))}
        </ul>
        <Button variant={plan.popular ? "primary" : "outlineDark"} className="w-full">{plan.cta}</Button>
      </div>
    </Reveal>
  );
}

function TestimonialsSection() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="bg-navy-950 py-24">
      <div className="max-w-4xl mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <Eyebrow dark>Testimonials</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <Quote size={30} className="text-emerald-400/50 mx-auto mb-6" />
          <p className="text-white text-xl md:text-2xl leading-relaxed font-light" style={{ fontFamily: "'Fraunces', serif" }}>
            "{t.quote}"
          </p>
          <div className="mt-8">
            <div className="text-white font-semibold text-sm">{t.name}</div>
            <div className="text-white/40 text-xs mt-1">{t.role}</div>
          </div>
        </Reveal>
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all duration-300 ${idx === i ? "w-6 bg-emerald-400" : "w-1.5 bg-white/20"}`} aria-label={`Testimonial ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogPreview({ setPage }) {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <Eyebrow>Latest From The Blog</Eyebrow>
            <h2 className="text-navy-900 text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Fraunces', serif" }}>Notes on hearing-care marketing</h2>
          </div>
          <Button variant="outlineDark" onClick={() => setPage("blog")}>Visit the blog</Button>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6 mt-14">
          {BLOG_POSTS.slice(0, 3).map((p, i) => <BlogCard key={i} post={p} delay={i * 90} />)}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, delay = 0 }) {
  return (
    <Reveal delay={delay}>
      <div className="h-full rounded-2xl border border-navy-900/8 p-7 hover:shadow-[0_20px_50px_-20px_rgba(10,31,61,0.15)] hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center gap-3 text-xs text-emerald-600 font-medium mb-4">
          <span className="flex items-center gap-1"><Tag size={12} /> {post.category}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <span className="flex items-center gap-1 text-slate-400"><Clock size={12} /> {post.readTime}</span>
        </div>
        <h3 className="text-navy-900 font-semibold leading-snug mb-2.5">{post.title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-4">{post.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">Read article <ArrowRight size={13} /></span>
      </div>
    </Reveal>
  );
}

function FaqPreview({ setPage }) {
  return (
    <section className="bg-slate-50 py-24">
      <div className="max-w-3xl mx-auto px-5 md:px-8">
        <Reveal className="text-center mb-12">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="text-navy-900 text-3xl md:text-4xl font-medium" style={{ fontFamily: "'Fraunces', serif" }}>Common questions</h2>
        </Reveal>
        <FaqAccordion items={FAQS.slice(0, 5)} />
        <Reveal className="text-center mt-8">
          <Button variant="ghost" onClick={() => setPage("faq")}>See all 15 questions</Button>
        </Reveal>
      </div>
    </section>
  );
}

function FaqAccordion({ items }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <Reveal key={i} delay={i * 60}>
          <div className={`rounded-2xl border transition-colors duration-200 ${open === i ? "border-emerald-300 bg-white" : "border-navy-900/8 bg-white"}`}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between gap-4 text-left px-6 py-5">
              <span className="text-navy-900 font-medium text-sm md:text-base">{f.q}</span>
              {open === i ? <ChevronUp size={17} className="text-emerald-600 shrink-0" /> : <ChevronDown size={17} className="text-slate-400 shrink-0" />}
            </button>
            <div className="grid transition-all duration-300 ease-out" style={{ gridTemplateRows: open === i ? "1fr" : "0fr" }}>
              <div className="overflow-hidden">
                <p className="text-slate-500 text-sm leading-relaxed px-6 pb-5">{f.a}</p>
              </div>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function CTASection({ setPage }) {
  return (
    <section className="bg-navy-950 py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <Waveform bars={70} className="h-64 w-full max-w-5xl" color="#34D399" animate={false} />
      </div>
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center relative">
        <Reveal>
          <h2 className="text-white text-3xl md:text-5xl font-medium leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
            Ready for patients to hear about you first?
          </h2>
          <p className="text-white/55 mt-5 max-w-lg mx-auto">
            Tell us about your clinic and we'll reply within 24 business hours with next steps.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mt-9">
            <Button onClick={() => setPage("contact")}>Get Started Today</Button>
            <Button variant="outline" onClick={() => setPage("pricing")}>View Pricing</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* --------------------------------- Footer ---------------------------------- */
function Footer({ setPage }) {
  return (
    <footer className="bg-navy-950 border-t border-white/8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-10 pb-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center">
                <Ear size={18} className="text-emerald-400" />
              </span>
              <span className="text-white font-semibold text-lg" style={{ fontFamily: "'Fraunces', serif" }}>HearGrow Media</span>
            </div>
            <p className="text-white/45 text-sm leading-relaxed max-w-xs">AI-powered content marketing built exclusively for hearing aid clinics and audiology practices.</p>
            <div className="flex gap-3 mt-6">
              {[Facebook, Instagram, Linkedin, Twitter].map((Icon, i) => (
                <span key={i} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-400/30 transition-colors cursor-pointer">
                  <Icon size={15} />
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm text-white/45">
              {["services", "pricing", "portfolio", "blog", "faq"].map((id) => (
                <li key={id}><button onClick={() => { setPage(id); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="hover:text-emerald-400 transition-colors capitalize">{id}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-white/45">
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Privacy Policy</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Terms & Conditions</li>
              <li className="hover:text-emerald-400 transition-colors cursor-pointer">Cookies Policy</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Get in Touch</h4>
            <a href="mailto:heargrowmedia@gmail.com" className="flex items-center gap-2 text-emerald-400 text-sm hover:text-emerald-300 transition-colors">
              <Mail size={14} /> heargrowmedia@gmail.com
            </a>
            <p className="text-white/40 text-xs mt-3">We reply within 24 business hours.</p>
          </div>
        </div>
        <div className="border-t border-white/8 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-white/35 text-xs">
          <span>© {new Date().getFullYear()} HearGrow Media. All rights reserved.</span>
          <span className="flex items-center gap-1.5"><Waves size={12} /> Content that gets heard.</span>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Pages ----------------------------------- */
function HomePage({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <StatsBar />
      <WhyChooseUs />
      <HowWeWork />
      <ServicesPreview setPage={setPage} />
      <PricingPreview setPage={setPage} />
      <TestimonialsSection />
      <BlogPreview setPage={setPage} />
      <FaqPreview setPage={setPage} />
      <CTASection setPage={setPage} />
    </>
  );
}

function PageHero({ eyebrow, title, desc }) {
  return (
    <section className="bg-navy-950 pt-40 pb-20 relative overflow-hidden">
      <div className="absolute -top-20 right-[-5%] w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[110px]" />
      <div className="max-w-4xl mx-auto px-5 md:px-8 relative text-center">
        <Reveal>
          <Eyebrow dark>{eyebrow}</Eyebrow>
          <h1 className="text-white text-4xl md:text-5xl font-medium tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>{title}</h1>
          {desc && <p className="text-white/55 mt-5 max-w-xl mx-auto leading-relaxed">{desc}</p>}
        </Reveal>
      </div>
    </section>
  );
}

function AboutPage({ setPage }) {
  const industries = ["Independent Audiology Clinics", "Hearing Aid Retail Chains", "Multi-location Hearing Care Groups", "Hearing Device Manufacturers"];
  return (
    <>
      <PageHero eyebrow="About HearGrow Media" title="Content marketing built by people who studied hearing care first" desc="We didn't start as a generic agency that picked up a niche. We started because hearing clinics kept getting the same recycled marketing playbooks that never spoke to their patients." />
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 gap-16 items-start">
          <Reveal>
            <h2 className="text-navy-900 text-2xl font-semibold mb-4" style={{ fontFamily: "'Fraunces', serif" }}>Our Story</h2>
            <p className="text-slate-600 leading-relaxed mb-6">HearGrow Media began with a simple observation: hearing aid clinics were spending on marketing that was built for e-commerce brands, not healthcare practices. Patients researching hearing loss want clarity and trust, not sales pressure — so we built an agency around exactly that.</p>
            <h2 className="text-navy-900 text-2xl font-semibold mb-4 mt-10" style={{ fontFamily: "'Fraunces', serif" }}>Why We Started</h2>
            <p className="text-slate-600 leading-relaxed">Every clinic we spoke with had the same problem: inconsistent content, no clear SEO strategy, and no time to fix either. We built HearGrow to be the content engine clinics could rely on every single month, without hiring an in-house team.</p>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-6">
              <div className="rounded-2xl bg-slate-50 border border-navy-900/8 p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Target size={18} className="text-emerald-600" />
                  <h3 className="text-navy-900 font-semibold">Our Mission</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">To give every hearing care clinic content that earns patient trust before the first appointment ever happens.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-navy-900/8 p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Eye size={18} className="text-emerald-600" />
                  <h3 className="text-navy-900 font-semibold">Our Vision</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">A hearing care industry where every clinic, regardless of size, has access to content marketing built specifically for its patients.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 border border-navy-900/8 p-7">
                <div className="flex items-center gap-3 mb-3">
                  <Heart size={18} className="text-emerald-600" />
                  <h3 className="text-navy-900 font-semibold">Our Values</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">Honesty in every claim we make — no fabricated results, no inflated promises, just consistent, well-researched work.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal className="text-center mb-14">
            <Eyebrow>Our Workflow</Eyebrow>
            <h2 className="text-navy-900 text-3xl font-medium" style={{ fontFamily: "'Fraunces', serif" }}>From research to delivery</h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-6">
            {["Discover your clinic & patients", "Research keywords & topics", "Produce blogs & AI videos", "Deliver & refine monthly"].map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="bg-white rounded-2xl border border-navy-900/8 p-6 h-full">
                  <span className="font-mono text-emerald-600 text-xs" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>STEP 0{i + 1}</span>
                  <p className="text-navy-900 text-sm font-medium mt-3 leading-relaxed">{s}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <Reveal className="text-center mb-14">
            <Eyebrow>Industries We Serve</Eyebrow>
            <h2 className="text-navy-900 text-3xl font-medium" style={{ fontFamily: "'Fraunces', serif" }}>Focused entirely on hearing care</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {industries.map((ind, i) => (
              <Reveal key={i} delay={i * 90}>
                <div className="rounded-2xl bg-navy-950 p-6 h-full flex flex-col justify-between min-h-[140px]">
                  <Users size={18} className="text-emerald-400" />
                  <p className="text-white text-sm font-medium leading-snug mt-6">{ind}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CTASection setPage={setPage} />
    </>
  );
}

function ServicesPage({ setPage }) {
  return (
    <>
      <PageHero eyebrow="Our Services" title="Everything your clinic needs to grow online" desc="Four focused services, built to work together as one monthly content engine." />
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 space-y-8">
          {SERVICES.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className={`grid md:grid-cols-[auto_1fr_auto] gap-8 items-start rounded-[26px] p-9 border ${i % 2 === 0 ? "bg-slate-50 border-navy-900/8" : "bg-navy-950 border-white/10"}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${i % 2 === 0 ? "bg-emerald-100" : "bg-emerald-500/15"}`}>
                  <s.icon size={22} className={i % 2 === 0 ? "text-emerald-600" : "text-emerald-400"} />
                </div>
                <div>
                  <h3 className={`text-2xl font-semibold mb-2 ${i % 2 === 0 ? "text-navy-900" : "text-white"}`} style={{ fontFamily: "'Fraunces', serif" }}>{s.title}</h3>
                  <p className={`text-sm mb-5 ${i % 2 === 0 ? "text-slate-500" : "text-white/50"}`}>{s.tagline}</p>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-3 ${i % 2 === 0 ? "text-emerald-600" : "text-emerald-400"}`}>Benefits</div>
                      <ul className="space-y-2.5">
                        {s.benefits.map((b, j) => (
                          <li key={j} className={`text-sm flex items-start gap-2 ${i % 2 === 0 ? "text-slate-600" : "text-white/70"}`}>
                            <Check size={14} className="mt-0.5 shrink-0 text-emerald-500" /> {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className={`text-xs font-semibold uppercase tracking-wide mb-3 ${i % 2 === 0 ? "text-emerald-600" : "text-emerald-400"}`}>Features</div>
                      <ul className="space-y-2.5">
                        {s.features.map((f, j) => (
                          <li key={j} className={`text-sm flex items-start gap-2 ${i % 2 === 0 ? "text-slate-600" : "text-white/70"}`}>
                            <Sparkles size={14} className="mt-0.5 shrink-0 text-emerald-500" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                <Button variant={i % 2 === 0 ? "outlineDark" : "outline"} onClick={() => setPage("contact")} className="shrink-0 self-start md:self-center">Get Started</Button>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <WaveDivider />
      <CTASection setPage={setPage} />
    </>
  );
}

function PricingPage({ setPage }) {
  return (
    <>
      <PageHero eyebrow="Pricing" title="Straightforward packages for every stage of growth" desc="No hidden fees, no surprise add-ons — just clear monthly packages built around what your clinic actually needs." />
      <section className="bg-slate-50 py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-3 gap-6 items-start">
            {PLANS.map((p, i) => <PricingCard key={i} plan={p} delay={i * 100} />)}
          </div>
          <Reveal className="text-center mt-16 max-w-xl mx-auto">
            <p className="text-slate-500 text-sm">All packages include keyword research, SEO metadata, and a monthly content calendar. Need something custom for a multi-location group? <button onClick={() => setPage("contact")} className="text-emerald-600 font-medium underline underline-offset-2">Reach out</button> and we'll build a plan around your clinics.</p>
          </Reveal>
        </div>
      </section>
      <FaqPreview setPage={setPage} />
    </>
  );
}

function PortfolioPage({ setPage }) {
  return (
    <>
      <PageHero eyebrow="Portfolio" title="Work built for real hearing care clinics" desc="A sample of the content sprints, blog clusters, and video series we've produced for clinics across four markets." />
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="h-full rounded-2xl border border-navy-900/8 overflow-hidden hover:shadow-[0_20px_50px_-20px_rgba(10,31,61,0.18)] hover:-translate-y-1 transition-all duration-300">
                <div className="h-36 bg-navy-950 flex items-center justify-center relative overflow-hidden">
                  <Waveform bars={30} className="h-14 w-40 opacity-60" color="#34D399" />
                  <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-wide uppercase text-emerald-300 bg-emerald-500/15 px-2.5 py-1 rounded-full">{p.type}</span>
                </div>
                <div className="p-6">
                  <div className="text-xs text-slate-400 mb-2 flex items-center gap-1.5"><MapPin size={12} /> {p.niche}</div>
                  <h3 className="text-navy-900 font-semibold mb-2">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CTASection setPage={setPage} />
    </>
  );
}

function BlogPage() {
  const [query, setQuery] = useState("");
  const categories = ["All", "SEO", "Video Marketing", "Content Strategy"];
  const [cat, setCat] = useState("All");
  const filtered = BLOG_POSTS.filter(
    (p) => (cat === "All" || p.category === cat) && p.title.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <PageHero eyebrow="Blog" title="Notes on marketing for hearing care" desc="Practical, no-fluff articles on SEO, video, and content strategy for hearing aid clinics." />
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1fr_280px] gap-14">
          <div>
            <div className="relative mb-8">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-11 pr-4 py-3.5 rounded-full border border-navy-900/12 text-sm outline-none focus:border-emerald-400 transition-colors"
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((c) => (
                <button key={c} onClick={() => setCat(c)} className={`px-4 py-2 rounded-full text-xs font-medium transition-colors ${cat === c ? "bg-navy-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>{c}</button>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {filtered.length ? filtered.map((p, i) => <BlogCard key={i} post={p} delay={i * 70} />) : (
                <p className="text-slate-400 text-sm col-span-2">No articles match your search yet.</p>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mt-14">
              {[1, 2, 3].map((n) => (
                <button key={n} className={`w-9 h-9 rounded-full text-sm font-medium transition-colors ${n === 1 ? "bg-navy-950 text-white" : "text-slate-500 hover:bg-slate-100"}`}>{n}</button>
              ))}
            </div>
          </div>
          <aside className="space-y-8">
            <div className="rounded-2xl bg-slate-50 border border-navy-900/8 p-6">
              <h4 className="text-navy-900 font-semibold mb-4 text-sm">Categories</h4>
              <ul className="space-y-2.5 text-sm text-slate-500">
                {categories.slice(1).map((c) => <li key={c} className="hover:text-emerald-600 cursor-pointer transition-colors" onClick={() => setCat(c)}>{c}</li>)}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy-950 p-6">
              <h4 className="text-white font-semibold mb-2 text-sm">Get monthly insights</h4>
              <p className="text-white/50 text-xs mb-4 leading-relaxed">One email a month on hearing-care marketing. No spam.</p>
              <div className="flex gap-2">
                <input placeholder="you@clinic.com" className="min-w-0 flex-1 px-3 py-2.5 rounded-full bg-white/10 border border-white/10 text-white placeholder:text-white/30 text-xs outline-none focus:border-emerald-400" />
                <button className="w-9 h-9 shrink-0 rounded-full bg-emerald-500 flex items-center justify-center hover:bg-emerald-400 transition-colors"><Send size={13} className="text-navy-950" /></button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function FAQPage({ setPage }) {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently asked questions" desc="Everything clinics usually ask before starting with HearGrow Media." />
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-5 md:px-8">
          <FaqAccordion items={FAQS} />
        </div>
      </section>
      <CTASection setPage={setPage} />
    </>
  );
}

// Replace YOUR_FORM_ID with your real Formspree form ID after setup (see instructions provided).
// e.g. "https://formspree.io/f/abcdwxyz"
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

function ContactPage() {
  const [form, setForm] = useState({ name: "", business: "", email: "", website: "", country: "", message: "" });
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | error
  const [errors, setErrors] = useState({});
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Full name is required.";
    if (!form.business.trim()) errs.business = "Business name is required.";
    if (!form.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address.";
    }
    if (!form.country) errs.country = "Please select a country.";
    if (!form.message.trim() || form.message.trim().length < 10) {
      errs.message = "Message should be at least 10 characters.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      setStatus("error");
      setErrors({ form: "Form is not connected yet — replace FORMSPREE_ENDPOINT with your real Formspree URL." });
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          "Full Name": form.name,
          "Business Name": form.business,
          "Email Address": form.email,
          "Clinic Website": form.website || "Not provided",
          Country: form.country,
          Message: form.message,
          _subject: `New inquiry from ${form.name} (${form.business})`,
        }),
      });
      if (res.ok) {
        setStatus("idle");
        setSent(true);
      } else {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrors({ form: data?.errors?.[0]?.message || "Something went wrong sending your message. Please try again or email us directly." });
      }
    } catch (err) {
      setStatus("error");
      setErrors({ form: "Network error — please check your connection and try again, or email us directly." });
    }
  };

  return (
    <>
      <PageHero eyebrow="Contact" title="Let's talk about your clinic's growth" desc="Send us a message and we'll reply within 24 business hours — every conversation happens over email." />
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-5 md:px-8 grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <Reveal>
            <div className="rounded-[26px] bg-navy-950 p-9 h-full">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center mb-6">
                <Mail size={20} className="text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">Email us directly</h3>
              <a href="mailto:heargrowmedia@gmail.com" className="text-emerald-400 text-sm font-medium">heargrowmedia@gmail.com</a>
              <p className="text-white/45 text-sm leading-relaxed mt-6">We keep communication to email only, so every request, revision, and approval stays clearly documented in one place.</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <div className="text-white/40 text-xs uppercase tracking-wide mb-2">Response time</div>
                <div className="text-white text-sm font-medium">Within 24 business hours</div>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100}>
            {sent ? (
              <div className="rounded-[26px] bg-white border border-emerald-200 p-10 h-full flex flex-col items-center justify-center text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
                  <Check size={24} className="text-emerald-600" />
                </div>
                <h3 className="text-navy-900 font-semibold text-lg mb-2">Thank you for contacting HearGrow Media.</h3>
                <p className="text-slate-500 text-sm max-w-sm">We have received your message and will reply within 24 business hours.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="rounded-[26px] bg-white border border-navy-900/8 p-9 space-y-5">
                {errors.form && (
                  <div className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                    <X size={15} className="mt-0.5 shrink-0" />
                    <span>{errors.form}</span>
                  </div>
                )}
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Full Name" value={form.name} onChange={update("name")} error={errors.name} />
                  <Field label="Business Name" value={form.business} onChange={update("business")} error={errors.business} />
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label="Email Address" type="email" value={form.email} onChange={update("email")} error={errors.email} />
                  <Field label="Clinic Website (optional)" value={form.website} onChange={update("website")} />
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Country</label>
                  <select value={form.country} onChange={update("country")} className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-400 transition-colors bg-white ${errors.country ? "border-red-300" : "border-navy-900/12"}`}>
                    <option value="">Select country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Other</option>
                  </select>
                  {errors.country && <p className="text-red-500 text-xs mt-1.5">{errors.country}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-500 mb-1.5 block">Message</label>
                  <textarea value={form.message} onChange={update("message")} rows={4} className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-400 transition-colors resize-none ${errors.message ? "border-red-300" : "border-navy-900/12"}`} placeholder="Tell us about your clinic and goals..." />
                  {errors.message && <p className="text-red-500 text-xs mt-1.5">{errors.message}</p>}
                </div>
                <Button type="submit" disabled={status === "loading"} className="w-full justify-center" icon={status === "loading" ? Clock : Send}>
                  {status === "loading" ? "Sending..." : "Send Message"}
                </Button>
                <p className="text-center text-xs text-slate-400">Your message goes straight to heargrowmedia@gmail.com.</p>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500 mb-1.5 block">{label}</label>
      <input {...props} className={`w-full px-4 py-3 rounded-xl border text-sm outline-none focus:border-emerald-400 transition-colors ${error ? "border-red-300" : "border-navy-900/12"}`} />
      {error && <p className="text-red-500 text-xs mt-1.5">{error}</p>}
    </div>
  );
}

/* ------------------------------ Back to top -------------------------------- */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-emerald-500 text-navy-950 flex items-center justify-center shadow-lg hover:bg-emerald-400 hover:-translate-y-1 transition-all duration-300"
      aria-label="Back to top"
    >
      <ArrowUp size={17} />
    </button>
  );
}

/* ---------------------------------- App ------------------------------------ */
export default function App() {
  const [page, setPage] = useState("home");
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const setPageAndScroll = useCallback((id) => {
    setPage(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const pages = {
    home: <HomePage setPage={setPageAndScroll} />,
    about: <AboutPage setPage={setPageAndScroll} />,
    services: <ServicesPage setPage={setPageAndScroll} />,
    pricing: <PricingPage setPage={setPageAndScroll} />,
    portfolio: <PortfolioPage setPage={setPageAndScroll} />,
    blog: <BlogPage />,
    faq: <FAQPage setPage={setPageAndScroll} />,
    contact: <ContactPage />,
  };

  return (
    <div className={dark ? "dark" : ""}>
      <style>{`
        ${FONT_IMPORT}
        * { font-family: 'Inter', sans-serif; }
        .font-mono, [style*="IBM Plex Mono"] { font-family: 'IBM Plex Mono', monospace; }
        html { scroll-behavior: smooth; }
        body { background: #ffffff; }
        .bg-navy-950 { background-color: #081527; }
        .bg-navy-900 { background-color: #0c1f38; }
        .text-navy-900 { color: #0c1f38; }
        .border-navy-900\\/8 { border-color: rgba(12,31,56,0.08); }
        .border-navy-900\\/12 { border-color: rgba(12,31,56,0.12); }
        .border-navy-900\\/20 { border-color: rgba(12,31,56,0.20); }
        .bg-navy-900\\/5 { background-color: rgba(12,31,56,0.05); }
        .text-navy-900\\/5 { color: rgba(12,31,56,0.05); }
        ::selection { background: #34D399; color: #081527; }
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .animate-wave { animation: wave 1.6s ease-in-out infinite; transform-origin: bottom; }
        @media (prefers-reduced-motion: reduce) {
          .animate-wave, * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        input:focus, textarea:focus, select:focus { box-shadow: 0 0 0 3px rgba(52,211,153,0.15); }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #081527; }
        ::-webkit-scrollbar-thumb { background: #1b3a5c; border-radius: 10px; }
      `}</style>

      {loading && (
        <div className="fixed inset-0 z-[100] bg-navy-950 flex flex-col items-center justify-center gap-6">
          <Waveform bars={28} className="h-12 w-32" color="#34D399" />
          <span className="text-white/50 text-xs tracking-[0.2em] uppercase">HearGrow Media</span>
        </div>
      )}

      <div className="bg-white min-h-screen">
        <Navbar page={page} setPage={setPageAndScroll} dark={dark} setDark={setDark} />
        <main>{pages[page]}</main>
        <Footer setPage={setPageAndScroll} />
        <BackToTop />
      </div>
    </div>
  );
}
