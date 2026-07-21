"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/workspace/sidebar-left";
import { Archive, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Decision } from "@/types/decision";
import { storage } from "@/lib/storage";
import { analyzeDecision, DecisionAnalysis } from "@/lib/analysis/decision-analysis";
import { DecisionCard } from "@/components/decision/DecisionCard";
import { Input } from "@/components/ui/input";
export default function ArchivePage() {
  const [decisions, setDecisions] = useState<{decision: Decision, analysis: DecisionAnalysis}[]>([]);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  const loadArchived = () => {
    const loaded = storage.getAllDecisions().filter(d => d.isArchived);
    const analyzed = loaded.map(d => ({
      decision: d,
      analysis: analyzeDecision(d)
    }));
    setDecisions(analyzed);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadArchived();
  }, []);

  const handleRestore = (id: string) => {
    storage.restoreDecision(id);
    loadArchived();
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to permanently delete this decision?")) {
      storage.deleteDecision(id);
      loadArchived();
    }
  };

  let filtered = decisions.filter(d => 
    d.decision.title.toLowerCase().includes(search.toLowerCase()) || 
    d.decision.goal.toLowerCase().includes(search.toLowerCase())
  );

  filtered = filtered.sort((a, b) => {
    const timeA = new Date(a.decision.updatedAt).getTime();
    const timeB = new Date(b.decision.updatedAt).getTime();
    return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
  });

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        <SidebarLeft />
        <main className="flex-1 flex flex-col h-full bg-background/50 overflow-hidden">
          <header className="shrink-0 sticky top-0 z-10 flex min-h-16 items-center gap-4 border-b border-border/50 bg-background/80 px-6 backdrop-blur-md">
            <SidebarTrigger className="lg:hidden h-8 w-8 text-muted-foreground hover:text-foreground" />
            <h1 className="text-lg font-semibold font-heading tracking-tight">Archive</h1>
          </header>

          <div className="flex-1 p-6 md:p-8 lg:p-12 overflow-y-auto">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mx-auto max-w-4xl"
            >
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="search-archive"
                    name="search-archive"
                    aria-label="Search archived decisions"
                    type="search"
                    placeholder="Search archived decisions..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 bg-card/40 border-border/50"
                  />
                </div>
                <select 
                  id="sort-archive"
                  name="sort-archive"
                  aria-label="Sort decisions"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
                  className="h-10 rounded-md border border-border/50 bg-card/40 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
              </div>

              {decisions.length === 0 ? (
                <div className="text-center p-12 border border-dashed border-border rounded-xl mt-8">
                  <div className="h-12 w-12 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-4">
                    <Archive className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">No archived decisions</h3>
                  <p className="text-muted-foreground">Decisions you archive will appear here.</p>
                </div>
              ) : filtered.length === 0 ? (
                <div className="text-center p-12 text-muted-foreground">
                  No matches found for &quot;{search}&quot;
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filtered.map((item) => (
                    <DecisionCard 
                      key={item.decision.id}
                      decision={item.decision}
                      onClick={() => {}} // Do nothing on click in archive, user must restore
                      onRestore={handleRestore}
                      onDelete={handleDelete}
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
