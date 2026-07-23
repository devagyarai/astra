"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/workspace/sidebar-left";
import { Decision } from "@/types/decision";
import { DecisionRepository, createDefaultDecision } from "@/lib/repositories/decision-repository";
import { analyzeDecision, DecisionAnalysis } from "@/lib/analysis/decision-analysis";
import { motion } from "framer-motion";
import { DecisionCard } from "@/components/decision/DecisionCard";

export default function TimelinePage() {
  const router = useRouter();
  const [decisions, setDecisions] = useState<{decision: Decision, analysis: DecisionAnalysis}[]>([]);

  const loadDecisions = () => {
    const loaded = DecisionRepository.getAll().filter(d => !d.isArchived);
    const analyzed = loaded.map(d => ({
      decision: d,
      analysis: analyzeDecision(d)
    }));
    analyzed.sort((a, b) => new Date(b.decision.updatedAt).getTime() - new Date(a.decision.updatedAt).getTime());
    setDecisions(analyzed);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDecisions();
  }, []);

  const handleArchive = (id: string) => {
    DecisionRepository.archive(id);
    loadDecisions();
  };

  const handleDelete = (id: string) => {
    DecisionRepository.delete(id);
    loadDecisions();
  };

  const handleDuplicate = (id: string) => {
    DecisionRepository.duplicate(id);
    loadDecisions();
  };

  const handleOpenDecision = (id: string) => {
    DecisionRepository.setActiveId(id);
    router.push("/workspace");
  };

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full overflow-hidden bg-background">
        <SidebarLeft />
        <main className="flex-1 flex flex-col h-full bg-background/50 overflow-hidden">
          <header className="shrink-0 sticky top-0 z-10 flex min-h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="h-8 w-8 text-muted-foreground hover:text-foreground" />
            <h1 className="text-lg font-semibold font-heading tracking-tight">Timeline</h1>
          </header>

          <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mx-auto max-w-4xl"
            >
              {decisions.length === 0 ? (
                <div className="text-center p-12 border border-dashed border-border rounded-xl">
                  <h3 className="text-lg font-semibold mb-2">No decisions yet</h3>
                  <p className="text-muted-foreground mb-4">Your decision timeline is currently empty.</p>
                  <button 
                    onClick={() => {
                      const newDec = createDefaultDecision();
                      DecisionRepository.save(newDec);
                      DecisionRepository.setActiveId(newDec.id);
                      router.push("/workspace");
                    }}
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Create First Decision
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-4 pb-12">
                  {decisions.map((item) => (
                    <DecisionCard 
                      key={item.decision.id}
                      decision={item.decision}
                      onClick={handleOpenDecision}
                      onArchive={handleArchive}
                      onDelete={handleDelete}
                      onDuplicate={handleDuplicate}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
