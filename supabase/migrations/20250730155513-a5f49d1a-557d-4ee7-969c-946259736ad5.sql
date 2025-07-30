-- Fix the French phrase "Avoir un chat dans la gorge" to have proper meaning
UPDATE phrases 
SET correct_meaning = 'hoarse voice'
WHERE id = 'b226fae9-4433-44f8-8826-b04f7173f6c5';

-- Fix any other phrases that might have literal translations as correct meanings
-- Update "To have a frog in your throat" to proper meanings where appropriate
UPDATE phrases 
SET correct_meaning = 'hoarse voice'
WHERE correct_meaning = 'To have a frog in your throat';