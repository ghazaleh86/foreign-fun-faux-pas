export type LootRarity = "common" | "rare" | "epic";

export type LootItemId =
  | "wood"
  | "stone"
  | "iron"
  | "gold"
  | "diamond"
  | "emerald"
  | "apple"
  | "cake"
  | "tnt";

export type LootItem = {
  id: LootItemId;
  name: string;
  emoji: string;
  rarity: LootRarity;
};

export type HotbarSlot = { id: LootItemId; count: number } | null;

export type RewardsState = {
  studs: number;
  hotbar: HotbarSlot[]; // 9-slot hotbar
  activeSlot: number; // 0..8
};

const STORAGE_KEY = "gameRewards_v1";
const HOTBAR_SIZE = 9;

const LOOT: Record<LootItemId, LootItem> = {
  wood: { id: "wood", name: "Wood", emoji: "🪵", rarity: "common" },
  stone: { id: "stone", name: "Stone", emoji: "🪨", rarity: "common" },
  iron: { id: "iron", name: "Iron", emoji: "⛓️", rarity: "rare" },
  gold: { id: "gold", name: "Gold", emoji: "🪙", rarity: "rare" },
  diamond: { id: "diamond", name: "Diamond", emoji: "💎", rarity: "epic" },
  emerald: { id: "emerald", name: "Emerald", emoji: "💚", rarity: "epic" },
  apple: { id: "apple", name: "Apple", emoji: "🍎", rarity: "common" },
  cake: { id: "cake", name: "Cake", emoji: "🍰", rarity: "rare" },
  tnt: { id: "tnt", name: "TNT", emoji: "🧨", rarity: "rare" },
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function defaultState(): RewardsState {
  return {
    studs: 0,
    hotbar: Array.from({ length: HOTBAR_SIZE }, () => null),
    activeSlot: 0,
  };
}

function notifyUpdated() {
  window.dispatchEvent(new Event("game-rewards-updated"));
}

export function getLootItem(id: LootItemId): LootItem {
  return LOOT[id];
}

export function getRewardsState(): RewardsState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultState();
    const parsed = JSON.parse(stored) as Partial<RewardsState>;
    const next: RewardsState = {
      studs: typeof parsed.studs === "number" ? parsed.studs : 0,
      hotbar: Array.isArray(parsed.hotbar) ? (parsed.hotbar as HotbarSlot[]) : defaultState().hotbar,
      activeSlot: typeof parsed.activeSlot === "number" ? parsed.activeSlot : 0,
    };
    // Normalize hotbar length
    if (next.hotbar.length !== HOTBAR_SIZE) {
      const normalized = defaultState().hotbar;
      for (let i = 0; i < Math.min(next.hotbar.length, HOTBAR_SIZE); i++) normalized[i] = next.hotbar[i] ?? null;
      next.hotbar = normalized;
    }
    next.activeSlot = clamp(next.activeSlot, 0, HOTBAR_SIZE - 1);
    return next;
  } catch {
    return defaultState();
  }
}

export function setRewardsState(state: RewardsState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  notifyUpdated();
}

export function addStuds(amount: number) {
  const prev = getRewardsState();
  const next: RewardsState = { ...prev, studs: Math.max(0, prev.studs + amount) };
  setRewardsState(next);
  return next;
}

export function setActiveHotbarSlot(slotIndex: number) {
  const prev = getRewardsState();
  const next: RewardsState = { ...prev, activeSlot: clamp(slotIndex, 0, HOTBAR_SIZE - 1) };
  setRewardsState(next);
  return next;
}

export function addLootToHotbar(itemId: LootItemId, count = 1) {
  const prev = getRewardsState();
  const hotbar = [...prev.hotbar];

  // First: try to stack
  const existingIdx = hotbar.findIndex((s) => s?.id === itemId);
  if (existingIdx >= 0) {
    hotbar[existingIdx] = { id: itemId, count: (hotbar[existingIdx]?.count ?? 0) + count };
  } else {
    // Then: first empty slot
    const emptyIdx = hotbar.findIndex((s) => !s);
    if (emptyIdx >= 0) {
      hotbar[emptyIdx] = { id: itemId, count };
    } else {
      // Otherwise: replace active slot (feels “gamey”)
      hotbar[prev.activeSlot] = { id: itemId, count };
    }
  }

  const next: RewardsState = { ...prev, hotbar };
  setRewardsState(next);
  return next;
}

type LootRollSource = "correct" | "stage" | "quest";

function rollByRarity(source: LootRollSource): LootItemId {
  // Minecraft-ish: commons frequent, epics rare, stage/quest a bit better.
  const r = Math.random();
  const epicBias = source === "stage" ? 0.06 : source === "quest" ? 0.09 : 0.03;
  const rareBias = source === "stage" ? 0.22 : source === "quest" ? 0.28 : 0.14;

  if (r < epicBias) return Math.random() < 0.5 ? "diamond" : "emerald";
  if (r < epicBias + rareBias) {
    const rares: LootItemId[] = ["iron", "gold", "cake", "tnt"];
    return rares[Math.floor(Math.random() * rares.length)];
  }
  const commons: LootItemId[] = ["wood", "stone", "apple"];
  return commons[Math.floor(Math.random() * commons.length)];
}

export function rollLootDrop(source: LootRollSource) {
  // Correct-answer drops shouldn’t spam.
  const chance = source === "correct" ? 0.42 : 1;
  if (Math.random() > chance) return null;
  return rollByRarity(source);
}

export function getLevelFromStars(totalStars: number) {
  // Simple, readable progression: every 10 stars = +1 level.
  const safe = Math.max(0, totalStars);
  const level = Math.floor(safe / 10) + 1;
  const progress = safe % 10;
  return {
    level,
    progress,
    needed: 10,
    ratio: progress / 10,
  };
}

