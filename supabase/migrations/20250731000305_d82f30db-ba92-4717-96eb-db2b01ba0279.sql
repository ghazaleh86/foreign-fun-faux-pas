-- COMPREHENSIVE FIX: Update ALL answer options (correct_meaning, incorrect1, incorrect2) to remove literal translations

-- Hindi phrases - Fix all fields containing literal translations
-- अंधों में काना राजा (In land of blind, one-eyed is king)
UPDATE phrases 
SET incorrect1 = 'Better to be first among losers than last among winners',
    incorrect2 = 'Relative superiority matters'
WHERE (incorrect1 = 'In land of blind, one-eyed is king' OR incorrect2 = 'In land of blind, one-eyed is king') 
AND language = 'Hindi';

-- जितनी चादर हो उतने पैर पसारो (Stretch legs as long as blanket)
UPDATE phrases 
SET incorrect1 = 'Don''t bite off more than you can chew',
    incorrect2 = 'Cut your coat according to your cloth'
WHERE (incorrect1 = 'Stretch legs as long as blanket' OR incorrect2 = 'Stretch legs as long as blanket') 
AND language = 'Hindi';

-- आँख का अंधा नाम नयनसुख (Blind man named "eye-joy")
UPDATE phrases 
SET incorrect1 = 'False advertising',
    incorrect2 = 'Appearance versus reality'
WHERE (incorrect1 = 'Blind man named ''eye-joy''' OR incorrect2 = 'Blind man named ''eye-joy''') 
AND language = 'Hindi';

-- खोदा पहाड़ निकली चुहिया (Dug mountain, found mouse)
UPDATE phrases 
SET incorrect1 = 'Great expectations, small results',
    incorrect2 = 'A lot of effort for little gain'
WHERE (incorrect1 = 'Dug mountain, found mouse' OR incorrect2 = 'Dug mountain, found mouse') 
AND language = 'Hindi';

