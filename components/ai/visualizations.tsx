"use client";

import { BiasAnalysis, GoalReview, TradeoffMatrix } from "@/types/analysis";
import { motion } from "framer-motion";
import { AlertTriangle, ShieldAlert, GitMerge, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function BiasVisualization({ data }: { data: BiasAnalysis }) {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "text-destructive border-destructive/20 bg-destructive/10";
      case "Medium": return "text-warning border-warning/20 bg-warning/10";
      case "Low": return "text-success border-success/20 bg-success/10";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-3 border border-border/50 rounded-xl bg-card/50 backdrop-blur-sm">
        <span className="text-sm font-semibold tracking-tight">Overall Bias Risk</span>
        <Badge variant="outline" className={cn("px-2.5 py-0.5 rounded-full font-semibold border", getRiskColor(data.overallRisk))}>
          {data.overallRisk}
        </Badge>
      </div>

      <div className="space-y-3">
        {data.biases.map((bias, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="p-4 border border-border/50 rounded-2xl bg-card shadow-premium relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-warning/50" />
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
              <h4 className="font-semibold text-sm">{bias.type}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
              {bias.explanation}
            </p>
            <div className="p-3 bg-secondary/50 rounded-xl">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-3.5 w-3.5 text-primary mt-0.5 shrink-0" />
                <span className="text-xs font-medium leading-relaxed">
                  {bias.correctiveAdvice}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function TradeoffVisualization({ data }: { data: TradeoffMatrix }) {
  return (
    <div className="space-y-4 w-full">
      <div className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-2">
          <GitMerge className="h-4 w-4" /> Hardest Trade-off
        </h4>
        <p className="text-sm font-medium leading-relaxed">
          {data.hardestTradeoff}
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 snap-x">
        {data.options.map((opt, i) => (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            key={i}
            className="min-w-[280px] p-5 border border-border/50 rounded-2xl bg-card shadow-sm snap-center flex-1"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-base">{opt.optionTitle}</h4>
              <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                {opt.confidence}% confidence
              </Badge>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-secondary/50">
                  <div className="text-muted-foreground mb-1">Cost</div>
                  <div className="font-medium">{opt.cost}</div>
                </div>
                <div className="p-2 rounded-xl bg-secondary/50">
                  <div className="text-muted-foreground mb-1">Effort</div>
                  <div className="font-medium">{opt.complexity}</div>
                </div>
                <div className="p-2 rounded-xl bg-secondary/50">
                  <div className="text-muted-foreground mb-1">Impact</div>
                  <div className="font-medium">{opt.impact}</div>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-success mb-2">Pros</h5>
                <ul className="space-y-1">
                  {opt.pros.map((pro, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-success mt-0.5">•</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-[10px] font-bold uppercase tracking-wider text-destructive mb-2">Cons</h5>
                <ul className="space-y-1">
                  {opt.cons.map((con, j) => (
                    <li key={j} className="text-xs text-muted-foreground flex items-start gap-1.5">
                      <span className="text-destructive mt-0.5">•</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function GoalVisualization({ data }: { data: GoalReview }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 border border-border/50 rounded-2xl bg-card">
        <span className="text-sm font-semibold">Goal Score</span>
        <div className="flex items-center gap-2">
          <div className="h-2 w-24 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${data.score}%` }}
              className="h-full bg-primary"
            />
          </div>
          <span className="text-sm font-bold text-primary">{data.score}/100</span>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Clarity", val: data.metrics.clarity },
          { label: "Measurability", val: data.metrics.measurability },
          { label: "Completeness", val: data.metrics.completeness }
        ].map(m => (
          <div key={m.label} className="p-3 border border-border/50 rounded-xl bg-card text-center">
            <div className="text-xs text-muted-foreground mb-1">{m.label}</div>
            <div className="font-semibold">{m.val}/10</div>
          </div>
        ))}
      </div>

      <div className="p-4 border border-border/50 rounded-2xl bg-destructive/5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-destructive mb-2 flex items-center gap-2">
          <ShieldAlert className="h-4 w-4" /> Weaknesses
        </h4>
        <ul className="space-y-2">
          {data.weaknesses.map((w, i) => (
            <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 leading-relaxed">
              <span className="text-destructive mt-0.5">•</span> {w}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
