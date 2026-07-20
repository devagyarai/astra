import { Decision } from "./decision";

export type AIRole = "user" | "assistant" | "system";

export type AIPersona = 
  | "Executive Advisor"
  | "Devil's Advocate"
  | "Strategic Consultant"
  | "Product Manager"
  | "Technical Architect"
  | "Investor"
  | "Psychologist"
  | "Socratic Mentor";

export interface AIMessage {
  id: string;
  role: AIRole;
  content: string;
  createdAt: string;
  type: "chat" | "suggestion" | "analysis";
  metadata?: Record<string, unknown>;
}

export interface AIConversation {
  id: string;
  decisionId: string;
  messages: AIMessage[];
  updatedAt: string;
}

export interface AISuggestion {
  id: string;
  field: keyof Decision | "risk" | "bias" | "general";
  content: string;
  rationale?: string;
  status: "pending" | "accepted" | "rejected";
}

export interface AIContextConfig {
  includeReview?: boolean;
  includeEvidence?: boolean;
  includeNotes?: boolean;
  maxLength?: number;
}
