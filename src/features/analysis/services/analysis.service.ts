import type { AnalysisRequest, AnalysisResult } from "@/agents/core/types";
import { getAnalyzerForInput } from "@/agents/core/registry";

export async function analyzeScamContent(
  input: AnalysisRequest,
): Promise<AnalysisResult> {
  const analyzer = getAnalyzerForInput(input.inputType);
  return analyzer.analyze(input);
}
