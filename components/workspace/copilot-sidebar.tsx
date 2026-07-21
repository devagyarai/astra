"use client";

import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Decision } from "@/types/decision";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";

const ReactMarkdown = dynamic(() => import("react-markdown"), {
  ssr: false,
  loading: () => <div className="animate-pulse h-4 w-24 bg-secondary/50 rounded-md" />
});
import { 
  Sparkles, Send, StopCircle, Trash2, 
  MessageSquare, CheckCircle, Zap,
  Target, GitMerge
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getAISettings, type AIProviderSettings } from "@/services/ai/providers";
import { ErrorBoundary } from "@/components/ui/error-boundary";
import { SuggestionPreview } from "@/components/ai/SuggestionPreview";
import { ActionCard } from "@/components/ai/action-card";
import { PremiumShimmer } from "@/components/ui/premium-skeleton";
import { BiasVisualization, TradeoffVisualization, GoalVisualization } from "@/components/ai/visualizations";
import { BiasAnalysis, GoalReview, TradeoffMatrix } from "@/types/analysis";

interface CopilotSidebarProps {
  decision: Decision;
  updateField: <K extends keyof Decision>(field: K, value: Decision[K]) => void;
  isMobile?: boolean;
}

export function CopilotSidebar({ decision, updateField, isMobile = false }: CopilotSidebarProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "actions" | "insights">("chat");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const [actionResult, setActionResult] = useState<Record<string, unknown> | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const [aiSettings, setAiSettings] = useState<AIProviderSettings>({ provider: "openai" });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAiSettings(getAISettings());
    setIsClient(true);
  }, []);

  const apiKey = aiSettings.provider === "anthropic" ? aiSettings.anthropicKey : aiSettings.openaiKey;

  const handleAction = async (action: string) => {
    setIsAnalyzing(true);
    setActiveAction(action);
    setActionResult(null);
    try {
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-ai-key": apiKey || "",
        },
        body: JSON.stringify({
          provider: aiSettings.provider,
          type: action,
          context: JSON.stringify({
            goal: decision.goal,
            context: decision.context,
            constraints: decision.constraints,
            options: decision.options,
            evidence: decision.evidence
          })
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setActionResult(data);
        if (action !== "goal") {
          setActiveTab("insights");
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const transport = React.useMemo(() => {
    return new DefaultChatTransport({
      api: "/api/ai/chat",
      headers: {
        "x-ai-key": apiKey || "",
      },
      fetch: async (url, options) => {
        const parsedBody = options?.body ? JSON.parse(options.body as string) : {};
        return fetch(url, {
          ...options,
          body: JSON.stringify({
            ...parsedBody,
            provider: aiSettings.provider,
            system: "You are an expert Decision Intelligence Partner (Astra Copilot). Answer concisely, use markdown, tables, and lists. Focus on helping the user make the best possible decision.",
            decisionContext: JSON.stringify({
              goal: decision.goal,
              context: decision.context,
              constraints: decision.constraints,
              options: decision.options,
              evidence: decision.evidence
            })
          })
        });
      }
    });
  }, [apiKey, aiSettings.provider, decision.goal, decision.context, decision.constraints, decision.options, decision.evidence]);

  const { messages, sendMessage, status, stop, setMessages } = useChat({
    id: decision.id,
    transport
  });

  const isLoading = status === "streaming" || status === "submitted";

  const [input, setInput] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage({ id: Date.now().toString(), role: "user", parts: [{ type: "text", text: input }] });
    setInput("");
  };

  // Local storage persistence
  useEffect(() => {
    if (!decision.id) return;
    const saved = localStorage.getItem(`astra_chat_${decision.id}`);
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e: unknown) {
        console.error("Local storage parse error:", e);
      }
    }
  }, [decision.id, setMessages]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`astra_chat_${decision.id}`, JSON.stringify(messages));
    }
  }, [messages, decision.id]);

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(`astra_chat_${decision.id}`);
  };

  if (!isClient) {
    return (
      <aside className={isMobile ? "flex flex-col h-full w-full p-6" : "flex w-full h-full flex-col p-6"}>
        <div className="flex flex-col items-center justify-center h-full">
          <PremiumShimmer className="h-full w-full rounded-2xl" />
        </div>
      </aside>
    );
  }

  if (!apiKey) {
    return (
      <aside className={isMobile ? "flex flex-col h-full w-full p-6" : "flex w-full h-full flex-col p-6"}>
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4 p-8 bg-card/30 border border-border/50 rounded-2xl shadow-sm">
          <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center shadow-inner">
            <Sparkles className="h-6 w-6 text-muted-foreground opacity-50" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-tight mb-1">Copilot Offline</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Connect OpenAI or Anthropic in Settings to enable Astra Copilot features.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className={isMobile ? "flex flex-col h-full w-full" : "flex flex-col h-full w-full"}>
      {/* Header & Tabs */}
      <div className="p-4 border-b border-border/50 bg-card/40">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="font-semibold text-sm tracking-tight uppercase">Astra Copilot</h3>
        </div>
        <div className="flex gap-1 bg-secondary/50 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab("chat")}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === "chat" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Chat
          </button>
          <button 
            onClick={() => setActiveTab("actions")}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === "actions" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Actions
          </button>
          <button 
            onClick={() => setActiveTab("insights")}
            className={`flex-1 text-xs font-medium py-1.5 rounded-md transition-all ${activeTab === "insights" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Insights
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">
          {activeTab === "chat" && (
            <motion.div 
              key="chat"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="h-full flex flex-col"
            >
              <div className="flex justify-end p-2 border-b border-border/30">
                <Button variant="ghost" size="sm" onClick={clearChat} className="h-7 text-xs text-muted-foreground">
                  <Trash2 className="h-3 w-3 mr-1" /> Clear
                </Button>
              </div>
              <ScrollArea className="flex-1 p-4" ref={scrollRef}>
                {messages.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[300px] text-center opacity-70 p-6">
                    <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center mb-4 shadow-sm border border-border/50">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <h4 className="font-semibold text-sm mb-1 tracking-tight">Copilot is Ready</h4>
                    <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                      Ask a question or select an action to start improving your decision.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 pb-4">
                    {messages.map((m, index) => {
                      const messageText = m.parts?.map(p => p.type === 'text' ? p.text : '').join("\n") || "";
                      return (
                        <motion.div 
                          key={m.id || index} 
                          className="mb-4"
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                          <div className={`p-4 rounded-2xl shadow-sm border ${
                            m.role === 'user' 
                              ? 'bg-primary/90 text-primary-foreground ml-8 border-primary/20 rounded-tr-sm' 
                              : 'bg-card/80 backdrop-blur-sm border-border/50 mr-8 rounded-tl-sm'
                          }`}>
                            {m.role === 'user' ? (
                              <span className="whitespace-pre-wrap leading-relaxed">{messageText}</span>
                            ) : (
                              <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-pre:bg-secondary prose-pre:border prose-pre:border-border/50 prose-pre:p-3 prose-pre:rounded-xl max-w-none">
                                <ErrorBoundary>
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {messageText}
                                  </ReactMarkdown>
                                </ErrorBoundary>
                                {isLoading && index === messages.length - 1 && (
                                  <motion.span 
                                    className="inline-block w-2 h-4 bg-primary ml-1 align-middle rounded-sm"
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                    {isLoading && (
                      <div className="flex items-start gap-3 mb-4 mr-8">
                        <div className="p-3 bg-muted/30 border border-border/50 rounded-xl rounded-tl-sm w-3/4 shadow-sm">
                          <div className="flex items-center gap-2 mb-2">
                            <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                            <span className="text-xs font-medium text-muted-foreground">Thinking...</span>
                          </div>
                          <PremiumShimmer className="h-3 w-full mb-1.5" />
                          <PremiumShimmer className="h-3 w-[80%] mb-1.5" />
                          <PremiumShimmer className="h-3 w-[60%]" />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </ScrollArea>
              
              {/* Input Area */}
              <div className="p-4 bg-background border-t border-border/50">
                <form onSubmit={handleSubmit} className="relative flex items-center">
                  <Input 
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask Copilot..."
                    className="pr-20 py-6 rounded-xl border-border/50 bg-card/50 shadow-sm focus-visible:ring-primary/20"
                  />
                  <div className="absolute right-2 flex items-center gap-1">
                    {isLoading ? (
                      <Button type="button" size="icon" variant="ghost" onClick={() => stop()} className="h-8 w-8 text-destructive rounded-lg hover:bg-destructive/10 hover:text-destructive">
                        <StopCircle className="h-4 w-4" />
                      </Button>
                    ) : (
                      <Button type="submit" size="icon" variant="ghost" disabled={!input.trim()} className="h-8 w-8 text-primary rounded-lg hover:bg-primary/10 hover:text-primary">
                        <Send className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {activeTab === "actions" && (
            <motion.div 
              key="actions"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="p-6 h-full overflow-y-auto space-y-4"
            >
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Quick Actions</h4>
              
              {actionResult && activeAction === "goal" ? (
                <div className="space-y-4">
                  <SuggestionPreview 
                    title={activeAction === "goal" ? "Improved Goal" : "AI Suggestion"}
                    suggestion={(actionResult.improvedGoal as string) || (actionResult.recommendation as string) || JSON.stringify(actionResult, null, 2)}
                    originalText={activeAction === "goal" ? decision.goal : undefined}
                    onAccept={() => {
                      if (activeAction === "goal" && actionResult.improvedGoal) {
                        updateField("goal", actionResult.improvedGoal as string);
                      }
                      setActionResult(null);
                      setActiveAction(null);
                    }}
                    onReject={() => {
                      setActionResult(null);
                      setActiveAction(null);
                    }}
                  />
                </div>
              ) : (
                <>
                  <ActionCard 
                    icon={Target}
                    title="Improve Goal"
                    description="Rewrite your objective into a measurable, actionable outcome."
                    estimatedRuntime="2-4s"
                    isAnalyzing={isAnalyzing}
                    activeAction={activeAction}
                    actionKey="goal"
                    onClick={() => handleAction("goal")}
                  />
                  
                  <ActionCard 
                    icon={Zap}
                    iconColor="text-warning"
                    title="Detect Biases"
                    description="Identify cognitive blindspots and framing biases in your thinking."
                    estimatedRuntime="3-5s"
                    isAnalyzing={isAnalyzing}
                    activeAction={activeAction}
                    actionKey="bias"
                    onClick={() => handleAction("bias")}
                  />

                  <ActionCard 
                    icon={GitMerge}
                    iconColor="text-success"
                    title="Trade-off Matrix"
                    description="Compare all defined options across key constraints."
                    estimatedRuntime="5-8s"
                    isAnalyzing={isAnalyzing}
                    activeAction={activeAction}
                    actionKey="tradeoff"
                    onClick={() => handleAction("tradeoff")}
                  />
                </>
              )}
            </motion.div>
          )}

          {activeTab === "insights" && (
            <motion.div 
              key="insights"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.15 }}
              className="p-6 h-full overflow-y-auto"
            >
              {actionResult ? (
                <div className="space-y-6">
                  {activeAction === "bias" && <BiasVisualization data={actionResult as unknown as BiasAnalysis} />}
                  {activeAction === "tradeoff" && <TradeoffVisualization data={actionResult as unknown as TradeoffMatrix} />}
                  {activeAction === "goal" && <GoalVisualization data={actionResult as unknown as GoalReview} />}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[200px] text-center opacity-70 p-6 bg-card/30 border border-dashed border-border/80 rounded-2xl">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center mb-4">
                    <CheckCircle className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 tracking-tight">No Insights Yet</h4>
                  <p className="text-xs text-muted-foreground max-w-[200px] leading-relaxed">
                    Run an analysis from the Actions tab to generate structured insights.
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
