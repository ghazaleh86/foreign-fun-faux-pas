
import { Phrase } from "@/types/quiz";
import { Option } from "@/components/MultipleChoiceOptions";

export const STAGE_SIZE = 10;
export const ROUND_SIZE = 5;

export const ELEVENLABS_VOICES = [
  { name: "Aria", id: "9BWtsMINqrJLrRacOk9x" },
  { name: "Roger", id: "CwhRBWXzGAHq8TQ4Fs17" },
  { name: "Sarah", id: "EXAVITQu4vr4xnSDxMaL" },
  { name: "Laura", id: "FGY2WhTYpPnrIDTdsKH5" },
  { name: "Charlie", id: "IKne3meq5aSn9XLyUdCD" },
  { name: "George", id: "JBFqnCBsd6RMkjVDRZzb" },
  { name: "Callum", id: "N2lVS1w4EtoT3dr4eOWO" },
  { name: "Liam", id: "TX3LPaxmHKxFdv7VOQHJ" }
];

export const getShuffledOptions = (phrase: Phrase): Option[] => {
  const options: Option[] = [
    { label: phrase.correct_meaning, isCorrect: true },
    { label: phrase.incorrect1, isCorrect: false },
    { label: phrase.incorrect2, isCorrect: false },
  ];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }
  return options;
};

export function computeSpeedBonus(timeTaken: number): number {
  if (timeTaken <= 4) return 3;
  if (timeTaken <= 8) return 2;
  return 1;
}

export function getSpeedBonusXP(timeTaken: number) {
  if (timeTaken <= 4) return 5;
  if (timeTaken <= 8) return 2;
  return 0;
}

export const getCurrentVoice = (idx: number) => ELEVENLABS_VOICES[idx % ELEVENLABS_VOICES.length].id;

export function randomWrongTaunt(name: string) {
  const taunts = [
    `Well, that happened 📝`,
    `Interesting choice. ${name} disagrees 🤔`,
    `Not quite, but points for creativity 📊`,
    `Close enough for government work... but not for this quiz 📋`,
    `That's one way to look at it 🤷`,
    `${name} is quietly judging your answer 👀`,
    `Technically speaking, that's not it 📐`,
    `Your confidence was impressive though 📈`,
    `Bold strategy. Didn't work, but bold 🎯`,
    `${name} raises an eyebrow at that choice 🤨`,
    `Results may vary. In this case, they did 📉`,
    `Not the answer we were looking for, but we appreciate the effort 🎪`,
  ];
  return taunts[Math.floor(Math.random() * taunts.length)];
}
