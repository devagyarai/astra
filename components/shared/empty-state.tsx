"use client";

import * as React from "react"
import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"
import { motion, HTMLMotionProps } from "framer-motion"

interface EmptyStateProps extends HTMLMotionProps<"div"> {
  icon: LucideIcon
  title: string
  description?: string
  action?: React.ReactNode
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border bg-card/50 p-12 text-center shadow-sm backdrop-blur-sm",
        className
      )}
      {...props}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/80 mb-6 shadow-sm">
        <Icon className="h-8 w-8 text-secondary-foreground/60" />
      </div>
      <h3 className="text-title mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-body max-w-sm mb-6">
          {description}
        </p>
      )}
      {action && <div>{action}</div>}
    </motion.div>
  )
}
