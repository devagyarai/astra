import { Decision } from "@/types/decision";
import { AIContextConfig } from "@/types/ai";

/**
 * Serializes a Decision object into a structured markdown string optimized for LLM context.
 */
export const buildDecisionContext = (decision: Decision, config?: AIContextConfig): string => {
  const parts: string[] = [];

  parts.push("===============================\nCURRENT DECISION\n===============================");

  if (decision.title) {
    parts.push(`Title: ${decision.title}`);
  }

  if (decision.goal) {
    parts.push(`\nGoal:\n${decision.goal.trim()}`);
  }

  if (decision.context) {
    parts.push(`\nContext:\n${decision.context.trim()}`);
  }

  if (decision.constraints && decision.constraints.trim()) {
    parts.push(`\nConstraints:\n${decision.constraints.trim()}`);
  }

  if (decision.options && decision.options.length > 0) {
    parts.push("\nOptions:");
    decision.options.forEach((opt, idx) => {
      if (opt.trim()) parts.push(`\nOption ${String.fromCharCode(65 + idx)}: ${opt.trim()}`);
    });
  }

  if (config?.includeEvidence !== false && decision.evidence && decision.evidence.length > 0) {
    parts.push(`\nEvidence:`);
    decision.evidence.forEach((ev) => {
      if (ev.trim()) parts.push(`- ${ev.trim()}`);
    });
  }

  if (config?.includeReview !== false) {
    if (decision.analysis && decision.analysis.trim()) {
      parts.push(`\nAnalysis:\n${decision.analysis.trim()}`);
    }
    if (decision.recommendation && decision.recommendation.trim()) {
      parts.push(`\nRecommendation:\n${decision.recommendation.trim()}`);
    }
  }

  if (config?.includeNotes !== false && decision.notes && decision.notes.trim()) {
    parts.push(`\nNotes:\n${decision.notes.trim()}`);
  }

  const contextStr = parts.join("\n").replace(/\n{3,}/g, "\n\n"); // compress whitespace

  // Truncate if necessary (naive token estimation: ~4 chars per token)
  const maxLength = config?.maxLength || 16000; // default 4k tokens approx
  if (contextStr.length > maxLength) {
    return contextStr.substring(0, maxLength) + "\n...[TRUNCATED DUE TO LENGTH]";
  }

  return contextStr;
};
