import type { AnalysisRequest, AnalysisResult, Analyzer } from "@/agents/core/types";

async function notReady(_: AnalysisRequest): Promise<AnalysisResult> {
  throw new Error("FraudRadar is not enabled in the MVP.");
}

export const fraudRadarAnalyzer: Analyzer = {
  id: "fraud-radar",
  name: "FraudRadar",
  description: "Correlates scam cases and repeated fraud patterns across reports.",
  supportedInputs: [],
  enabled: false,
  monetizationAngle: "Team dashboard and institutional intelligence subscriptions.",
  analyze: notReady,
};
