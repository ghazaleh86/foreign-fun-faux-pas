
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { getLearnedPhrases, LearnedPhraseLocal } from "@/utils/learnedPhrases";
import { languageToFlag } from "@/utils/languageToFlag";

const LearnedPhrases = () => {
  const [learnedPhrases, setLearnedPhrases] = useState<LearnedPhraseLocal[]>([]);
  const [filteredPhrases, setFilteredPhrases] = useState<LearnedPhraseLocal[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [languages, setLanguages] = useState<string[]>([]);

  useEffect(() => {
    const learned = getLearnedPhrases();
    setLearnedPhrases(learned);
    
    // Extract unique languages
    const uniqueLanguages = Array.from(
      new Set(learned.map(lp => lp.phrase.language))
    ).sort();
    setLanguages(uniqueLanguages);
  }, []);

  useEffect(() => {
    if (selectedLanguage === "all") {
      setFilteredPhrases(learnedPhrases);
    } else {
      setFilteredPhrases(learnedPhrases.filter(lp => lp.phrase.language === selectedLanguage));
    }
  }, [selectedLanguage, learnedPhrases]);

  const handlePlayAudio = (phrase: LearnedPhraseLocal["phrase"]) => {
    const ttsText = phrase.pronunciation || phrase.phrase_text;
    import("@/lib/elevenlabsTtsClient").then(({ playWithElevenLabsTTS }) =>
      playWithElevenLabsTTS({ text: ttsText, voiceId: "9BWtsMINqrJLrRacOk9x" }).catch(() => {
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
          const u = new window.SpeechSynthesisUtterance(ttsText);
          u.lang = phrase.language || "en";
          u.rate = 0.98;
          window.speechSynthesis.speak(u);
        }
      })
    );
  };

  return (
    <div className="px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">My Learned Phrases</h1>
          <p className="text-muted-foreground">Review and practice the phrases you've mastered</p>
        </div>

        <div className="mb-6 flex gap-4 items-center">
          <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {languages.map(language => (
                <SelectItem key={language} value={language}>
                  <span className="flex items-center gap-2">
                    <span>{languageToFlag(language)}</span>
                    {language}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-sm text-muted-foreground">
            Showing {filteredPhrases.length} of {learnedPhrases.length} phrases
          </span>
        </div>

        {filteredPhrases.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground mb-4">
                {selectedLanguage === "all" 
                  ? "You haven't learned any phrases yet. Start playing to build your collection!"
                  : `No phrases learned in ${selectedLanguage} yet.`
                }
              </p>
              <Link to="/">
                <Button>Start Learning</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPhrases.map((learnedPhrase) => (
              <Card key={learnedPhrase.phraseId} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" title={learnedPhrase.phrase.language}>
                        {languageToFlag(learnedPhrase.phrase.language)}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {learnedPhrase.phrase.language}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlayAudio(learnedPhrase.phrase)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-3">
                    <p className="font-semibold text-lg mb-1">
                      {learnedPhrase.phrase.pronunciation || learnedPhrase.phrase.phrase_text}
                    </p>
                    {learnedPhrase.phrase.pronunciation && (
                      <p className="text-sm text-muted-foreground">
                        {learnedPhrase.phrase.phrase_text}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-green-700">
                      Meaning: {learnedPhrase.phrase.correct_meaning}
                    </p>
                  </div>
                  {learnedPhrase.phrase.notes && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground bg-yellow-50 p-2 rounded">
                        {learnedPhrase.phrase.notes}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Learned: {new Date(learnedPhrase.learnedAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LearnedPhrases;
