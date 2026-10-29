import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { identity } from "../content";
import { useCurrentSection, useMediaQuery } from "../hooks";
import { navItems } from "../structure";

const ids = navItems.map((item) => item.id);

/**
 * The sticky site bar: section links with a current-section marker, and the résumé. Below 900px
 * the links fold into a menu that closes on Escape, on an outside press and on a link choice.
 */
export default function SiteBar() {
  const current = useCurrentSection(ids);
  const folded = useMediaQuery("(max-width: 899px)");
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => { if (!folded) setOpen(false); }, [folded]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    const onPress = (e: PointerEvent) => {
      const target = e.target as Node;
      if (!menu.current?.contains(target) && !button.current?.contains(target)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onPress); };
  }, [open]);

  return (
    <header className="sp-bar" data-open={open}>
      <a className="sp-brand" href="#top">
        {identity.name}
        <span>Software engineering</span>
      </a>
      <nav className="sp-nav" aria-label="Primary">
        <button type="button" className="sp-menu-button" ref={button} aria-expanded={open} aria-controls="sp-menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X aria-hidden="true" strokeWidth={1.75} /> : <Menu aria-hidden="true" strokeWidth={1.75} />}
          Menu
        </button>
        <div className="sp-menu" id="sp-menu" ref={menu}>
          <ul className="sp-nav-list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} aria-current={current === item.id ? "true" : undefined} onClick={() => setOpen(false)}>{item.label}</a>
              </li>
            ))}
          </ul>
          <a className="sp-nav-resume" href={identity.resume} target="_blank" rel="noreferrer">
            Résumé <ArrowUpRight aria-hidden="true" strokeWidth={1.75} />
          </a>
        </div>
      </nav>
    </header>
  );
}
