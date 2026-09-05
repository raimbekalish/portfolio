import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, profile } from "../data";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 640) setMenuOpen(false);
    };
    window.addEventListener("keydown", escape);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("keydown", escape);
      window.removeEventListener("resize", resize);
    };
  }, [menuOpen]);
  return (
    <header className="site-header">
      <nav className="container nav" aria-label="Primary navigation">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          {profile.name}
          <span className="brand-dot" aria-hidden="true">
            ✳
          </span>
        </a>
        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <a
            className="nav-resume"
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
          >
            Résumé <ArrowUpRight aria-hidden="true" />
          </a>
          <button
            ref={buttonRef}
            className="menu-toggle"
            type="button"
            aria-label={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </nav>
      <nav
        className="mobile-nav"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => {
              setMenuOpen(false);
              document
                .querySelector<HTMLElement>(item.href)
                ?.focus({ preventScroll: true });
            }}
          >
            {item.label}
            <ArrowUpRight aria-hidden="true" />
          </a>
        ))}
      </nav>
    </header>
  );
}
