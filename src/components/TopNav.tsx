import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X, Mail } from "lucide-react";

interface TopNavProps {
  name: string;
  resumeUrl: string;
  email: string;
}

export default function TopNav({ name, resumeUrl, email }: TopNavProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["work", "skills", "now", "contact"];
      const scrollPosition = window.scrollY + 100;

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

      // Calculate scroll progress
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / (documentHeight - windowHeight)) * 100;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileMenuOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    // Delay to prevent immediate close on button click
    setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMobileMenuOpen(false);
    }
  };

  const navItems = [
    { id: "work", label: "Work" },
    { id: "skills", label: "Toolbox" },
    { id: "now", label: "Now" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-stone-200/60 shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
      {/* Scroll progress indicator */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-stone-900/30 transition-all duration-150 ease-out" style={{ width: `${scrollProgress}%` }} />
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-base font-semibold text-stone-900 hover:text-stone-700 transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2 rounded-md px-2 py-1"
          >
            {name}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`relative px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:ring-offset-2 ${activeSection === item.id
                  ? "text-stone-900"
                  : "text-stone-600 hover:text-stone-900"
                  }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-stone-900"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
            <a
              href={`mailto:${email}`}
              className="ml-3 inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-md border border-stone-300/60 bg-white hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:ring-offset-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Mail className="w-3.5 h-3.5" />
              Email
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-md border border-stone-300/60 bg-white hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400/50 focus:ring-offset-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
            >
              <Download className="w-3.5 h-3.5" />
              Resume
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 rounded-md focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-white border-t border-stone-200/60"
          >
            <div className="px-5 py-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-inset ${activeSection === item.id
                    ? "text-stone-900 bg-stone-50"
                    : "text-stone-600 hover:text-stone-900 hover:bg-stone-50"
                    }`}
                >
                  {item.label}
                </button>
              ))}
              <a
                href={`mailto:${email}`}
                className="w-full inline-flex items-center justify-start gap-2 px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-md border border-stone-300/80 bg-white hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-inset mt-2"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-start gap-2 px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-md border border-stone-300/80 bg-white hover:bg-stone-50 transition-all focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-inset mt-2"
              >
                <Download className="w-4 h-4" />
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
