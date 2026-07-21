import { Decision } from "@/types/decision";

export interface DecisionAnalysis {
  decisionSummary: string;
  confidenceScore: number;
  completionScore: number;
  riskLevel: "Low" | "Medium" | "High";
  readiness: "Not Ready" | "Needs Work" | "Ready";
  missingInformation: string[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  nextBestAction: string;
  biases: string[];
  tradeoffs: string[];
}

export function analyzeDecision(decision: Decision): DecisionAnalysis {
  let confidenceScore = 0;
  let completionScore = 0;
  const missingInformation: string[] = [];
  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const recommendations: string[] = [];
  const biases: string[] = [];
  const tradeoffs: string[] = [];
  
  const hasGoal = decision.goal.trim().length > 0;
  const hasContext = decision.context.trim().length > 0;
  const hasConstraints = decision.constraints.trim().length > 0;
  const validOptions = decision.options.filter(o => o.trim().length > 0);
  const validEvidence = decision.evidence.filter(e => e.trim().length > 0);
  const hasNotes = decision.notes.trim().length > 0;
  
  // Completion Score
  if (hasGoal) completionScore += 20;
  if (hasContext) completionScore += 20;
  if (hasConstraints) completionScore += 15;
  if (validOptions.length > 0) completionScore += 20;
  if (validEvidence.length > 0) completionScore += 15;
  if (hasNotes) completionScore += 10;
  
  // Confidence Score
  if (hasGoal) confidenceScore += 20;
  if (hasContext) confidenceScore += 20;
  if (validOptions.length > 1) confidenceScore += 30;
  if (validEvidence.length > 0) confidenceScore += 20;
  if (hasNotes) confidenceScore += 10;
  
  if (!hasGoal) confidenceScore -= 20;
  if (validOptions.length === 1) confidenceScore -= 10;
  if (validEvidence.length === 0) confidenceScore -= 15;
  if (!hasContext) confidenceScore -= 10;
  
  // Contradictory State: High confidence but 0 evidence
  if (confidenceScore > 60 && validEvidence.length === 0) {
    confidenceScore -= 30; // severe penalty for overconfidence without evidence
  }
  
  confidenceScore = Math.max(0, Math.min(100, confidenceScore));
  
  // Risk Level
  let riskLevel: "Low" | "Medium" | "High" = "Low";
  if (completionScore < 40 || validOptions.length < 2 || !hasGoal || !hasContext) {
    riskLevel = "High";
  } else if (completionScore < 75 || validEvidence.length === 0 || !hasConstraints) {
    riskLevel = "Medium";
  }
  
  // Missing Information & Weaknesses & Recommendations
  if (!hasGoal) {
    missingInformation.push("Missing Goal");
    weaknesses.push("Unclear objective");
    recommendations.push("Clarify the goal and provide measurable success criteria.");
  } else if (decision.goal.length < 20) {
    weaknesses.push("Very Short Goal");
    recommendations.push("Expand on the goal to ensure it is fully understood.");
  } else if (decision.goal.length > 1000) {
    weaknesses.push("Very Long Goal");
    recommendations.push("Summarize the goal to maintain focus.");
  } else {
    strengths.push("Clear objective");
  }
  
  if (!hasContext) {
    missingInformation.push("Missing Context");
    weaknesses.push("Incomplete context");
    recommendations.push("Document the background context driving this decision.");
  } else {
    strengths.push("Well documented context");
  }
  
  if (!hasConstraints) {
    missingInformation.push("No Constraints");
    weaknesses.push("Undefined constraints");
    recommendations.push("Document constraints to avoid scope creep.");
  }
  
  if (validOptions.length === 0) {
    missingInformation.push("No Options");
    weaknesses.push("No alternatives defined");
    recommendations.push("Brainstorm options before deciding.");
  } else if (validOptions.length === 1) {
    weaknesses.push("Single-option bias");
    recommendations.push("Add another option before deciding to avoid tunnel vision.");
  } else {
    strengths.push("Multiple alternatives considered");
  }
  
  if (validEvidence.length === 0) {
    missingInformation.push("No Evidence");
    weaknesses.push("Decision relies on intuition");
    weaknesses.push("Missing supporting evidence");
    recommendations.push("Gather supporting evidence to validate options.");
  } else {
    strengths.push("Evidence-backed decision");
    strengths.push("Balanced reasoning");
  }
  
  if (!hasNotes) {
    missingInformation.push("No Notes");
    recommendations.push("Review possible risks and document them in notes.");
  }
  
  // Next Best Action
  let nextBestAction = "Review and finalize decision";
  if (!hasGoal) nextBestAction = "Define the Goal";
  else if (!hasContext) nextBestAction = "Provide Context";
  else if (validOptions.length === 0) nextBestAction = "Add Options";
  else if (validOptions.length === 1) nextBestAction = "Add another option";
  else if (!hasConstraints) nextBestAction = "Define Constraints";
  else if (validEvidence.length === 0) nextBestAction = "Add Evidence";
  
  // Readiness
  let readiness: "Not Ready" | "Needs Work" | "Ready" = "Not Ready";
  if (completionScore >= 80 && confidenceScore >= 70 && riskLevel !== "High") {
    readiness = "Ready";
  } else if (completionScore >= 50 || confidenceScore >= 40) {
    readiness = "Needs Work";
  }

  // Decision Summary
  const decisionSummary = hasGoal 
    ? `A decision regarding: ${decision.goal}` 
    : "An undefined decision currently lacking a clear goal.";

  // Deterministic Biases
  if (validOptions.length === 1) {
    biases.push("Single-Option Aversion (Tunnel Vision)");
  }
  if (validEvidence.length === 0 && confidenceScore > 50) {
    biases.push("Confirmation Bias Risk (Overconfidence without evidence)");
  }
  if (!hasConstraints && validOptions.length > 2) {
    biases.push("Choice Overload Risk (Many options, no constraints)");
  }

  // Deterministic Trade-offs
  if (validOptions.length > 1) {
    tradeoffs.push(`Comparing ${validOptions.length} distinct alternatives against defined constraints.`);
    if (hasConstraints) {
      tradeoffs.push("Balancing options against budget, timeline, or technical limits.");
    }
  } else if (validOptions.length === 1) {
    tradeoffs.push(`Evaluating a single path: "${validOptions[0]}". No alternative trade-offs exist yet.`);
  } else {
    tradeoffs.push("No trade-offs can be evaluated without defined options.");
  }

  return {
    decisionSummary,
    confidenceScore,
    completionScore,
    riskLevel,
    readiness,
    missingInformation,
    strengths,
    weaknesses,
    recommendations,
    nextBestAction,
    biases,
    tradeoffs
  };
}
