"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, HelpCircle, ArrowRightCircle, Sparkles, CheckCircle, Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Decision } from "@/types/decision";
import { analyzeDecision } from "@/lib/analysis/decision-analysis";

interface SidebarRightProps {
  decision: Decision;
}

export function SidebarRight({ decision }: SidebarRightProps) {
  if (!decision) return null;

  const analysis = analyzeDecision(decision);

  const confidenceLabel = analysis.confidenceScore >= 90 ? "Very High" 
                        : analysis.confidenceScore >= 70 ? "High" 
                        : analysis.confidenceScore >= 50 ? "Medium" 
                        : analysis.confidenceScore >= 30 ? "Low" 
                        : "Minimal";

  const riskColor = analysis.riskLevel === "High" ? "text-destructive" 
                  : analysis.riskLevel === "Medium" ? "text-warning" 
                  : "text-success";

  return (
    <aside className="hidden lg:flex w-[320px] flex-col border-l border-border/50 bg-background/50 backdrop-blur-xl overflow-y-auto p-6 gap-6">
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-6">Decision Intelligence</h3>
        
        <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-md mb-6 transition-all hover:shadow-md">
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-primary" /> Confidence</span>
              <span className={`text-xs font-bold uppercase tracking-wider ${riskColor}`}>{analysis.riskLevel} Risk</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="flex items-end justify-between mb-3">
              <span className="text-3xl font-bold font-heading tracking-tight">{analysis.confidenceScore}%</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{confidenceLabel}</span>
            </div>
            <Progress value={analysis.confidenceScore} className="h-2 bg-secondary" />
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-md mb-6 transition-all hover:shadow-md">
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-success" /> Completion
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="flex items-end justify-between mb-3">
              <span className="text-2xl font-bold font-heading tracking-tight">{analysis.completionScore}%</span>
            </div>
            <Progress value={analysis.completionScore} className="h-2 bg-secondary" />
          </CardContent>
        </Card>

        <Separator className="my-6 bg-border/50" />

        {analysis.strengths.length > 0 && (
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-success flex items-center gap-2">
              <Zap className="h-3 w-3" /> Strengths
            </h4>
            <div className="flex flex-col gap-2">
              {analysis.strengths.map((s, i) => (
                <div key={i} className="rounded-xl border border-success/20 bg-success/5 p-4 text-[13px] leading-relaxed cursor-default shadow-sm text-foreground">
                  {s}
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.weaknesses.length > 0 && (
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-warning flex items-center gap-2">
              <AlertTriangle className="h-3 w-3" /> Weaknesses
            </h4>
            <div className="flex flex-col gap-2">
              {analysis.weaknesses.map((w, i) => (
                <div key={i} className="rounded-xl border border-warning/20 bg-warning/5 p-4 text-[13px] leading-relaxed cursor-default shadow-sm text-foreground">
                  {w}
                </div>
              ))}
            </div>
          </div>
        )}

        {analysis.missingInformation.length > 0 && (
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <HelpCircle className="h-3 w-3 text-muted-foreground" /> Missing Info
            </h4>
            <ul className="text-[13px] text-muted-foreground space-y-2 list-disc list-inside p-2">
              {analysis.missingInformation.map((info, i) => (
                <li key={i}>{info}</li>
              ))}
            </ul>
          </div>
        )}

        {analysis.recommendations.length > 0 && (
          <div className="space-y-4 mb-8">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
              <ArrowRightCircle className="h-3 w-3" /> Recommendations
            </h4>
            <div className="flex flex-col gap-2">
              {analysis.recommendations.map((rec, i) => (
                <div key={i} className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-[13px] font-medium text-foreground shadow-sm">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-4 mt-auto pt-6 border-t border-border/50">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            Next Best Action
          </h4>
          <div 
            onClick={() => {
              const target = analysis.nextBestAction.toLowerCase().includes("goal") ? "goal" 
                           : analysis.nextBestAction.toLowerCase().includes("context") ? "context"
                           : analysis.nextBestAction.toLowerCase().includes("option") ? "options"
                           : analysis.nextBestAction.toLowerCase().includes("evidence") ? "evidence"
                           : analysis.nextBestAction.toLowerCase().includes("constraint") ? "constraints"
                           : "review";
              document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }}
            className="rounded-xl border border-border bg-card p-4 text-[13px] font-medium text-foreground cursor-pointer hover:bg-secondary transition-colors shadow-sm text-center"
          >
            {analysis.nextBestAction}
          </div>
        </div>

      </div>
    </aside>
  );
}
