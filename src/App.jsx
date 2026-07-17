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
  {
    id: "local-seo-hearing-clinics",
    title: "Why Local SEO Matters More Than Ever for Hearing Clinics",
    category: "SEO",
    readTime: "6 min read",
    excerpt: "Most patients now find their audiologist through a search, not a referral. Here's how local SEO changes the growth math for hearing clinics.",
    body: [
      "A decade ago, most new patients found a hearing clinic through a referral from a family doctor or a recommendation from a friend. That's changed. Today, the majority of new patients start with a search — \"hearing test near me,\" \"audiologist [city],\" or \"why do my ears feel muffled.\" If your clinic isn't visible in those searches, you're invisible to the exact people ready to book.",
      "Local SEO is the practice of making sure your clinic shows up when nearby patients search for hearing-related help. It includes your Google Business Profile, location-specific pages on your website, consistent name-address-phone details across the web, and content that answers the questions local patients are actually typing in.",
      "The clinics that win here aren't necessarily the biggest — they're the ones publishing consistently. A monthly blog post targeting a specific local search term, paired with an optimized Google Business Profile, does more for new-patient volume than almost any paid ad campaign, and the results compound over time instead of stopping the moment you stop paying.",
      "If you haven't touched your local SEO in the past six months, that's usually the single highest-leverage place to start. Even fixing basic things — outdated hours, missing service pages, no recent posts — can shift how often you show up in local search results within a few weeks.",
    ],
  },
  {
    id: "video-ideas-hearing-clinics",
    title: "5 Video Ideas Every Hearing Aid Clinic Should Be Posting",
    category: "Video Marketing",
    readTime: "5 min read",
    excerpt: "Short-form video works differently for healthcare than it does for retail. These five formats consistently earn trust and bookings.",
    body: [
      "Short-form video isn't just for retail brands and dance trends — it's become one of the most effective trust-building tools for healthcare practices, including hearing clinics. Patients researching hearing loss are often anxious or unsure what to expect, and a short, clear video can do more to ease that than a page of text.",
      "1. \"What to expect at your first hearing test\" — a simple walkthrough removes fear of the unknown, which is often the biggest barrier to booking.",
      "2. \"Signs you might need a hearing test\" — short, relatable clips built around common symptoms tend to get shared within families, since someone always knows someone.",
      "3. Patient-journey explainers — without using real patient identities, walking through what a typical fitting and adjustment period looks like builds realistic expectations.",
      "4. Staff introductions — a 15-second clip introducing your audiologist by name and specialty humanizes the practice before a patient ever walks in.",
      "5. Myth-busting clips — short videos correcting common misconceptions (\"hearing aids are only for elderly patients,\" \"they're bulky and obvious\") tend to perform especially well because they challenge an assumption the viewer already holds.",
      "None of these require expensive production. Clarity and consistency matter far more than polish — a clinic posting one simple video a week will usually outperform one that posts a highly produced video once a quarter.",
    ],
  },
  {
    id: "one-blog-post-month-of-content",
    title: "How to Turn One Blog Post Into a Month of Content",
    category: "Content Strategy",
    readTime: "7 min read",
    excerpt: "A single well-researched article can fuel weeks of social captions, short videos, and email content. Here's the breakdown.",
    body: [
      "Most clinics think of content creation as starting from a blank page every single time — a new blog post, a new video script, a new social caption, each researched separately. That approach burns out fast. The clinics that publish consistently do the opposite: they research once, then repurpose several times.",
      "Start with one well-researched, 1,000-word blog post on a topic your patients actually search for — say, \"how hearing loss affects balance.\" That single article can become: three to four short-form video scripts (each covering one sub-point from the article), five to six social captions pulling out individual facts or stats, an email newsletter section, and even a printed handout for your waiting room.",
      "The key is treating the blog post as raw material, not a finished, standalone product. Every statistic, every patient question it answers, and every myth it corrects is a separate piece of content waiting to be pulled out and reformatted.",
      "This is also why a monthly content calendar matters more than people expect — when topics are planned a month ahead, it's much easier to see these repurposing opportunities before you're already mid-month and scrambling for the next post idea.",
    ],
  },
  {
    id: "keywords-hearing-clinics-missing",
    title: "The Keywords Hearing Clinics Are Missing",
    category: "SEO",
    readTime: "8 min read",
    excerpt: "Beyond \"hearing aids near me,\" there's a layer of long-tail search terms most clinics never target — and it's where the easiest wins live.",
    body: [
      "Every hearing clinic knows to target \"hearing aids near me\" and \"audiologist [city].\" The problem is that everyone else knows to target those same terms too — which makes them some of the most competitive keywords in the industry. Meanwhile, a whole layer of less obvious, lower-competition search terms goes almost completely untouched.",
      "Long-tail keywords — longer, more specific search phrases — tend to have lower search volume individually, but they're also far easier to rank for, and the people searching them are often further along in their decision process. Someone searching \"why does my hearing aid whistle\" or \"can tinnitus be temporary after a cold\" is actively trying to solve a problem right now, not just browsing.",
      "Some overlooked categories worth targeting: symptom-based questions (\"why do I struggle to hear in restaurants\"), comparison searches (\"behind-the-ear vs in-ear hearing aids\"), maintenance and troubleshooting (\"how to clean hearing aid dome\"), and insurance or cost questions specific to your region.",
      "The clinics that consistently rank well aren't necessarily targeting the single highest-volume keyword — they're covering dozens of these smaller, specific questions across a library of blog content, which adds up to significantly more total organic traffic than chasing one competitive phrase alone.",
    ],
  },
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

function Button({ children, variant = "primary", onClick, className = "", icon: Icon = ArrowRight, disabled = fa
