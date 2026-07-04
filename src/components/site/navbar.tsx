import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Bell, Bookmark, Menu, MessageSquare, Search, FlaskConical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const nav = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/paths", label: "Learning Paths" },
  { to: "/library", label: "SOP Library" },
  { to: "/dashboard", label: "Student" },
  { to: "/instructor", label: "Instructor" },
  { to: "/admin", label: "Admin" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-soft" : "bg-background/80 backdrop-blur"}`}>
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero shadow-elegant">
            <FlaskConical className="h-5 w-5 text-white" />
          </div>
          <div className="leading-tight">
            <div className="font-display text-base font-bold tracking-tight">
              SWIFT<span className="text-primary">·</span>NABL
            </div>
            <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Academy</div>
          </div>
        </Link>

        <nav className="hidden xl:flex items-center gap-1 ml-4">
          {nav.map((n) => (
            <Link key={n.to} to={n.to}
              className="px-2.5 py-2 text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "px-2.5 py-2 text-sm font-semibold text-primary" }}>
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex flex-1 max-w-md ml-auto relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses, standards, instructors…" className="pl-9 bg-muted/50 border-transparent focus-visible:bg-card" />
        </div>

        <div className="hidden md:flex items-center gap-1">
          <Button variant="ghost" size="icon" aria-label="Bookmarks"><Bookmark className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Messages"><MessageSquare className="h-5 w-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive" />
          </Button>
          <Button asChild className="bg-hero text-white shadow-elegant hover:opacity-95">
            <Link to="/courses">Start Learning</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="xl:hidden ml-auto md:ml-0" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open && (
        <div className="xl:hidden border-t bg-card">
          <div className="px-4 py-3 space-y-1">
            <div className="md:hidden relative mb-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search…" className="pl-9" />
            </div>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-muted">
                {n.label}
              </Link>
            ))}
            <Button asChild className="w-full mt-2 bg-hero text-white" onClick={() => setOpen(false)}>
              <Link to="/courses">Start Learning</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
