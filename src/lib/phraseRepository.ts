import type { Phrase } from "@/types/quiz";
import { PHRASES } from "@/data/phrases";

export type LanguageInfo = { language: string; count: number };

function normalizeLang(lang: string) {
  return (lang || "").toLowerCase().trim();
}

export async function fetchPhrases(selectedLanguage: string | null): Promise<Phrase[]> {
  // Local-only repository (no Supabase). Keep behavior consistent with old code.
  const normalized = selectedLanguage ? normalizeLang(selectedLanguage) : null;
  const lang = normalized && normalized !== "all languages" && normalized !== "all" && normalized !== "null" ? normalized : null;
  const list = PHRASES
    .filter((p) => !lang || normalizeLang(p.language) === lang)
    .slice()
    .sort((a, b) => (a.difficulty ?? 1) - (b.difficulty ?? 1));

  return list;
}

export async function fetchLanguageCounts(): Promise<LanguageInfo[]> {
  const counts = new Map<string, number>();
  for (const p of PHRASES) {
    const k = normalizeLang(p.language);
    counts.set(k, (counts.get(k) ?? 0) + 1);
  }

  const out: LanguageInfo[] = Array.from(counts.entries())
    .map(([language, count]) => ({ language, count }))
    .sort((a, b) => (b.count !== a.count ? b.count - a.count : a.language.localeCompare(b.language)));

  return out;
}

