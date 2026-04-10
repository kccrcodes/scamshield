import { z } from "zod";

export const analysisInputTypeSchema = z.enum([
  "url",
  "payment_text",
  "seller_text",
  "listing_text",
]);

export const analysisRequestSchema = z.object({
  inputType: analysisInputTypeSchema,
  rawInput: z.string().trim().min(8).max(6000),
  locale: z.enum(["vi-VN", "en-US"]),
});

export const scamSignalSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  severity: z.enum(["low", "medium", "high"]),
  evidence: z.string().min(1),
});

export const aiAnalysisResponseSchema = z.object({
  signals: z.array(scamSignalSchema).min(1).max(8),
  reasons: z.array(z.string().min(1)).min(1).max(5),
  recommendedAction: z.string().min(1).max(300),
  shortReport: z.string().min(1).max(500),
});

export const analysisResultSchema = z.object({
  riskScore: z.number().int().min(0).max(100),
  riskLevel: z.enum(["low", "medium", "high"]),
  signals: z.array(scamSignalSchema),
  reasons: z.array(z.string().min(1)),
  recommendedAction: z.string().min(1),
  shortReport: z.string().min(1),
});

export const savedCaseSchema = z.object({
  id: z.string().min(1),
  createdAt: z.string().min(1),
  request: analysisRequestSchema,
  result: analysisResultSchema,
});

export const savedCasesSchema = z.array(savedCaseSchema);

export type AnalysisRequestInput = z.infer<typeof analysisRequestSchema>;
export type AnalysisResultInput = z.infer<typeof analysisResultSchema>;
