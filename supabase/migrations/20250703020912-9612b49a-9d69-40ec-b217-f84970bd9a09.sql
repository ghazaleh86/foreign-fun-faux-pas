-- Mix the language phrases by randomizing their created_at timestamps
-- This will ensure phrases from different languages appear in random order

UPDATE public.phrases 
SET created_at = now() - (random() * interval '30 days')
WHERE language IN ('Farsi', 'Mali', 'Irish', 'Scottish', 'Hebrew');

-- Also randomize existing phrases to mix them with new ones
UPDATE public.phrases 
SET created_at = now() - (random() * interval '30 days')
WHERE language NOT IN ('Farsi', 'Mali', 'Irish', 'Scottish', 'Hebrew');