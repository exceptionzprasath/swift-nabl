import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, Clock, Trophy } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { courses, getProgress, saveProgress } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/test/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `Final Test — ${loaderData?.course.title ?? ""}` }] }),
  component: TestPage,
});

function TestPage() {
  const { course } = Route.useLoaderData();
  const navigate = useNavigate();
  const test = course.finalTest;
  const [started, setStarted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>(Array(test.questions.length).fill(-1));
  const [remain, setRemain] = useState(test.durationMin * 60);
  const [submitted, setSubmitted] = useState<{ score: number; pct: number; pass: boolean } | null>(null);

  useEffect(() => {
    if (!started || submitted) return;
    const id = setInterval(() => setRemain((r) => {
      if (r <= 1) { clearInterval(id); submit(); return 0; }
      return r - 1;
    }), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, submitted]);

  const submit = () => {
    let score = 0;
    test.questions.forEach((q: any, i: number) => { if (answers[i] === q.answer) score++; });
    const pct = Math.round((score / test.questions.length) * 100);
    const pass = pct >= test.passPct;
    setSubmitted({ score, pct, pass });
    const p = getProgress(course.slug);
    saveProgress(course.slug, { ...p, testScore: pct });
    if (pass) toast.success(`Passed with ${pct}%! Certificate unlocked.`);
    else toast.error(`Scored ${pct}%. You can retry in 24h (skipped for demo).`);
  };

  const answered = useMemo(() => answers.filter((a) => a >= 0).length, [answers]);
  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  if (!started) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 md:px-6 py-16">
          <Badge className="bg-primary/10 text-primary border-primary/20">Final Assessment</Badge>
          <h1 className="mt-3 font-display text-3xl md:text-4xl font-bold">{course.title}</h1>
          <p className="mt-2 text-muted-foreground">Ready to earn your certificate? Please read the rules below.</p>

          <div className="mt-8 rounded-2xl border bg-card p-6 space-y-4">
            <Row label="Questions" value={`${test.questions.length}`} />
            <Row label="Duration" value={`${test.durationMin} minutes`} />
            <Row label="Pass mark" value={`${test.passPct}%`} />
            <Row label="Attempts" value="Unlimited (24h cooldown)" />
            <div className="rounded-lg border border-warning/30 bg-warning/10 p-3 text-sm flex gap-2">
              <AlertCircle className="h-4 w-4 text-warning shrink-0 mt-0.5" />
              Once you start, the timer cannot be paused. Answer all questions before submitting.
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button className="bg-hero text-white shadow-elegant" onClick={() => setStarted(true)}>Start Test</Button>
            <Button asChild variant="outline"><Link to="/learn/$slug" params={{ slug: course.slug }}>Back to course</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-2xl px-4 md:px-6 py-16 text-center">
          <div className={`mx-auto h-20 w-20 rounded-full grid place-items-center ${submitted.pass ? "bg-secondary/15 text-secondary" : "bg-destructive/15 text-destructive"}`}>
            <Trophy className="h-10 w-10" />
          </div>
          <h1 className="mt-6 font-display text-3xl md:text-4xl font-bold">
            {submitted.pass ? "Congratulations!" : "Almost there"}
          </h1>
          <p className="mt-2 text-muted-foreground">
            You scored <span className="font-bold text-foreground">{submitted.score}/{test.questions.length}</span> ({submitted.pct}%).
            Pass mark is {test.passPct}%.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {submitted.pass ? (
              <Button className="bg-hero text-white shadow-elegant" onClick={() => navigate({ to: "/certificate/$slug", params: { slug: course.slug } })}>
                View & Download Certificate
              </Button>
            ) : (
              <Button className="bg-hero text-white" onClick={() => { setSubmitted(null); setIdx(0); setAnswers(Array(test.questions.length).fill(-1)); setRemain(test.durationMin * 60); }}>
                Retry test
              </Button>
            )}
            <Button asChild variant="outline"><Link to="/learn/$slug" params={{ slug: course.slug }}>Review course</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  const q = test.questions[idx];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b bg-card/90 backdrop-blur">
        <div className="mx-auto max-w-4xl px-4 md:px-6 h-14 flex items-center gap-3">
          <div className="font-display font-semibold text-sm truncate flex-1">Final Test · {course.title}</div>
          <div className={`flex items-center gap-1.5 text-sm font-mono ${remain < 60 ? "text-destructive" : ""}`}>
            <Clock className="h-4 w-4" /> {fmt(remain)}
          </div>
        </div>
        <Progress value={((idx + 1) / test.questions.length) * 100} className="h-1 rounded-none" />
      </header>

      <div className="mx-auto max-w-4xl px-4 md:px-6 py-8 grid gap-6 md:grid-cols-[1fr_200px]">
        <div>
          <div className="text-xs text-muted-foreground">Question {idx + 1} of {test.questions.length}</div>
          <h2 className="mt-2 font-display text-xl md:text-2xl font-bold">{q.q}</h2>
          <div className="mt-6 space-y-3">
            {q.options.map((o: string, i: number) => (
              <button key={i} onClick={() => { const na = [...answers]; na[idx] = i; setAnswers(na); }}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[idx] === i ? "border-primary bg-primary/5" : "border-border hover:border-primary/40 bg-card"
                }`}>
                <div className="flex items-center gap-3">
                  <div className={`h-5 w-5 rounded-full border-2 grid place-items-center shrink-0 ${answers[idx] === i ? "border-primary bg-primary" : "border-muted-foreground/30"}`}>
                    {answers[idx] === i && <div className="h-2 w-2 rounded-full bg-white" />}
                  </div>
                  <span className="text-sm md:text-base">{o}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-2 justify-between">
            <Button variant="outline" disabled={idx === 0} onClick={() => setIdx(idx - 1)}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            {idx < test.questions.length - 1 ? (
              <Button className="bg-hero text-white" onClick={() => setIdx(idx + 1)}>
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button className="bg-secondary text-secondary-foreground" onClick={submit}>
                Submit Test ({answered}/{test.questions.length} answered)
              </Button>
            )}
          </div>
        </div>

        <aside className="rounded-2xl border bg-card p-4 h-fit sticky top-20 hidden md:block">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Questions</div>
          <div className="grid grid-cols-5 gap-2">
            {test.questions.map((_: any, i: number) => (
              <button key={i} onClick={() => setIdx(i)}
                className={`h-8 w-8 rounded-md text-xs font-medium border ${
                  i === idx ? "bg-primary text-primary-foreground border-primary" :
                  answers[i] >= 0 ? "bg-secondary/15 border-secondary text-foreground" :
                  "bg-card hover:bg-muted"
                }`}>
                {i + 1}
              </button>
            ))}
          </div>
          <div className="mt-4 text-xs text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="h-3 w-3 text-secondary" /> {answered} answered
          </div>
          <Button className="w-full mt-4 bg-hero text-white" onClick={submit}>Submit</Button>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}
