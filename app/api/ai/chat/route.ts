import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const ChatRequestSchema = z.object({
  messages: z.array(z.any()),
  provider: z.enum(["openai", "anthropic"]),
  system: z.string().optional(),
  decisionContext: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = ChatRequestSchema.safeParse(body);
    
    if (!parsed.success) {
      return new Response(JSON.stringify({ error: "Invalid request payload", details: parsed.error.issues }), { status: 400 });
    }

    const { messages, provider, system } = parsed.data;
    
    // Get the provider key from headers
    const apiKey = req.headers.get("x-ai-key");
    
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "Missing API Key. Please configure it in Settings." }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    let model;
    if (provider === "anthropic") {
      const anthropic = createAnthropic({ apiKey });
      model = anthropic("claude-3-5-sonnet-20240620");
    } else {
      const openai = createOpenAI({ apiKey });
      model = openai("gpt-4o");
    }

    const result = await streamText({
      model,
      messages,
      system: system || "You are Astra, an elite executive decision-making partner.",
    });

    return result.toTextStreamResponse();
  } catch (error: unknown) {
    console.error("AI Proxy Error:", error);
    return new Response(JSON.stringify({ error: (error as Error).message || "An error occurred during AI processing" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
