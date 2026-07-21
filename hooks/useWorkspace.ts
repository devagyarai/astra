import { useState, useEffect, useCallback } from "react";
import { Decision } from "@/types/decision";
import { DecisionRepository, createDefaultDecision } from "@/lib/repositories/decision-repository";

export function useWorkspace() {
  const [decisions, setDecisions] = useState<Decision[]>([]);
  const [activeDecisionId, setActiveDecisionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const refreshWorkspace = useCallback(() => {
    const allDecisions = DecisionRepository.getAll().filter(d => !d.isArchived);
    allDecisions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    setDecisions(allDecisions);
    setActiveDecisionId(DecisionRepository.getActiveId());
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    refreshWorkspace();
    
    window.addEventListener("astra_workspace_updated", refreshWorkspace);
    return () => window.removeEventListener("astra_workspace_updated", refreshWorkspace);
  }, [refreshWorkspace]);

  const filteredDecisions = decisions.filter(d => 
    d.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (d.goal && d.goal.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const createDecision = useCallback(() => {
    const newDec = createDefaultDecision();
    DecisionRepository.save(newDec);
    DecisionRepository.setActiveId(newDec.id);
    refreshWorkspace();
    return newDec;
  }, [refreshWorkspace]);

  const switchDecision = useCallback((id: string) => {
    DecisionRepository.setActiveId(id);
    refreshWorkspace();
  }, [refreshWorkspace]);

  const duplicateDecision = useCallback((id: string) => {
    const dup = DecisionRepository.duplicate(id);
    if (dup) {
      DecisionRepository.setActiveId(dup.id);
      refreshWorkspace();
    }
  }, [refreshWorkspace]);

  const deleteDecision = useCallback((id: string) => {
    DecisionRepository.delete(id);
    
    const remaining = DecisionRepository.getAll().filter(d => !d.isArchived);
    remaining.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    
    if (remaining.length > 0) {
      DecisionRepository.setActiveId(remaining[0].id);
    } else {
      const newDec = createDefaultDecision();
      DecisionRepository.save(newDec);
      DecisionRepository.setActiveId(newDec.id);
    }
    refreshWorkspace();
  }, [refreshWorkspace]);

  const renameDecision = useCallback((id: string, newTitle: string) => {
    const dec = DecisionRepository.getById(id);
    if (dec) {
      dec.title = newTitle;
      dec.updatedAt = new Date().toISOString();
      DecisionRepository.save(dec);
      refreshWorkspace();
    }
  }, [refreshWorkspace]);

  return {
    decisions: filteredDecisions,
    activeDecisionId,
    searchQuery,
    setSearchQuery,
    createDecision,
    switchDecision,
    duplicateDecision,
    deleteDecision,
    renameDecision,
    refreshWorkspace
  };
}
