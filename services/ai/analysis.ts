import { Decision } from "@/types/decision";
import { 
  GoalReview, 
  BiasAnalysis, 
  RiskAnalysis, 
  TradeoffMatrix, 
  AlternativeGenerator, 
  DevilsAdvocate, 
  ExecutiveSummary, 
  Recommendation 
} from "@/types/analysis";
import { buildDecisionContext } from "./context-builder";
import { getAISettings } from "./providers";
import { hashDecisionContext } from "@/lib/hash";

// Import Prompts
import { GOAL_SYSTEM_PROMPT } from "@/prompts/goal";
import { BIAS_SYSTEM_PROMPT } from "@/prompts/bias";
import { RISKS_SYSTEM_PROMPT } from "@/prompts/risks";
import { TRADEOFF_SYSTEM_PROMPT } from "@/prompts/tradeoff";
import { ALTERNATIVES_SYSTEM_PROMPT } from "@/prompts/alternatives";
import { EXECUTIVE_SYSTEM_PROMPT } from "@/prompts/executive";
import { RECOMMENDATION_SYSTEM_PROMPT } from "@/prompts/recommendation";

type AnalysisType = "goal" | "bias" | "risk" | "tradeoff" | "alternative" | "devils-advocate" | "executive" | "recommendation";

const CACHE_PREFIX = "astra_analysis_cache_";

async function fetchAnalysis<T>(decision: Decision, type: AnalysisType, systemPrompt: string): Promise<T> {
  const context = buildDecisionContext(decision);
  const hash = hashDecisionContext(context, type);
  const cacheKey = `${CACHE_PREFIX}${decision.id}_${type}`;

  // Caching: Check if we already have this exact analysis for this decision state
  try {
    const cachedItem = localStorage.getItem(cacheKey);
    if (cachedItem) {
      const parsed = JSON.parse(cachedItem);
      if (parsed.hash === hash) {
        return parsed.data as T;
      }
    }
  } catch {
    // Ignore cache read errors
  }

  const settings = getAISettings();
  const apiKey = settings.provider === "anthropic" ? settings.anthropicKey : settings.openaiKey;

  if (!apiKey) {
    throw new Error("API Key is not configured. Please visit Settings.");
  }

  const response = await fetch("/api/ai/analyze", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-ai-key": apiKey,
    },
    body: JSON.stringify({
      context,
      provider: settings.provider,
      system: systemPrompt,
      type,
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.error || `Failed to analyze decision: ${response.statusText}`);
  }

  const data = await response.json();

  // Save to cache
  try {
    localStorage.setItem(cacheKey, JSON.stringify({
      hash,
      timestamp: Date.now(),
      data
    }));
  } catch {
    // Ignore cache write errors
  }

  return data as T;
}

// ------------------------------------------------------------------
// Specific Analysis Functions
// ------------------------------------------------------------------

export const analyzeDecision = (decision: Decision): Promise<Recommendation> => 
  fetchAnalysis<Recommendation>(decision, "recommendation", RECOMMENDATION_SYSTEM_PROMPT);

export const analyzeGoal = (decision: Decision): Promise<GoalReview> => 
  fetchAnalysis<GoalReview>(decision, "goal", GOAL_SYSTEM_PROMPT);

export const detectBiases = (decision: Decision): Promise<BiasAnalysis> => 
  fetchAnalysis<BiasAnalysis>(decision, "bias", BIAS_SYSTEM_PROMPT);

export const identifyRisks = (decision: Decision): Promise<RiskAnalysis> => 
  fetchAnalysis<RiskAnalysis>(decision, "risk", RISKS_SYSTEM_PROMPT);

export const tradeoffAnalysis = (decision: Decision): Promise<TradeoffMatrix> => 
  fetchAnalysis<TradeoffMatrix>(decision, "tradeoff", TRADEOFF_SYSTEM_PROMPT);

export const generateOptions = (decision: Decision): Promise<AlternativeGenerator> => 
  fetchAnalysis<AlternativeGenerator>(decision, "alternative", ALTERNATIVES_SYSTEM_PROMPT);

export const devilsAdvocate = (decision: Decision): Promise<DevilsAdvocate> => 
  // We can reuse the Devil's Advocate persona from the system prompts, or define one here
  fetchAnalysis<DevilsAdvocate>(decision, "devils-advocate", "You are playing Devil's Advocate. Aggressively attack the assumptions and options.");

export const executiveSummary = (decision: Decision): Promise<ExecutiveSummary> => 
  fetchAnalysis<ExecutiveSummary>(decision, "executive", EXECUTIVE_SYSTEM_PROMPT);

export const confidenceReview = (decision: Decision): Promise<Recommendation> => 
  fetchAnalysis<Recommendation>(decision, "recommendation", RECOMMENDATION_SYSTEM_PROMPT);
