import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bookmark, Check, CheckCircle2, ChevronDown, ChevronLeft, Download, FileText,
  MessageSquare, Pause, Play, PlayCircle, Sparkles, StickyNote, Volume2, VolumeX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses, enroll, getProgress, saveProgress, type Lesson } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/learn/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [{ title: `Learn: ${loaderData.course.title}` }] : [{ title: "Learning" }],
  }),
  component: LearnPage,
});

function LearnPage() {
  const { course } = Route.useLoaderData();
  const navigate = useNavigate();
  const allLessons = useMemo(() => course.modules.flatMap((m: any) => m.lessons.map((l: any) => ({ ...l, moduleTitle: m.title }))), [course]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const current = allLessons[currentIdx];
  const [progress, setProgressState] = useState({ lessonsDone: [] as string[], notes: {} as Record<string, string> });
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({ [course.modules[0].id]: true });
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => { enroll(course.slug); setProgressState(getProgress(course.slug)); }, [course.slug]);

  const markDone = (lessonId: string) => {
    setProgressState((p) => {
      if (p.lessonsDone.includes(lessonId)) return p;
      const np = { ...p, lessonsDone: [...p.lessonsDone, lessonId] };
      saveProgress(course.slug, np);
      return np;
    });
  };

  const percent = Math.round((progress.lessonsDone.length / allLessons.length) * 100);
  const allDone = progress.lessonsDone.length >= allLessons.length;

  const goNext = () => {
    markDone(current.id);
    if (currentIdx < allLessons.length - 1) setCurrentIdx(currentIdx + 1);
    else toast.success("You've completed all lessons! Take the final test to earn your certificate.");
  };

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex flex-col">
      {/* Top bar */}
      <header className="flex items-center gap-3 px-4 md:px-6 h-14 border-b border-white/10 bg-[#0b1120]/95 backdrop-blur sticky top-0 z-30">
        <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
          <Link to="/courses/$slug" params={{ slug: course.slug }}><ChevronLeft className="h-4 w-4 mr-1" /> <span className="hidden sm:inline">Back</span></Link>
        </Button>
        <div className="min-w-0 flex-1">
          <div className="font-display font-semibold text-sm truncate">{course.title}</div>
          <div className="text-[11px] text-white/60 truncate">{current.moduleTitle} · {current.title}</div>
        </div>
        <div className="hidden md:flex items-center gap-3 min-w-[220px]">
          <Progress value={percent} className="h-1.5 bg-white/15 [&>div]:bg-secondary" />
          <span className="text-xs font-medium">{percent}%</span>
        </div>
        {allDone && (
          <Button size="sm" className="bg-secondary text-secondary-foreground hover:opacity-90" onClick={() => navigate({ to: "/test/$slug", params: { slug: course.slug } })}>
            Final Test
          </Button>
        )}
        <Button variant="ghost" size="sm" className="lg:hidden text-white/80" onClick={() => setSidebar(!sidebar)}>
          Modules
        </Button>
      </header>

      <div className="flex flex-1 min-h-0">
        {/* Main video area */}
        <main className="flex-1 min-w-0 flex flex-col">
          <VideoPlayer key={current.id} lesson={current} onComplete={goNext} />

          <div className="p-4 md:p-6 max-w-4xl w-full mx-auto">
            <div className="text-xs text-primary/80 font-medium uppercase tracking-wider">{current.moduleTitle}</div>
            <h1 className="font-display text-xl md:text-2xl font-bold mt-1">{current.title}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-white/60">
              <span>{current.duration}</span>
              {progress.lessonsDone.includes(current.id) && (
                <span className="flex items-center gap-1 text-secondary"><CheckCircle2 className="h-3.5 w-3.5" /> Completed</span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button className="bg-secondary text-secondary-foreground hover:opacity-90" onClick={goNext}>
                {currentIdx < allLessons.length - 1 ? "Mark complete & next" : "Mark complete"}
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white" onClick={() => toast.success("Bookmarked")}>
                <Bookmark className="h-4 w-4 mr-1" /> Bookmark
              </Button>
              <Button variant="outline" className="border-white/20 bg-white/5 hover:bg-white/10 text-white" onClick={() => toast.success("PDF downloaded")}>
                <Download className="h-4 w-4 mr-1" /> Notes PDF
              </Button>
            </div>

            <Tabs defaultValue="notes" className="mt-8">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="notes"><StickyNote className="h-3.5 w-3.5 mr-1" /> Notes</TabsTrigger>
                <TabsTrigger value="resources"><FileText className="h-3.5 w-3.5 mr-1" /> Resources</TabsTrigger>
                <TabsTrigger value="discussion"><MessageSquare className="h-3.5 w-3.5 mr-1" /> Discussion</TabsTrigger>
                <TabsTrigger value="tutor"><Sparkles className="h-3.5 w-3.5 mr-1" /> AI Tutor</TabsTrigger>
              </TabsList>
              <TabsContent value="notes" className="mt-4">
                <Textarea placeholder="Type your notes for this lesson…" className="min-h-[160px] bg-white/5 border-white/10 text-white"
                  value={progress.notes[current.id] || ""}
                  onChange={(e) => {
                    const np = { ...progress, notes: { ...progress.notes, [current.id]: e.target.value } };
                    setProgressState(np); saveProgress(course.slug, np);
                  }} />
                <p className="text-xs text-white/50 mt-2">Notes auto-save to this device.</p>
              </TabsContent>
              <TabsContent value="resources" className="mt-4 space-y-2">
                {["ISO 17025 clause map.pdf", "Uncertainty budget template.xlsx", "Sample SOP — Method Validation.docx"].map((r) => (
                  <div key={r} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3">
                    <FileText className="h-4 w-4 text-primary" />
                    <div className="flex-1 text-sm truncate">{r}</div>
                    <Button size="sm" variant="ghost" className="text-white/80 hover:text-white hover:bg-white/10" onClick={() => toast.success(`Downloaded ${r}`)}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </TabsContent>
              <TabsContent value="discussion" className="mt-4 space-y-3">
                {[
                  { u: "Rakesh V.", t: "How do we handle uncertainty when using a certified reference material?" },
                  { u: "Meera I.", t: "Great walkthrough of Type A vs Type B — the fishbone example clicked for me." },
                ].map((c) => (
                  <div key={c.u} className="rounded-lg border border-white/10 bg-white/5 p-3">
                    <div className="text-sm font-medium">{c.u}</div>
                    <div className="text-sm text-white/70 mt-1">{c.t}</div>
                  </div>
                ))}
                <Textarea placeholder="Ask a question or share an insight…" className="bg-white/5 border-white/10 text-white" />
                <Button className="bg-primary text-white" onClick={() => toast.success("Reply posted")}>Post</Button>
              </TabsContent>
              <TabsContent value="tutor" className="mt-4">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <div className="text-sm text-white/70">👋 Hi! I'm your AI tutor for this lesson. Ask me anything about NABL, ISO/IEC 17025, uncertainty budgets, or how to build an SOP.</div>
                  <div className="mt-3 flex gap-2">
                    <input placeholder="Ask a question…" className="flex-1 h-10 rounded-md bg-white/10 border border-white/10 px-3 text-sm" />
                    <Button className="bg-primary" onClick={() => toast("AI tutor is a demo in this preview")}>Ask</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        {/* Sidebar */}
        <aside className={`${sidebar ? "fixed inset-y-0 right-0 z-40 w-80" : "hidden"} lg:static lg:block lg:w-96 border-l border-white/10 bg-[#0f172a] overflow-y-auto`}>
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="font-display font-semibold">Course content</div>
              <div className="text-xs text-white/60">{course.modules.length} modules · {allLessons.length} lessons</div>
            </div>
            <Button size="sm" variant="ghost" className="lg:hidden text-white/70" onClick={() => setSidebar(false)}>✕</Button>
          </div>
          <div>
            {course.modules.map((m: any) => {
              const opened = openModules[m.id];
              const done = m.lessons.filter((l: any) => progress.lessonsDone.includes(l.id)).length;
              return (
                <div key={m.id} className="border-b border-white/5">
                  <button onClick={() => setOpenModules({ ...openModules, [m.id]: !opened })} className="w-full flex items-center gap-2 p-3 text-left hover:bg-white/5">
                    <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${opened ? "rotate-180" : ""}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">{m.title}</div>
                      <div className="text-[11px] text-white/50">{done}/{m.lessons.length} done</div>
                    </div>
                  </button>
                  {opened && (
                    <div>
                      {m.lessons.map((l: any) => {
                        const idx = allLessons.findIndex((x: any) => x.id === l.id);
                        const isCurrent = idx === currentIdx;
                        const isDone = progress.lessonsDone.includes(l.id);
                        return (
                          <button key={l.id} onClick={() => { setCurrentIdx(idx); setSidebar(false); }}
                            className={`w-full flex items-center gap-3 pl-9 pr-3 py-2 text-left text-sm hover:bg-white/5 ${isCurrent ? "bg-primary/20 text-white" : "text-white/80"}`}>
                            {isDone ? <CheckCircle2 className="h-4 w-4 text-secondary shrink-0" /> : <PlayCircle className="h-4 w-4 text-white/50 shrink-0" />}
                            <div className="flex-1 min-w-0 truncate">{l.title}</div>
                            <span className="text-[10px] text-white/50">{l.duration}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-white/60 mb-2">Course progress: {percent}%</div>
            <Progress value={percent} className="h-2 bg-white/10 [&>div]:bg-secondary" />
            <Button className="w-full mt-4 bg-secondary text-secondary-foreground hover:opacity-90"
              disabled={!allDone}
              onClick={() => navigate({ to: "/test/$slug", params: { slug: course.slug } })}>
              {allDone ? "Take Final Test" : `Complete all lessons to unlock test`}
            </Button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function VideoPlayer({ lesson, onComplete }: { lesson: Lesson & { moduleTitle: string }; onComplete: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [t, setT] = useState(0);
  const [dur, setDur] = useState(0);
  const [checkpoint, setCheckpoint] = useState<null | { q: string; options: string[]; answer: number; idx: number }>(null);
  const [firedIds, setFiredIds] = useState<Set<number>>(new Set());
  const [answered, setAnswered] = useState<number | null>(null);

  useEffect(() => { setT(0); setDur(0); setFiredIds(new Set()); setCheckpoint(null); setAnswered(null); }, [lesson.id]);

  const toggle = () => { const v = ref.current; if (!v) return; if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); } };

  const onTime = () => {
    const v = ref.current; if (!v) return;
    setT(v.currentTime);
    (lesson.checkpoints || []).forEach((cp, idx) => {
      if (!firedIds.has(idx) && v.currentTime >= cp.atSec) {
        v.pause(); setPlaying(false);
        setCheckpoint({ ...cp, idx });
        setFiredIds(new Set([...firedIds, idx]));
      }
    });
  };

  const onEnd = () => { setPlaying(false); onComplete(); };

  const answer = (i: number) => {
    if (!checkpoint) return;
    setAnswered(i);
    if (i === checkpoint.answer) toast.success("Correct!");
    else toast.error("Not quite — review the segment.");
  };

  const continueAfterCP = () => { setCheckpoint(null); setAnswered(null); ref.current?.play(); setPlaying(true); };

  const pct = dur > 0 ? (t / dur) * 100 : 0;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${Math.floor(s % 60).toString().padStart(2, "0")}`;

  return (
    <div className="relative bg-black">
      <div className="relative aspect-video max-h-[75vh] w-full mx-auto">
        <video ref={ref} src={lesson.videoUrl} className="h-full w-full" onTimeUpdate={onTime}
          onLoadedMetadata={(e) => setDur((e.target as HTMLVideoElement).duration)}
          onEnded={onEnd} onClick={toggle} playsInline muted={muted} />
        {!playing && !checkpoint && (
          <button onClick={toggle} className="absolute inset-0 grid place-items-center bg-black/30">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-elegant">
              <Play className="h-8 w-8 text-primary ml-1" />
            </div>
          </button>
        )}

        {checkpoint && (
          <div className="absolute inset-0 bg-black/85 grid place-items-center p-4">
            <div className="max-w-xl w-full rounded-2xl bg-card text-foreground p-6 shadow-elegant">
              <Badge className="bg-primary/10 text-primary border-primary/20">Interactive check</Badge>
              <h3 className="font-display text-lg font-bold mt-3">{checkpoint.q}</h3>
              <div className="mt-4 space-y-2">
                {checkpoint.options.map((o, i) => {
                  const isCorrect = i === checkpoint.answer;
                  const wasChosen = answered === i;
                  const show = answered !== null;
                  return (
                    <button key={i} disabled={answered !== null} onClick={() => answer(i)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${
                        show && isCorrect ? "border-secondary bg-secondary/10" :
                        show && wasChosen ? "border-destructive bg-destructive/10" :
                        "hover:bg-muted"
                      }`}>
                      <span className="text-sm">{o}</span>
                      {show && isCorrect && <Check className="h-4 w-4 text-secondary inline ml-2" />}
                    </button>
                  );
                })}
              </div>
              <Button className="mt-5 w-full bg-hero text-white" disabled={answered === null} onClick={continueAfterCP}>
                Continue watching
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-black px-3 md:px-6 py-3">
        <div className="h-1 bg-white/15 rounded-full overflow-hidden cursor-pointer"
          onClick={(e) => {
            const r = (e.target as HTMLElement).getBoundingClientRect();
            const ratio = (e.clientX - r.left) / r.width;
            if (ref.current) { ref.current.currentTime = ratio * dur; }
          }}>
          <div className="h-full bg-secondary" style={{ width: `${pct}%` }} />
        </div>
        <div className="mt-2 flex items-center gap-3 text-white/80 text-xs">
          <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={toggle}>
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => { setMuted(!muted); if (ref.current) ref.current.muted = !muted; }}>
            {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
          <span>{fmt(t)} / {fmt(dur)}</span>
        </div>
      </div>
    </div>
  );
}
