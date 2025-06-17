
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { Phrase } from "@/types/quiz";
import { languageToFlag } from "@/utils/languageToFlag";

type LearnedPhrase = {
  id: string;
  phrase_id: string;
  learned_at: string;
  phrases: Phrase;
};

const LearnedPhrases = () => {
  const user = useSupabaseUser();
  const [learnedPhrases, setLearnedPhrases] = useState<LearnedPhrase[]>([]);
  const [filteredPhrases, setFilteredPhrases] = useState<LearnedPhrase[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("all");
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchLearnedPhrases();
    }
  }, [user]);

  useEffect(() => {
    if (selectedLanguage === "all") {
      setFilteredPhrases(learnedPhrases);
    } else {
      setFilteredPhrases(learnedPhrases.filter(lp => lp.phrases.language === selectedLanguage));
    }
  }, [selectedLanguage, learnedPhrases]);

  const fetchLearnedPhrases = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from("learned_phrases")
      .select(`
        id,
        phrase_id,
        learned_at,
        phrases (
          id,
          phrase_text,
          language,
          pronunciation,
          correct_meaning,
          incorrect1,
          incorrect2,
          notes
        )
      `)
      .eq("user_id", user.id)
      .order("learned_at", { ascending: false });

    if (data && !error) {
      setLearnedPhrases(data as LearnedPhrase[]);
      
      // Extract unique languages
      const uniqueLanguages = Array.from(
        new Set(data.map(lp => lp.phrases.language))
      ).sort();
      setLanguages(uniqueLanguages);
    }
    setLoading(false);
  };

  const handlePlayAudio = (phrase: Phrase) => {
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-200/60 to-fuchsia-100/90 flex items-center justify-center px-4">
        <Card className="max-w-md w-full">
          <CardContent className="p-6 text-center">
            <p className="text-lg text-muted-foreground">Please log in to view your learned phrases.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-200/60 to-fuchsia-100/90 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Game
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-pink-600">My Learned Phrases</h1>
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

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-4">
                  <div className="h-4 bg-muted rounded mb-2" />
                  <div className="h-3 bg-muted rounded mb-4" />
                  <div className="h-8 bg-muted rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredPhrases.length === 0 ? (
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
              <Card key={learnedPhrase.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl" title={learnedPhrase.phrases.language}>
                        {languageToFlag(learnedPhrase.phrases.language)}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {learnedPhrase.phrases.language}
                      </span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlayAudio(learnedPhrase.phrases)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="mb-3">
                    <p className="font-semibold text-lg mb-1">
                      {learnedPhrase.phrases.pronunciation || learnedPhrase.phrases.phrase_text}
                    </p>
                    {learnedPhrase.phrases.pronunciation && (
                      <p className="text-sm text-muted-foreground">
                        {learnedPhrase.phrases.phrase_text}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <p className="text-sm font-medium text-green-700">
                      Meaning: {learnedPhrase.phrases.correct_meaning}
                    </p>
                  </div>
                  {learnedPhrase.phrases.notes && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground bg-yellow-50 p-2 rounded">
                        {learnedPhrase.phrases.notes}
                      </p>
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Learned: {new Date(learnedPhrase.learned_at).toLocaleDateString()}
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
