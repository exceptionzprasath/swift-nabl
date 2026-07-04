import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Award, BookOpen, Check, ChevronDown, Clock, Download, FileText, Globe,
  Heart, PlayCircle, Share2, Star, Users, RefreshCw,
} from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CourseCard } from "@/components/site/course-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { courses, enroll, isEnrolled } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/courses/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.course.title} — SWIFT·NABL` }, { name: "description", content: loaderData.course.subtitle }]
      : [{ title: "Course not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold">Course not found</h1>
        <Link to="/courses" className="mt-4 inline-block text-primary underline">Back to courses</Link>
      </div>
    </div>
  ),
  component: CourseDetail,
});

function CourseDetail() {
  const { course } = Route.useLoaderData();
  const navigate = useNavigate();
  const [wish, setWish] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const enrolled = isEnrolled(course.slug);

  const finalPrice = Math.round(course.price * (1 - discount / 100));

  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "NABL50") { setDiscount(50); toast.success("Coupon applied — 50% off!"); }
    else if (coupon.trim().toUpperCase() === "SWIFT20") { setDiscount(20); toast.success("Coupon applied — 20% off!"); }
    else { setDiscount(0); toast.error("Invalid coupon. Try NABL50 or SWIFT20."); }
  };

  const handleEnroll = () => {
    enroll(course.slug);
    toast.success("Enrolled! Opening your course…");
    setTimeout(() => navigate({ to: "/learn/$slug", params: { slug: course.slug } }), 600);
  };

  const included = [
    { icon: PlayCircle, t: `${course.duration} of on-demand video` },
    { icon: FileText, t: "Downloadable SOP templates" },
    { icon: BookOpen, t: `${course.lessons} lessons, ${course.modules.length} modules` },
    { icon: Award, t: "Verified digital certificate" },
    { icon: Globe, t: `Available in ${course.language}` },
    { icon: Users, t: "Live instructor Q&A" },
  ];

  const related = courses.filter((c) => c.id !== course.id && c.category === course.category).slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-hero text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-12 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 min-w-0">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">{course.category}</div>
            <h1 className="mt-3 font-display text-2xl md:text-4xl font-bold leading-tight">{course.title}</h1>
            <p className="mt-3 text-white/85 text-sm md:text-base">{course.subtitle}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm">
              <span className="flex items-center gap-1.5"><Star className="h-4 w-4 fill-warning text-warning" /> {course.rating} ({course.reviews} reviews)</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> {course.duration}</span>
              <Badge className="bg-white/15 border-0 text-white">{course.level}</Badge>
              <span className="text-white/70">Updated {course.updated}</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-white/20 grid place-items-center font-semibold">
                {course.instructor.split(" ").slice(-1)[0][0]}
              </div>
              <div className="text-sm">
                <div className="font-medium">{course.instructor}</div>
                <div className="text-white/70 text-xs">{course.lab}</div>
              </div>
            </div>
          </div>

          <aside className="lg:row-span-2">
            <div className="rounded-3xl bg-card text-foreground shadow-elegant overflow-hidden lg:sticky lg:top-24">
              <div className="relative aspect-video bg-muted">
                <img src={course.image} className="h-full w-full object-cover" alt="" />
                <button onClick={() => setPreviewOpen(true)} className="absolute inset-0 grid place-items-center group bg-black/20">
                  <div className="grid h-16 w-16 place-items-center rounded-full bg-white/95 group-hover:scale-110 transition-transform shadow-elegant">
                    <PlayCircle className="h-8 w-8 text-primary" />
                  </div>
                  <span className="absolute bottom-3 left-3 text-white text-xs font-medium bg-black/50 px-2 py-1 rounded">Free preview</span>
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-display text-3xl font-bold">₹{finalPrice.toLocaleString()}</span>
                  <span className="text-sm text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
                  <Badge className="bg-secondary text-secondary-foreground ml-auto">
                    {Math.round((1 - finalPrice / course.originalPrice) * 100)}% off
                  </Badge>
                </div>
                {enrolled ? (
                  <Button asChild className="w-full h-11 bg-hero text-white shadow-elegant">
                    <Link to="/learn/$slug" params={{ slug: course.slug }}>Continue learning</Link>
                  </Button>
                ) : (
                  <Button className="w-full h-11 bg-hero text-white shadow-elegant" onClick={handleEnroll}>
                    Enroll Now
                  </Button>
                )}
                <div className="flex gap-2">
                  <Input placeholder="Coupon (try NABL50)" value={coupon} onChange={(e) => setCoupon(e.target.value)} className="h-10" />
                  <Button variant="outline" onClick={applyCoupon} className="h-10 shrink-0">Apply</Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" className="flex-1" onClick={() => { setWish(!wish); toast(wish ? "Removed" : "Wishlisted"); }}>
                    <Heart className={`h-4 w-4 mr-1 ${wish ? "fill-destructive text-destructive" : ""}`} /> Wishlist
                  </Button>
                  <Button variant="ghost" className="flex-1" onClick={() => { navigator.clipboard?.writeText(window.location.href); toast("Link copied"); }}>
                    <Share2 className="h-4 w-4 mr-1" /> Share
                  </Button>
                </div>
                <div className="border-t pt-4 space-y-2 text-sm">
                  {included.map((x, i) => (
                    <div key={i} className="flex items-center gap-2"><x.icon className="h-4 w-4 text-primary shrink-0" /> {x.t}</div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 lg:grid lg:grid-cols-3">
        <div className="lg:col-span-2 lg:pr-10">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="mb-6 flex-wrap h-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="instructor">Instructor</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div>
                <h2 className="font-display text-2xl font-bold">What you'll learn</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {course.outcomes.map((l: string) => (
                    <div key={l} className="flex gap-2 text-sm"><Check className="h-4 w-4 text-secondary shrink-0 mt-0.5" /> {l}</div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">About this course</h2>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  This comprehensive program is designed for laboratory quality managers, technical signatories, analysts and NABL coordinators.
                  Through video lessons, real lab case studies, downloadable templates and scenario-based quizzes, you'll gain everything you
                  need to lead your lab to a successful NABL assessment — the first time.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="curriculum" className="space-y-3">
              {course.modules.map((m: any) => <ModuleAccordion key={m.id} m={m} />)}
            </TabsContent>

            <TabsContent value="instructor">
              <div className="flex gap-5 items-start">
                <div className="h-20 w-20 rounded-full bg-hero grid place-items-center text-white text-2xl font-bold shrink-0">
                  {course.instructor.split(" ").slice(-1)[0][0]}
                </div>
                <div>
                  <div className="font-display text-xl font-bold">{course.instructor}</div>
                  <div className="text-sm text-muted-foreground">Senior Quality Consultant · {course.lab}</div>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <span><Star className="h-4 w-4 inline fill-warning text-warning" /> 4.9 instructor rating</span>
                    <span>42,180 students</span>
                    <span>12 courses</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    A former NABL principal assessor with 20+ years leading laboratory quality transformations across
                    India, the Middle East, and Southeast Asia.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-2xl border bg-card p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-muted grid place-items-center text-sm font-semibold">
                      {"AKPNMRSD"[i]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{["Anita K.", "Rajiv S.", "Priya N.", "Deepak M."][i]}</div>
                      <div className="flex gap-1 text-warning">
                        {Array.from({ length: 5 }).map((_, j) => <Star key={j} className="h-3 w-3 fill-current" />)}
                      </div>
                    </div>
                    <div className="ml-auto text-xs text-muted-foreground">2 weeks ago</div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Absolutely worth every rupee. The uncertainty templates alone saved our team weeks of work preparing for our NABL assessment.
                  </p>
                </div>
              ))}
            </TabsContent>
          </Tabs>

          {related.length > 0 && (
            <section className="mt-14">
              <h2 className="font-display text-2xl font-bold mb-5">Related courses</h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:pt-4 mt-10 lg:mt-0">
          <div className="rounded-2xl border bg-card p-5">
            <div className="font-display font-semibold">Includes</div>
            <div className="mt-3 space-y-2 text-sm">
              <div className="flex items-center gap-2"><Download className="h-4 w-4 text-primary" /> 40+ SOP templates</div>
              <div className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> Audit checklists</div>
              <div className="flex items-center gap-2"><Award className="h-4 w-4 text-primary" /> Certificate on completion</div>
              <div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-primary" /> Lifetime updates</div>
            </div>
          </div>
        </aside>
      </div>

      {previewOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 grid place-items-center p-4" onClick={() => setPreviewOpen(false)}>
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <video src={course.modules[0].lessons[0].videoUrl} controls autoPlay className="h-full w-full" />
            <button className="absolute top-3 right-3 h-9 w-9 rounded-full bg-white/90 text-black grid place-items-center" onClick={() => setPreviewOpen(false)}>✕</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ModuleAccordion({ m }: { m: { id: string; title: string; lessons: { id: string; title: string; duration: string; preview?: boolean }[] } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center gap-3 p-4 hover:bg-muted/50 transition-colors text-left">
        <ChevronDown className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
        <div className="font-medium flex-1 min-w-0">{m.title}</div>
        <div className="text-xs text-muted-foreground shrink-0">{m.lessons.length} lessons</div>
      </button>
      {open && (
        <div className="border-t px-4 py-3 space-y-1">
          {m.lessons.map((l) => (
            <div key={l.id} className="flex items-center gap-3 text-sm py-1.5">
              <PlayCircle className="h-4 w-4 text-muted-foreground shrink-0" />
              <span className="flex-1 min-w-0 truncate">{l.title}</span>
              {l.preview && <Badge variant="outline" className="text-[10px]">Preview</Badge>}
              <span className="text-xs text-muted-foreground shrink-0">{l.duration}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
