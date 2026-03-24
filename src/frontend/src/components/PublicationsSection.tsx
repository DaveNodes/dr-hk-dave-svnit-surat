import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, ExternalLink, FileText } from "lucide-react";
import { motion } from "motion/react";
import type { Publication } from "../backend.d";
import { usePublications } from "../hooks/useQueries";

const FALLBACK_PUBLICATIONS: Publication[] = [
  {
    title:
      "Investigations on surface roughness of FDM parts using ABS material with different process parameters",
    publication: "Journal of Manufacturing Technology Research",
    year: BigInt(2023),
    link: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
  },
  {
    title:
      "Effect of layer thickness and infill density on tensile strength of 3D-printed PLA composite specimens",
    publication: "International Journal of Advanced Manufacturing Technology",
    year: BigInt(2023),
    link: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
  },
  {
    title:
      "Parametric study of clay extrusion 3D printing: influence of nozzle diameter and printing speed",
    publication: "Additive Manufacturing Letters",
    year: BigInt(2022),
    link: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
  },
  {
    title:
      "Multi-response optimization of EDM parameters for micro-hole drilling in titanium alloy",
    publication: "Precision Engineering",
    year: BigInt(2022),
    link: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
  },
  {
    title:
      "Investigations on shape deposition manufacturing using FDM process for recycled polymer materials",
    publication: "Materials Today: Proceedings",
    year: BigInt(2021),
    link: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
  },
  {
    title:
      "ANN-based prediction of surface integrity during micro-USM of borosilicate glass",
    publication: "Journal of Materials Processing Technology",
    year: BigInt(2021),
    link: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
  },
];

function PublicationCard({
  pub,
  index,
}: {
  pub: Publication;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
      className="group bg-white border border-border rounded-xl p-5 hover:border-navy/30 hover:shadow-md transition-all duration-200"
    >
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-navy/8 border border-navy/10 flex items-center justify-center flex-shrink-0 mt-0.5">
          <FileText className="w-3.5 h-3.5 text-navy/60" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-body font-semibold text-sm text-foreground leading-snug mb-2 group-hover:text-navy transition-colors line-clamp-2">
            {pub.title}
          </h4>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground font-body">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span className="truncate max-w-[200px]">{pub.publication}</span>
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {pub.year.toString()}
            </span>
          </div>
        </div>

        {pub.link && (
          <a
            href={pub.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-navy hover:bg-navy/5 transition-all duration-150"
            aria-label="View publication"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function PublicationSkeleton() {
  return (
    <div className="bg-white border border-border rounded-xl p-5">
      <div className="flex items-start gap-4">
        <Skeleton className="w-8 h-8 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-3 w-2/3" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

export default function PublicationsSection() {
  const { data: pubs, isLoading } = usePublications();
  const publications = pubs && pubs.length > 0 ? pubs : FALLBACK_PUBLICATIONS;

  return (
    <section className="py-20 bg-background pt-36">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-gold font-body text-sm uppercase tracking-widest font-semibold mb-2">
            Scholarly Work
          </p>
          <h2 className="section-title text-3xl sm:text-4xl text-navy mb-4 gold-underline inline-block">
            Publications
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-2xl mt-6">
            Peer-reviewed articles, conference proceedings, and book chapters
            contributing to the advancement of manufacturing science and
            engineering.
          </p>

          <a
            href="https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-4 text-sm text-navy font-body font-semibold hover:text-gold transition-colors"
          >
            View full list on Google Scholar
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Publications Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-4">
            {["p1", "p2", "p3", "p4", "p5", "p6"].map((id) => (
              <PublicationSkeleton key={id} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {publications.map((pub, idx) => (
              <PublicationCard
                key={`${pub.title}-${idx}`}
                pub={pub}
                index={idx}
              />
            ))}
          </div>
        )}

        {publications.length === 0 && !isLoading && (
          <div className="py-16 text-center">
            <BookOpen className="w-10 h-10 text-muted-foreground/40 mx-auto mb-4" />
            <p className="font-body text-muted-foreground">
              Publications will be listed here. Visit{" "}
              <a
                href="https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy underline"
              >
                Google Scholar
              </a>{" "}
              for the complete list.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
