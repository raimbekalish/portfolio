import { useEffect, useState, type ReactNode } from "react";

/**
 * Progressive disclosure for long supporting material such as source excerpts and terminal output.
 * The HTML has it open, so search engines and readers without JavaScript get everything; on phones
 * and tablets (up to 1023 px) it folds once the page is interactive, unless the visit opened on a
 * link into the page (folding then would move what the reader came to see).
 */
export default function Fold({ summary, children }: { summary: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(true);
  useEffect(() => {
    if (!location.hash && matchMedia("(max-width: 1023px)").matches) setOpen(false);
  }, []);
  return (
    <details className="cs-fold" open={open} onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary>{summary}</summary>
      <div className="cs-fold-body">{children}</div>
    </details>
  );
}
