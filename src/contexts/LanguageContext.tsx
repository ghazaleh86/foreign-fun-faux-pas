import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface LanguageContextType {
  selectedLanguage: string | null;
  setSelectedLanguage: (language: string | null) => void;
  isLanguageSelected: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'selectedLanguage';

function normalizeStoredLanguage(value: string | null): string | null {
  if (!value) return null;
  const v = value.trim();
  if (!v) return null;
  const lowered = v.toLowerCase();
  // Common stale values from previous UI versions
  if (lowered === 'null' || lowered === 'all languages' || lowered === 'all') return null;
  return lowered;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [selectedLanguage, setSelectedLanguageState] = useState<string | null>(null);

  // Load selected language from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      const normalized = normalizeStoredLanguage(stored);
      setSelectedLanguageState(normalized);
      if (!normalized) localStorage.removeItem(LANGUAGE_STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to load selected language from localStorage:', error);
    }
  }, []);

  const setSelectedLanguage = (language: string | null) => {
    const normalized = normalizeStoredLanguage(language);
    setSelectedLanguageState(normalized);
    
    // Persist to localStorage
    try {
      if (normalized) {
        localStorage.setItem(LANGUAGE_STORAGE_KEY, normalized);
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