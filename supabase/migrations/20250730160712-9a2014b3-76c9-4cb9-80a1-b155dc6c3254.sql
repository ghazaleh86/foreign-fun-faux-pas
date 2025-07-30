-- Fix literal translations across all languages to proper English meanings

-- Russian phrases
UPDATE phrases 
SET correct_meaning = 'A bird in the hand is worth two in the bush'
WHERE correct_meaning = 'Bird in hand worth two in bush';

UPDATE phrases 
SET correct_meaning = 'It takes one to know one'
WHERE correct_meaning = 'Birds of feather flock together' AND language = 'Russian';

-- Arabic phrases  
UPDATE phrases 
SET correct_meaning = 'Birds of a feather flock together'
WHERE correct_meaning = 'Birds of feather flock together' AND language = 'Arabic';

UPDATE phrases 
SET correct_meaning = 'Success breeds envy'
WHERE correct_meaning = 'Fruitful tree gets stoned';

UPDATE phrases 
SET correct_meaning = 'The spirit is willing but the flesh is weak'
WHERE correct_meaning = 'Eye sees but hand is short';

UPDATE phrases 
SET correct_meaning = 'Beauty is in the eye of the beholder'
WHERE correct_meaning = 'Monkey is gazelle in mother''s eye';

UPDATE phrases 
SET correct_meaning = 'A man''s home is his castle'
WHERE correct_meaning = 'Dog in its house is a lion';

-- Danish phrases
UPDATE phrases 
SET correct_meaning = 'To beat around the bush'
WHERE correct_meaning = 'Walk like cat around hot porridge';

UPDATE phrases 
SET correct_meaning = 'To have a hand in something'
WHERE correct_meaning = 'Have finger in game';

UPDATE phrases 
SET correct_meaning = 'To have a screw loose'
WHERE correct_meaning = 'To have screw loose';

UPDATE phrases 
SET correct_meaning = 'To cast pearls before swine'
WHERE correct_meaning = 'Throw pearls to pigs';