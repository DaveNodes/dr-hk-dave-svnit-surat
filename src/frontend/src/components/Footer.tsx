import { Link } from "@tanstack/react-router";
import { BookOpen, ExternalLink } from "lucide-react";
import {
  SiGooglescholar,
  SiLinkedin,
  SiOrcid,
  SiResearchgate,
} from "react-icons/si";

const footerLinks = [
  {
    name: "Google Scholar",
    url: "https://scholar.google.co.in/citations?user=dn2M0M0AAAAJ&hl=en",
    icon: SiGooglescholar,
  },
  {
    name: "ORCID",
    url: "https://orcid.org/0000-0003-0970-4373",
    icon: SiOrcid,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/dr-harshit-dave-8b332b29/",
    icon: SiLinkedin,
  },
  {
    name: "ResearchGate",
    url: "https://www.researchgate.net/profile/Harshit_Dave",
    icon: SiResearchgate,
  },
];

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Research", path: "/research" },
  { label: "Publications", path: "/publications" },
  { label: "Students", path: "/students" },
  { label: "Connect", path: "/connect" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded bg-gold flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-4 h-4 text-navy" />
              </div>
              <div>
                <p className="font-display font-semibold text-white">
                  Dr. H. K. Dave
                </p>
                <p className="text-white/50 text-xs font-body">
                  Professor, SVNIT Surat
                </p>
              </div>
            </div>
            <p className="text-white/50 text-sm font-body leading-relaxed max-w-xs">
              Department of Mechanical Engineering, S. V. National Institute of
              Technology, Surat.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white/90 text-sm mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-white/50 hover:text-gold text-sm font-body transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-display font-semibold text-white/90 text-sm mb-4 uppercase tracking-wider">
              Profiles
            </h4>
            <div className="flex flex-wrap gap-2">
              {footerLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="w-9 h-9 rounded-lg bg-white/10 hover:bg-gold/20 border border-white/10 hover:border-gold/30 flex items-center justify-center text-white/60 hover:text-gold transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/40 text-xs font-body text-center sm:text-left">
            © {currentYear} Dr. Harshit K. Dave · Department of Mechanical
            Engineering, SVNIT Surat
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/30 hover:text-white/60 text-xs font-body transition-colors flex items-center gap-1"
          >
            Built with ♥ using caffeine.ai
            <ExternalLink className="w-2.5 h-2.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
