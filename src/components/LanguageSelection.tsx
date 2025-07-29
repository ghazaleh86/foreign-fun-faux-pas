import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { languageToFlag } from '@/utils/languageToFlag';
import { supabase } from '@/integrations/supabase/client';
import { Globe, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSelectionProps {
  onLanguageSelected: () => void;
}

interface LanguageInfo {
  language: string;
  count: number;
}

export function LanguageSelection({ onLanguageSelected }: LanguageSelectionProps) {
  const [languages, setLanguages] = useState<LanguageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { setSelectedLanguage } = useLanguage();

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const { data, error } = await supabase
          .from('phrases')
          .select('language')
          .order('language');

        if (error) {
          console.error('Error fetching languages:', error);
          return;
        }

        // Count phrases per language
        const languageCounts = data.reduce((acc: Record<string, number>, row) => {
          acc[row.language] = (acc[row.language] || 0) + 1;
          return acc;
        }, {});

        // Convert to array and sort by count (descending) then alphabetically
        const languageArray = Object.entries(languageCounts)
          .map(([language, count]) => ({ language, count }))
          .sort((a, b) => {
            if (b.count !== a.count) return b.count - a.count;
            return a.language.localeCompare(b.language);
          });

        setLanguages(languageArray);
      } catch (error) {
        console.error('Error processing languages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageSelect = (language: string | null) => {
    setSelectedLanguage(language);
    onLanguageSelected();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
            <Globe className="w-10 h-10 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Language</h2>
          <p className="text-gray-600">Select a language to focus on, or practice all languages</p>
        </div>

        {/* All Languages Option */}
        <Card 
          className="mb-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300"
          onClick={() => handleLanguageSelect(null)}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  🌍
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">All Languages</h3>
                  <p className="text-sm text-gray-500">Practice phrases from all available languages</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </CardContent>
        </Card>

        {/* Individual Languages */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {languages.map(({ language, count }) => (
            <Card 
              key={language}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-300"
              onClick={() => handleLanguageSelect(language)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl">
                      {languageToFlag(language)}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-gray-800 truncate capitalize">
                        {language}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {count} phrase{count !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button 
            variant="outline" 
            onClick={() => window.history.back()}
            className="px-6"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}