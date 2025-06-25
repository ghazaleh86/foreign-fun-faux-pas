
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Volume2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { getLearnedPhrases, LearnedPhraseLocal } from "@/utils/learnedPhrases";
import { languageToFlag } from "@/utils/languageToFlag";

const LearnedPhrases = () => {
  const [learnedPhrases, setLearnedPhrases] = useState<LearnedPhraseLocal[]>([]);
  const [filteredPhrases, setFilteredPhrases] = useState<LearnedPhraseLocal[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
    let filtered = learnedPhrases;
    
    // Filter by language
    if (selectedLanguage !== "all") {
      filtered = filtered.filter(lp => lp.phrase.language === selectedLanguage);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(lp => 
        lp.phrase.phrase_text.toLowerCase().includes(query) ||
        lp.phrase.correct_meaning.toLowerCase().includes(query) ||
        (lp.phrase.pronunciation && lp.phrase.pronunciation.toLowerCase().includes(query))
      );
    }
    
    setFilteredPhrases(filtered);
  }, [selectedLanguage, searchQuery, learnedPhrases]);

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
        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Learned Phrases</h1>
          <p className="text-gray-600">Review and practice the phrases you've mastered</p>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search phrases or meanings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-4 items-center flex-wrap">
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
            
            <span className="text-sm text-gray-500">
              {filteredPhrases.length} of {learnedPhrases.length} phrases
            </span>
          </div>
        </div>

        {/* Phrases Grid */}
        {filteredPhrases.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              {learnedPhrases.length === 0 ? (
                <>
                  <div className="text-6xl mb-4">🎯</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No phrases learned yet</h3>
                  <p className="text-gray-500 mb-6">Start playing to build your collection!</p>
                  <Link to="/">
                    <Button variant="default" className="bg-pink-500 hover:bg-pink-600">
                      Start Learning
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No matches found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                </>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredPhrases.map((learnedPhrase) => (
              <Card key={learnedPhrase.phraseId} className="hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" title={learnedPhrase.phrase.language}>
                        {languageToFlag(learnedPhrase.phrase.language)}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {learnedPhrase.phrase.language}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handlePlayAudio(learnedPhrase.phrase)}
                      className="h-8 w-8 p-0 hover:bg-gray-100"
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-3">
                    <p className="font-semibold text-lg mb-1 text-gray-800">
                      {learnedPhrase.phrase.pronunciation || learnedPhrase.phrase.phrase_text}
                    </p>
                    {learnedPhrase.phrase.pronunciation && (
                      <p className="text-sm text-gray-500">
                        {learnedPhrase.phrase.phrase_text}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-green-700 bg-green-50 px-2 py-1 rounded">
                      {learnedPhrase.phrase.correct_meaning}
                    </p>
                  </div>
                  {learnedPhrase.phrase.notes && (
                    <div className="mb-3">
                      <p className="text-xs text-gray-600 bg-yellow-50 p-2 rounded border-l-2 border-yellow-200">
                        {learnedPhrase.phrase.notes}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-gray-400">
                    Learned {new Date(learnedPhrase.learnedAt).toLocaleDateString()}
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
