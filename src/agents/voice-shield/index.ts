import type { AnalysisRequest, AnalysisResult, Analyzer } from "@/agents/core/types";

async function notReady(_: AnalysisRequest): Promise<AnalysisResult> {
  throw new Error("VoiceShield is not enabled in the MVP.");
}

export const voiceShieldAnalyzer: Analyzer = {
  id: "voice-shield",
  name: "VoiceShield",
  description: "Flags scam-call patterns in audio transcripts and recordings.",
  supportedInputs: [],
  enabled: false,
  monetizationAngle: "Premium phone assistant and telco partnership workflow.",
  analyze: notReady,
};
