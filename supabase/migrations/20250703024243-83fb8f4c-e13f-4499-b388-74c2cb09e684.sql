-- Remove phrases that are just direct translations, not idioms
-- These make the quiz too easy as they test vocabulary rather than idiomatic understanding

DELETE FROM phrases WHERE id IN (
  -- Basic greetings and simple words that are direct translations
  SELECT id FROM phrases WHERE 
  -- Farsi basic words
  (language = 'Farsi' AND phrase_text IN ('سلام', 'تشکر', 'خوش آمدید', 'چطوری؟', 'خداحافظ')) OR
  -- Mali basic greetings  
  (language = 'Mali' AND phrase_text IN ('I ni ce', 'A bɛ di', 'I ni tile', 'Aw ni sɔgɔma', 'Kan bɛn')) OR
  -- Irish basic words (except idiomatic ones)
  (language = 'Irish' AND phrase_text IN ('Go raibh maith agat', 'Conas atá tú?', 'Slán')) OR
  -- Scottish single-word translations
  (language = 'Scottish' AND phrase_text IN ('Ken', 'Wee', 'Bonnie', 'Aye', 'Dinnae'))
);

-- Also fix the Arabic phrase where literal translation appears as an option
UPDATE phrases 
SET incorrect1 = 'A temporary alliance'
WHERE phrase_text = 'عيش و ملح' AND incorrect1 = 'Eat bread and salt';