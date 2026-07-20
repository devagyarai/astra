import { useState, useEffect, useCallback } from "react";
import { Decision } from "@/types/decision";

const STORAGE_KEY = "astra_decision_workspace";

const createDefaultDecision = (): Decision => ({
  id: crypto.randomUUID(),
  title: "Untitled Decision",
  goal: "",
  context: "",
  constraints: "",
  options: [],
  evidence: [],
  analysis: "",
  recommendation: "",
  confidence: 0,
  notes: "",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

export type SaveStatus = "saved" | "saving" | "error";

export function useDecision() {
  const [decision, setDecision] = useState<Decision | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("saved");
  const [lastSaved, setLastSaved] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setDecision(JSON.parse(stored));
        setLastSaved(new Date().toISOString());
      } else {
        const defaultDec = createDefaultDecision();
        setDecision(defaultDec);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDec));
        setLastSaved(new Date().toISOString());
      }
    } catch (e) {
      console.error("Failed to load decision from local storage", e);
      setDecision(createDefaultDecision());
    }
  }, []);

  // Autosave
  useEffect(() => {
    if (!decision) return;
    
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSaveStatus("saving");
    const timeoutId = setTimeout(() => {
      try {
        const updatedDecision = {
          ...decision,
          updatedAt: new Date().toISOString()
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedDecision));
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
    setDecision(defaultDec);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultDec));
    setLastSaved(defaultDec.updatedAt);
    setSaveStatus("saved");
  }, []);

  useEffect(() => {
    const handleNewDecision = () => resetDecision();
    window.addEventListener("astra:new-decision", handleNewDecision);
    return () => window.removeEventListener("astra:new-decision", handleNewDecision);
  }, [resetDecision]);

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
