import { Decision } from "@/types/decision";
import { AIPersona, AIContextConfig } from "@/types/ai";
import { buildDecisionContext } from "./context-builder";
import { getSystemPrompt } from "@/prompts/system";
import { getAISettings } from "./providers";

export interface OrchestratorRequest {
  decision: Decision;
  messages: unknown[]; // Vercel AI SDK Core message type
  persona?: AIPersona;
  promptKey?: string; 
  customPrompt?: string;
  contextConfig?: AIContextConfig;
}

export class AIOrchestrator {
  
  /**
   * Builds the complete payload to send to the /api/ai/chat edge function.
   * This handles Context Generation, Provider Selection, and Prompt Selection.
   */
  static async prepareChatPayload(req: OrchestratorRequest) {
    const settings = getAISettings();
    const apiKey = settings.provider === "anthropic" ? settings.anthropicKey : settings.openaiKey;

    if (!apiKey) {
      throw new Error("API Key is not configured. Please visit Settings.");
    }

    const systemInstruction = getSystemPrompt(req.persona);
    const decisionContext = buildDecisionContext(req.decision, req.contextConfig);

    // If there is a specific task prompt (e.g. "Generate Constraints"), we inject it as a system message
    // or append it to the context. Vercel AI SDK handles `system` at the root level.
    const fullSystemPrompt = `${systemInstruction}\n\n${decisionContext}\n\n${req.customPrompt || ""}`;

    return {
      endpoint: "/api/ai/chat",
      headers: {
        "Content-Type": "application/json",
        "x-ai-key": apiKey,
      },
      body: JSON.stringify({
        messages: req.messages,
        provider: settings.provider,
        system: fullSystemPrompt,
      }),
    };
  }

  // Future features to be implemented:
  // - Rate limiting
  // - Token counting (tiktoken or equivalent)
  // - Retry mechanisms (handled by React Query or useChat internally, but can be orchestrated here)
}
