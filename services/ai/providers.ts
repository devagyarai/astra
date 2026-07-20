export type AIProvider = "openai" | "anthropic";

export interface AIProviderSettings {
  provider: AIProvider;
  openaiKey?: string;
  anthropicKey?: string;
}

const SETTINGS_KEY = "astra_ai_settings";

export const getAISettings = (): AIProviderSettings => {
  if (typeof window === "undefined") return { provider: "openai" };
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error("Failed to parse AI settings", e);
  }
  return { provider: "openai" };
};

export const saveAISettings = (settings: AIProviderSettings) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
};
