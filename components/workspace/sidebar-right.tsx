"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, HelpCircle, ArrowRightCircle, Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function SidebarRight() {
  return (
    <aside className="hidden lg:flex w-[320px] flex-col border-l border-border/50 bg-background/50 backdrop-blur-xl overflow-y-auto p-6 gap-6">
      <div>
        <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-6">Insights</h3>
        
        <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-md mb-6 transition-all hover:shadow-md">
          <CardHeader className="p-5 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              Confidence Score
            </CardTitle>
          </CardHeader>
          <CardContent className="p-5 pt-0">
            <div className="flex items-end justify-between mb-3">
              <span className="text-3xl font-bold font-heading tracking-tight">85%</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">High</span>
            </div>
            <Progress value={85} className="h-2 bg-secondary" />
          </CardContent>
        </Card>

        <Separator className="my-6 bg-border/50" />

        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <AlertTriangle className="h-3 w-3 text-warning" />
            Key Risks
          </h4>
          <div className="rounded-xl border border-warning/20 bg-warning/5 p-4 text-[13px] leading-relaxed transition-all hover:bg-warning/10 cursor-default shadow-sm">
            Budget overrun potential in Q3 if execution is delayed.
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
            <HelpCircle className="h-3 w-3 text-muted-foreground" />
            Missing Info
          </h4>
          <ul className="text-[13px] text-muted-foreground space-y-2 list-disc list-inside p-2">
            <li>Final stakeholder approval</li>
            <li>Vendor security audit</li>
          </ul>
        </div>

        <div className="space-y-4 mt-auto">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-primary flex items-center gap-2">
            <ArrowRightCircle className="h-3 w-3" />
            Suggested Next Step
          </h4>
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-[13px] font-medium text-foreground cursor-pointer hover:bg-primary/10 transition-colors shadow-sm">
            Schedule alignment meeting with engineering leads.
          </div>
        </div>
      </div>
    </aside>
  );
}
