"use client";

import * as React from "react";
import { DecisionAnalysis } from "@/lib/analysis/decision-analysis";
import { AiInsights } from "@/types/analysis";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle, Lightbulb, TrendingUp, ShieldAlert, Zap, AlertCircle } from "lucide-react";

interface HybridAnalysisProps {
  coreAnalysis: DecisionAnalysis | null;
  aiInsights: AiInsights | null;
  isAnalyzingAI: boolean;
  apiKeyExists: boolean;
}

export function HybridAnalysis({ coreAnalysis, aiInsights, isAnalyzingAI, apiKeyExists }: HybridAnalysisProps) {
  if (!coreAnalysis) return null;

  return (
    <div className="space-y-6">
      {!apiKeyExists && (
        <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-sm mb-1 text-primary">You&apos;re using Astra Core</h4>
              <p className="text-xs text-foreground/80 leading-relaxed mb-3">
                Structured decision analysis is fully available. Connect an AI provider to unlock deeper reasoning and hidden insights.
              </p>
              <a href="/settings" className="inline-flex items-center justify-center rounded-md text-xs font-medium bg-primary text-primary-foreground h-8 px-3 shadow hover:bg-primary/90 transition-colors">
                Connect AI
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Core Deterministic Analysis */}
      <div className="space-y-4">
        <h3 className="font-semibold text-sm tracking-tight flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
          Core Analysis
        </h3>
        
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Readiness: {coreAnalysis.readiness}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Confidence Score</span>
                <span className="font-medium">{coreAnalysis.confidenceScore}%</span>
              </div>
              <Progress value={coreAnalysis.confidenceScore} className="h-2" />
            </div>
            
            <p className="text-sm text-foreground/90 bg-secondary/50 p-3 rounded-lg border border-border/50">
              {coreAnalysis.decisionSummary}
            </p>

            {coreAnalysis.recommendations.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5"><CheckCircle className="h-3 w-3 text-success" /> Recommendations</h4>
                <ul className="text-sm space-y-1 pl-5 list-disc">
                  {coreAnalysis.recommendations.map((rec, i) => (
                    <li key={i}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}

            {coreAnalysis.tradeoffs.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground mb-2 flex items-center gap-1.5"><TrendingUp className="h-3 w-3" /> Trade-offs</h4>
                <ul className="text-sm space-y-1 pl-5 list-disc text-foreground/80">
                  {coreAnalysis.tradeoffs.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>
              </div>
            )}

            {(coreAnalysis.biases.length > 0 || coreAnalysis.weaknesses?.length > 0) && (
              <div className="bg-destructive/10 border border-destructive/20 p-3 rounded-lg">
                <h4 className="text-xs font-semibold text-destructive mb-2 flex items-center gap-1.5"><AlertTriangle className="h-3 w-3" /> Risks & Biases</h4>
                <ul className="text-sm space-y-1 pl-5 list-disc text-destructive/90">
                  {coreAnalysis.biases.map((b, i) => <li key={`bias-${i}`}>{b}</li>)}
                  {coreAnalysis.weaknesses.map((w, i) => <li key={`weak-${i}`}>{w}</li>)}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      {apiKeyExists && (
        <div className="space-y-4 pt-4 border-t border-border/50">
          <h3 className="font-semibold text-sm tracking-tight flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-primary" />
            AI Insights
          </h3>

          {isAnalyzingAI ? (
            <div className="flex flex-col items-center justify-center py-8 opacity-70">
              <Zap className="h-6 w-6 text-primary animate-pulse mb-3" />
              <p className="text-xs font-medium text-muted-foreground animate-pulse">Generating deeper reasoning...</p>
            </div>
          ) : aiInsights ? (
            <div className="space-y-4">
              <Card className="shadow-sm border-primary/20 bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Executive Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed">{aiInsights.executiveSummary}</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardContent className="p-4 space-y-4">
                  <div>
                    <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Richer Explanation</h4>
                    <p className="text-sm text-foreground/90">{aiInsights.richerExplanation}</p>
                  </div>
                  
                  {aiInsights.hiddenAssumptions.length > 0 && (
                    <div className="bg-warning/10 p-3 rounded-lg border border-warning/20">
                      <h4 className="text-xs font-semibold text-warning-foreground flex items-center gap-1.5 mb-2"><ShieldAlert className="h-3 w-3" /> Hidden Assumptions</h4>
                      <ul className="text-sm space-y-1 pl-5 list-disc text-warning-foreground/90">
                        {aiInsights.hiddenAssumptions.map((ha, i) => (
                          <li key={i}>{ha}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiInsights.alternativeViewpoints.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Alternative Viewpoints</h4>
                      <ul className="text-sm space-y-1 pl-5 list-disc">
                        {aiInsights.alternativeViewpoints.map((av, i) => (
                          <li key={i}>{av}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {aiInsights.additionalRecommendations.length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-muted-foreground mb-1.5">Strategic Recommendations</h4>
                      <ul className="text-sm space-y-1 pl-5 list-disc">
                        {aiInsights.additionalRecommendations.map((ar, i) => (
                          <li key={i}>{ar}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center h-[120px] text-center opacity-70 p-4 bg-card/30 border border-dashed border-border/80 rounded-2xl">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center mb-2">
                  <AlertCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Press Analyze to generate AI insights.
                </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
