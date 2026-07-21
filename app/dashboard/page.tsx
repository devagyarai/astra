"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/workspace/sidebar-left";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  FolderOpen, 
  Target, 
  Sparkles, 
  Plus, 
  Clock, 
  LayoutTemplate,
  ArrowRight
} from "lucide-react";
import { Decision } from "@/types/decision";
import { DecisionRepository, createDefaultDecision } from "@/lib/repositories/decision-repository";
import { analyzeDecision } from "@/lib/analysis/decision-analysis";
import { DecisionCard } from "@/components/decision/DecisionCard";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  const router = useRouter();
  const [decisions, setDecisions] = useState<Decision[]>([]);
  
  const loadDecisions = () => {
    setDecisions(DecisionRepository.getAll());
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
    const original = DecisionRepository.getById(id);
    if (original) {
      const duplicated = {
        ...original,
        id: crypto.randomUUID(),
        title: `${original.title} (Copy)`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      DecisionRepository.save(duplicated);
      loadDecisions();
    }
  };

  const totalDecisions = decisions.length;
  
  const analyzed = decisions.map(d => ({ decision: d, analysis: analyzeDecision(d) }));
  
  const completedDecisions = analyzed.filter(d => d.analysis.completionScore >= 90).length;
  const activeDecisions = totalDecisions - completedDecisions;
  
  const avgConfidence = totalDecisions > 0 
    ? Math.round(analyzed.reduce((acc, curr) => acc + curr.analysis.confidenceScore, 0) / totalDecisions)
    : 0;
    
  const avgCompletion = totalDecisions > 0
    ? Math.round(analyzed.reduce((acc, curr) => acc + curr.analysis.completionScore, 0) / totalDecisions)
    : 0;

  const recentDecisions = [...analyzed].sort((a, b) => 
    new Date(b.decision.updatedAt).getTime() - new Date(a.decision.updatedAt).getTime()
  ).slice(0, 5);

  const handleNewDecision = () => {
    const newDec = createDefaultDecision();
    DecisionRepository.save(newDec);
    DecisionRepository.setActiveId(newDec.id);
    router.push("/workspace");
  };

  const handleOpenDecision = (id: string) => {
    DecisionRepository.setActiveId(id);
    router.push("/workspace");
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <SidebarLeft />
        <main className="flex-1 flex flex-col h-full bg-background/50 overflow-hidden">
          <header className="shrink-0 sticky top-0 z-10 flex min-h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground" />
            <h1 className="text-lg font-semibold font-heading tracking-tight">Dashboard</h1>
          </header>

          <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mx-auto max-w-5xl flex flex-col gap-8"
            >
              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <FolderOpen className="h-4 w-4" /> Total Decisions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <span className="text-3xl font-bold font-heading tracking-tight">{totalDecisions}</span>
                  </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <Target className="h-4 w-4 text-primary" /> Active Decisions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <span className="text-3xl font-bold font-heading tracking-tight">{activeDecisions}</span>
                  </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <BarChart3 className="h-4 w-4 text-success" /> Avg. Completion
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <span className="text-3xl font-bold font-heading tracking-tight">{avgCompletion}%</span>
                  </CardContent>
                </Card>

                <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
                  <CardHeader className="p-5 pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
                      <Sparkles className="h-4 w-4 text-warning" /> Avg. Confidence
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5 pt-0">
                    <span className="text-3xl font-bold font-heading tracking-tight">{avgConfidence}%</span>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Main Content Area */}
                <div className="col-span-2 flex flex-col gap-8">
                  {/* Recent Decisions */}
                  <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
                    <CardHeader className="p-6 border-b border-border/50 flex flex-row items-center justify-between">
                      <CardTitle className="text-base font-semibold">Recent Decisions</CardTitle>
                      <Button variant="ghost" size="sm" onClick={() => router.push('/timeline')} className="text-xs">
                        View All <ArrowRight className="ml-1 h-3 w-3" />
                      </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                      {recentDecisions.length === 0 ? (
                        <div className="p-12 flex flex-col items-center justify-center text-center">
                          <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                            <Target className="h-8 w-8 text-primary/60" />
                          </div>
                          <h3 className="text-lg font-semibold text-foreground mb-2">No Decisions Yet</h3>
                          <p className="text-muted-foreground text-sm max-w-sm mb-6">
                            Start structuring your thoughts and let Astra help you uncover blind spots and biases in your decision-making.
                          </p>
                          <Button onClick={handleNewDecision}>
                            <Plus className="mr-2 h-4 w-4" /> Create New Decision
                          </Button>
                        </div>
                      ) : (
                        <div className="flex flex-col gap-3 p-4">
                          {recentDecisions.map((item) => (
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
                    </CardContent>
                  </Card>

                  {/* Placeholder Analytics */}
                  <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm opacity-70">
                    <CardHeader className="p-6 border-b border-border/50">
                      <CardTitle className="text-base font-semibold">Activity Timeline</CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 flex items-center justify-center min-h-[200px]">
                      <p className="text-sm text-muted-foreground italic">Analytics chart visualization will appear here.</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions Sidebar */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-xs font-semibold tracking-wider text-muted-foreground uppercase mb-2">Quick Actions</h3>
                  
                  <Card 
                    role="button"
                    aria-label="New Decision"
                    onClick={handleNewDecision}
                    className="bg-primary/5 border-primary/20 shadow-sm hover:bg-primary/10 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Plus className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-primary">New Decision</span>
                        <span className="text-xs text-muted-foreground">Start a new workspace</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    onClick={() => router.push('/timeline')}
                    className="bg-card/40 border-border/50 shadow-sm hover:bg-secondary/30 transition-all cursor-pointer group"
                  >
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">Browse Timeline</span>
                        <span className="text-xs text-muted-foreground">View all past decisions</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card 
                    onClick={() => {
                      if (recentDecisions.length > 0) {
                        handleOpenDecision(recentDecisions[0].decision.id);
                      }
                    }}
                    className={cn(
                      "bg-card/40 border-border/50 shadow-sm transition-all group",
                      recentDecisions.length > 0 ? "hover:bg-secondary/30 cursor-pointer" : "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <CardContent className="p-5 flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground group-hover:scale-110 transition-transform">
                        <LayoutTemplate className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground">Continue Last</span>
                        <span className="text-xs text-muted-foreground">Jump back in</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
