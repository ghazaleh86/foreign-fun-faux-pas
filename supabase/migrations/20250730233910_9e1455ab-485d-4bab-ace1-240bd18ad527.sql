-- Comprehensive fix for literal translations across all languages to proper English meanings

-- Hindi phrases - Major fixes needed
UPDATE phrases 
SET correct_meaning = 'Much ado about nothing'
WHERE correct_meaning = 'Dug mountain, found mouse' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Unity is strength'
WHERE correct_meaning = 'Single chickpea can''t crack pot' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'In the land of the blind, the one-eyed man is king'
WHERE correct_meaning = 'In land of blind, one-eyed is king' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'No use crying over spilled milk'
WHERE correct_meaning = 'What use regretting when birds ate the field' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Ironic mismatch between name and reality'
WHERE correct_meaning = 'Blind man named ''eye-joy''' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'A drop in the bucket'
WHERE correct_meaning = 'Cumin in camel''s mouth' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Inconsistent behavior'
WHERE correct_meaning = 'Eats jaggery but avoids sweets' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'A traitor within destroys everything'
WHERE correct_meaning = 'House traitor destroys Lanka' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Guilty conscience shows'
WHERE correct_meaning = 'Straw in thief''s beard' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Biting the hand that feeds you'
WHERE correct_meaning = 'Living in water, enmity with crocodile' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Live within your means'
WHERE correct_meaning = 'Stretch legs as long as blanket' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'When in Rome, do as the Romans do'
WHERE correct_meaning = 'Dress according to country' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Blaming others for your own shortcomings'
WHERE correct_meaning = 'Can''t dance, blames crooked courtyard' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Pearls before swine'
WHERE correct_meaning = 'What does monkey know of ginger taste' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Forcing yourself on someone'
WHERE correct_meaning = 'Accept or not, I am your guest' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'When you have a hammer, everything looks like a nail'
WHERE correct_meaning = 'Monsoon blind sees only green' AND language = 'Hindi';

UPDATE phrases 
SET correct_meaning = 'Two-faced behavior'
WHERE correct_meaning = 'Elephant has eating teeth and showing teeth' AND language = 'Hindi';

-- Turkish phrases
UPDATE phrases 
SET correct_meaning = 'Much ado about nothing'
WHERE correct_meaning = 'Mountain gave birth to mouse' AND language = 'Turkish';

-- Japanese phrases
UPDATE phrases 
SET correct_meaning = 'Finding beauty in brokenness'
WHERE correct_meaning = 'Repairing broken pottery with gold' AND language = 'Japanese';

UPDATE phrases 
SET correct_meaning = 'Treasure the unrepeatable nature of a moment'
WHERE correct_meaning = 'One time, one meeting' AND language = 'Japanese';

UPDATE phrases 
SET correct_meaning = 'Reality often disappoints expectations'
WHERE correct_meaning = 'Hearing is paradise, seeing is hell' AND language = 'Japanese';

-- Mandarin phrases - Remove literal parts, keep proper meaning
UPDATE phrases 
SET correct_meaning = 'Someone with a narrow worldview'
WHERE correct_meaning LIKE '%frog at the bottom of a well%' AND language = 'Mandarin';

UPDATE phrases 
SET correct_meaning = 'A blessing in disguise'
WHERE correct_meaning LIKE '%Bad luck may turn out to be good fortune%' AND language = 'Mandarin';

UPDATE phrases 
SET correct_meaning = 'Point of no return'
WHERE correct_meaning LIKE '%Breaking the pots and sinking the boats%' AND language = 'Mandarin';

-- Polish phrases
UPDATE phrases 
SET correct_meaning = 'You reap what you sow'
WHERE correct_meaning = 'As you make bed, so you''ll sleep' AND language = 'Polish';

UPDATE phrases 
SET correct_meaning = 'He who digs a pit for others falls into it himself'
WHERE correct_meaning = 'Who digs holes under others, falls in himself' AND language = 'Polish';

UPDATE phrases 
SET correct_meaning = 'A bird in the hand is worth two in the bush'
WHERE correct_meaning = 'Better sparrow in hand than pigeon on roof' AND language = 'Polish';

-- Additional fixes for other problematic literal translations
UPDATE phrases 
SET correct_meaning = 'Time heals all wounds'
WHERE correct_meaning LIKE '%Time is the best doctor%';

UPDATE phrases 
SET correct_meaning = 'Actions speak louder than words'
WHERE correct_meaning LIKE '%Facts speak louder than words%';

UPDATE phrases 
SET correct_meaning = 'Don''t count your chickens before they hatch'
WHERE correct_meaning LIKE '%Don''t sell bear skin before catching bear%';

UPDATE phrases 
SET correct_meaning = 'The early bird catches the worm'
WHERE correct_meaning LIKE '%Morning hour has gold in mouth%';

UPDATE phrases 
SET correct_meaning = 'Better late than never'
WHERE correct_meaning LIKE '%Better come late than never%';

-- Fix any remaining grammar issues in existing correct meanings
UPDATE phrases 
SET correct_meaning = 'A bird in the hand is worth two in the bush'
WHERE correct_meaning = 'Bird in hand worth two in bush';

UPDATE phrases 
SET correct_meaning = 'Birds of a feather flock together'
WHERE correct_meaning = 'Birds of feather flock together';