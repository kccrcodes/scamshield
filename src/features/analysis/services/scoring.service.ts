import type { RiskLevel, ScamSignal } from "@/agents/core/types";

const severityScore: Record<ScamSignal["severity"], number> = {
  low: 12,
  medium: 25,
  high: 40,
};

const severePatterns = [
  /urgent/i,
  /bank/i,
  /impost/i,
  /verify/i,
  /down payment/i,
  /wire/i,
  /qr/i,
];

export function computeRisk(signals: ScamSignal[]) {
  const signalCountBonus = Math.min(signals.length * 4, 16);
  const weightedScore = signals.reduce((sum, signal) => {
    const patternBonus = severePatterns.some((pattern) =>
      pattern.test(`${signal.label} ${signal.evidence}`),
    )
      ? 6
      : 0;

    return sum + severityScore[signal.severity] + patternBonus;
  }, 0);

  const riskScore = Math.min(100, weightedScore + signalCountBonus);
  const highSignals = signals.filter((signal) => signal.severity === "high").length;
  const mediumSignals = signals.filter((signal) => signal.severity === "medium").length;

  let riskLevel: RiskLevel = "low";

  if (riskScore >= 72 || highSignals >= 2) {
    riskLevel = "high";
  } else if (riskScore >= 36 || highSignals >= 1 || mediumSignals >= 2) {
    riskLevel = "medium";
  }

  return {
    riskLevel,
    riskScore,
  };
}
