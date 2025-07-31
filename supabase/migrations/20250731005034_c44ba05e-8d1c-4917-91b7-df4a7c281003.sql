-- Fix all Hindi phrases - update correct_meaning from literal translations to proper English idioms
-- Update phrase 1: अकेला चना भाड़ नहीं फोड़ता
UPDATE phrases 
SET 
    correct_meaning = 'Unity is strength',
    incorrect1 = 'One person can do everything',
    incorrect2 = 'Chickpeas are hard to cook'
WHERE phrase_text = 'अकेला चना भाड़ नहीं फोड़ता';

-- Update phrase 2: अंधों में काना राजा
UPDATE phrases 
SET 
    correct_meaning = 'Being best among mediocre people',
    incorrect1 = 'Blind people need leaders',
    incorrect2 = 'One eye is better than none'
WHERE phrase_text = 'अंधों में काना राजा';

-- Update phrase 3: अब पछताए होत क्या जब चिड़िया चुग गई खेत
UPDATE phrases 
SET 
    correct_meaning = 'No use crying over spilled milk',
    incorrect1 = 'Birds always eat crops',
    incorrect2 = 'Regret comes after mistakes'
WHERE phrase_text = 'अब पछताए होत क्या जब चिड़िया चुग गई खेत';

-- Update phrase 4: आँख का अंधा नाम नयनसुख
UPDATE phrases 
SET 
    correct_meaning = 'Ironic contradiction',
    incorrect1 = 'Eyes bring happiness',
    incorrect2 = 'Blind people have nice names'
WHERE phrase_text = 'आँख का अंधा नाम नयनसुख';

-- Update phrase 5: ऊंट के मुंह में जीरा
UPDATE phrases 
SET 
    correct_meaning = 'A drop in the bucket',
    incorrect1 = 'Camels eat small things',
    incorrect2 = 'Spices improve taste'
WHERE phrase_text = 'ऊंट के मुंह में जीरा';

-- Update phrase 6: खोदा पहाड़ निकली चुहिया
UPDATE phrases 
SET 
    correct_meaning = 'Much ado about nothing',
    incorrect1 = 'Mountains hide mice',
    incorrect2 = 'Hard work pays off'
WHERE phrase_text = 'खोदा पहाड़ निकली चुहिया';

-- Update phrase 7: गुड़ खाए गुलगुलों से परहेज
UPDATE phrases 
SET 
    correct_meaning = 'Inconsistent behavior',
    incorrect1 = 'Sweet things are unhealthy',
    incorrect2 = 'Moderation is important'
WHERE phrase_text = 'गुड़ खाए गुलगुलों से परहेज';

-- Update phrase 8: घर का भेदी लंका ढाए
UPDATE phrases 
SET 
    correct_meaning = 'A traitor within destroys everything',
    incorrect1 = 'Family secrets are dangerous',
    incorrect2 = 'Home invasion is serious'
WHERE phrase_text = 'घर का भेदी लंका ढाए';

-- Update phrase 9: चोर की दाढ़ी में तिनका
UPDATE phrases 
SET 
    correct_meaning = 'Guilty conscience shows',
    incorrect1 = 'Thieves are careless',
    incorrect2 = 'Evidence sticks to criminals'
WHERE phrase_text = 'चोर की दाढ़ी में तिनका';

-- Update phrase 10: जल में रहकर मगर से बैर
UPDATE phrases 
SET 
    correct_meaning = 'Biting the hand that feeds you',
    incorrect1 = 'Water animals fight',
    incorrect2 = 'Swimming with crocodiles is dangerous'
WHERE phrase_text = 'जल में रहकर मगर से बैर';

-- Update phrase 11: जितनी चादर हो उतने पैर पसारो
UPDATE phrases 
SET 
    correct_meaning = 'Live within your means',
    incorrect1 = 'Blankets should fit properly',
    incorrect2 = 'Stretch when comfortable'
WHERE phrase_text = 'जितनी चादर हो उतने पैर पसारो';

-- Update phrase 12: जैसा देश वैसा वेश
UPDATE phrases 
SET 
    correct_meaning = 'When in Rome, do as the Romans do',
    incorrect1 = 'Clothing shows nationality',
    incorrect2 = 'Countries have dress codes'
WHERE phrase_text = 'जैसा देश वैसा वेश';

-- Update phrase 13: नाच न जाने आंगन टेढ़ा
UPDATE phrases 
SET 
    correct_meaning = 'Blaming others for your shortcomings',
    incorrect1 = 'Dancing requires good floors',
    incorrect2 = 'Crooked courtyards are hard to use'
WHERE phrase_text = 'नाच न जाने आंगन टेढ़ा';

-- Update phrase 14: बंदर क्या जाने अदरक का स्वाद
UPDATE phrases 
SET 
    correct_meaning = 'Pearls before swine',
    incorrect1 = 'Monkeys do not eat ginger',
    incorrect2 = 'Animals have simple tastes'
WHERE phrase_text = 'बंदर क्या जाने अदरक का स्वाद';

-- Update phrase 15: मान न मान मैं तेरा मेहमान
UPDATE phrases 
SET 
    correct_meaning = 'Forcing yourself on someone',
    incorrect1 = 'Guests should be respectful',
    incorrect2 = 'Hospitality is important'
WHERE phrase_text = 'मान न मान मैं तेरा मेहमान';

-- Update phrase 16: सावन के अंधे को हरा ही हरा सूझता है
UPDATE phrases 
SET 
    correct_meaning = 'Seeing everything through rose-colored glasses',
    incorrect1 = 'Rain makes everything green',
    incorrect2 = 'Blind people see colors differently'
WHERE phrase_text = 'सावन के अंधे को हरा ही हरा सूझता है';

-- Update phrase 17: हाथी के दांत खाने के और दिखाने के और
UPDATE phrases 
SET 
    correct_meaning = 'Two-faced behavior',
    incorrect1 = 'Elephants have different teeth',
    incorrect2 = 'Appearance can be deceiving'
WHERE phrase_text = 'हाथी के दांत खाने के और दिखाने के और';