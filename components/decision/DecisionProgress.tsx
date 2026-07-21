import * as React from "react";
import { cn } from "@/lib/utils";

interface DecisionProgressProps {
  activeSection: string;
  onNavigate: (id: string) => void;
  completedSections: Record<string, boolean>;
}

const SECTIONS = [
  { id: "goal", label: "Goal" },
  { id: "context", label: "Context" },
  { id: "constraints", label: "Constraints" },
  { id: "options", label: "Options" },
  { id: "evidence", label: "Evidence" },
  { id: "review", label: "Review" },
];

export function DecisionProgress({ activeSection, onNavigate, completedSections }: DecisionProgressProps) {
  return (
    <div className="flex items-center justify-between w-full max-w-2xl gap-2 px-2">
      {SECTIONS.map((section, index) => {
        const isActive = activeSection === section.id;
        const isCompleted = completedSections[section.id];
        const isLast = index === SECTIONS.length - 1;
        const isPast = SECTIONS.findIndex(s => s.id === activeSection) > index;

        return (
          <React.Fragment key={section.id}>
            <button
              aria-label={`Step: ${section.label}${isCompleted ? " (Completed)" : ""}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => onNavigate(section.id)}
              className={cn(
                "relative group flex flex-col items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md transition-all z-10",
                isActive ? "opacity-100" : "opacity-60 hover:opacity-100"
              )}
            >
              <div className={cn(
                "h-3 w-3 rounded-full border shadow-sm transition-all flex items-center justify-center",
                isActive 
                  ? "bg-primary border-primary ring-4 ring-primary/20 scale-125" 
                  : isCompleted 
                    ? "bg-primary/80 border-primary text-primary-foreground" 
                    : "bg-card border-border hover:border-foreground/30"
              )}>
                {isCompleted && !isActive ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                ) : isActive ? (
                  <div className="h-1.5 w-1.5 bg-primary-foreground rounded-full" />
                ) : null}
              </div>
              <span className={cn(
                "absolute top-5 text-[10px] font-medium tracking-wider uppercase whitespace-nowrap transition-all",
                isActive ? "text-foreground font-bold" : "text-muted-foreground",
                isActive ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
              )}>
                {section.label}
              </span>
            </button>
            {!isLast && (
              <div className={cn(
                "flex-1 h-[2px] rounded-full transition-colors",
                isPast || isCompleted ? "bg-primary/50" : "bg-border"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
