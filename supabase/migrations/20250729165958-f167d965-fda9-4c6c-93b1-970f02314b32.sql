-- Fix literal vs idiomatic translations in phrases
-- Move literal translations to notes and add proper idiomatic meanings

-- Swedish phrases
UPDATE phrases SET 
  correct_meaning = 'Have the best of both worlds',
  notes = 'Literally: Have both beard and potato pancake. Have the best of both worlds'
WHERE phrase_text = 'Att ha både skägg och raggmunk';

UPDATE phrases SET 
  correct_meaning = 'When the boss is away, workers play',
  notes = 'Literally: When cat''s away, rats dance on table. When the boss is away, workers play'
WHERE phrase_text = 'När katten är borta dansar råttorna på bordet';

UPDATE phrases SET 
  correct_meaning = 'Have crazy ideas',
  notes = 'Literally: To have flies in head. To have crazy ideas'
WHERE phrase_text = 'Att ha flugor i huvudet';

UPDATE phrases SET 
  correct_meaning = 'Create obstacles',
  notes = 'Literally: Put sticks in wheels. Put spoke in wheel'
WHERE phrase_text = 'Att sätta käppar i hjulen';

UPDATE phrases SET 
  correct_meaning = 'Home is where the heart is',
  notes = 'Literally: Away good but home best. Home is where the heart is'
WHERE phrase_text = 'Borta bra men hemma bäst';

UPDATE phrases SET 
  correct_meaning = 'No need to worry',
  notes = 'Literally: There''s no cow on ice. No need to worry'
WHERE phrase_text = 'Det är ingen ko på isen';

UPDATE phrases SET 
  correct_meaning = 'Be oblivious to something',
  notes = 'Literally: To have tomatoes on eyes. To be oblivious'
WHERE phrase_text = 'Att ha tomater på ögonen';

-- Norwegian phrases
UPDATE phrases SET 
  correct_meaning = 'Be in a risky situation',
  notes = 'Literally: To be out on thin ice. To be in risky situation'
WHERE phrase_text = 'Å være ute på tynnisen';

UPDATE phrases SET 
  correct_meaning = 'Have a hand in something',
  notes = 'Literally: Have finger in game. Have hand in something'
WHERE phrase_text = 'Å ha en finger med i spillet';

UPDATE phrases SET 
  correct_meaning = 'Kill two birds with one stone',
  notes = 'Literally: Hit two flies in one swat. Kill two birds with one stone'
WHERE phrase_text = 'Å slå to fluer i ett smekk';

UPDATE phrases SET 
  correct_meaning = 'Not everyone is well-behaved',
  notes = 'Literally: Not everyone has birch behind mirror. Not everyone is well-behaved'
WHERE phrase_text = 'Det er ikke alle som har ris bak speilet';

UPDATE phrases SET 
  correct_meaning = 'Get off on the wrong foot',
  notes = 'Literally: To come out crooked. To get off on wrong foot'
WHERE phrase_text = 'Å komme skjevt ut';

UPDATE phrases SET 
  correct_meaning = 'Home is where the heart is',
  notes = 'Literally: Away good, home best. Home is where heart is'
WHERE phrase_text = 'Borte bra, hjemme best';

UPDATE phrases SET 
  correct_meaning = 'Be completely wrong',
  notes = 'Literally: To be on berry trip. To be completely wrong'
WHERE phrase_text = 'Å være på bærtur';

UPDATE phrases SET 
  correct_meaning = 'It''s not easy',
  notes = 'Literally: It''s not just just. It''s not easy'
WHERE phrase_text = 'Det er ikke bare bare';

UPDATE phrases SET 
  correct_meaning = 'Don''t count your chickens before they hatch',
  notes = 'Literally: Don''t sell skin before bear is shot. Don''t count chickens before hatched'
WHERE phrase_text = 'Man skal ikke selge skinnet før bjørnen er skutt';

UPDATE phrases SET 
  correct_meaning = 'Beat around the bush',
  notes = 'Literally: Walk like cat around hot porridge. Beat around the bush'
WHERE phrase_text = 'Å gå som katten rundt den varme grøten';

UPDATE phrases SET 
  correct_meaning = 'Have plenty of time',
  notes = 'Literally: To have good time. To have plenty of time'
WHERE phrase_text = 'Å ha god tid';

UPDATE phrases SET 
  correct_meaning = 'The early bird catches the worm',
  notes = 'Literally: Morning hour has gold in mouth. Early bird catches worm'
WHERE phrase_text = 'Morgenstund har gull i munn';

-- Dutch phrases
UPDATE phrases SET 
  correct_meaning = 'Deceive someone',
  notes = 'Literally: Turn wheel before someone''s eyes. Pull wool over someone''s eyes'
WHERE phrase_text = 'Iemand een rad voor ogen draaien';

UPDATE phrases SET 
  correct_meaning = 'A bird in the hand is worth two in the bush',
  notes = 'Literally: Better bird in hand than ten in air. Bird in hand worth two in bush'
WHERE phrase_text = 'Beter een vogel in de hand dan tien in de lucht';

UPDATE phrases SET 
  correct_meaning = 'Have a bone to pick with someone',
  notes = 'Literally: Have an apple to peel with someone. Have a bone to pick with someone'
WHERE phrase_text = 'Een appeltje met iemand te schillen hebben';

UPDATE phrases SET 
  correct_meaning = 'Take the bull by the horns',
  notes = 'Literally: Grab cow by the horns. Take the bull by the horns'
WHERE phrase_text = 'De koe bij de horens vatten';

UPDATE phrases SET 
  correct_meaning = 'Get ahead of yourself',
  notes = 'Literally: Run ahead of music. Get ahead of yourself'
WHERE phrase_text = 'Voor de muziek uitlopen';

UPDATE phrases SET 
  correct_meaning = 'What goes around comes around',
  notes = 'Literally: Who does good, meets good. Good karma returns'
WHERE phrase_text = 'Wie goed doet, goed ontmoet';

UPDATE phrases SET 
  correct_meaning = 'Things aren''t as bad as they seem',
  notes = 'Literally: Soup never eaten as hot as served. Things aren''t as bad as they seem'
WHERE phrase_text = 'De soep wordt nooit zo heet gegeten als ze wordt opgediend';

-- Danish phrases
UPDATE phrases SET 
  correct_meaning = 'Be in trouble',
  notes = 'Literally: To have shit in cap. To be in trouble'
WHERE phrase_text = 'At have lort i kasketten';