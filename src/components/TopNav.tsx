import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { navItems, profile } from "../data";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    const closeOnDesktop = () => {
      if (window.innerWidth > 1080) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("resize", closeOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("resize", closeOnDesktop);
    };
  }, [menuOpen]);

  useEffect(() => {
    let frame = 0;

    const updateActiveSection = () => {
      const trigger = window.scrollY + 120;
      let current = "";

      navItems.forEach((item) => {
        const id = item.href.slice(1);
        const section = document.getElementById(id);
        if (section && section.offsetTop <= trigger) current = id;
      });

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8) {
        current = "contact";
      }

      setActiveSection(current);
      frame = 0;
    };

    const handleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className="site-header">
      <nav className="nav container" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Raimbek Alish, back to top" onClick={() => setMenuOpen(false)}>
          <span className="brand-mark" aria-hidden="true">RA</span>
          <span>{profile.name}</span>
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a
              className={activeSection === item.href.slice(1) ? "is-active" : undefined}
              key={item.href}
              href={item.href}
              aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="nav-actions">
          <a className="nav-resume" href={profile.resume} target="_blank" rel="noreferrer">
            Résumé
            <ArrowUpRight aria-hidden="true" />
          </a>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <nav className="mobile-nav" id="mobile-navigation" aria-label="Mobile navigation">
          <div className="container mobile-nav-inner">
            {navItems.map((item) => (
              <a
                className={activeSection === item.href.slice(1) ? "is-active" : undefined}
                key={item.href}
                href={item.href}
                aria-current={activeSection === item.href.slice(1) ? "location" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="mobile-nav-actions">
              <a className="button button-primary" href={profile.resume} target="_blank" rel="noreferrer">
                View résumé <ArrowUpRight aria-hidden="true" />
              </a>
              <a className="button button-secondary" href={`mailto:${profile.email}`}>
                Email <Mail aria-hidden="true" />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
