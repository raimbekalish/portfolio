import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: prefersReducedMotion ? 1000 : 140,
    damping: prefersReducedMotion ? 100 : 28,
    mass: 0.2,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-gradient-to-r from-indigo-400 via-violet-300 to-cyan-300 shadow-[0_0_18px_rgba(129,140,248,0.45)]"
      style={{ scaleX }}
    />
  );
}
