import { createFileRoute } from "@tanstack/react-router";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { BookOpen, DollarSign, MessageSquare, Star, TrendingUp, Users } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/instructor")({
  component: InstructorDash,
  head: () => ({ meta: [{ title: "Instructor Dashboard — SWIFT·NABL" }] }),
});

const revenueData = [
  { m: "Feb", r: 42 }, { m: "Mar", r: 58 }, { m: "Apr", r: 71 },
  { m: "May", r: 83 }, { m: "Jun", r: 96 }, { m: "Jul", r: 118 },
];
const enrollBySrc = [
  { name: "Direct", value: 42 }, { name: "Search", value: 28 },
  { name: "Referral", value: 18 }, { name: "Ads", value: 12 },
];
const PIE_COLORS = ["#0057B8", "#00A676", "#f59e0b", "#8b5cf6"];

function InstructorDash() {
  const myCourses = courses.slice(0, 5);
  const stats = [
    { icon: Users, l: "Students", v: "12,480", d: "+8.2%" },
    { icon: DollarSign, l: "Revenue (₹)", v: "18.4L", d: "+22%" },
    { icon: Star, l: "Avg rating", v: "4.86", d: "+0.04" },
    { icon: BookOpen, l: "Active courses", v: "12", d: "+2" },
  ];
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10">
          <div className="text-white/80 text-sm">Instructor</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Welcome back, Dr. Anjali Rao 👋</h1>
          <p className="mt-2 text-white/85">Your courses reached 892 new learners this month.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 space-y-6">
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="rounded-2xl border bg-card p-5 shadow-card">
              <s.icon className="h-5 w-5 text-primary" />
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
              <div className="font-display font-bold text-lg">Revenue (last 6 months)</div>
              <Badge variant="outline">₹ in Lakhs</Badge>
            </div>
            <div className="h-72">
              <ResponsiveContainer>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="m" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Bar dataKey="r" fill="var(--primary)" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5">
            <div className="font-display font-bold text-lg mb-4">Enrollment sources</div>
            <div className="h-64">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={enrollBySrc} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={3}>
                    {enrollBySrc.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b">
            <div className="font-display font-bold text-lg">My courses</div>
            <Button size="sm" className="bg-hero text-white">Create new</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[720px]">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b">
                  <th className="text-left p-4">Course</th>
                  <th className="text-left p-4">Students</th>
                  <th className="text-left p-4">Rating</th>
                  <th className="text-left p-4">Revenue</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {myCourses.map((c) => (
                  <tr key={c.id} className="border-b last:border-0 hover:bg-muted/40">
                    <td className="p-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={c.image} className="h-10 w-14 object-cover rounded" alt="" />
                        <div className="min-w-0">
                          <div className="font-medium truncate">{c.title}</div>
                          <div className="text-xs text-muted-foreground">{c.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">{c.students.toLocaleString()}</td>
                    <td className="p-4"><span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" /> {c.rating}</span></td>
                    <td className="p-4">₹{(c.students * c.price / 100000).toFixed(1)}L</td>
                    <td className="p-4"><Badge className="bg-secondary/15 text-secondary border-0">Published</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="h-4 w-4 text-primary" />
              <div className="font-display font-bold">Recent Q&A</div>
            </div>
            <div className="space-y-3">
              {[
                { u: "Rakesh V.", c: "Uncertainty in pH measurement", t: "2h ago" },
                { u: "Meera I.", c: "Difference between IQC and PT", t: "5h ago" },
                { u: "Anita K.", c: "Traceability chain for micropipettes", t: "1d ago" },
              ].map((q) => (
                <div key={q.u} className="rounded-lg border p-3">
                  <div className="text-sm font-medium">{q.c}</div>
                  <div className="text-xs text-muted-foreground mt-1">{q.u} · {q.t}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-secondary" />
              <div className="font-display font-bold">Top performing lessons</div>
            </div>
            <div className="space-y-2">
              {["Uncertainty budgets — worked example", "5-Why root cause exercise", "Method validation matrix", "Writing a scope of accreditation"].map((t, i) => (
                <div key={t} className="flex items-center gap-3">
                  <div className="text-xs font-semibold text-muted-foreground w-6">#{i + 1}</div>
                  <div className="flex-1 text-sm">{t}</div>
                  <div className="text-xs text-muted-foreground">{95 - i * 3}% completion</div>
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
