import { useState, useEffect, useCallback } from "react";
import { Decision } from "@/types/decision";
import { DecisionRepository, createDefaultDecision } from "@/lib/repositories/decision-repository";

export type SaveStatus = "saved" | "saving" | "error";

export function useDecision() {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Initial load
  const loadDecision = useCallback(() => {
    try {
      const activeId = DecisionRepository.getActiveId();
      let activeDec: Decision | null = null;
      
      if (activeId === "new") {
        activeDec = createDefaultDecision();
        DecisionRepository.save(activeDec);
        DecisionRepository.setActiveId(activeDec.id);
      } else if (activeId) {
        activeDec = DecisionRepository.getById(activeId);
      }
      
      if (!activeDec) {
        const decisions = DecisionRepository.getAll().filter(d => !d.isArchived);
        if (decisions.length > 0) {
          // Sort by updated at descending
          decisions.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
          activeDec = decisions[0];
          DecisionRepository.setActiveId(activeDec.id);
        } else {
          activeDec = createDefaultDecision();
          DecisionRepository.save(activeDec);
          DecisionRepository.setActiveId(activeDec.id);
        }
      }
      
      setDecision(activeDec);
      setLastSaved(activeDec.updatedAt);
    } catch (e) {
      console.error("Failed to load decision from local storage", e);
      const defaultDec = createDefaultDecision();
      setDecision(defaultDec);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDecision();
    
    const handleWorkspaceUpdate = () => {
      loadDecision();
    };
    
    window.addEventListener("astra_workspace_updated", handleWorkspaceUpdate);
    return () => window.removeEventListener("astra_workspace_updated", handleWorkspaceUpdate);
  }, [loadDecision]);

  // Autosave
  useEffect(() => {
    if (!decision) return;
    
    const timeoutId = setTimeout(() => {
      setSaveStatus("saving");
      try {
        const updatedDecision = {
          ...decision,
          updatedAt: new Date().toISOString()
        };
        DecisionRepository.save(updatedDecision);
        setSaveStatus("saved");
        setLastSaved(updatedDecision.updatedAt);
      } catch (e) {
        console.error("Failed to save decision", e);
        setSaveStatus("error");
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [decision]);

  const updateField = useCallback(<K extends keyof Decision>(field: K, value: Decision[K]) => {
    setDecision((prev) => prev ? { ...prev, [field]: value } : prev);
  }, []);

  const addOption = useCallback(() => {
    setDecision((prev) => prev ? { ...prev, options: [...prev.options, ""] } : prev);
  }, []);

  const removeOption = useCallback((index: number) => {
    setDecision((prev) => {
      if (!prev) return prev;
      const newOptions = [...prev.options];
      newOptions.splice(index, 1);
      return { ...prev, options: newOptions };
    });
  }, []);

  const updateOption = useCallback((index: number, value: string) => {
    setDecision((prev) => {
      if (!prev) return prev;
      const newOptions = [...prev.options];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  }, []);

  const addEvidence = useCallback(() => {
    setDecision((prev) => prev ? { ...prev, evidence: [...prev.evidence, ""] } : prev);
  }, []);

  const removeEvidence = useCallback((index: number) => {
    setDecision((prev) => {
      if (!prev) return prev;
      const newEvidence = [...prev.evidence];
      newEvidence.splice(index, 1);
      return { ...prev, evidence: newEvidence };
    });
  }, []);

  const updateEvidence = useCallback((index: number, value: string) => {
    setDecision((prev) => {
      if (!prev) return prev;
      const newEvidence = [...prev.evidence];
      newEvidence[index] = value;
      return { ...prev, evidence: newEvidence };
    });
  }, []);

  const resetDecision = useCallback(() => {
    const defaultDec = createDefaultDecision();
    DecisionRepository.save(defaultDec);
    DecisionRepository.setActiveId(defaultDec.id);
    setDecision(defaultDec);
    setLastSaved(defaultDec.updatedAt);
    setSaveStatus("saved");
  }, []);

  // Legacy event listener removed in RC-1

  return {
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
  };
}
