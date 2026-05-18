import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

import type { AnalysisInputType } from "@/agents/core/types";
import { getAnalyzerForInput } from "@/agents/core/registry";

export const runtime = "nodejs";

const rateMap = new Map<string, { count: number; windowStart: number }>();

const publicCheckSchema = z.object({
  input_type: z.enum([
    "url",
    "payment_text",
    "seller_text",
    "listing_text",
    "voice_transcript",
    "shop_profile",
  ]),
  content: z.string().trim().min(8).max(6000),
  locale: z.enum(["en-US", "vi-VN"]).optional().default("en-US"),
});

export async function POST(request: Request) {
  try {
    const rateLimitResponse = checkRateLimit(request);

    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    const body = await request.json();
    const parsed = publicCheckSchema.parse(body);
    const inputType = parsed.input_type as AnalysisInputType;
    const analyzer = getAnalyzerForInput(inputType);
    const result = await analyzer.analyze({
      inputType,
      rawInput: parsed.content,
      locale: parsed.locale,
    });

    return NextResponse.json({
      risk_level: result.riskLevel,
      risk_score: result.riskScore,
      signals: result.signals.map((signal) => ({
        label: signal.label,
        severity: signal.severity,
        evidence: signal.evidence,
      })),
      recommended_action: result.recommendedAction,
      short_report: result.shortReport,
      analyzed_by: analyzer.name,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ error: "Analysis failed." }, { status: 500 });
  }
}

function checkRateLimit(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const entry = rateMap.get(ip) ?? { count: 0, windowStart: now };

  if (now - entry.windowStart > 60_000) {
    entry.count = 0;
    entry.windowStart = now;
  }

  if (entry.count >= 20) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Max 20 requests per minute." },
      { status: 429 },
    );
  }

  entry.count += 1;
  rateMap.set(ip, entry);
  return null;
}
