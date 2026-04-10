"use client";

import type { SavedCase } from "@/features/analysis/types";
import { savedCasesSchema } from "@/features/analysis/schemas/analysis";

const STORAGE_KEY = "scamshield.case-history.v1";

export function loadSavedCases(): SavedCase[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return [];
  }

  try {
    return savedCasesSchema.parse(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function saveCase(nextCase: SavedCase): SavedCase[] {
  const cases = [nextCase, ...loadSavedCases()].slice(0, 12);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cases));
  return cases;
}
