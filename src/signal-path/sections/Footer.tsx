import { ArrowUp } from "lucide-react";
import { launched } from "../../work/release";
import { identity } from "../content";
import { OutLink } from "../ui";

export default function Footer() {
  return (
    <footer className="sp-foot">
      <p className="sp-foot-name">{identity.name}</p>
      <p className="sp-foot-links">
        <OutLink href={identity.linkedin}>LinkedIn</OutLink>
        <OutLink href={identity.github}>GitHub</OutLink>
        <a href={`mailto:${identity.email}`}>{identity.email}</a>
      </p>
      <p className="sp-foot-note">
        {!launched && <>Signal Path design preview. <a href={import.meta.env.BASE_URL}>Back to the current site</a></>}
        <a className="sp-foot-top" href="#top">Back to top <ArrowUp aria-hidden="true" strokeWidth={1.75} /></a>
      </p>
    </footer>
  );
}
