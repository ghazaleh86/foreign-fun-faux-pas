import type { Phrase } from "@/types/quiz";

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function buildDeck(phrases: Phrase[], desiredCount = 50) {
  const list = phrases.slice();
  if (list.length === 0) return { phraseIds: [] as string[] };

  const shuffled = shuffle(list);
  const ids: string[] = [];
  while (ids.length < desiredCount) {
    for (const p of shuffled) {
      ids.push(p.id);
      if (ids.length >= desiredCount) break;
    }
  }
  return { phraseIds: ids };
}

export function indexPhrases(phrases: Phrase[]) {
  const map: Record<string, Phrase> = {};
  for (const p of phrases) map[p.id] = p;
  return map;
}

