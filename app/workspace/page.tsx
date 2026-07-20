"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { 
  Target, 
  FileText, 
  ShieldAlert, 
  GitMerge, 
  Database, 
  BrainCircuit, 
  CheckCircle, 
  PenLine 
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.22 } },
};

export default function WorkspacePage() {
  return (
    <div className="flex flex-col h-full bg-background/50">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
        <SidebarTrigger className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground" />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold font-heading tracking-tight">Project Titan Migration</h1>
          <span className="text-xs text-muted-foreground font-medium">Last edited 2 mins ago</span>
        </div>
      </header>

      <div className="flex-1 p-6 md:p-8 lg:p-12">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.05 } }
          }}
          className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Goal */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Target className="h-4 w-4 text-primary" />
                  Goal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-body text-[15px]">
                  Migrate legacy on-premise databases to cloud infrastructure by end of Q3 to reduce operational overhead and improve scalability.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Context */}
          <motion.div variants={FADE_UP}>
            <DecisionCard 
              icon={FileText} 
              title="Context" 
              content="Our current infrastructure is costing 40% more than industry standard due to maintenance of aging hardware."
            />
          </motion.div>

          {/* Constraints */}
          <motion.div variants={FADE_UP}>
            <DecisionCard 
              icon={ShieldAlert} 
              title="Constraints" 
              content="Zero downtime requirement during the migration window. Budget capped at $150k."
            />
          </motion.div>

          {/* Options */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <GitMerge className="h-4 w-4 text-muted-foreground" />
                  Options
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid gap-4">
                  <div className="rounded-xl border border-border/50 p-4 bg-secondary/20 transition-all hover:bg-secondary/40">
                    <h5 className="font-medium text-sm mb-1">Option A: AWS Native Services</h5>
                    <p className="text-xs text-muted-foreground">High scalability, steeper learning curve.</p>
                  </div>
                  <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-sm transition-all hover:bg-primary/10">
                    <h5 className="font-medium text-sm text-primary mb-1">Option B: Hybrid Cloud (Recommended)</h5>
                    <p className="text-xs text-muted-foreground">Gradual transition, lower risk.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Evidence */}
          <motion.div variants={FADE_UP}>
            <DecisionCard 
              icon={Database} 
              title="Evidence" 
              content="Benchmark tests show Option B reduces latency by 20% compared to our current setup."
            />
          </motion.div>

          {/* AI Analysis */}
          <motion.div variants={FADE_UP}>
            <DecisionCard 
              icon={BrainCircuit} 
              title="AI Analysis" 
              content="Based on historical migrations of similar scale, Option B minimizes rollback risks by 80%."
            />
          </motion.div>

          {/* Recommendation */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className="bg-primary/5 border-primary/20 shadow-[0_0_20px_-5px_rgba(91,108,255,0.1)] transition-all hover:shadow-[0_0_25px_-5px_rgba(91,108,255,0.15)] overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-primary to-accent" />
              <CardHeader className="p-6 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium text-primary">
                  <CheckCircle className="h-4 w-4" />
                  Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-body text-[15px] font-medium text-foreground">
                  Proceed with Option B (Hybrid Cloud). Establish a cross-functional task force to begin phase 1 next week.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notes */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <DecisionCard 
              icon={PenLine} 
              title="Notes" 
              content="Need to sync with security team on compliance requirements before finalizing phase 1 timeline."
            />
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

function DecisionCard({ icon: Icon, title, content }: { icon: any, title: string, content: string }) {
  return (
    <Card className="h-full bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md hover:border-border">
      <CardHeader className="p-6 pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-medium">
          <Icon className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <p className="text-body text-[15px] leading-relaxed">
          {content}
        </p>
      </CardContent>
    </Card>
  );
}
