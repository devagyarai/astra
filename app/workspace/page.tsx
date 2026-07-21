"use client";

import * as React from "react";
import { useEffect, useState, useRef } from "react";
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
  RefreshCw,
  Plus,
  Trash2,
  PenLine
} from "lucide-react";
import { useDecision } from "@/hooks/useDecision";
import { DecisionProgress } from "@/components/decision/DecisionProgress";
import { CopilotSidebar } from "@/components/workspace/copilot-sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { getAISettings } from "@/services/ai/providers";
import { SuggestionPreview } from "@/components/ai/SuggestionPreview";
import { Sparkles, Bot } from "lucide-react";
import { PremiumShimmer } from "@/components/ui/premium-skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function SaveStatusIndicator({ status, lastSaved }: { status: "saving" | "saved" | "error", lastSaved: string | null }) {
  const [timeText, setTimeText] = useState("");

  useEffect(() => {
    if (status !== "saved" || !lastSaved) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTimeText("");
      return;
    }

    const updateTime = () => {
      const seconds = Math.floor((new Date().getTime() - new Date(lastSaved).getTime()) / 1000);
      if (seconds < 5) setTimeText("Saved just now");
      else if (seconds < 60) setTimeText(`Saved ${seconds}s ago`);
      else if (seconds < 3600) setTimeText(`Saved ${Math.floor(seconds / 60)}m ago`);
      else setTimeText("Saved");
    };

    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, [status, lastSaved]);

  if (status === "saving") {
    return (
      <motion.span 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1.5 text-xs text-muted-foreground bg-secondary/40 px-2.5 py-1 rounded-full border border-border/50 shadow-sm"
      >
        <RefreshCw className="h-3 w-3 animate-spin text-primary" />
        Saving...
      </motion.span>
    );
  }
  if (status === "error") {
    return (
      <span className="flex items-center gap-1.5 text-xs text-destructive bg-destructive/10 px-2.5 py-1 rounded-full border border-destructive/20 shadow-sm">
        Offline
      </span>
    );
  }
  if (!lastSaved) {
    return <span className="text-muted-foreground text-xs px-2.5 py-1">Draft</span>;
  }
  return (
    <motion.span 
      key={timeText}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-muted-foreground tracking-wide text-[10px] uppercase font-semibold px-2.5 py-1"
    >
      {timeText}
    </motion.span>
  );
}

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
    updateEvidence
  } = useDecision();

  const [activeSection, setActiveSection] = useState("goal");
  const [inlineAnalyzing, setInlineAnalyzing] = useState<string | null>(null);
  const [inlineResult, setInlineResult] = useState<{ field: string; data: Record<string, string> } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleInlineAI = async (field: string, analysisType: string) => {
    if (!decision) return;
    const aiSettings = getAISettings();
    const apiKey = aiSettings.provider === "anthropic" ? aiSettings.anthropicKey : aiSettings.openaiKey;
    if (!apiKey) return;

    setInlineAnalyzing(field);
    setInlineResult(null);

    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ai-key": apiKey,
        },
        body: JSON.stringify({
          provider: aiSettings.provider,
          type: analysisType,
          context: JSON.stringify({
            goal: decision.goal,
            context: decision.context,
            constraints: decision.constraints,
            options: decision.options,
            evidence: decision.evidence
          })
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setInlineResult({ field, data });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setInlineAnalyzing(null);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const sections = ["goal", "context", "constraints", "options", "evidence", "analysis", "recommendation", "notes"];
      
      let current = activeSection;
      
      // Simple offset-based intersection observation
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the element is near the top of the viewport
          if (rect.top >= 0 && rect.top < 300) {
            current = id;
            break;
          } else if (rect.top < 0 && rect.bottom > 100) {
            current = id;
          }
        }
      }
      
      if (current !== activeSection) {
        setActiveSection(current);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [activeSection]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el && containerRef.current) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (!decision) {
    return (
      <div className="flex flex-col h-full bg-background/50 p-6 md:p-8 lg:p-12">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-8">
          <div className="flex items-center gap-4 mb-4">
            <PremiumShimmer className="h-10 w-3/4 rounded-lg" />
          </div>
          <PremiumShimmer className="h-[200px] w-full rounded-xl" />
          <PremiumShimmer className="h-[200px] w-full rounded-xl" />
        </div>
      </div>
    );
  }

  // Validation
  const isGoalValid = decision.goal.trim().length > 0;
  const isContextValid = decision.context.trim().length > 0;
  const isConstraintsValid = decision.constraints.trim().length > 0;
  const isOptionsValid = decision.options.length > 0 && decision.options.some(o => o.trim().length > 0);
  const isEvidenceValid = decision.evidence.length > 0 && decision.evidence.some(e => e.trim().length > 0);
  const isReviewValid = isGoalValid && isContextValid && isOptionsValid;

  const completedSections = {
    goal: isGoalValid,
    context: isContextValid,
    constraints: isConstraintsValid,
    options: isOptionsValid,
    evidence: isEvidenceValid,
    review: isReviewValid,
  };



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
              placeholder="Untitled Decision"
              className="border-none bg-transparent shadow-none px-0 text-lg font-semibold font-heading tracking-tight focus-visible:ring-0 h-7"
            />
          </div>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden lg:block mr-4">
            <DecisionProgress 
              activeSection={activeSection} 
              onNavigate={scrollToSection} 
              completedSections={completedSections} 
            />
          </div>
          
          <div className="hidden sm:flex items-center gap-2 text-xs font-medium min-w-[120px] justify-end mr-4">
            <SaveStatusIndicator status={saveStatus} lastSaved={lastSaved} />
          </div>

          <div className="lg:hidden flex items-center">
            <Sheet>
              <SheetTrigger render={
                <Button variant="outline" size="sm" className="h-8 gap-2">
                  <Bot className="h-4 w-4" />
                  <span className="sr-only sm:not-sr-only">Copilot</span>
                </Button>
              } />
              <SheetContent side="right" className="w-[380px] sm:w-[440px] p-0 border-l border-border/50 bg-background/50 backdrop-blur-xl flex flex-col">
                <CopilotSidebar 
                  decision={decision} 
                  updateField={updateField}
                  isMobile
                />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto" ref={containerRef}>
        <div className="flex">
          {/* Main Workspace Canvas */}
          <div className="flex-1 p-6 md:p-8 lg:p-12">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mx-auto max-w-4xl flex flex-col gap-8 pb-32"
            >
              
              <div id="goal" className="scroll-mt-24">
                <Card className={`bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md ${!isGoalValid ? 'ring-1 ring-primary/20' : ''}`}>
                  <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <Target className="h-4 w-4 text-primary" /> Goal
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-7 text-xs text-primary" 
                      onClick={() => handleInlineAI("goal", "goal")}
                      disabled={inlineAnalyzing === "goal" || !isGoalValid}
                    >
                      {inlineAnalyzing === "goal" ? <RefreshCw className="h-3 w-3 mr-1 animate-spin" /> : <Sparkles className="h-3 w-3 mr-1" />}
                      Improve
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Textarea 
                      id="decision-goal"
                      name="decision-goal"
                      aria-label="What is the primary objective of this decision?"
                      value={decision.goal}
                      onChange={(e) => updateField("goal", e.target.value)}
                      placeholder="What is the primary objective of this decision?"
                      maxLength={1000}
                      className="min-h-[120px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                    
                    <AnimatePresence>
                      {inlineResult?.field === "goal" && inlineResult.data.improvedGoal && (
                        <div className="mt-4">
                          <SuggestionPreview 
                            title="Improved Goal"
                            suggestion={inlineResult.data.improvedGoal}
                            onAccept={() => {
                              updateField("goal", inlineResult.data.improvedGoal);
                              setInlineResult(null);
                            }}
                            onReject={() => setInlineResult(null)}
                          />
                        </div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </div>

              <div id="context" className="scroll-mt-24">
                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <FileText className="h-4 w-4 text-muted-foreground" /> Context
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Textarea 
                      id="decision-context"
                      name="decision-context"
                      aria-label="Provide background information..."
                      value={decision.context}
                      onChange={(e) => updateField("context", e.target.value)}
                      placeholder="Provide background information..."
                      maxLength={3000}
                      className="min-h-[150px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                  </CardContent>
                </Card>
              </div>

              <div id="constraints" className="scroll-mt-24">
                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-6 pb-3">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <ShieldAlert className="h-4 w-4 text-muted-foreground" /> Constraints
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Textarea 
                      id="decision-constraints"
                      name="decision-constraints"
                      aria-label="Budget, timeline, technical limits..."
                      value={decision.constraints}
                      onChange={(e) => updateField("constraints", e.target.value)}
                      placeholder="Budget, timeline, technical limits..."
                      className="min-h-[120px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                  </CardContent>
                </Card>
              </div>

              <div id="options" className="scroll-mt-24">
                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <GitMerge className="h-4 w-4 text-muted-foreground" /> Options
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
                              id={`decision-option-${i}`}
                              name={`decision-option-${i}`}
                              aria-label={`Option ${i + 1}`}
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
              </div>

              <div id="evidence" className="scroll-mt-24">
                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <Database className="h-4 w-4 text-muted-foreground" /> Evidence
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={addEvidence} className="h-7 text-xs px-2">
                      <Plus className="h-3.5 w-3.5 mr-1" /> Add Evidence
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="grid gap-3">
                      {decision.evidence.length === 0 && (
                        <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-xl border-border/50">
                          No evidence added yet. (Optional)
                        </p>
                      )}
                      {decision.evidence.map((ev, i) => (
                        <div key={i} className="flex items-start gap-2 rounded-xl border border-border/50 p-3 bg-secondary/10 transition-all focus-within:border-ring">
                          <div className="flex-1">
                            <Input 
                              id={`decision-evidence-${i}`}
                              name={`decision-evidence-${i}`}
                              aria-label={`Evidence point ${i + 1}`}
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
              </div>



              <div id="notes" className="scroll-mt-24">
                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-6 pb-3 flex flex-row items-center justify-between space-y-0">
                    <CardTitle className="flex items-center gap-2 text-base font-medium">
                      <PenLine className="h-4 w-4 text-muted-foreground" /> Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <Textarea 
                      id="decision-notes"
                      name="decision-notes"
                      aria-label="Additional thoughts or meeting notes..."
                      value={decision.notes}
                      onChange={(e) => updateField("notes", e.target.value)}
                      placeholder="Additional thoughts or meeting notes..."
                      maxLength={5000}
                      className="min-h-[120px] text-[15px] resize-y bg-transparent border-none shadow-none p-0 focus-visible:ring-0 placeholder:text-muted-foreground/50"
                    />
                  </CardContent>
                </Card>
              </div>

              <div id="review" className="scroll-mt-24">
                {/* Scroll anchor marker for the 'review' progress item mapping to the end of the canvas */}
              </div>

            </motion.div>
          </div>

          {/* Right Insights Sidebar (Desktop) */}
          <div className="hidden lg:flex w-[380px] shrink-0">
            <CopilotSidebar 
              decision={decision} 
              updateField={updateField}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
