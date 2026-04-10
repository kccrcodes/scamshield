import { NextResponse } from "next/server";

import { analyzeScamContent } from "@/features/analysis/services/analysis.service";
import { analysisRequestSchema } from "@/features/analysis/schemas/analysis";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analysisRequestSchema.parse(body);
    const result = await analyzeScamContent(parsed);
    return NextResponse.json(result);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "ScamShield could not analyze this input.";

    return NextResponse.json({ error: message }, { status: 400 });
  }
}
