import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
  description?: string
}

export function Section({
  title,
  description,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      {(title || description) && (
        <div className="flex flex-col gap-2">
          {title && (
            <h2 className="text-3xl font-bold tracking-tight font-heading">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-muted-foreground text-lg">{description}</p>
          )}
        </div>
      )}
      <div className="w-full">{children}</div>
    </section>
  )
}
