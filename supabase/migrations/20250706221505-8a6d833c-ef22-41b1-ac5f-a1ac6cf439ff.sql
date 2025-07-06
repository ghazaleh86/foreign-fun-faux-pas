
-- Phase 1: Normalize all language names to lowercase for consistent TTS voice selection
UPDATE phrases SET language = LOWER(language) WHERE language != LOWER(language);
