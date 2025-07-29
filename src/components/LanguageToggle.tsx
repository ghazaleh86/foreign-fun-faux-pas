import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { Globe, ChevronDown } from 'lucide-react';
import { languageToFlag } from '@/utils/languageToFlag';
import { supabase } from '@/integrations/supabase/client';
import { useLanguage } from '@/contexts/LanguageContext';
import { clearGameState } from '@/utils/gameStateManager';

interface LanguageInfo {
  language: string;
  count: number;
}

export function LanguageToggle() {
  const [languages, setLanguages] = useState<LanguageInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedLanguage, setSelectedLanguage } = useLanguage();

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

        // Convert to array and sort alphabetically
        const languageArray = Object.entries(languageCounts)
          .map(([language, count]) => ({ language, count }))
          .sort((a, b) => a.language.localeCompare(b.language));

        setLanguages(languageArray);
      } catch (error) {
        console.error('Error processing languages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  const handleLanguageChange = (language: string | null) => {
    // Clear current game state when changing language to avoid confusion
    clearGameState();
    setSelectedLanguage(language);
    
    // Reload the page to restart with new language
    window.location.reload();
  };

  const getCurrentDisplayText = () => {
    if (!selectedLanguage) return 'All Languages';
    return selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1);
  };

  const getCurrentFlag = () => {
    if (!selectedLanguage) return '🌍';
    return languageToFlag(selectedLanguage);
  };

  if (loading) {
    return (
      <Button variant="outline" size="sm" disabled>
        <Globe className="w-4 h-4 mr-2" />
        Loading...
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <span className="text-base">{getCurrentFlag()}</span>
          <span className="hidden sm:inline">{getCurrentDisplayText()}</span>
          <ChevronDown className="w-3 h-3" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem 
          onClick={() => handleLanguageChange(null)}
          className={`cursor-pointer ${!selectedLanguage ? 'bg-blue-50' : ''}`}
        >
          <span className="mr-3 text-base">🌍</span>
          <span>All Languages</span>
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {languages.map(({ language, count }) => (
          <DropdownMenuItem 
            key={language}
            onClick={() => handleLanguageChange(language)}
            className={`cursor-pointer ${selectedLanguage === language ? 'bg-blue-50' : ''}`}
          >
            <span className="mr-3 text-base">{languageToFlag(language)}</span>
            <div className="flex-1 min-w-0">
              <span className="capitalize">{language}</span>
              <span className="text-xs text-gray-500 ml-2">({count})</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}