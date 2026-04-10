import type { AnalysisRequest, AnalysisResult, Analyzer } from "@/agents/core/types";

async function notReady(_: AnalysisRequest): Promise<AnalysisResult> {
  throw new Error("ReportSynth is not enabled in the MVP.");
}

export const reportSynthAnalyzer: Analyzer = {
  id: "report-synth",
  name: "ReportSynth",
  description: "Turns findings into shareable user reports and escalation summaries.",
  supportedInputs: [],
  enabled: false,
  monetizationAngle: "Export-grade reports for consumers, support teams, and regulators.",
  analyze: notReady,
};
