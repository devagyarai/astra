import * as React from "react";
import { Decision } from "@/types/decision";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, FileText, ShieldAlert, GitMerge, Database, PenLine, Pencil } from "lucide-react";

interface ReviewPanelProps {
  decision: Decision;
  onEditStep: (step: number) => void;
}

export function ReviewPanel({ decision, onEditStep }: ReviewPanelProps) {
  return (
    <div className="grid gap-6">
      <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Target className="h-4 w-4 text-primary" /> Goal
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onEditStep(1)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-body">{decision.goal || "No goal provided."}</p>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <FileText className="h-4 w-4 text-muted-foreground" /> Context
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onEditStep(2)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-body">{decision.context || "No context provided."}</p>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <ShieldAlert className="h-4 w-4 text-muted-foreground" /> Constraints
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onEditStep(3)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-body">{decision.constraints || "No constraints provided."}</p>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <GitMerge className="h-4 w-4 text-muted-foreground" /> Options
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onEditStep(4)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <ul className="list-disc pl-5 text-sm text-body space-y-1">
            {decision.options.map((opt, i) => (
              <li key={i}>{opt}</li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <Database className="h-4 w-4 text-muted-foreground" /> Evidence
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => onEditStep(5)}>
            <Pencil className="h-3 w-3 mr-1" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <ul className="list-disc pl-5 text-sm text-body space-y-1">
            {decision.evidence.length > 0 ? decision.evidence.map((ev, i) => (
              <li key={i}>{ev}</li>
            )) : <li>No evidence provided.</li>}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-card/40 border-border/50 shadow-sm backdrop-blur-sm">
        <CardHeader className="p-5 pb-3 flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base font-medium">
            <PenLine className="h-4 w-4 text-muted-foreground" /> Notes
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 pt-0">
          <p className="text-sm text-body">{decision.notes || "No notes provided."}</p>
        </CardContent>
      </Card>
    </div>
  );
}
