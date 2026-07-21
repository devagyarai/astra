import { Decision } from "@/types/decision";
import { type UIMessage } from "@ai-sdk/react";

const DECISIONS_KEY = "astra_decisions";
const ACTIVE_ID_KEY = "astra_active_decision_id";
const OLD_WORKSPACE_KEY = "astra_decision_workspace";

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

const dispatchWorkspaceUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("astra_workspace_updated"));
  }
};

export const DecisionRepository = {
  getAll: (): Decision[] => {
    if (typeof window === "undefined") return [];
    try {
      // 1. Check for old format and migrate
      const oldData = localStorage.getItem(OLD_WORKSPACE_KEY);
      if (oldData) {
        const parsed = JSON.parse(oldData);
        // Save as new format
        localStorage.setItem(DECISIONS_KEY, JSON.stringify([parsed]));
        // Remove old key so we don't migrate again
        localStorage.removeItem(OLD_WORKSPACE_KEY);
        // Make it active
        localStorage.setItem(ACTIVE_ID_KEY, parsed.id);
        dispatchWorkspaceUpdate();
        return [parsed];
      }

      // 2. Normal load
      const data = localStorage.getItem(DECISIONS_KEY);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error("Failed to load decisions", e);
    }
    return [];
  },

  getById: (id: string): Decision | null => {
    const decisions = DecisionRepository.getAll();
    return decisions.find(d => d.id === id) || null;
  },

  save: (decision: Decision): void => {
    if (typeof window === "undefined") return;
    try {
      const decisions = DecisionRepository.getAll();
      const index = decisions.findIndex(d => d.id === decision.id);
      if (index >= 0) {
        decisions[index] = decision;
      } else {
        decisions.push(decision);
      }
      localStorage.setItem(DECISIONS_KEY, JSON.stringify(decisions));
      dispatchWorkspaceUpdate();
    } catch (e) {
      console.error("Failed to save decision", e);
    }
  },

  delete: (id: string): void => {
    if (typeof window === "undefined") return;
    try {
      const decisions = DecisionRepository.getAll();
      const filtered = decisions.filter(d => d.id !== id);
      localStorage.setItem(DECISIONS_KEY, JSON.stringify(filtered));
      if (DecisionRepository.getActiveId() === id) {
        localStorage.removeItem(ACTIVE_ID_KEY);
      }
      DecisionRepository.clearChatHistory(id);
      dispatchWorkspaceUpdate();
    } catch (e) {
      console.error("Failed to delete decision", e);
    }
  },

  duplicate: (id: string): Decision | null => {
    const dec = DecisionRepository.getById(id);
    if (!dec) return null;
    
    const duplicateDecision: Decision = {
      ...dec,
      id: crypto.randomUUID(),
      title: `${dec.title} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    DecisionRepository.save(duplicateDecision);
    return duplicateDecision;
  },

  archive: (id: string): void => {
    const dec = DecisionRepository.getById(id);
    if (dec) {
      dec.isArchived = true;
      dec.updatedAt = new Date().toISOString();
      DecisionRepository.save(dec);
    }
  },

  restore: (id: string): void => {
    const dec = DecisionRepository.getById(id);
    if (dec) {
      dec.isArchived = false;
      dec.updatedAt = new Date().toISOString();
      DecisionRepository.save(dec);
    }
  },

  getActiveId: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ACTIVE_ID_KEY);
  },

  setActiveId: (id: string): void => {
    if (typeof window === "undefined") return;
    localStorage.setItem(ACTIVE_ID_KEY, id);
    dispatchWorkspaceUpdate();
  },

  // Chat History Management
  getChatHistory: (decisionId: string): UIMessage[] => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(`astra_chat_${decisionId}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load chat history", e);
    }
    return [];
  },

  saveChatHistory: (decisionId: string, messages: UIMessage[]): void => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(`astra_chat_${decisionId}`, JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save chat history", e);
    }
  },

  clearChatHistory: (decisionId: string): void => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(`astra_chat_${decisionId}`);
  },

  clearAllData: (): void => {
    if (typeof window === "undefined") return;
    const decisions = DecisionRepository.getAll();
    decisions.forEach(d => {
      DecisionRepository.clearChatHistory(d.id);
    });
    localStorage.removeItem(DECISIONS_KEY);
    localStorage.removeItem(ACTIVE_ID_KEY);
    dispatchWorkspaceUpdate();
  }
};
