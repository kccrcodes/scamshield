import type { AnalysisRequest, AnalysisResult } from "@/agents/core/types";
import { activeAnalyzer } from "@/agents/core/registry";

export async function analyzeScamContent(
  input: AnalysisRequest,
): Promise<AnalysisResult> {
  return activeAnalyzer.analyze(input);
}
