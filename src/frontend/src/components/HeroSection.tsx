import { Badge } from "@/components/ui/badge";
import { ExternalLink, GraduationCap, MapPin } from "lucide-react";
import { motion } from "motion/react";
import {
  SiGooglescholar,
  SiLinkedin,
  SiOrcid,
  SiResearchgate,
} from "react-icons/si";
import { useProfessorProfile } from "../hooks/useQueries";

const externalProfiles = [
  {
    name: "Google Scholar",
    url: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
    icon: SiGooglescholar,
    label: "Scholar",
  },
  {
    name: "SCOPUS",
    url: "https://www.scopus.com/authid/detail.uri?authorId=36241161900",
    icon: ExternalLink,
    label: "SCOPUS",
    isSvg: true,
  },
  {
    name: "ORCID",
    url: "https://orcid.org/0000-0003-0970-4373",
    icon: SiOrcid,
    label: "ORCID",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dr-harshit-dave-8b332b29/",
    icon: SiLinkedin,
    label: "LinkedIn",
  },
  {
    name: "ResearchGate",
    url: "https://www.researchgate.net/profile/Harshit_Dave",
    icon: SiResearchgate,
    label: "ResearchGate",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function HeroSection() {
  const { data: profile } = useProfessorProfile();

  const name = profile?.name ?? "Dr. Harshit K. Dave";
  const title = profile?.title ?? "Professor";
  const department =
    profile?.department ?? "Department of Mechanical Engineering";
  const institution =
    profile?.institution ??
    "S. V. National Institute of Technology (SVNIT), Surat";
  const location = profile?.location ?? "Surat - 395007, Gujarat, India";

  return (
    <section className="relative hero-gradient noise-overlay min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Decorative geometric elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 rounded-full opacity-5 bg-gold translate-x-1/2" />
        <div className="absolute bottom-10 left-0 w-64 h-64 rounded-full opacity-5 bg-white -translate-x-1/3" />
        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <Badge className="bg-gold/20 text-gold border-gold/30 text-xs font-body font-medium tracking-wide uppercase">
                SVNIT Surat · Mechanical Engineering
              </Badge>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-4"
            >
              {name}
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-6">
              <p className="text-gold font-display text-xl sm:text-2xl font-semibold mb-1">
                {title}
              </p>
              <p className="text-white/70 font-body text-base">{department}</p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-2 mb-8"
            >
              <div className="flex items-start gap-2 text-white/70">
                <GraduationCap className="w-4 h-4 mt-0.5 flex-shrink-0 text-gold/70" />
                <span className="font-body text-sm">{institution}</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <MapPin className="w-4 h-4 flex-shrink-0 text-gold/70" />
                <span className="font-body text-sm">{location}</span>
              </div>
            </motion.div>

            {/* Profile Links */}
            <motion.div variants={itemVariants}>
              <p className="text-white/40 text-xs font-body uppercase tracking-widest mb-3">
                Academic Profiles
              </p>
              <div className="flex flex-wrap gap-2">
                {externalProfiles.map((profile) => {
                  const Icon = profile.icon;
                  return (
                    <a
                      key={profile.name}
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 hover:border-white/30 text-white/80 hover:text-white text-xs font-body font-medium transition-all duration-200 group"
                    >
                      <Icon className="w-3 h-3" />
                      {profile.label}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>

          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-3 rounded-2xl border border-gold/30" />
              <div className="absolute -inset-6 rounded-2xl border border-white/10" />

              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/generated/professor-profile.dim_400x400.jpg"
                  alt="Dr. Harshit K. Dave"
                  className="w-full h-full object-cover"
                />
                {/* Overlay gradient on bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-dark/60 to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-border">
                <p className="text-xs text-muted-foreground font-body mb-0.5">
                  Department
                </p>
                <p className="text-xs font-semibold text-navy font-body">
                  Mechanical Engineering
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-white/30 text-xs font-body">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.4,
              ease: "easeInOut",
            }}
            className="w-0.5 h-6 bg-gradient-to-b from-white/30 to-transparent rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
