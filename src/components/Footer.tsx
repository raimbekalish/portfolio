import { ArrowUp } from "lucide-react";
import { profile } from "../data";
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#top">{profile.name}</a>
        <span>Engineering, made visible.</span>
        <a href="#top" className="back-to-top">
          Back to top <ArrowUp aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
