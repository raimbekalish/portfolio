import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface SectionWrapperProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`py-16 sm:py-20 lg:py-20 px-5 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-5xl mx-auto">{children}</div>
    </motion.section>
  );
}
