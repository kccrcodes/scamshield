export type {
  AnalysisInputType,
  AnalysisRequest,
  AnalysisResult,
  Analyzer,
  RiskLevel,
  ScamSignal,
} from "@/agents/core/types";

export interface SavedCase {
  id: string;
  createdAt: string;
  request: import("@/agents/core/types").AnalysisRequest;
  result: import("@/agents/core/types").AnalysisResult;
}
