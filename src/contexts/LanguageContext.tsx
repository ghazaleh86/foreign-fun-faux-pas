import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LanguageContextType {
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string | null) => void;
  isLanguageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguageState] = useState<string | null>(null);

  // Load selected language from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored && stored !== 'null') {
        setSelectedLanguageState(stored);
      }
    } catch (error) {
      console.warn('Failed to load selected language from localStorage:', error);
    }
  }, []);

  const setSelectedLanguage = (language: string | null) => {
    setSelectedLanguageState(language);
    
    // Persist to localStorage
    try {
      if (language) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
      } else {
        localStorage.removeItem(LANGUAGE_STORAGE_KEY);
      }
    } catch (error) {
      console.warn('Failed to save selected language to localStorage:', error);
    }
  };

  const isLanguageSelected = selectedLanguage !== null;

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
        isLanguageSelected,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}