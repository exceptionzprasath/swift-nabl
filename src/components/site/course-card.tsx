import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Award, Clock, Star, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/lib/mock-data";

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: (index % 8) * 0.04 }}
    >
      <Link
        to="/courses/$slug"
        params={{ slug: course.slug }}
        className="group block rounded-2xl bg-card shadow-card hover:shadow-elegant transition-all overflow-hidden border"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
          <img
            src={course.image}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            {course.bestseller && <Badge className="bg-warning text-warning-foreground">Bestseller</Badge>}
            {course.new && <Badge className="bg-secondary text-secondary-foreground">New</Badge>}
          </div>
          <div className="absolute bottom-3 right-3 rounded-lg glass px-2 py-1 text-xs font-medium">
            {course.level}
          </div>
        </div>
        <div className="p-4 space-y-2">
          <div className="text-xs font-medium text-primary">{course.category}</div>
          <h3 className="font-display font-semibold leading-snug line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <div className="text-xs text-muted-foreground">{course.instructor} · {course.lab}</div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 fill-warning text-warning" />{course.rating}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students.toLocaleString()}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
          </div>
          <div className="flex items-center justify-between pt-2 border-t mt-2">
            <div>
              <span className="font-display font-bold text-lg">₹{course.price.toLocaleString()}</span>
              <span className="ml-2 text-xs text-muted-foreground line-through">₹{course.originalPrice.toLocaleString()}</span>
            </div>
            {course.certificate && <Award className="h-4 w-4 text-secondary" />}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
