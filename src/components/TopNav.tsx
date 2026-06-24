import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Mail, FileText } from "lucide-react";

interface TopNavProps {
  name: string;
  resumeUrl: string;
  email: string;
  onResumeOpen: () => void;
}

export default function TopNav({ name, resumeUrl, email, onResumeOpen }: TopNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ["education", "experience", "work", "skills", "honors", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            return;
          }
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  }, []);

  const navItems = [
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "honors", label: "Honors" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-dark-900/80 backdrop-blur-xl border-b border-white/[0.06] shadow-[0_1px_12px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-sm font-bold text-dark-50 hover:text-white transition-colors rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-400/40 focus:ring-offset-2 focus:ring-offset-dark-900"
            aria-label="Scroll to top"
          >
            {name}
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-3 py-1.5 text-[13px] font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400/40 ${
                  activeSection === item.id ? "text-white" : "text-dark-300 hover:text-dark-100"
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] rounded-full bg-indigo-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}

            <div className="w-px h-5 bg-white/[0.08] mx-2" />

            <button
              onClick={onResumeOpen}
              className="btn-secondary text-[13px] px-3.5 py-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              Resume
            </button>
            <a href={`mailto:${email}`} className="btn-secondary text-[13px] px-3.5 py-1.5" aria-label="Email">
              <Mail className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-dark-300 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden bg-dark-900/95 backdrop-blur-xl border-t border-white/[0.06]"
          >
            <div className="px-5 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${
                    activeSection === item.id
                      ? "text-white bg-white/[0.06]"
                      : "text-dark-300 hover:text-white hover:bg-white/[0.03]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => { onResumeOpen(); setMobileMenuOpen(false); }}
                  className="w-full btn-primary text-sm justify-start"
                >
                  <FileText className="w-4 h-4" />
                  Resume
                </button>
                <a href={`mailto:${email}`} className="w-full btn-secondary text-sm justify-start">
                  <Mail className="w-4 h-4" />
                  Email
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
