-- Comprehensive fix for all Hindi phrases: Replace literal translations with proper English idioms/meanings
-- This addresses the core issue where correct_meaning contains literal translations instead of proper English equivalents

UPDATE phrases SET 
  correct_meaning = 'Forcing yourself on someone',
  incorrect1 = 'Being a good guest',
  incorrect2 = 'Asking for permission'
WHERE phrase_text = 'मान न मान मैं तेरा मेहमान' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Being best among mediocre people',
  incorrect1 = 'Having poor eyesight',
  incorrect2 = 'Leading the blind'
WHERE phrase_text = 'अंधों में काना राजा' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Live within your means',
  incorrect1 = 'Stretch before sleeping',
  incorrect2 = 'Share your blanket'
WHERE phrase_text = 'जितनी चादर हो उतने पैर पसारो' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Much ado about nothing',
  incorrect1 = 'Mountain climbing is dangerous',
  incorrect2 = 'Finding treasure in mountains'
WHERE phrase_text = 'खोदा पहाड़ निकली चुहिया' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Unity is strength',
  incorrect1 = 'Cooking requires patience',
  incorrect2 = 'Chickpeas are nutritious'
WHERE phrase_text = 'अकेला चना भाड़ नहीं फोड़ता' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'No use crying over spilled milk',
  incorrect1 = 'Birds destroy crops',
  incorrect2 = 'Farmers need to be careful'
WHERE phrase_text = 'अब पछताए होत क्या जब चिड़िया चुग गई खेत' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Ironic contradiction',
  incorrect1 = 'Eye problems are common',
  incorrect2 = 'Names have meanings'
WHERE phrase_text = 'आँख का अंधा नाम नयनसुख' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'A drop in the bucket',
  incorrect1 = 'Camels eat spices',
  incorrect2 = 'Animals have preferences'
WHERE phrase_text = 'ऊंट के मुंह में जीरा' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Inconsistent behavior',
  incorrect1 = 'Sweet foods are unhealthy',
  incorrect2 = 'Avoiding desserts'
WHERE phrase_text = 'गुड़ खाए गुलगुलों से परहेज' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'A traitor within destroys everything',
  incorrect1 = 'Family secrets are dangerous',
  incorrect2 = 'Historical battles'
WHERE phrase_text = 'घर का भेदी लंका ढाए' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Guilty conscience shows',
  incorrect1 = 'Dental hygiene is important',
  incorrect2 = 'Thieves are careless'
WHERE phrase_text = 'चोर की दाढ़ी में तिनका' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Biting the hand that feeds you',
  incorrect1 = 'Crocodiles are dangerous',
  incorrect2 = 'Swimming requires skill'
WHERE phrase_text = 'जल में रहकर मगर से बैर' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'When in Rome, do as the Romans do',
  incorrect1 = 'Countries have dress codes',
  incorrect2 = 'Travel requires preparation'
WHERE phrase_text = 'जैसा देश वैसा वेश' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Blaming others for your shortcomings',
  incorrect1 = 'Dancing requires practice',
  incorrect2 = 'Courtyards can be uneven'
WHERE phrase_text = 'नाच न जाने आंगन टेढ़ा' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Pearls before swine',
  incorrect1 = 'Monkeys like ginger',
  incorrect2 = 'Animals have taste preferences'
WHERE phrase_text = 'बंदर क्या जाने अदरक का स्वाद' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Seeing everything through rose-colored glasses',
  incorrect1 = 'Monsoon makes everything green',
  incorrect2 = 'Blind people see colors differently'
WHERE phrase_text = 'सावन के अंधे को हरा ही हरा सूझता है' AND language = 'Hindi';

UPDATE phrases SET 
  correct_meaning = 'Two-faced behavior',
  incorrect1 = 'Elephants have strong teeth',
  incorrect2 = 'Animals show off differently'
WHERE phrase_text = 'हाथी के दांत खाने के और दिखाने के और' AND language = 'Hindi';