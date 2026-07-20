import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages, provider, system } = await req.json();
    
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
