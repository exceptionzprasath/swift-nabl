import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Grid3x3, List, Search, SlidersHorizontal, Star } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { CourseCard } from "@/components/site/course-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { courses, categoriesList } from "@/lib/mock-data";

export const Route = createFileRoute("/courses")({
  component: CoursesPage,
  head: () => ({ meta: [{ title: "Courses — SWIFT·NABL Academy" }, { name: "description", content: "Browse 22+ courses on NABL accreditation, ISO/IEC 17025, ISO 15189, and laboratory quality management." }] }),
});

function CoursesPage() {
  const [q, setQ] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sort, setSort] = useState("popular");
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const filtered = useMemo(() => {
    let list = courses.filter((c) => {
      if (q && !(c.title.toLowerCase().includes(q.toLowerCase()) || c.instructor.toLowerCase().includes(q.toLowerCase()))) return false;
      if (selectedCats.length && !selectedCats.includes(c.category)) return false;
      if (levels.length && !levels.includes(c.level)) return false;
      if (c.rating < minRating) return false;
      return true;
    });
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sort === "newest") list = [...list].sort((a, b) => Number(!!b.new) - Number(!!a.new));
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "popular") list = [...list].sort((a, b) => b.students - a.students);
    return list;
  }, [q, sort, selectedCats, levels, minRating]);

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-mesh border-b">
        <div className="mx-auto max-w-7xl px-6 py-10">
          <h1 className="font-display text-3xl md:text-4xl font-bold">Explore all courses</h1>
          <p className="mt-2 text-muted-foreground">22+ courses across NABL, ISO/IEC 17025, ISO 15189 and laboratory quality.</p>
          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)}
              placeholder="Search courses, instructors, standards…"
              className="pl-11 h-12 bg-card shadow-soft" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8 grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6">
          <div className="rounded-2xl border bg-card p-5">
            <div className="flex items-center gap-2 mb-4">
              <SlidersHorizontal className="h-4 w-4" />
              <div className="font-semibold text-sm">Filters</div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">Category</div>
                <div className="space-y-2 max-h-56 overflow-auto pr-2">
                  {categoriesList.map((c) => (
                    <label key={c} className="flex items-center gap-2 text-sm cursor-pointer">
                      <Checkbox checked={selectedCats.includes(c)} onCheckedChange={() => toggle(selectedCats, setSelectedCats, c)} />
                      <span>{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">Level</div>
                {["Beginner", "Intermediate", "Advanced"].map((l) => (
                  <label key={l} className="flex items-center gap-2 text-sm cursor-pointer py-1">
                    <Checkbox checked={levels.includes(l)} onCheckedChange={() => toggle(levels, setLevels, l)} />
                    {l}
                  </label>
                ))}
              </div>

              <div>
                <div className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wider">Rating</div>
                {[4.5, 4.0, 3.5].map((r) => (
                  <label key={r} className="flex items-center gap-2 text-sm cursor-pointer py-1">
                    <input type="radio" checked={minRating === r} onChange={() => setMinRating(r)} />
                    <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {r} & up
                  </label>
                ))}
                <button className="text-xs text-primary mt-2" onClick={() => setMinRating(0)}>Clear</button>
              </div>
            </div>
          </div>
        </aside>

        <main>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filtered.length}</span> results
              {selectedCats.map((c) => (
                <Badge key={c} variant="secondary" className="ml-2 cursor-pointer" onClick={() => toggle(selectedCats, setSelectedCats, c)}>
                  {c} ×
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Select value={sort} onValueChange={setSort}>
                <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Most popular</SelectItem>
                  <SelectItem value="rating">Highest rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: low to high</SelectItem>
                  <SelectItem value="price-high">Price: high to low</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex rounded-lg border p-0.5">
                <Button size="icon" variant={view === "grid" ? "default" : "ghost"} className="h-8 w-8" onClick={() => setView("grid")}>
                  <Grid3x3 className="h-4 w-4" />
                </Button>
                <Button size="icon" variant={view === "list" ? "default" : "ghost"} className="h-8 w-8" onClick={() => setView("list")}>
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border bg-card p-16 text-center">
              <div className="text-lg font-semibold">No courses found</div>
              <p className="text-sm text-muted-foreground mt-1">Try clearing some filters.</p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((c, i) => <CourseCard key={c.id} course={c} index={i} />)}
            </div>
          ) : (
            <div className="space-y-3">
              {filtered.map((c) => (
                <a key={c.id} href={`/courses/${c.slug}`} className="flex gap-4 rounded-2xl border bg-card p-4 hover:shadow-elegant transition-all">
                  <img src={c.image} alt={c.title} className="h-28 w-44 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="text-xs text-primary font-medium">{c.category}</div>
                    <div className="font-display font-semibold mt-1">{c.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{c.instructor} · {c.lab}</div>
                    <div className="flex items-center gap-4 text-xs mt-2 text-muted-foreground">
                      <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-warning text-warning" /> {c.rating} ({c.reviews})</span>
                      <span>{c.students.toLocaleString()} students</span>
                      <span>{c.duration}</span>
                      <span>{c.level}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-lg">₹{c.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground line-through">₹{c.originalPrice.toLocaleString()}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}
