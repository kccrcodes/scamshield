"use client";

import type { AnalysisInputType, AnalysisRequest } from "@/agents/core/types";
import type { ExampleInput } from "@/features/analysis/services/example-inputs";

const inputTypeLabels: Record<AnalysisInputType, string> = {
  url: "URL",
  payment_text: "Payment text",
  seller_text: "Seller text",
  listing_text: "Listing text",
};

interface AnalyzeFormProps {
  inputType: AnalysisInputType;
  rawInput: string;
  locale: "vi-VN" | "en-US";
  isLoading: boolean;
  onInputTypeChange: (value: AnalysisInputType) => void;
  onRawInputChange: (value: string) => void;
  onLocaleChange: (value: "vi-VN" | "en-US") => void;
  onSubmit: (value: AnalysisRequest) => void;
  examples: ExampleInput[];
  onLoadExample: (example: ExampleInput) => void;
}

export function AnalyzeForm({
  inputType,
  rawInput,
  locale,
  isLoading,
  onInputTypeChange,
  onRawInputChange,
  onLocaleChange,
  onSubmit,
  examples,
  onLoadExample,
}: AnalyzeFormProps) {
  const isUrl = inputType === "url";

  return (
    <section className="panel panel-strong">
      <div className="section-heading">
        <p className="eyebrow">Live MVP</p>
        <h2>Check a suspicious link or payment request before you pay.</h2>
        <p>
          The MVP runs one real agent today: LinkGuardian. Seller text, listings, and
          payment instructions all flow through the same analysis engine.
        </p>
      </div>

      <div className="chip-row" role="tablist" aria-label="Input type">
        {(Object.keys(inputTypeLabels) as AnalysisInputType[]).map((value) => (
          <button
            key={value}
            type="button"
            className={`chip ${value === inputType ? "chip-active" : ""}`}
            onClick={() => onInputTypeChange(value)}
          >
            {inputTypeLabels[value]}
          </button>
        ))}
      </div>

      <div className="locale-row">
        <label htmlFor="locale">Analysis language</label>
        <select
          id="locale"
          value={locale}
          onChange={(event) => onLocaleChange(event.target.value as "vi-VN" | "en-US")}
        >
          <option value="en-US">English</option>
          <option value="vi-VN">Vietnamese</option>
        </select>
      </div>

      <form
        className="analyze-form"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit({ inputType, rawInput, locale });
        }}
      >
        <label className="field-label" htmlFor="rawInput">
          {isUrl ? "Paste the suspicious URL" : `Paste the ${inputTypeLabels[inputType].toLowerCase()}`}
        </label>
        <textarea
          id="rawInput"
          value={rawInput}
          onChange={(event) => onRawInputChange(event.target.value)}
          placeholder={
            isUrl
              ? "https://example-login-secure-check.com"
              : "Paste seller text, listing details, or payment-page instructions here."
          }
          rows={isUrl ? 4 : 10}
        />

        <button className="primary-button" type="submit" disabled={isLoading || rawInput.trim().length < 8}>
          {isLoading ? "Analyzing..." : "Analyze risk"}
        </button>
      </form>

      <div className="examples-grid">
        {examples.map((example) => (
          <button
            key={example.id}
            type="button"
            className="example-card"
            onClick={() => onLoadExample(example)}
          >
            <span>{example.title}</span>
            <small>{example.note}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
