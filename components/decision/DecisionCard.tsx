import * as React from "react";
import { Decision } from "@/types/decision";
import { analyzeDecision } from "@/lib/analysis/decision-analysis";
import { ArrowRight, CheckCircle2, RotateCw, MoreVertical, Archive, Copy, Trash2, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";

interface DecisionCardProps {
  decision: Decision;
  onClick: (id: string) => void;
  className?: string;
  onArchive?: (id: string) => void;
  onRestore?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function DecisionCard({ 
  decision, 
  onClick, 
  className, 
  onArchive,
  onRestore,
  onDuplicate,
  onDelete
}: DecisionCardProps) {
  const analysis = analyzeDecision(decision);
  const isComplete = analysis.completionScore >= 90;

  return (
    <div 
      onClick={() => onClick(decision.id)}
      className={cn(
        "p-5 hover:bg-secondary/30 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group rounded-xl border border-border/50 bg-card/40 hover:shadow-sm",
        className
      )}
    >
      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-base group-hover:text-primary transition-colors tracking-tight">
            {decision.title || "Untitled Decision"}
          </span>
          {isComplete ? (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-success bg-success/10 px-2 py-0.5 rounded-full">
              <CheckCircle2 className="h-3 w-3" /> Complete
            </span>
          ) : (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              <RotateCw className="h-3 w-3" /> In Progress
            </span>
          )}
          {decision.isArchived && (
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
              Archived
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">
          Last updated {new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(new Date(decision.updatedAt))}
        </span>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Completion</span>
          <span className="text-sm font-bold">{analysis.completionScore}%</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Confidence</span>
          <span className="text-sm font-bold">{analysis.confidenceScore}%</span>
        </div>
        
        
        {(onArchive || onRestore || onDuplicate || onDelete) ? (
          <div onClick={(e) => e.stopPropagation()} className="ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                <MoreVertical className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-background/95 backdrop-blur-md">
                {onRestore && (
                  <DropdownMenuItem onClick={() => onRestore(decision.id)} className="cursor-pointer font-medium">
                    <RefreshCw className="mr-2 h-4 w-4" /> Restore
                  </DropdownMenuItem>
                )}
                {onArchive && !decision.isArchived && (
                  <DropdownMenuItem onClick={() => onArchive(decision.id)} className="cursor-pointer font-medium">
                    <Archive className="mr-2 h-4 w-4" /> Archive
                  </DropdownMenuItem>
                )}
                {onDuplicate && (
                  <DropdownMenuItem onClick={() => onDuplicate(decision.id)} className="cursor-pointer font-medium">
                    <Copy className="mr-2 h-4 w-4" /> Duplicate
                  </DropdownMenuItem>
                )}
                {(onArchive || onRestore || onDuplicate) && onDelete && <DropdownMenuSeparator />}
                {onDelete && (
                  <DropdownMenuItem onClick={() => onDelete(decision.id)} className="cursor-pointer text-destructive focus:text-destructive font-medium">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0 ml-2" />
        )}
      </div>
    </div>
  );
}
