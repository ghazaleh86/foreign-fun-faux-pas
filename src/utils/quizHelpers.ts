
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
    `Keep exploring! You're on the right track! 💪`,
    `${name} knows that one, but you're learning fast! 😊`,
    `So close! The next one is yours! 🎯`,
    `Nice try! Every guess teaches you something new! 🌟`,
    `You're getting warmer! Keep going! ✨`,
    `${name} got that one, but you're building great skills! 🚀`,
    `Great effort! You're doing amazing! 💫`,
  ];
  return taunts[Math.floor(Math.random() * taunts.length)];
}
