-- Fix phrases where literal translations are incorrectly used as correct answers
-- Swap correct_meaning and notes to put natural meanings as correct answers

-- Japanese phrase "木を見て森を見ず" - put natural meaning as correct answer
UPDATE phrases 
SET 
  correct_meaning = 'Cannot see the big picture',
  notes = 'Literally ''seeing trees but not the forest'' - same as English idiom ''can''t see forest for trees'''
WHERE phrase_text = '木を見て森を見ず' 
  AND correct_meaning = 'To miss the forest for the trees';

-- Arabic phrase "العين بصيرة واليد قصيرة" - put natural meaning as correct answer  
UPDATE phrases 
SET 
  correct_meaning = 'You can see what you want but can''t reach it',
  notes = 'Literally ''the eye sees but the hand is short'''
WHERE phrase_text = 'العين بصيرة واليد قصيرة' 
  AND correct_meaning = 'The eye sees but the hand is short';