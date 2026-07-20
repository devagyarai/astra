import * as React from "react";
import { motion } from "framer-motion";

export function DecisionStep({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto h-full flex flex-col gap-6"
    >
      {children}
    </motion.div>
  );
}
