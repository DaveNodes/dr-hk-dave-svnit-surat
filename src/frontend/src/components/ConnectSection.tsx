import { Building, ExternalLink, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import {
  SiGooglescholar,
  SiLinkedin,
  SiOrcid,
  SiResearchgate,
} from "react-icons/si";
import { useContactInfo } from "../hooks/useQueries";

const profileLinks = [
  {
    name: "Google Scholar",
    url: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
    icon: SiGooglescholar,
    description: "Research citations & h-index",
    color: "hover:border-blue-300 hover:bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    name: "SCOPUS",
    url: "https://www.scopus.com/authid/detail.uri?authorId=36241161900",
    icon: ExternalLink,
    description: "Elsevier publication database",
    color: "hover:border-orange-300 hover:bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    name: "ORCID",
    url: "https://orcid.org/0000-0003-0970-4373",
    icon: SiOrcid,
    description: "Unique researcher identifier",
    color: "hover:border-green-300 hover:bg-green-50",
    iconColor: "text-green-600",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dr-harshit-dave-8b332b29/",
    icon: SiLinkedin,
    description: "Professional network",
    color: "hover:border-sky-300 hover:bg-sky-50",
    iconColor: "text-sky-600",
  },
  {
    name: "ResearchGate",
    url: "https://www.researchgate.net/profile/Harshit_Dave",
    icon: SiResearchgate,
    description: "Scientific network & publications",
    color: "hover:border-teal-300 hover:bg-teal-50",
    iconColor: "text-teal-600",
  },
];

export default function ConnectSection() {
  const { data: contactInfo } = useContactInfo();
  const email = contactInfo?.email ?? "hkdave@med.svnit.ac.in";
  const address =
    contactInfo?.address ??
    "Department of Mechanical Engineering, S.V. National Institute of Technology, Surat - 395007, Gujarat, India";

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
            Get In Touch
          </p>
          <h2 className="section-title text-3xl sm:text-4xl text-navy mb-4 gold-underline inline-block">
            Connect
          </h2>
          <p className="text-muted-foreground font-body text-base max-w-2xl mt-6">
            Interested in research collaborations, student mentorship, or
            academic inquiries? Reach out through any of the channels below.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            {/* Institution Block */}
            <div className="bg-navy rounded-2xl p-6 text-white relative overflow-hidden">
              {/* Decorative */}
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-gold/10 translate-y-1/2 -translate-x-1/2" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-lg bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <Building className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-base">
                      S.V. National Institute of Technology
                    </p>
                    <p className="text-white/60 text-xs font-body">
                      SVNIT, Surat
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-gold/80 mt-0.5 flex-shrink-0" />
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      {address}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-gold/80 flex-shrink-0" />
                    <a
                      href={`mailto:${email}`}
                      className="font-body text-sm text-white/80 hover:text-gold transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder with stylized address illustration */}
            <div className="bg-section-alt border border-border rounded-2xl overflow-hidden h-40 relative">
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.22 0.08 265) 1px, transparent 1px), linear-gradient(90deg, oklch(0.22 0.08 265) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center shadow-lg">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 shadow text-center">
                  <p className="text-xs font-body font-semibold text-navy">
                    SVNIT Surat
                  </p>
                  <p className="text-[10px] text-muted-foreground font-body">
                    Ichchhanath, Surat - 395007
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Profile Links Grid */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-display font-semibold text-navy text-lg mb-4">
              Academic Profiles
            </h3>
            <div className="space-y-3">
              {profileLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.1 + idx * 0.07 }}
                    className={`flex items-center gap-4 p-4 rounded-xl border border-border bg-white transition-all duration-200 group ${link.color}`}
                  >
                    <div className="w-9 h-9 rounded-lg bg-section-alt border border-border flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                      <Icon className={`w-4 h-4 ${link.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-body font-semibold text-sm text-foreground">
                        {link.name}
                      </p>
                      <p className="font-body text-xs text-muted-foreground truncate">
                        {link.description}
                      </p>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground flex-shrink-0 transition-colors" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
