"use client";

import type { SavedCase } from "@/features/analysis/types";

interface CaseHistoryListProps {
  cases: SavedCase[];
}

export function CaseHistoryList({ cases }: CaseHistoryListProps) {
  if (cases.length === 0) {
    return (
      <section className="panel">
        <p className="eyebrow">Saved cases</p>
        <h2>No saved checks yet.</h2>
        <p>Run a live analysis from the home page, then save it here for your mentor demo.</p>
      </section>
    );
  }

  return (
    <section className="history-grid">
      {cases.map((entry) => (
        <article className="panel history-card" key={entry.id}>
          <div className="history-topline">
            <span>{entry.request.inputType.replace("_", " ")}</span>
            <span className={`risk-badge risk-${entry.result.riskLevel}`}>
              {entry.result.riskLevel}
            </span>
          </div>
          <h3>{entry.result.shortReport}</h3>
          <p>{new Date(entry.createdAt).toLocaleString()}</p>
          <ul>
            {entry.result.reasons.slice(0, 3).map((reason) => (
              <li key={reason}>{reason}</li>
            ))}
          </ul>
        </article>
      ))}
    </section>
  );
}
