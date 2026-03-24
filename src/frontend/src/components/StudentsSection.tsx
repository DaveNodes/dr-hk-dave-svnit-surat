import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, GraduationCap, Users } from "lucide-react";
import { motion } from "motion/react";
import type { Student } from "../backend.d";
import { useStudents } from "../hooks/useQueries";

const FALLBACK_CURRENT: Student[] = [
  {
    name: "Rahul Sharma",
    degreeType: "Ph.D.",
    topic:
      "Multi-material 3D printing using FDM with composite polymer filaments",
    status: "current",
  },
  {
    name: "Priya Patel",
    degreeType: "Ph.D.",
    topic:
      "Optimization of clay extrusion-based 3D printing for architectural applications",
    status: "current",
  },
  {
    name: "Ankit Verma",
    degreeType: "M.Tech",
    topic: "Effect of process parameters on surface quality in micro-EDM",
    status: "current",
  },
  {
    name: "Sneha Joshi",
    degreeType: "Ph.D.",
    topic:
      "Sustainable additive manufacturing using recycled thermoplastic materials",
    status: "current",
  },
  {
    name: "Deepak Mehta",
    degreeType: "M.Tech",
    topic: "Robotic automation for additive manufacturing post-processing",
    status: "current",
  },
];

const FALLBACK_ALUMNI: Student[] = [
  {
    name: "Dr. Vishal Kumar",
    degreeType: "Ph.D.",
    topic:
      "Investigations on FDM process parameters for ABS material mechanical properties",
    status: "alumni",
  },
  {
    name: "Dr. Nidhi Shah",
    degreeType: "Ph.D.",
    topic:
      "Micro-USM of advanced ceramics: parameter optimization and surface integrity",
    status: "alumni",
  },
  {
    name: "Kiran Trivedi",
    degreeType: "M.Tech",
    topic: "ANN modeling for EDM of titanium alloy",
    status: "alumni",
  },
  {
    name: "Dr. Amit Desai",
    degreeType: "Ph.D.",
    topic:
      "Development of hybrid machining process for hard-to-machine materials",
    status: "alumni",
  },
  {
    name: "Pooja Rathod",
    degreeType: "M.Tech",
    topic: "Parametric study of laser cutting parameters on stainless steel",
    status: "alumni",
  },
  {
    name: "Dr. Sanjay Panchal",
    degreeType: "Ph.D.",
    topic:
      "Fabrication and characterization of polymer nanocomposite filaments for FDM",
    status: "alumni",
  },
];

const degreeColors: Record<string, string> = {
  "Ph.D.": "bg-navy/10 text-navy border-navy/20",
  "M.Tech": "bg-amber-50 text-amber-700 border-amber-200",
  "M.E.": "bg-green-50 text-green-700 border-green-200",
};

function StudentCard({ student, index }: { student: Student; index: number }) {
  const badgeClass =
    degreeColors[student.degreeType] ??
    "bg-muted text-muted-foreground border-border";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: "easeOut" }}
      className="bg-white border border-border rounded-xl p-5 hover:border-navy/30 hover:shadow-sm transition-all duration-200"
    >
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-display font-bold">
            {student.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h4 className="font-body font-semibold text-sm text-foreground">
              {student.name}
            </h4>
            <Badge
              variant="outline"
              className={`text-[10px] font-body font-semibold px-2 py-0 h-4 ${badgeClass}`}
            >
              {student.degreeType}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground font-body leading-relaxed line-clamp-2">
            {student.topic}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function StudentSkeleton() {
  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <div className="flex items-start gap-3">
        <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-3 w-4/5" />
          <Skeleton className="h-3 w-3/5" />
        </div>
      </div>
    </div>
  );
}

function StudentList({ status }: { status: string }) {
  const { data: students, isLoading } = useStudents(status);
  const fallback = status === "current" ? FALLBACK_CURRENT : FALLBACK_ALUMNI;
  const list = students && students.length > 0 ? students : fallback;

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 gap-3 mt-4">
        {["s1", "s2", "s3", "s4"].map((id) => (
          <StudentSkeleton key={id} />
        ))}
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div className="py-12 text-center">
        <Users className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
        <p className="font-body text-sm text-muted-foreground">
          No students listed yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-4">
      {list.map((s, idx) => (
        <StudentCard key={`${s.name}-${idx}`} student={s} index={idx} />
      ))}
    </div>
  );
}

export default function StudentsSection() {
  return (
    <section className="py-20 bg-section-alt pt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <p className="text-gold font-body text-sm uppercase tracking-widest font-semibold mb-2">
            Mentorship
          </p>
          <h2 className="section-title text-3xl sm:text-4xl text-navy mb-4 gold-underline inline-block">
            Students
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-2xl mt-6">
            Guiding the next generation of engineers and researchers in the
            pursuit of innovation across additive manufacturing and advanced
            machining domains.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="current">
          <TabsList className="bg-white border border-border h-10 p-1 rounded-lg">
            <TabsTrigger
              value="current"
              className="font-body text-sm data-[state=active]:bg-navy data-[state=active]:text-white rounded-md transition-all"
            >
              <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
              Current Students
            </TabsTrigger>
            <TabsTrigger
              value="alumni"
              className="font-body text-sm data-[state=active]:bg-navy data-[state=active]:text-white rounded-md transition-all"
            >
              <BookOpen className="w-3.5 h-3.5 mr-1.5" />
              Alumni
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <StudentList status="current" />
          </TabsContent>
          <TabsContent value="alumni">
            <StudentList status="alumni" />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
