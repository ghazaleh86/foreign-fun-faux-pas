
import { Phrase } from "@/types/quiz";
import { getLanguageTier, languageTiers } from "@/lib/tts/languageMapping";

// Weighted phrase selection based on language tiers
export function selectWeightedPhrases(phrases: Phrase[], targetCount: number): Phrase[] {
  if (phrases.length === 0) return [];
  
  // Group phrases by tier and difficulty
  const phrasesByTier: Record<string, Phrase[]> = {
    tier1: [],
    tier2: [],
    tier3: []
  };
  
  phrases.forEach(phrase => {
    const tier = getLanguageTier(phrase.language);
    phrasesByTier[tier].push(phrase);
  });
  
  // Calculate target counts for each tier
  const tier1Count = Math.round(targetCount * languageTiers.tier1.weight);
  const tier2Count = Math.round(targetCount * languageTiers.tier2.weight);
  const tier3Count = targetCount - tier1Count - tier2Count;
  
  console.log(`🎯 Weighted selection targets: Tier1=${tier1Count}, Tier2=${tier2Count}, Tier3=${tier3Count}`);
  
  // Select phrases from each tier with difficulty-based sorting
  const selectedPhrases: Phrase[] = [];
  
  // Helper function to select from a tier with difficulty progression
  const selectFromTier = (tierPhrases: Phrase[], count: number): Phrase[] => {
    if (tierPhrases.length === 0) return [];
    
    // Sort by difficulty first, then randomize within difficulty levels
    const sortedPhrases = tierPhrases.sort((a, b) => {
      if (a.difficulty !== b.difficulty) {
        return a.difficulty - b.difficulty;
      }
      return Math.random() - 0.5;
    });
    
    return sortedPhrases.slice(0, Math.min(count, sortedPhrases.length));
  };
  
  // Select from each tier
  selectedPhrases.push(...selectFromTier(phrasesByTier.tier1, tier1Count));
  selectedPhrases.push(...selectFromTier(phrasesByTier.tier2, tier2Count));
  selectedPhrases.push(...selectFromTier(phrasesByTier.tier3, tier3Count));
  
  // If we don't have enough phrases, fill from any available tier
  if (selectedPhrases.length < targetCount) {
    const remaining = phrases.filter(p => !selectedPhrases.includes(p));
    const needed = targetCount - selectedPhrases.length;
    selectedPhrases.push(...remaining.slice(0, needed));
  }
  
  // Final sort by difficulty for progression
  const result = selectedPhrases.sort((a, b) => {
    if (a.difficulty !== b.difficulty) {
      return a.difficulty - b.difficulty;
    }
    return Math.random() - 0.5;
  });
  
  console.log(`🎯 Selected phrases by tier:`, {
    tier1: result.filter(p => getLanguageTier(p.language) === 'tier1').length,
    tier2: result.filter(p => getLanguageTier(p.language) === 'tier2').length,
    tier3: result.filter(p => getLanguageTier(p.language) === 'tier3').length,
    total: result.length
  });
  
  return result;
}

// Get language distribution statistics
export function getLanguageDistribution(phrases: Phrase[]): Record<string, number> {
  const distribution: Record<string, number> = {};
  phrases.forEach(phrase => {
    const tier = getLanguageTier(phrase.language);
    distribution[tier] = (distribution[tier] || 0) + 1;
  });
  return distribution;
}
