import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { analyzeScamContent } from "@/features/analysis/services/analysis.service";
import { analysisRequestSchema } from "@/features/analysis/schemas/analysis";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = analysisRequestSchema.parse(body);
    const result = await analyzeScamContent(parsed);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Invalid analysis input. Please submit a longer URL or text sample." },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error ? error.message : "ScamShield could not analyze this input.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
