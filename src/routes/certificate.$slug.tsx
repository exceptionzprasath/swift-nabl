import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { Award, Download, Share2 } from "lucide-react";
import { Navbar } from "@/components/site/navbar";
import { Button } from "@/components/ui/button";
import { courses, getProgress } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/certificate/$slug")({
  loader: ({ params }) => {
    const course = courses.find((c) => c.slug === params.slug);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({ meta: [{ title: `Certificate — ${loaderData?.course.title ?? ""}` }] }),
  component: CertificatePage,
});

function CertificatePage() {
  const { course } = Route.useLoaderData();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const learnerName = "Dr. Riya Sharma";
  const certId = `SN-${course.id.toUpperCase()}-${Date.now().toString(36).slice(-6).toUpperCase()}`;
  const dateStr = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
  const progress = typeof window !== "undefined" ? getProgress(course.slug) : { testScore: undefined };

  useEffect(() => { draw(); /* eslint-disable-next-line */ }, []);

  const draw = () => {
    const c = canvasRef.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const W = 1600, H = 1130;
    c.width = W; c.height = H;

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#f7fbff"); bg.addColorStop(1, "#eef7f2");
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);

    // Outer border
    ctx.strokeStyle = "#0057B8"; ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, W - 80, H - 80);
    ctx.strokeStyle = "#00A676"; ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, W - 120, H - 120);

    // Decorative corners
    ctx.fillStyle = "#0057B8";
    for (const [x, y] of [[60, 60], [W - 60, 60], [60, H - 60], [W - 60, H - 60]]) {
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2); ctx.fill();
    }

    // Header logo mark
    ctx.fillStyle = "#0057B8";
    ctx.font = "bold 44px 'Poppins', system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SWIFT · NABL  ACADEMY", W / 2, 170);
    ctx.font = "500 18px 'Inter', system-ui, sans-serif";
    ctx.fillStyle = "#64748b";
    ctx.fillText("Smart Workflow & Integrated Framework for Training", W / 2, 200);

    // Title
    ctx.fillStyle = "#0f172a";
    ctx.font = "bold 64px 'Poppins', system-ui, sans-serif";
    ctx.fillText("Certificate of Completion", W / 2, 340);

    // Divider
    ctx.strokeStyle = "#00A676"; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(W / 2 - 100, 370); ctx.lineTo(W / 2 + 100, 370); ctx.stroke();

    // Body
    ctx.fillStyle = "#475569"; ctx.font = "22px 'Inter', system-ui, sans-serif";
    ctx.fillText("This is to certify that", W / 2, 450);

    ctx.fillStyle = "#0057B8"; ctx.font = "bold 72px 'Poppins', system-ui, sans-serif";
    ctx.fillText(learnerName, W / 2, 550);

    ctx.fillStyle = "#475569"; ctx.font = "22px 'Inter', system-ui, sans-serif";
    ctx.fillText("has successfully completed the online course", W / 2, 610);

    ctx.fillStyle = "#0f172a"; ctx.font = "bold 40px 'Poppins', system-ui, sans-serif";
    wrapText(ctx, course.title, W / 2, 690, W - 300, 52);

    ctx.fillStyle = "#475569"; ctx.font = "20px 'Inter', system-ui, sans-serif";
    ctx.fillText(
      `with a score of ${progress.testScore ?? 92}% · ${course.duration} of instruction · Issued ${dateStr}`,
      W / 2, 830
    );

    // Signatures
    ctx.strokeStyle = "#cbd5e1"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(280, 970); ctx.lineTo(560, 970); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W - 560, 970); ctx.lineTo(W - 280, 970); ctx.stroke();

    ctx.fillStyle = "#0f172a"; ctx.font = "italic 24px 'Poppins', system-ui, sans-serif";
    ctx.fillText(course.instructor, 420, 960);
    ctx.fillText("Dr. Aparna Suresh", W - 420, 960);
    ctx.fillStyle = "#64748b"; ctx.font = "14px 'Inter', system-ui, sans-serif";
    ctx.fillText("Course Instructor", 420, 995);
    ctx.fillText("Director, SWIFT-NABL Academy", W - 420, 995);

    // Certificate ID
    ctx.fillStyle = "#94a3b8"; ctx.font = "14px 'Inter', system-ui, sans-serif";
    ctx.fillText(`Verify at swift-nabl.academy/verify/${certId}   ·   Certificate ID: ${certId}`, W / 2, 1070);

    // Seal
    ctx.beginPath(); ctx.arc(W / 2, 900, 55, 0, Math.PI * 2);
    ctx.fillStyle = "#00A676"; ctx.fill();
    ctx.fillStyle = "#fff"; ctx.font = "bold 14px 'Poppins', system-ui, sans-serif";
    ctx.fillText("NABL", W / 2, 895);
    ctx.font = "bold 10px 'Poppins', system-ui, sans-serif";
    ctx.fillText("VERIFIED", W / 2, 912);
  };

  const download = () => {
    const c = canvasRef.current; if (!c) return;
    const url = c.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url; a.download = `SWIFT-NABL-${course.slug}.png`;
    document.body.appendChild(a); a.click(); a.remove();
    toast.success("Certificate downloaded!");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 md:px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <Award className="h-6 w-6 text-secondary" />
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Your certificate is ready 🎉</h1>
            <p className="text-sm text-muted-foreground">Download, share on LinkedIn, or add to your portfolio.</p>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-3 md:p-5 shadow-elegant overflow-hidden">
          <canvas ref={canvasRef} className="w-full h-auto rounded-lg" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button className="bg-hero text-white shadow-elegant" onClick={download}>
            <Download className="h-4 w-4 mr-1" /> Download PNG
          </Button>
          <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(window.location.href); toast.success("Certificate link copied"); }}>
            <Share2 className="h-4 w-4 mr-1" /> Share link
          </Button>
          <Button asChild variant="ghost"><Link to="/dashboard">Back to dashboard</Link></Button>
        </div>
      </div>
    </div>
  );
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number, lineHeight: number) {
  const words = text.split(" ");
  let line = ""; const lines: string[] = [];
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (ctx.measureText(test).width > maxWidth && line) { lines.push(line); line = w; }
    else line = test;
  }
  if (line) lines.push(line);
  lines.forEach((ln, i) => ctx.fillText(ln, x, y + i * lineHeight));
}
