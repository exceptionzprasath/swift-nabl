import { Link } from "@tanstack/react-router";
import { FlaskConical, Mail, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card/50 mt-24">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-hero"><FlaskConical className="h-5 w-5 text-white" /></div>
            <div className="font-display font-bold">SWIFT·NABL Academy</div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground max-w-sm">
            Smart Workflow & Integrated Framework for Training — the enterprise learning platform for NABL accreditation and laboratory quality management.
          </p>
          <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@swift-nabl.academy</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 80 4000 8000</div>
          </div>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Learn</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/courses" className="hover:text-primary">All Courses</Link></li>
            <li><Link to="/paths" className="hover:text-primary">Learning Paths</Link></li>
            <li><Link to="/library" className="hover:text-primary">SOP Library</Link></li>
            <li><Link to="/dashboard" className="hover:text-primary">Dashboard</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Enterprise</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>For Laboratories</li>
            <li>Bulk Certification</li>
            <li>Manager Dashboards</li>
            <li>API & Integrations</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold text-sm mb-3">Company</div>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>
      </div>
      <div className="border-t py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} SWIFT·NABL Academy. All rights reserved.
      </div>
    </footer>
  );
}
