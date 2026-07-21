import { generateObject } from "ai";
import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { z } from "zod";
import * as schemas from "@/types/analysis";

export const runtime = "edge";

const schemaMap: Record<string, z.ZodType<unknown>> = {
  "goal": schemas.GoalReviewSchema,
  "bias": schemas.BiasAnalysisSchema,
  "risk": schemas.RiskAnalysisSchema,
  "tradeoff": schemas.TradeoffMatrixSchema,
  "alternative": schemas.AlternativeGeneratorSchema,
  "devils-advocate": schemas.DevilsAdvocateSchema,
  "executive": schemas.ExecutiveSummarySchema,
  "recommendation": schemas.RecommendationSchema,
  "hybrid": schemas.AiInsightsSchema,
};

const RequestSchema = z.object({
  context: z.string(),
  provider: z.enum(["openai", "anthropic"]),
  system: z.string().optional(),
  type: z.string()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RequestSchema.safeParse(body);
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid request payload", details: parsed.error.issues }), { status: 400 });
    }

    const { context, provider, system, type } = parsed.data;
    const apiKey = req.headers.get("x-ai-key");

    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key" }), { status: 401 });
    }

    if (!schemaMap[type]) {
      return new Response(JSON.stringify({ error: "Invalid analysis type requested" }), { status: 400 });
    }

    let model;
    if (provider === "anthropic") {
      const anthropic = createAnthropic({ apiKey });
      model = anthropic("claude-3-5-sonnet-20240620");
    } else {
      const openai = createOpenAI({ apiKey });
      model = openai("gpt-4o");
    }

    const { object } = await generateObject({
      model,
      schema: schemaMap[type],
      system: system || "You are an expert decision intelligence analyst.",
      prompt: context,
    });

    return new Response(JSON.stringify(object), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("AI Analysis Proxy Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message || "An error occurred during analysis" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
