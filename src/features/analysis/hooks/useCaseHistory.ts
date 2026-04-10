"use client";

import { useEffect, useState } from "react";

import { loadSavedCases, saveCase } from "@/features/analysis/services/case-store.service";
import type { SavedCase } from "@/features/analysis/types";

export function useCaseHistory() {
  const [cases, setCases] = useState<SavedCase[]>([]);

  useEffect(() => {
    setCases(loadSavedCases());
  }, []);

  function addCase(nextCase: SavedCase) {
    setCases(saveCase(nextCase));
  }

  return {
    cases,
    addCase,
  };
}
