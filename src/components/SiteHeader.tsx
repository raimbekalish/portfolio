import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { navItems, profile } from "../data";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  return <header className="site-header">
    <div className="ti-header">
      <a className="ti-brand" href="#top">{profile.name}<span aria-hidden="true"> / </span></a>
      <button ref={toggle} className="ti-menu" type="button" aria-expanded={open} aria-controls="ti-navigation" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      <nav id="ti-navigation" aria-label="Main navigation" data-open={open} onKeyDown={event => {
        if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
      }}>
        {navItems.map(item => <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>)}
        <a href={profile.resume} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>Résumé <ArrowUpRight aria-hidden="true" /></a>
      </nav>
    </div>
  </header>;
}
