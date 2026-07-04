import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Award, Bell, Calendar, Flame, PlayCircle, TrendingUp, Trophy } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { achievements, enrolledCourses, upcomingClasses, weeklyActivity } from "@/lib/mock-data";

export const Route = createFileRoute("/dashboard")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — SWIFT·NABH" }] }),
});

function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-hero text-white">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="text-white/80 text-sm">Welcome back</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mt-1">Dr. Riya Sharma 👋</h1>
              <p className="mt-2 text-white/85">You're on a 12-day streak. Keep it going!</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Flame, v: "12", l: "Day streak" },
                { icon: Award, v: "5", l: "Certificates" },
                { icon: TrendingUp, v: "68%", l: "Avg progress" },
              ].map((s, i) => (
                <div key={i} className="rounded-2xl bg-white/10 backdrop-blur px-5 py-3 min-w-[110px]">
                  <s.icon className="h-4 w-4" />
                  <div className="font-display font-bold text-2xl mt-1">{s.v}</div>
                  <div className="text-xs text-white/80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">Continue learning</h2>
              <Button variant="ghost" size="sm" asChild><Link to="/courses">View all</Link></Button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {enrolledCourses.map((c, i) => (
                <motion.div key={c.id}
                  initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                  className="rounded-2xl border bg-card shadow-card overflow-hidden">
                  <div className="flex">
                    <img src={c.image} className="h-32 w-32 object-cover" alt="" />
                    <div className="p-4 flex-1 min-w-0">
                      <div className="text-xs text-primary font-medium">{c.category}</div>
                      <div className="font-semibold text-sm mt-1 line-clamp-2">{c.title}</div>
                      <div className="text-xs text-muted-foreground mt-1 truncate">{c.lastLesson}</div>
                      <div className="mt-3">
                        <div className="flex justify-between text-xs mb-1"><span>Progress</span><span className="font-medium">{c.progress}%</span></div>
                        <Progress value={c.progress} className="h-1.5" />
                      </div>
                    </div>
                  </div>
                  <div className="border-t px-4 py-2 flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Last opened today</span>
                    <Button size="sm" variant="ghost" className="text-primary"><PlayCircle className="h-4 w-4 mr-1" /> Resume</Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">Weekly learning activity</h2>
              <Badge variant="outline">14.4 hrs this week</Badge>
            </div>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyActivity}>
                  <defs>
                    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                  <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12 }} />
                  <Area type="monotone" dataKey="hours" stroke="var(--primary)" strokeWidth={2.5} fill="url(#g)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-6">
            <h2 className="font-display font-bold text-xl mb-4">Achievements</h2>
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
              {achievements.map((a) => (
                <div key={a.title} className="rounded-xl bg-muted/40 p-4 text-center">
                  <div className="text-3xl">{a.icon}</div>
                  <div className="mt-2 font-semibold text-sm">{a.title}</div>
                  <div className="text-xs text-muted-foreground">{a.desc}</div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-4 w-4 text-primary" />
              <div className="font-display font-bold">Upcoming live classes</div>
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((c) => (
                <div key={c.title} className="rounded-xl border p-3 hover:shadow-soft transition-all">
                  <div className="text-xs text-primary font-medium">{c.date}</div>
                  <div className="font-medium text-sm mt-1">{c.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{c.instructor} · {c.attendees} attending</div>
                  <Button size="sm" variant="outline" className="w-full mt-3">Join</Button>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-4 w-4 text-warning" />
              <div className="font-display font-bold">Leaderboard</div>
            </div>
            <div className="space-y-2">
              {["Dr. Meera I.", "Rakesh V.", "You", "Priya S.", "Anand K."].map((n, i) => (
                <div key={n} className={`flex items-center gap-3 rounded-lg p-2 ${n === "You" ? "bg-primary/10" : ""}`}>
                  <div className="w-6 text-center text-xs font-semibold text-muted-foreground">{i + 1}</div>
                  <div className="h-8 w-8 rounded-full bg-hero grid place-items-center text-xs text-white font-semibold">
                    {n.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="flex-1 text-sm font-medium">{n}</div>
                  <div className="text-xs text-muted-foreground">{2400 - i * 180} XP</div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-4 w-4 text-primary" />
              <div className="font-display font-bold">Notifications</div>
            </div>
            <div className="space-y-3 text-sm">
              {[
                "New assignment posted in RCA course",
                "Your certificate for Patient Safety is ready",
                "Live class starts in 2 hours",
              ].map((n, i) => (
                <div key={i} className="flex gap-2">
                  <div className="h-2 w-2 rounded-full bg-primary mt-1.5" />
                  <div className="flex-1">
                    <div>{n}</div>
                    <div className="text-xs text-muted-foreground">{i + 1}h ago</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
