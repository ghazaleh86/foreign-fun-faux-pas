-- Update all language names to lowercase for consistency
UPDATE phrases SET language = LOWER(language) WHERE language != LOWER(language);