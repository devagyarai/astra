import { z } from "zod";

// 1. Goal Review
export const GoalReviewSchema = z.object({
  score: z.number().min(0).max(100).describe("Overall quality score of the goal"),
  weaknesses: z.array(z.string()).describe("List of weaknesses, ambiguities, or missing elements"),
  improvedVersion: z.string().describe("A rewritten, highly specific, and measurable version of the goal"),
  metrics: z.object({
    clarity: z.number().min(0).max(10),
    measurability: z.number().min(0).max(10),
    completeness: z.number().min(0).max(10),
  }),
});
export type GoalReview = z.infer<typeof GoalReviewSchema>;

// 2. Bias Detection
export const BiasSchema = z.object({
  type: z.enum([
    "Confirmation Bias",
    "Anchoring",
    "Availability Bias",
    "Survivorship Bias",
    "Loss Aversion",
    "Sunk Cost Fallacy",
    "Other"
  ]),
  explanation: z.string().describe("Explanation of how this bias manifests in the current decision"),
  correctiveAdvice: z.string().describe("Actionable advice to counteract this bias"),
});
export const BiasAnalysisSchema = z.object({
  biases: z.array(BiasSchema),
  overallRisk: z.enum(["Low", "Medium", "High"]),
});
export type BiasAnalysis = z.infer<typeof BiasAnalysisSchema>;

// 3. Risk Analysis
export const RiskSchema = z.object({
  category: z.enum(["operational", "financial", "technical", "timeline", "human", "strategic"]),
  description: z.string(),
  severity: z.enum(["Low", "Medium", "High", "Critical"]),
  probability: z.enum(["Low", "Medium", "High"]),
  mitigation: z.string(),
});
export const RiskAnalysisSchema = z.object({
  level: z.enum(["Low", "Medium", "High", "Critical"]),
  risks: z.array(RiskSchema),
  missingInformation: z.array(z.string()).describe("Information gaps that prevent full risk assessment"),
});
export type RiskAnalysis = z.infer<typeof RiskAnalysisSchema>;

// 4. Trade-off Matrix
export const TradeoffOptionSchema = z.object({
  optionTitle: z.string(),
  pros: z.array(z.string()),
  cons: z.array(z.string()),
  opportunities: z.array(z.string()),
  threats: z.array(z.string()),
  cost: z.enum(["Low", "Medium", "High"]),
  complexity: z.enum(["Low", "Medium", "High"]),
  impact: z.enum(["Low", "Medium", "High"]),
  confidence: z.number().min(0).max(100),
});
export const TradeoffMatrixSchema = z.object({
  options: z.array(TradeoffOptionSchema),
  hardestTradeoff: z.string().describe("A summary of the most difficult compromise between the options"),
});
export type TradeoffMatrix = z.infer<typeof TradeoffMatrixSchema>;

// 5. Alternative Generator
export const AlternativeSchema = z.object({
  title: z.string(),
  description: z.string(),
  rationale: z.string().describe("Why this alternative is structurally different from existing ones"),
});
export const AlternativeGeneratorSchema = z.object({
  alternatives: z.array(AlternativeSchema).min(3),
});
export type AlternativeGenerator = z.infer<typeof AlternativeGeneratorSchema>;

// 6. Devil's Advocate
export const DevilsAdvocateSchema = z.object({
  assumptionsChallenged: z.array(z.string()),
  blindSpots: z.array(z.string()),
  opposingViewpoints: z.array(z.string()),
  fatalFlaw: z.string().describe("The single most likely reason the current leading option will fail"),
});
export type DevilsAdvocate = z.infer<typeof DevilsAdvocateSchema>;

// 7. Executive Summary
export const ExecutiveSummarySchema = z.object({
  decisionOverview: z.string(),
  recommendation: z.string(),
  keyRisks: z.array(z.string()),
  alternativesConsidered: z.array(z.string()),
  finalAdvice: z.string(),
});
export type ExecutiveSummary = z.infer<typeof ExecutiveSummarySchema>;

// 8. Recommendation Engine
export const RecommendationSchema = z.object({
  recommendedOption: z.string(),
  reason: z.string(),
  confidence: z.number().min(0).max(100),
  supportingEvidence: z.array(z.string()),
  missingInformation: z.array(z.string()),
  nextActions: z.array(z.string()),
});
export type Recommendation = z.infer<typeof RecommendationSchema>;

// 9. AI Insights (Hybrid Intelligence)
export const AiInsightsSchema = z.object({
  executiveSummary: z.string(),
  richerExplanation: z.string(),
  alternativeViewpoints: z.array(z.string()),
  hiddenAssumptions: z.array(z.string()),
  additionalRecommendations: z.array(z.string())
});
export type AiInsights = z.infer<typeof AiInsightsSchema>;
