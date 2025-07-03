-- Add difficulty level to phrases table
-- 1 = Easy (simple idioms, common phrases)
-- 2 = Medium (more complex idioms) 
-- 3 = Hard (very obscure or complex cultural idioms)

ALTER TABLE phrases ADD COLUMN difficulty INTEGER DEFAULT 2;

-- Set difficulty levels for existing phrases based on complexity
-- Easy: Common, well-known idioms
UPDATE phrases SET difficulty = 1 WHERE 
phrase_text IN (
  'Sláinte', -- Irish cheers
  'Céad míle fáilte' -- Irish welcome
) OR 
(language = 'spanish' AND phrase_text IN (
  'Mañana, mañana', -- Not today
  'Ser pan comido' -- To be very easy
)) OR
(language = 'portuguese' AND phrase_text IN (
  'Pisar na bola' -- To mess up
));

-- Hard: Very obscure or culturally specific idioms  
UPDATE phrases SET difficulty = 3 WHERE
phrase_text IN (
  'Backpfeifengesicht', -- German slappable face
  'عيش و ملح' -- Arabic bread and salt friendship
) OR
(language = 'spanish' AND phrase_text IN (
  'Buscarle tres pies al gato', -- Overcomplicate things
  'No tener pelos en la lengua' -- Speak one's mind
));

-- Create index for efficient difficulty-based queries
CREATE INDEX idx_phrases_difficulty ON phrases(difficulty, created_at);