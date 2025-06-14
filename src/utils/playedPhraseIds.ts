
const LOCAL_STORAGE_KEY = "playedPhraseIds_v2";

export function getPlayedPhraseIds(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function setPlayedPhraseIds(ids: string[]) {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(ids));
}
