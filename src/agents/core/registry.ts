import { fraudRadarAnalyzer } from "@/agents/fraud-radar";
import { linkGuardianAnalyzer } from "@/agents/link-guardian";
import { reportSynthAnalyzer } from "@/agents/report-synth";
import { shopScanAnalyzer } from "@/agents/shop-scan";
import { voiceShieldAnalyzer } from "@/agents/voice-shield";

export const analyzerRegistry = [
  linkGuardianAnalyzer,
  voiceShieldAnalyzer,
  shopScanAnalyzer,
  fraudRadarAnalyzer,
  reportSynthAnalyzer,
];

const foundActiveAnalyzer = analyzerRegistry.find((analyzer) => analyzer.enabled);

if (!foundActiveAnalyzer) {
  throw new Error("No active analyzer has been configured.");
}

export const activeAnalyzer = foundActiveAnalyzer;
