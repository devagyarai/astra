"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LucideIcon, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: LucideIcon;
  iconColor?: string;
  title: string;
  description: string;
  estimatedRuntime?: string;
  isAnalyzing?: boolean;
  activeAction?: string | null;
  actionKey: string;
  onClick: () => void;
  className?: string;
}

export function ActionCard({
  icon: Icon,
  iconColor = "text-primary",
  title,
  description,
  estimatedRuntime = "3-5s",
  isAnalyzing,
  activeAction,
  actionKey,
  onClick,
  className
}: ActionCardProps) {
  const isThisActionActive = isAnalyzing && activeAction === actionKey;

  return (
    <motion.div
      whileHover={{ scale: isAnalyzing ? 1 : 1.02 }}
      whileTap={{ scale: isAnalyzing ? 1 : 0.98 }}
      className="w-full"
    >
      <Button
        variant="outline"
        onClick={onClick}
        disabled={isAnalyzing}
        className={cn(
          "w-full justify-start h-auto p-5 border-border/50 hover:bg-secondary/40 rounded-2xl transition-all shadow-sm hover:shadow-premium group bg-card/60 backdrop-blur-sm overflow-hidden relative",
          isThisActionActive && "border-primary/50 shadow-md",
          className
        )}
      >
        {isThisActionActive && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          />
        )}
        
        <div className="flex items-start gap-4 z-10 w-full">
          <div className={cn(
            "p-2.5 rounded-xl flex items-center justify-center shadow-sm border border-border/50 bg-background/80 transition-colors",
            isThisActionActive ? "bg-primary/10 border-primary/20" : "group-hover:bg-background"
          )}>
            {isThisActionActive ? (
              <RefreshCw className={cn("h-5 w-5 animate-spin", iconColor)} />
            ) : (
              <Icon className={cn("h-5 w-5", iconColor)} />
            )}
          </div>
          
          <div className="flex flex-col items-start text-left flex-1 space-y-1">
            <span className="text-sm font-semibold tracking-tight">{title}</span>
            <span className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </span>
            <div className="pt-2 flex items-center w-full justify-between">
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground/70 uppercase tracking-wider">
                {estimatedRuntime}
              </span>
              <span className="text-xs font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Run →
              </span>
            </div>
          </div>
        </div>
      </Button>
    </motion.div>
  );
}
