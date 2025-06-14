
type RandomPhraseResult = {
  pronunciation: string; // Pronunciation as an English TTS-style string
  language: string;
  correctAnswer: string;
  optionA: string;
  optionB: string;
  optionC: string;
  correctOption: "A" | "B" | "C";
};

const PHRASES: Array<{
  pronunciation: string;
  language: string;
  correctAnswer: string;
  false1: string;
  false2: string;
}> = [
  {
    pronunciation: "ka-i-zehn", // German
    language: "German",
    correctAnswer: "no worries",
    false1: "potato incident",
    false2: "royal cheese",
  },
  {
    pronunciation: "meh-ya cool pah-tah-tas", // Spanish phrase
    language: "Spanish",
    correctAnswer: "it's not a big deal",
    false1: "my potatoes are cool",
    false2: "secret potato handshake",
  },
  {
    pronunciation: "so-ra wa aoi des", // Japanese
    language: "Japanese",
    correctAnswer: "the sky is blue",
    false1: "I ate my homework",
    false2: "a blue elephant is singing",
  },
  {
    pronunciation: "peer deh moulu chou", // French idiom
    language: "French",
    correctAnswer: "a terrible mess",
    false1: "that dance move",
    false2: "mashed turnip soup",
  },
  {
    pronunciation: "fi-ka pa lagom", // Swedish fika phrase
    language: "Swedish",
    correctAnswer: "take a coffee break (just right amount)",
    false1: "don’t jump the sheep",
    false2: "extreme fitness pushup",
  }
];

function getRandomPhrase(): RandomPhraseResult {
  const idx = Math.floor(Math.random() * PHRASES.length);
  const { pronunciation, language, correctAnswer, false1, false2 } = PHRASES[idx];

  // Shuffle answers and decide which is the correct one (A, B, or C)
  const options = [
    { label: correctAnswer, isCorrect: true },
    { label: false1, isCorrect: false },
    { label: false2, isCorrect: false },
  ];

  // Shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  // Map options to letters
  const [optionA, optionB, optionC] = [options[0].label, options[1].label, options[2].label];
  let correctOption: "A" | "B" | "C" = "A";
  if (options[1].isCorrect) correctOption = "B";
  if (options[2].isCorrect) correctOption = "C";

  return {
    pronunciation,
    language,
    correctAnswer,
    optionA,
    optionB,
    optionC,
    correctOption
  };
}

export { getRandomPhrase };
