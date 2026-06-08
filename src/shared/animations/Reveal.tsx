import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export function Reveal({ children, delay = 0, direction = "up", className }: RevealProps) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -24 }
      : direction === "right"
        ? { opacity: 0, x: 24 }
        : { opacity: 0, y: 20 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
