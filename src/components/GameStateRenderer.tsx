
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import StageSummary from "./StageSummary";
import GameSummary from "./GameSummary";
import QuizCard from "./QuizCard";
import { State, Phrase } from "@/types/quiz";
import { Option } from "./MultipleChoiceOptions";

type GameStateRendererProps = {
  state: State;
  phrases: Phrase[];
  stageCompleted: boolean;
  showStagePreview: boolean;
  current: number;
  stage: number;
  stageScores: number[];
  opponentScores: number[];
  opponentName: string;
  opponentEmoji: string;
  onAdvanceStage: () => void;
  onStartStage: () => void;
  profile: any;
  score: number;
  totalStages: number;
  onPlayAgain: () => void;
  phrase: Phrase;
  timer: number;
  stageSize: number;
  maxStageScore: number;
  optionOrder: Option[];
  selected: number | null;
  showAnswer: boolean;
  feedback: string | null;
  showNextButton: boolean;
  onSelect: (idx: number) => void;
  onNext: () => void;
  onPlayAudio: () => void;
  currentStageStart: number;
};

const GameStateRenderer: React.FC<GameStateRendererProps> = ({
  state,
  phrases,
  stageCompleted,
  showStagePreview,
  current,
  stage,
  stageScores,
  opponentScores,
  opponentName,
  opponentEmoji,
  onAdvanceStage,
  onStartStage,
  profile,
  score,
  totalStages,
  onPlayAgain,
  phrase,
  timer,
  stageSize,
  maxStageScore,
  optionOrder,
  selected,
  showAnswer,
  feedback,
  showNextButton,
  onSelect,
  onNext,
  onPlayAudio,
  currentStageStart,
}) => {
  const percent = phrases.length > 0 ? Math.round((score / phrases.length) * 100) : 0;

  // Loading State
  if (state === "loading") {
    return (
      <div className="flex flex-col items-center w-full">
        <div className="animate-pulse h-8 w-40 bg-muted rounded mb-6" />
        <div className="animate-pulse h-16 w-80 bg-muted rounded" />
      </div>
    );
  }

  // All phrases played state
  if (state === "quiz" && phrases.length === 0) {
    return (
      <Card className="max-w-xl w-full">
        <CardContent className="p-6">
          <div className="text-center my-10 text-pink-700 font-bold">
            <p className="mb-2">
              You have played all available phrases!
              <br />
              The rotation system will automatically reset and show you phrases again.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Stage Summary
  if (stageCompleted && state === "quiz") {
    return (
      <StageSummary
        stage={stage}
        stageScore={stageScores[stage] || 0}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        opponentScore={opponentScores[stage] || 0}
        onAdvanceStage={onAdvanceStage}
        profile={profile}
        stageScores={stageScores}
        opponentScores={opponentScores}
      />
    );
  }

  // Game summary on finish
  if (state === "finished") {
    return (
      <GameSummary
        score={score}
        total={phrases.length}
        percent={percent}
        totalStages={totalStages}
        stageScores={stageScores}
        opponentScores={opponentScores}
        opponentName={opponentName}
        opponentEmoji={opponentEmoji}
        onPlayAgain={onPlayAgain}
      />
    );
  }

  // Skip stage preview entirely - go straight to quiz

  // Main quiz UI per stage
  if (state === "quiz" && !stageCompleted && phrases.length > 0 && current < phrases.length) {
    return (
      <QuizCard
        phrase={phrase}
        stage={stage}
        totalStages={totalStages}
        current={current}
        stageSize={stageSize}
        phrasesLength={phrases.length}
        currentStageStart={currentStageStart}
        opponentEmoji={opponentEmoji}
        timer={timer}
        stageScore={stageScores[stage] || 0}
        maxStageScore={maxStageScore}
        optionOrder={optionOrder}
        selected={selected}
        showAnswer={showAnswer}
        feedback={feedback}
        showNextButton={showNextButton}
        onSelect={onSelect}
        onNext={onNext}
        onPlayAudio={onPlayAudio}
      />
    );
  }

  return null;
};

export default GameStateRenderer;
