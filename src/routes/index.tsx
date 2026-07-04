import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Activity, Award, BookOpen, CheckCircle2, ChevronDown, ChevronRight, FlaskConical,
  GraduationCap, Microscope, PlayCircle, ShieldCheck, Sparkles, Star, TestTube2, TrendingUp, Users,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CourseCard } from "@/components/site/course-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses, faqs, learningPaths, stats, testimonials } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <TrustBar />
      <Categories />
      <FeaturedCourses />
      <Paths />
      <Features />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-mesh">
      <div className="mx-auto max-w-7xl px-6 pt-10 pb-20 md:pt-16 md:pb-28 grid gap-12 lg:grid-cols-2 items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            <Sparkles className="h-3 w-3 mr-1" /> India's #1 NABL Learning Platform
          </Badge>
          <h1 className="mt-5 font-display text-4xl md:text-6xl font-bold leading-[1.05] tracking-tight">
            Become a Certified <span className="gradient-text">NABL Professional</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl">
            Master ISO/IEC 17025, ISO 15189, proficiency testing, measurement uncertainty and
            laboratory quality management — programs built by former NABL assessors.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-hero text-white shadow-elegant hover:opacity-95">
              <Link to="/courses">Browse Courses <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/dashboard">Start Learning</Link>
            </Button>
            <Button size="lg" variant="ghost" className="gap-2">
              <PlayCircle className="h-5 w-5" /> Watch Demo
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-4 max-w-lg">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-xl md:text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <DashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}

