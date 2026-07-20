"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { 
  Target, 
  FileText, 
  ShieldAlert, 
  GitMerge, 
  Database, 
  BrainCircuit, 
  CheckCircle, 
  PenLine,
  RotateCcw,
  Check,
  RefreshCw,
  Plus,
  Trash2,
  AlertCircle
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useDecision } from "@/hooks/useDecision";

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 15 },
  show: { opacity: 1, y: 0, transition: { type: "tween", ease: "easeOut", duration: 0.22 } },
};

export default function WorkspacePage() {
  const {
    decision,
    saveStatus,
    lastSaved,
    updateField,
    addOption,
    removeOption,
    updateOption,
    addEvidence,
    removeEvidence,
    updateEvidence,
    resetDecision
  } = useDecision();

  if (!decision) {
    return (
      <div className="flex h-full items-center justify-center">
        <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const isTitleValid = decision.title.trim().length > 0;
  const isGoalValid = decision.goal.trim().length > 0;
  const isFormValid = isTitleValid && isGoalValid;

  const timeAgo = lastSaved 
    ? new Intl.DateTimeFormat("en-US", { timeStyle: "short" }).format(new Date(lastSaved))
    : "";

  return (
    <div className="flex flex-col h-full bg-background/50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex min-h-16 items-center justify-between gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
        <div className="flex items-center gap-4 flex-1">
          <SidebarTrigger className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground" />
          <div className="flex flex-col w-full max-w-lg">
            <Input 
              value={decision.title}
              onChange={(e) => updateField("title", e.target.value)}
              placeholder="Decision Title"
              className="border-none bg-transparent shadow-none px-0 text-lg font-semibold font-heading tracking-tight focus-visible:ring-0 h-7"
            />
            {!isTitleValid && (
              <span className="text-[10px] text-destructive flex items-center gap-1 font-medium mt-0.5">
                <AlertCircle className="h-3 w-3" /> Title is required
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground font-medium">
            {!isFormValid ? (
              <span className="text-destructive flex items-center gap-1"><AlertCircle className="h-3 w-3" /> Cannot Save</span>
            ) : saveStatus === "saving" ? (
              <span className="flex items-center gap-1"><RefreshCw className="h-3 w-3 animate-spin" /> Autosaving...</span>
            ) : saveStatus === "saved" ? (
              <span className="flex items-center gap-1"><Check className="h-3 w-3 text-success" /> Saved at {timeAgo}</span>
            ) : (
              <span className="text-destructive">Save Error</span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetDecision}
            className="text-muted-foreground hover:text-destructive h-8 px-3"
          >
            <RotateCcw className="h-3.5 w-3.5 mr-1.5" />
            Reset
          </Button>
        </div>
      </header>

      <div className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
        <motion.div 
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.05 } }
          }}
          className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* Goal */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className={`bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md ${!isGoalValid ? 'border-destructive/50 ring-1 ring-destructive/20' : ''}`}>
              <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Target className="h-4 w-4 text-primary" />
                  Goal
                </CardTitle>
                <span className={`text-xs ${decision.goal.length > 1000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {decision.goal.length} / 1000
                </span>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Textarea 
                  value={decision.goal}
                  onChange={(e) => updateField("goal", e.target.value)}
                  placeholder="What is the primary objective of this decision?"
                  maxLength={1000}
                  className="min-h-[100px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
                {!isGoalValid && (
                  <span className="text-[11px] text-destructive flex items-center gap-1 font-medium mt-2">
                    <AlertCircle className="h-3 w-3" /> Goal is required
                  </span>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Context */}
          <motion.div variants={FADE_UP}>
            <Card className="h-full bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
              <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  Context
                </CardTitle>
                <span className={`text-xs ${decision.context.length > 3000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {decision.context.length} / 3000
                </span>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Textarea 
                  value={decision.context}
                  onChange={(e) => updateField("context", e.target.value)}
                  placeholder="Provide background information..."
                  maxLength={3000}
                  className="min-h-[120px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Constraints */}
          <motion.div variants={FADE_UP}>
            <Card className="h-full bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                  Constraints
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Textarea 
                  value={decision.constraints}
                  onChange={(e) => updateField("constraints", e.target.value)}
                  placeholder="Budget, timeline, technical limits..."
                  className="min-h-[120px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* Options */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
              <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <GitMerge className="h-4 w-4 text-muted-foreground" />
                  Options
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={addOption} className="h-7 text-xs px-2">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Option
                </Button>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid gap-3">
                  {decision.options.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-xl border-border/50">
                      No options added yet.
                    </p>
                  )}
                  {decision.options.map((opt, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl border border-border/50 p-3 bg-secondary/10 transition-all focus-within:border-ring">
                      <div className="flex-1">
                        <Input 
                          value={opt}
                          onChange={(e) => updateOption(i, e.target.value)}
                          placeholder={`Option ${i + 1}`}
                          className="bg-transparent border-none shadow-none h-7 px-1 text-[15px] focus-visible:ring-0 font-medium"
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeOption(i)} className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Evidence */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
              <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <Database className="h-4 w-4 text-muted-foreground" />
                  Evidence
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={addEvidence} className="h-7 text-xs px-2">
                  <Plus className="h-3.5 w-3.5 mr-1" /> Add Evidence
                </Button>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid gap-3">
                  {decision.evidence.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-xl border-border/50">
                      No evidence added yet.
                    </p>
                  )}
                  {decision.evidence.map((ev, i) => (
                    <div key={i} className="flex items-start gap-2 rounded-xl border border-border/50 p-3 bg-secondary/10 transition-all focus-within:border-ring">
                      <div className="flex-1">
                        <Input 
                          value={ev}
                          onChange={(e) => updateEvidence(i, e.target.value)}
                          placeholder={`Data point or source ${i + 1}`}
                          className="bg-transparent border-none shadow-none h-7 px-1 text-[15px] focus-visible:ring-0"
                        />
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => removeEvidence(i)} className="h-7 w-7 text-muted-foreground hover:text-destructive shrink-0">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Analysis */}
          <motion.div variants={FADE_UP}>
            <Card className="h-full bg-card/20 border-border/30 shadow-none backdrop-blur-sm opacity-60">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <BrainCircuit className="h-4 w-4 text-muted-foreground" />
                  AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-body text-[15px] leading-relaxed italic">
                  AI analysis will appear here after sufficient context is provided.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommendation */}
          <motion.div variants={FADE_UP}>
            <Card className="h-full bg-primary/5 border-primary/10 shadow-none opacity-60">
              <CardHeader className="p-6 pb-3">
                <CardTitle className="flex items-center gap-2 text-base font-medium text-primary">
                  <CheckCircle className="h-4 w-4" />
                  Recommendation
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <p className="text-body text-[15px] leading-relaxed italic">
                  AI recommendation will appear here.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notes */}
          <motion.div variants={FADE_UP} className="md:col-span-2">
            <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
              <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                <CardTitle className="flex items-center gap-2 text-base font-medium">
                  <PenLine className="h-4 w-4 text-muted-foreground" />
                  Notes
                </CardTitle>
                <span className={`text-xs ${decision.notes.length > 5000 ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {decision.notes.length} / 5000
                </span>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Textarea 
                  value={decision.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  placeholder="Additional thoughts or meeting notes..."
                  maxLength={5000}
                  className="min-h-[150px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                />
              </CardContent>
            </Card>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}