-- अकेला चना भाड़ नहीं फोड़ता (Single chickpea can't crack pot)
UPDATE phrases 
SET incorrect1 = 'Many hands make light work',
    incorrect2 = 'Teamwork makes the dream work'
WHERE (incorrect1 = 'Single chickpea can''t crack pot' OR incorrect2 = 'Single chickpea can''t crack pot') 
AND language = 'Hindi';

-- अब पछताए होत क्या जब चिड़िया चुग गई खेत (What use regretting when birds ate the field)
UPDATE phrases 
SET incorrect1 = 'Don''t cry over spilt milk',
    incorrect2 = 'What''s done is done'
WHERE (incorrect1 = 'What use regretting when birds ate the field' OR incorrect2 = 'What use regretting when birds ate the field') 
AND language = 'Hindi';

-- ऊंट के मुंह में जीरा (Cumin in camel's mouth)
UPDATE phrases 
SET incorrect1 = 'Too little too late',
    incorrect2 = 'Insignificant amount'
WHERE (incorrect1 = 'Cumin in camel''s mouth' OR incorrect2 = 'Cumin in camel''s mouth') 
AND language = 'Hindi';

-- गुड़ खाए गुलगुलों से परहेज (Eats jaggery but avoids sweets)
UPDATE phrases 
SET incorrect1 = 'Double standards',
    incorrect2 = 'Hypocritical behavior'
WHERE (incorrect1 = 'Eats jaggery but avoids sweets' OR incorrect2 = 'Eats jaggery but avoids sweets') 
AND language = 'Hindi';

-- घर का भेदी लंका ढाए (House traitor destroys Lanka)
UPDATE phrases 
SET incorrect1 = 'An inside job',
    incorrect2 = 'Betrayed by trusted person'
WHERE (incorrect1 = 'House traitor destroys Lanka' OR incorrect2 = 'House traitor destroys Lanka') 
AND language = 'Hindi';

-- चोर की दाढ़ी में तिनका (Straw in thief's beard)
UPDATE phrases 
SET incorrect1 = 'Caught red-handed',
    incorrect2 = 'Obvious guilt'
WHERE (incorrect1 = 'Straw in thief''s beard' OR incorrect2 = 'Straw in thief''s beard') 
AND language = 'Hindi';

-- जल में रहकर मगर से बैर (Living in water, enmity with crocodile)
UPDATE phrases 
SET incorrect1 = 'Don''t rock the boat',
    incorrect2 = 'Fighting those who help you'
WHERE (incorrect1 = 'Living in water, enmity with crocodile' OR incorrect2 = 'Living in water, enmity with crocodile') 
AND language = 'Hindi';

-- जैसा देश वैसा वेश (Dress according to country)
UPDATE phrases 
SET incorrect1 = 'Blend in with locals',
    incorrect2 = 'Adapt to your environment'
WHERE (incorrect1 = 'Dress according to country' OR incorrect2 = 'Dress according to country') 
AND language = 'Hindi';

-- नाच न जाने आंगन टेढ़ा (Can't dance, blames crooked courtyard)
UPDATE phrases 
SET incorrect1 = 'Making excuses for failure',
    incorrect2 = 'Shifting blame to others'
WHERE (incorrect1 = 'Can''t dance, blames crooked courtyard' OR incorrect2 = 'Can''t dance, blames crooked courtyard') 
AND language = 'Hindi';

-- बंदर क्या जाने अदरक का स्वाद (What does monkey know of ginger taste)
UPDATE phrases 
SET incorrect1 = 'Wasted on the wrong audience',
    incorrect2 = 'Can''t appreciate quality'
WHERE (incorrect1 = 'What does monkey know of ginger taste' OR incorrect2 = 'What does monkey know of ginger taste') 
AND language = 'Hindi';

-- मान न मान मैं तेरा मेहमान (Accept or not, I am your guest)
UPDATE phrases 
SET incorrect1 = 'Unwelcome visitor',
    incorrect2 = 'Imposing on others'
WHERE (incorrect1 = 'Accept or not, I am your guest' OR incorrect2 = 'Accept or not, I am your guest') 
AND language = 'Hindi';

-- सावन के अंधे को हरा ही हरा सूझता है (Monsoon blind sees only green)
UPDATE phrases 
SET incorrect1 = 'Seeing what you want to see',
    incorrect2 = 'Tunnel vision'
WHERE (incorrect1 = 'Monsoon blind sees only green' OR incorrect2 = 'Monsoon blind sees only green') 
AND language = 'Hindi';

-- हाथी के दांत खाने के और दिखाने के और (Elephant has eating teeth and showing teeth)
UPDATE phrases 
SET incorrect1 = 'Public face vs private reality',
    incorrect2 = 'Different faces for different occasions'
WHERE (incorrect1 = 'Elephant has eating teeth and showing teeth' OR incorrect2 = 'Elephant has eating teeth and showing teeth') 
AND language = 'Hindi';

-- Fix other languages with similar issues in incorrect options
-- Turkish
UPDATE phrases 
SET incorrect1 = 'Big expectations, small results',
    incorrect2 = 'All talk, no action'
WHERE (incorrect1 = 'Mountain gave birth to mouse' OR incorrect2 = 'Mountain gave birth to mouse') 
AND language = 'Turkish';

-- Japanese
UPDATE phrases 
SET incorrect1 = 'Seeing beauty in imperfection',
    incorrect2 = 'Making the best of damage'
WHERE (incorrect1 = 'Repairing broken pottery with gold' OR incorrect2 = 'Repairing broken pottery with gold') 
AND language = 'Japanese';

UPDATE phrases 
SET incorrect1 = 'Live in the moment',
    incorrect2 = 'Cherish unique experiences'
WHERE (incorrect1 = 'One time, one meeting' OR incorrect2 = 'One time, one meeting') 
AND language = 'Japanese';

UPDATE phrases 
SET incorrect1 = 'Expectations vs reality',
    incorrect2 = 'Things aren''t always as they seem'
WHERE (incorrect1 = 'Hearing is paradise, seeing is hell' OR incorrect2 = 'Hearing is paradise, seeing is hell') 
AND language = 'Japanese';

-- Mandarin - Remove any remaining literal parts in incorrect options
UPDATE phrases 
SET incorrect1 = 'Limited perspective',
    incorrect2 = 'Sheltered viewpoint'
WHERE (incorrect1 LIKE '%frog at the bottom of a well%' OR incorrect2 LIKE '%frog at the bottom of a well%') 
AND language = 'Mandarin';

UPDATE phrases 
SET incorrect1 = 'Hidden opportunity',
    incorrect2 = 'Silver lining'
WHERE (incorrect1 LIKE '%Bad luck may turn out to be good fortune%' OR incorrect2 LIKE '%Bad luck may turn out to be good fortune%') 
AND language = 'Mandarin';

UPDATE phrases 
SET incorrect1 = 'No turning back',
    incorrect2 = 'All or nothing'
WHERE (incorrect1 LIKE '%Breaking the pots and sinking the boats%' OR incorrect2 LIKE '%Breaking the pots and sinking the boats%') 
AND language = 'Mandarin';

-- Polish 
UPDATE phrases 
SET incorrect1 = 'Make your bed and lie in it',
    incorrect2 = 'Face the consequences'
WHERE (incorrect1 = 'As you make bed, so you''ll sleep' OR incorrect2 = 'As you make bed, so you''ll sleep') 
AND language = 'Polish';

UPDATE phrases 
SET incorrect1 = 'Karma comes back',
    incorrect2 = 'What goes around comes around'
WHERE (incorrect1 = 'Who digs holes under others, falls in himself' OR incorrect2 = 'Who digs holes under others, falls in himself') 
AND language = 'Polish';

UPDATE phrases 
SET incorrect1 = 'Something certain is better than uncertainty',
    incorrect2 = 'Don''t risk what you have'
WHERE (incorrect1 = 'Better sparrow in hand than pigeon on roof' OR incorrect2 = 'Better sparrow in hand than pigeon on roof') 
AND language = 'Polish';

-- Fix any remaining common literal translations in all languages
UPDATE phrases 
SET incorrect1 = 'Don''t count your chickens before they hatch',
    incorrect2 = 'Don''t assume success too early'
WHERE (incorrect1 LIKE '%Don''t sell bear skin before catching bear%' OR incorrect2 LIKE '%Don''t sell bear skin before catching bear%');

UPDATE phrases 
SET incorrect1 = 'Rise early for success',
    incorrect2 = 'Early action brings rewards'
WHERE (incorrect1 LIKE '%Morning hour has gold in mouth%' OR incorrect2 LIKE '%Morning hour has gold in mouth%');

UPDATE phrases 
SET incorrect1 = 'Time is the best healer',
    incorrect2 = 'Patience solves problems'
WHERE (incorrect1 LIKE '%Time is the best doctor%' OR incorrect2 LIKE '%Time is the best doctor%');

UPDATE phrases 
SET incorrect1 = 'Deeds matter more than words',
    incorrect2 = 'Show, don''t tell'
WHERE (incorrect1 LIKE '%Facts speak louder than words%' OR incorrect2 LIKE '%Facts speak louder than words%');

UPDATE phrases 
SET incorrect1 = 'Something is better than nothing',
    incorrect2 = 'Don''t miss opportunities'
WHERE (incorrect1 LIKE '%Better come late than never%' OR incorrect2 LIKE '%Better come late than never%');

-- Fix any remaining grammar issues in incorrect options
UPDATE phrases 
SET incorrect1 = 'A bird in the hand is worth two in the bush'
WHERE incorrect1 = 'Bird in hand worth two in bush';

UPDATE phrases 
SET incorrect2 = 'A bird in the hand is worth two in the bush'
WHERE incorrect2 = 'Bird in hand worth two in bush';

UPDATE phrases 
SET incorrect1 = 'Birds of a feather flock together'
WHERE incorrect1 = 'Birds of feather flock together';

UPDATE phrases 
SET incorrect2 = 'Birds of a feather flock together'
WHERE incorrect2 = 'Birds of feather flock together';