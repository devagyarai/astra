import { Decision } from "@/types/decision";

const DECISIONS_KEY = "astra_decisions";
const ACTIVE_ID_KEY = "astra_active_decision_id";

export const createDefaultDecision = (): Decision => ({
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
  isArchived: false,
});

export const storage = {
  getAllDecisions: (): Decision[] => {
    if (typeof window === "undefined") return [];
    try {
      const data = localStorage.getItem(DECISIONS_KEY);
      if (data) {
        return JSON.parse(data);
      }
      
      // Fallback: migrate old single decision if it exists
      const oldData = localStorage.getItem("astra_decision_workspace");
      if (oldData) {
        const parsed = JSON.parse(oldData);
        localStorage.setItem(DECISIONS_KEY, JSON.stringify([parsed]));
        return [parsed];
      }
    } catch (e) {
      console.error("Failed to load decisions", e);
    }
    return [];
  },

  saveDecision: (decision: Decision): void => {
    if (typeof window === "undefined") return;
    try {
      const decisions = storage.getAllDecisions();
      const index = decisions.findIndex(d => d.id === decision.id);
      if (index >= 0) {
        decisions[index] = decision;
      } else {
        decisions.push(decision);
      }
      localStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
    } catch (e) {
      console.error("Failed to save decision", e);
    }
  },

  getActiveDecisionId: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACTIVE_ID_KEY);
  },

  setActiveDecisionId: (id: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACTIVE_ID_KEY, id);
  },

  getDecision: (id: string): Decision | null => {
    const decisions = storage.getAllDecisions();
    return decisions.find(d => d.id === id) || null;
  },

  archiveDecision: (id: string): void => {
    const dec = storage.getDecision(id);
    if (dec) {
      dec.isArchived = true;
      dec.updatedAt = new Date().toISOString();
      storage.saveDecision(dec);
    }
  },

  restoreDecision: (id: string): void => {
    const dec = storage.getDecision(id);
    if (dec) {
      dec.isArchived = false;
      dec.updatedAt = new Date().toISOString();
      storage.saveDecision(dec);
    }
  },

  deleteDecision: (id: string): void => {
    if (typeof window === "undefined") return;
    try {
      const decisions = storage.getAllDecisions();
      const filtered = decisions.filter(d => d.id !== id);
      localStorage.setItem(DECISIONS_KEY, JSON.stringify(filtered));
      if (storage.getActiveDecisionId() === id) {
        localStorage.removeItem(ACTIVE_ID_KEY);
      }
    } catch (e) {
      console.error("Failed to delete decision", e);
    }
  }
};
