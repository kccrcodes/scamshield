import type { AnalysisRequest, AnalysisResult, Analyzer } from "@/agents/core/types";

async function notReady(_: AnalysisRequest): Promise<AnalysisResult> {
  throw new Error("ShopScan is not enabled in the MVP.");
}

export const shopScanAnalyzer: Analyzer = {
  id: "shop-scan",
  name: "ShopScan",
  description: "Checks seller pages and listings for counterfeit and trust-risk signals.",
  supportedInputs: [],
  enabled: false,
  monetizationAngle: "Marketplace trust layer and seller verification upsell.",
  analyze: notReady,
};
