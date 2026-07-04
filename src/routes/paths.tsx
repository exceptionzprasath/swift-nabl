import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Award, Clock, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { learningPaths } from "@/lib/mock-data";

export const Route = createFileRoute("/paths")({
  component: PathsPage,
  head: () => ({ meta: [{ title: "Learning Paths — SWIFT·NABL" }] }),
});

function PathsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-mesh border-b">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h1 className="font-display text-4xl md:text-5xl font-bold">Structured learning paths</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl">Guided journeys tailored to your role — from Lab Analyst to NABL Internal Auditor and Technical Signatory.</p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-6 py-12 grid gap-6 md:grid-cols-2">
        {learningPaths.map((p, i) => (
          <motion.div key={p.title}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="relative overflow-hidden rounded-3xl border bg-card p-8 hover:shadow-elegant transition-all">
            <div className={`absolute -top-16 -right-16 h-56 w-56 rounded-full bg-gradient-to-br ${p.color} opacity-20 blur-3xl`} />
            <GraduationCap className="h-10 w-10 text-primary" />
            <h2 className="mt-5 font-display text-2xl font-bold">{p.title}</h2>
            <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {p.courses} courses</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {p.duration}</span>
              <Badge variant="outline">{p.level}</Badge>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              A curated sequence of courses, assessments, and hands-on templates leading to a verified certification.
            </p>
            <Button asChild className="mt-6 bg-hero text-white">
              <Link to="/courses">Start path <ArrowRight className="h-4 w-4 ml-1" /></Link>
            </Button>
          </motion.div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
