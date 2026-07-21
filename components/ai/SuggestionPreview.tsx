"use client";

import * as React from "react";
import { Check, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

interface SuggestionPreviewProps {
  suggestion: string;
  originalText?: string;
  onAccept: () => void;
  onReject: () => void;
  title?: string;
}

export function SuggestionPreview({ suggestion, originalText, onAccept, onReject, title = "AI Suggestion" }: SuggestionPreviewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.98 }}
      className="rounded-xl border border-primary/30 bg-primary/5 p-4 shadow-sm relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wider">{title}</h4>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onReject} className="h-7 px-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10">
            <X className="h-4 w-4 mr-1" /> Reject
          </Button>
          <Button variant="default" size="sm" onClick={onAccept} className="h-7 px-3 bg-primary text-primary-foreground hover:bg-primary/90">
            <Check className="h-4 w-4 mr-1" /> Accept
          </Button>
        </div>
      </div>
      
      <div className="prose prose-sm dark:prose-invert max-w-none text-foreground text-[14px] leading-relaxed">
        <ReactMarkdown>{suggestion}</ReactMarkdown>
      </div>
      
      {originalText && (
        <div className="mt-4 pt-3 border-t border-primary/20">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-2">Original</p>
          <p className="text-sm text-muted-foreground line-through opacity-60">{originalText}</p>
        </div>
      )}
    </motion.div>
  );
}