function DashboardPreview() {
  return (
    <div className="relative">
      <div className="absolute -top-8 -left-6 w-40 h-40 rounded-full bg-primary/25 blur-3xl animate-float" />
      <div className="absolute -bottom-8 -right-6 w-56 h-56 rounded-full bg-secondary/25 blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="relative glass rounded-3xl p-5 shadow-elegant">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-xs text-muted-foreground">Lab Analytics</div>
            <div className="font-display font-semibold">SRL Diagnostics — Q4</div>
          </div>
          <Badge className="bg-secondary/15 text-secondary border-0">Live</Badge>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: Users, v: "1,284", l: "Analysts", c: "text-primary" },
            { icon: Award, v: "312", l: "Certified", c: "text-secondary" },
            { icon: TrendingUp, v: "94%", l: "Pass rate", c: "text-accent-foreground" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl bg-card p-3 shadow-soft">
              <s.icon className={`h-4 w-4 ${s.c}`} />
              <div className="mt-2 font-display font-bold text-lg">{s.v}</div>
              <div className="text-[10px] text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-xl bg-card p-4 shadow-soft">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-medium">NABL Readiness</div>
            <div className="text-sm font-bold text-secondary">86%</div>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "86%" }} transition={{ duration: 1.2, delay: 0.4 }} className="h-full bg-hero" />
          </div>
          <div className="mt-4 space-y-2">
            {[
              { t: "ISO/IEC 17025 clauses", p: 95 },
              { t: "Documented information", p: 82 },
              { t: "Measurement traceability", p: 78 },
            ].map((r) => (
              <div key={r.t} className="flex items-center gap-3">
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary" />
                <div className="flex-1 text-xs">{r.t}</div>
                <div className="text-xs font-medium">{r.p}%</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrustBar() {
  const partners = ["SRL", "Metropolis", "Dr. Lal", "Thyrocare", "Neuberg", "AIIMS", "Apollo Dx", "Vijaya"];
  return (
    <section className="border-y bg-card/60">
      <div className="mx-auto max-w-7xl px-6 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Trusted by 620+ NABL labs</span>
        {partners.map((p) => (
          <span key={p} className="font-display font-semibold text-foreground/60">{p}</span>
        ))}
      </div>
    </section>
  );
}

function Categories() {
  const cats = [
    { icon: ShieldCheck, name: "NABL Accreditation", count: 6 },
    { icon: FlaskConical, name: "ISO/IEC 17025", count: 5 },
    { icon: TestTube2, name: "ISO 15189 Medical Labs", count: 4 },
    { icon: Microscope, name: "Method Validation", count: 5 },
    { icon: BookOpen, name: "Documentation & SOPs", count: 6 },
    { icon: Activity, name: "Measurement Uncertainty", count: 4 },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <SectionHeader eyebrow="Explore" title="Browse by category" desc="Curated tracks covering every domain of laboratory accreditation." />
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cats.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <Link to="/courses" className="group flex items-center gap-4 rounded-2xl border bg-card p-5 hover:shadow-elegant transition-all">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary group-hover:bg-hero group-hover:text-white transition-colors">
                <c.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold">{c.name}</div>
                <div className="text-xs text-muted-foreground">{c.count} courses</div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FeaturedCourses() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
        <SectionHeader eyebrow="Featured" title="Popular courses this month" desc="Learn from former NABL assessors and lab quality leaders." />
        <Button asChild variant="outline"><Link to="/courses">View all</Link></Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {courses.slice(0, 8).map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
      </div>
    </section>
  );
}

function Paths() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <SectionHeader eyebrow="Career tracks" title="Structured learning paths" desc="Follow a guided journey to become certified in your role." />
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {learningPaths.map((p, i) => (
          <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative overflow-hidden rounded-2xl border bg-card p-6 hover:shadow-elegant transition-all">
            <div className={`absolute -top-10 -right-10 h-32 w-32 rounded-full bg-gradient-to-br ${p.color} opacity-20 blur-2xl`} />
            <GraduationCap className="h-8 w-8 text-primary" />
            <h3 className="mt-4 font-display font-semibold text-lg">{p.title}</h3>
            <div className="mt-2 text-xs text-muted-foreground">{p.courses} courses · {p.duration}</div>
            <Badge variant="outline" className="mt-4">{p.level}</Badge>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features() {
  const feats = [
    { icon: Award, title: "Verified Certificates", desc: "QR-verified digital certificates recognized by 600+ NABL labs across India." },
    { icon: Sparkles, title: "AI Lab Tutor", desc: "Get instant clause explanations, generate SOPs, uncertainty budgets and audit checklists on demand." },
    { icon: BookOpen, title: "SOP Document Library", desc: "1,000+ ready-to-use policies, formats, checklists, and QMS manuals." },
    { icon: Users, title: "Live Expert Sessions", desc: "Weekly live classes and Q&A with NABL assessors and lab technical managers." },
    { icon: ShieldCheck, title: "Mock Assessments", desc: "Practice with real lab non-conformities and get instant gap analysis reports." },
    { icon: TrendingUp, title: "Enterprise Analytics", desc: "Track your entire lab's accreditation readiness in one dashboard." },
  ];
  return (
    <section className="bg-mesh py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Why SWIFT·NABL" title="Everything your lab needs — in one platform" desc="Beyond courses. A complete quality and accreditation ecosystem." />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {feats.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:shadow-elegant transition-all">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-hero text-white shadow-elegant">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display font-semibold text-lg">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-20">
      <SectionHeader eyebrow="Loved by leaders" title="What quality heads are saying" />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div key={t.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }}
            className="rounded-2xl border bg-card p-6 shadow-card">
            <div className="flex gap-1 text-warning">
              {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-4 w-4 fill-current" />)}
            </div>
            <p className="mt-4 text-sm leading-relaxed">"{t.quote}"</p>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-hero grid place-items-center text-white font-semibold text-sm">
                {t.name.split(" ").slice(-2).map(x => x[0]).join("")}
              </div>
              <div>
                <div className="font-medium text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
      <SectionHeader eyebrow="FAQ" title="Frequently asked questions" />
      <div className="mt-10 space-y-3">
        {faqs.map((f, i) => (
          <div key={i} className="rounded-2xl border bg-card overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center gap-3 p-5 text-left">
              <div className="font-display font-semibold flex-1">{f.q}</div>
              <ChevronDown className={`h-4 w-4 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            {open === i && <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="relative overflow-hidden rounded-3xl bg-hero p-8 md:p-16 text-white shadow-elegant">
        <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-3xl md:text-5xl font-bold leading-tight">
            Ready to transform your lab's accreditation journey?
          </h2>
          <p className="mt-4 text-white/85 text-lg">
            Join 18,400+ laboratory professionals building compliant, world-class NABL labs.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90"><Link to="/courses">Explore Courses</Link></Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white/40 text-white hover:bg-white/10">
              <Link to="/dashboard">Enterprise Demo</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="max-w-2xl">
      <div className="text-xs font-semibold uppercase tracking-widest text-primary">{eyebrow}</div>
      <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      {desc && <p className="mt-3 text-muted-foreground">{desc}</p>}
    </div>
  );
}
