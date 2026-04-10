"use client";

import type { AnalysisResult } from "@/agents/core/types";
import type { SavedCase } from "@/features/analysis/types";

interface AnalysisResultPanelProps {
  result: AnalysisResult | null;
  error: string | null;
  canSave: boolean;
  onSave: () => void;
  lastSavedCaseId: SavedCase["id"] | null;
}

export function AnalysisResultPanel({
  result,
  error,
  canSave,
  onSave,
  lastSavedCaseId,
}: AnalysisResultPanelProps) {
  if (error) {
    return (
      <section className="panel result-panel">
        <div className="section-heading">
          <p className="eyebrow">Analysis error</p>
          <h2>ScamShield could not complete this check.</h2>
        </div>
        <p>{error}</p>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="panel result-panel placeholder-panel">
        <p className="eyebrow">Result</p>
        <h2>Risk assessment appears here.</h2>
        <p>
          Submit a suspicious URL, seller message, listing, or payment text to get a
          structured scam analysis from LinkGuardian.
        </p>
      </section>
    );
  }

  return (
    <section className="panel result-panel">
      <div className="score-shell">
        <div>
          <p className="eyebrow">Risk score</p>
          <h2>{result.riskScore}/100</h2>
        </div>
        <span className={`risk-badge risk-${result.riskLevel}`}>{result.riskLevel}</span>
      </div>

      <div className="result-block">
        <h3>Short report</h3>
        <p>{result.shortReport}</p>
      </div>

      <div className="result-block">
        <h3>Extracted scam signals</h3>
        <div className="signal-list">
          {result.signals.map((signal) => (
            <article className="signal-card" key={signal.id}>
              <div className="signal-header">
                <strong>{signal.label}</strong>
                <span className={`severity severity-${signal.severity}`}>{signal.severity}</span>
              </div>
              <p>{signal.evidence}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="two-column">
        <div className="result-block">
          <h3>Why this scored this way</h3>
          <ul>
            {result.reasons.map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </div>
        <div className="result-block">
          <h3>Recommended action</h3>
          <p>{result.recommendedAction}</p>
        </div>
      </div>

      <button className="secondary-button" type="button" onClick={onSave} disabled={!canSave}>
        {lastSavedCaseId ? "Saved to case history" : "Save case"}
      </button>
    </section>
  );
}
