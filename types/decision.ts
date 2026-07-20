export interface Decision {
  id: string;
  title: string;
  goal: string;
  context: string;
  constraints: string;
  options: string[];
  evidence: string[];
  analysis: string;
  recommendation: string;
  confidence: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
  isArchived?: boolean;
  analysisHistory?: Array<{
    type: string;
    timestamp: number;
    hash: string;
    data: unknown;
  }>;
}
