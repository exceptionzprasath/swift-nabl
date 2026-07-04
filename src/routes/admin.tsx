import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Activity, Award, BookOpen, Building2, DollarSign, ShieldAlert, TrendingUp, Users } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/admin")({
  component: AdminDash,
  head: () => ({ meta: [{ title: "Admin Dashboard — SWIFT·NABL" }] }),
});

const growth = Array.from({ length: 12 }).map((_, i) => ({
  m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
  users: 800 + i * 320 + Math.round(Math.random() * 200),
  revenue: 4 + i * 1.8 + Math.random() * 2,
}));

const catData = [
  { c: "ISO 17025", n: 4200 }, { c: "ISO 15189", n: 3100 },
  { c: "Uncertainty", n: 2800 }, { c: "CAPA / RCA", n: 2200 },
  { c: "GLP", n: 1900 }, { c: "IQC", n: 1750 },
];

function AdminDash() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <div className="text-white/80 text-sm">System Admin</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Platform overview</h1>
          <p className="mt-2 text-white/85">All labs · all instructors · all learners.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {[
            { i: Users, l: "Total learners", v: "18,412", d: "+12%" },
            { i: Building2, l: "Enterprise labs", v: "624", d: "+34" },
            { i: BookOpen, l: "Courses live", v: "22", d: "+3" },
            { i: DollarSign, l: "MRR (₹)", v: "48.2L", d: "+19%" },
          ].map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card p-5 shadow-card">
              <s.i className="h-5 w-5 text-primary" />
              <div className="font-display font-bold text-2xl mt-2">{s.v}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-2">
                {s.l} <Badge variant="outline" className="text-[10px] text-secondary border-secondary/40">{s.d}</Badge>
              </div>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display font-bold text-lg">Growth</div>
              <Badge variant="outline">Learners · Revenue</Badge>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <AreaChart data={growth}>
                  <defs>
                    <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="users" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g1)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="font-display font-bold text-lg mb-4">Enrollments by category</div>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={catData} layout="vertical">
                  <XAxis type="number" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis dataKey="c" type="category" stroke="var(--muted-foreground)" fontSize={11} width={90} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="n" fill="var(--secondary)" radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="font-display font-bold">Enterprise labs — accreditation readiness</div>
              <Button size="sm" variant="outline">Export</Button>
            </div>
            <div className="space-y-4">
              {[
                { n: "SRL Diagnostics", p: 92 },
                { n: "Metropolis Labs", p: 86 },
                { n: "Dr. Lal PathLabs", p: 78 },
                { n: "Neuberg Diagnostics", p: 74 },
                { n: "Thyrocare", p: 68 },
              ].map((l) => (
                <div key={l.n}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{l.n}</span>
                    <span className="text-muted-foreground">{l.p}%</span>
                  </div>
                  <Progress value={l.p} className="h-2" />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShieldAlert className="h-4 w-4 text-warning" />
              <div className="font-display font-bold">System health</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { i: Activity, l: "Uptime (30d)", v: "99.98%" },
                { i: TrendingUp, l: "Avg completion", v: "78%" },
                { i: Award, l: "Certificates issued", v: "6,842" },
                { i: Users, l: "DAU / MAU", v: "42%" },
              ].map((k) => (
                <div key={k.l} className="rounded-xl bg-muted/40 p-4">
                  <k.i className="h-4 w-4 text-primary" />
                  <div className="font-display font-bold text-xl mt-2">{k.v}</div>
                  <div className="text-xs text-muted-foreground">{k.l}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {["New instructor application: Dr. Neha Bhatt", "Refund request #4821 · pending review", "Content flagged in ISO 17025 course"].map((n, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg border p-2.5">
                  <span className="text-sm">{n}</span>
                  <Button size="sm" variant="ghost">Review</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
