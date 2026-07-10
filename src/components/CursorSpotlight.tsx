import { useEffect, useRef } from "react";

export default function CursorSpotlight() {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pointerQuery = window.matchMedia("(pointer: fine)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!pointerQuery.matches || motionQuery.matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;

    const update = () => {
      raf = 0;
      const el = spotlightRef.current;
      if (!el) return;
      el.style.setProperty("--spotlight-x", `${x}px`);
      el.style.setProperty("--spotlight-y", `${y}px`);
      el.style.opacity = "1";
    };

    const handleMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!raf) raf = window.requestAnimationFrame(update);
    };

    const handleLeave = () => {
      if (spotlightRef.current) spotlightRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerleave", handleLeave);
    update();

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={spotlightRef} aria-hidden="true" className="cursor-spotlight" />;
}
