import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Eye, FileText, Search } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/library")({
  component: Library,
  head: () => ({ meta: [{ title: "SOP Library — SWIFT·NABH" }] }),
});

const types = ["Policy", "SOP", "Format", "Checklist", "Audit Template", "Manual"];
const depts = ["Nursing", "Emergency", "OT", "ICU", "Lab", "Pharmacy", "Radiology", "Housekeeping"];

const docs = Array.from({ length: 30 }).map((_, i) => ({
  id: `d-${i + 1}`,
  title: [
    "Hand Hygiene Policy", "Medication Administration SOP", "Fire Safety Manual",
    "Blood Transfusion Checklist", "Infection Control SOP", "Consent Form Format",
    "Discharge Summary Format", "Sentinel Event Reporting SOP", "OT Safety Checklist",
    "Biomedical Waste Policy", "Patient Fall Prevention SOP", "Code Blue Protocol",
  ][i % 12] + (i > 11 ? ` v${Math.floor(i / 12) + 1}` : ""),
  type: types[i % types.length],
  dept: depts[i % depts.length],
  version: `v${1 + (i % 4)}.${i % 10}`,
  updated: `${1 + (i % 28)} days ago`,
  pages: 4 + (i % 30),
}));

function Library() {
  const [q, setQ] = useState("");
  const [type, setType] = useState<string | null>(null);
  const [dept, setDept] = useState<string | null>(null);

  const filtered = useMemo(() => docs.filter((d) => {
    if (q && !d.title.toLowerCase().includes(q.toLowerCase())) return false;
    if (type && d.type !== type) return false;
    if (dept && d.dept !== dept) return false;
    return true;
  }), [q, type, dept]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="bg-mesh border-b">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <h1 className="font-display text-4xl font-bold">Hospital Document Library</h1>
          <p className="mt-2 text-muted-foreground">1,000+ policies, SOPs, checklists, formats and audit templates — ready to use.</p>
          <div className="mt-6 relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search documents…"
              className="pl-11 h-12 bg-card shadow-soft" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", ...types].map((t) => (
            <button key={t} onClick={() => setType(t === "All" ? null : t)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-colors ${
                (type ?? "All") === t ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"
              }`}>
              {t}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2 mb-8">
          {["All", ...depts].map((t) => (
            <button key={t} onClick={() => setDept(t === "All" ? null : t)}
              className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                (dept ?? "All") === t ? "bg-secondary text-secondary-foreground border-secondary" : "bg-card hover:bg-muted"
              }`}>
              {t}
            </button>
          ))}
        </div>

        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="grid grid-cols-[1fr_120px_120px_120px_140px_160px] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground border-b">
            <div>Document</div><div>Type</div><div>Dept</div><div>Version</div><div>Updated</div><div className="text-right">Actions</div>
          </div>
          {filtered.map((d) => (
            <div key={d.id} className="grid grid-cols-[1fr_120px_120px_120px_140px_160px] items-center px-5 py-3 border-b last:border-0 hover:bg-muted/40 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary shrink-0"><FileText className="h-4 w-4" /></div>
                <div className="min-w-0">
                  <div className="font-medium text-sm truncate">{d.title}</div>
                  <div className="text-xs text-muted-foreground">{d.pages} pages</div>
                </div>
              </div>
              <div><Badge variant="outline">{d.type}</Badge></div>
              <div className="text-sm">{d.dept}</div>
              <div className="text-sm font-mono">{d.version}</div>
              <div className="text-sm text-muted-foreground">{d.updated}</div>
              <div className="flex justify-end gap-1">
                <Button size="sm" variant="ghost" onClick={() => toast(`Previewing ${d.title}`)}><Eye className="h-4 w-4" /></Button>
                <Button size="sm" variant="ghost" onClick={() => toast.success(`Downloaded ${d.title}`)}><Download className="h-4 w-4" /></Button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-12 text-center text-muted-foreground">No documents match your filters.</div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
