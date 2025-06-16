
-- Add many more phrases from different languages and cultures (fixed escaping)
INSERT INTO public.phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes)
VALUES
-- More German phrases
('Verschlimmbessern', 'German', 'fer-shlim-bes-sern', 'To make something worse by trying to improve it', 'To dress very fancy', 'To eat too much cake', 'Compound word: verschlimmern (worsen) + verbessern (improve)'),
('Fernweh', 'German', 'fern-vay', 'Longing for distant places', 'Fear of traveling', 'Love of trains', 'Opposite of homesickness - wanting to be somewhere else'),
('Backpfeifengesicht', 'German', 'bahk-pfy-fen-ge-zikht', 'A face that needs to be slapped', 'A beautiful smile', 'Someone who bakes bread', 'Literally "slap-face" - very rude but expressive'),

-- More Spanish phrases
('Estar en las nubes', 'Spanish', 'es-tar en las noo-bes', 'To be daydreaming', 'To be on an airplane', 'To be very tall', 'Literally "to be in the clouds"'),
('Ser pan comido', 'Spanish', 'ser pan ko-mee-do', 'To be very easy', 'To be hungry', 'To work in a bakery', 'Literally "to be eaten bread" - piece of cake'),
('Buscarle tres pies al gato', 'Spanish', 'boos-kar-le tres pee-es al ga-to', 'To overcomplicate things', 'To look for a lost cat', 'To count cat legs', 'Literally "to look for three feet on a cat"'),

-- More French phrases
('Avoir le cafard', 'French', 'ah-vwar le ka-far', 'To feel depressed', 'To drink too much coffee', 'To see a cockroach', 'Literally "to have the cockroach"'),
('Poser un lapin', 'French', 'po-zay un la-pan', 'To stand someone up', 'To put down a rabbit', 'To buy a pet', 'Literally "to put down a rabbit"'),
('Avoir un chat dans la gorge', 'French', 'ah-vwar un sha dan la gorj', 'To have a frog in your throat', 'To swallow a cat', 'To be very hungry', 'Literally "to have a cat in the throat"'),

-- More Japanese phrases
('木を見て森を見ず', 'Japanese', 'ki wo mite mori wo mizu', 'To miss the forest for the trees', 'To be a good gardener', 'To climb trees professionally', 'Cannot see the big picture'),
('猫に小判', 'Japanese', 'neko ni koban', 'Pearls before swine', 'Expensive cat food', 'Golden cat statue', 'Literally "gold coins to a cat" - wasted on someone'),
('蛙の子は蛙', 'Japanese', 'kaeru no ko wa kaeru', 'Like father, like son', 'Frogs have babies', 'Green animals are related', 'Literally "a frog''s child is a frog"'),

-- Italian phrases
('In bocca al lupo', 'Italian', 'in bo-ka al loo-po', 'Good luck', 'In the wolf''s mouth', 'Dangerous situation', 'Literally "in the mouth of the wolf" - response is "crepi il lupo"'),
('Avere le mani bucate', 'Italian', 'ah-veh-re le ma-nee bu-ka-te', 'To be a spendthrift', 'To have injured hands', 'To be a surgeon', 'Literally "to have holes in your hands"'),
('Non tutte le ciambelle riescono col buco', 'Italian', 'non too-te le cham-bel-le ree-eh-sho-no kol bu-ko', 'Things don''t always go as planned', 'Donuts are hard to make', 'Bakery work is difficult', 'Literally "not all donuts come out with a hole"'),

-- Dutch phrases
('Met de deur in huis vallen', 'Dutch', 'met de door in hoys val-len', 'To get straight to the point', 'To break down a door', 'To fall in a house', 'Literally "to fall with the door into the house"'),
('Een appeltje voor de dorst', 'Dutch', 'en ah-pel-che vor de dorst', 'Money saved for a rainy day', 'A healthy snack', 'Fruit juice drink', 'Literally "a little apple for the thirst"'),
('De kat uit de boom kijken', 'Dutch', 'de kat oyt de boom kay-ken', 'To wait and see', 'To rescue a cat', 'To climb trees', 'Literally "to watch the cat out of the tree"'),

-- Russian phrases
('Медведь на ухо наступил', 'Russian', 'med-ved na oo-ho nas-too-peel', 'To be tone-deaf', 'A bear stepped on you', 'To have good hearing', 'Literally "a bear stepped on your ear"'),
('Когда рак на горе свистнет', 'Russian', 'kog-da rak na go-re svist-net', 'When pigs fly', 'When crabs whistle', 'Very loud music', 'Literally "when a crab whistles on a mountain"'),
('Волков бояться — в лес не ходить', 'Russian', 'vol-kov bo-ya-tsa v les ne ho-deet', 'Nothing ventured, nothing gained', 'Wolves are dangerous', 'Don''t go hiking', 'Literally "if you fear wolves, don''t go to the forest"'),

-- Chinese phrases
('画蛇添足', 'Chinese', 'hua she tian zu', 'To gild the lily', 'To draw a snake', 'To add more feet', 'Literally "drawing a snake and adding feet" - unnecessary addition'),
('井底之蛙', 'Chinese', 'jing di zhi wa', 'A narrow-minded person', 'A frog in a well', 'Someone who digs wells', 'Literally "frog at the bottom of a well" - limited perspective'),
('纸上谈兵', 'Chinese', 'zhi shang tan bing', 'Armchair general', 'Writing on paper', 'Military strategy', 'Literally "discussing warfare on paper" - all theory, no practice'),

-- Arabic phrases
('يا رب سترك', 'Arabic', 'ya rab sit-rak', 'God help us', 'Your protection, Lord', 'Please hide this', 'Common expression when something embarrassing happens'),
('الصبر مفتاح الفرج', 'Arabic', 'as-sabr mif-tah al-fa-raj', 'Patience is the key to relief', 'Patience opens doors', 'Keys solve problems', 'Patience will solve your problems'),
('العين بصيرة واليد قصيرة', 'Arabic', 'al-ayn ba-see-ra wal-yad qa-see-ra', 'The eye sees but the hand is short', 'Good eyesight helps', 'Short arms problem', 'You can see what you want but can''t reach it'),

-- More Scandinavian phrases
('Det er ikke bare, bare', 'Norwegian', 'de air ik-ke ba-re ba-re', 'It''s not that simple', 'It''s just berries', 'Bears are dangerous', 'Things are more complicated than they seem'),
('Att ha en räv bakom örat', 'Swedish', 'at ha en rav ba-kom er-at', 'To be cunning', 'To have a fox behind your ear', 'To have good hearing', 'To be sly like a fox'),
('At gå agurk', 'Danish', 'at gaw a-gork', 'To go crazy', 'To eat cucumber', 'To walk vegetables', 'Literally "to go cucumber"'),

-- More Asian languages
('เสียงหอยฟูมีแล้วก็บุพเพสันนิวาส', 'Thai', 'see-ang hoy foo mee laew gor bu-pay-san-ni-was', 'You remember past lives', 'Shell sounds are mystical', 'Seafood brings memories', 'Having supernatural memories'),
('คิดไม่ออก', 'Thai', 'kit mai ork', 'Can''t figure it out', 'Don''t want to think', 'Thinking is hard', 'Cannot solve or understand'),
('바보', 'Korean', 'ba-bo', 'Fool/dummy', 'Baby food', 'Bamboo stick', 'Common mild insult'),

-- More European languages
('Mieć muchy w nosie', 'Polish', 'myech moo-heh v no-she', 'To be in a bad mood', 'To have flies in your nose', 'To have allergies', 'Literally "to have flies in the nose"'),
('Mať v hlave guľôčky', 'Slovak', 'mat v hla-ve goo-lyoch-kee', 'To be scatterbrained', 'To have marbles in head', 'To be very smart', 'Literally "to have little balls in your head"'),
('Να πας στον διάολο', 'Greek', 'na pas ston dee-a-vo-lo', 'Go to hell', 'Go to the devil', 'Travel somewhere', 'Strong expression of anger'),

-- African languages
('Sawubona', 'Zulu', 'sa-wu-bo-na', 'Hello (I see you)', 'Good morning', 'How are you', 'Means "I see you" - acknowledging someone''s existence'),
('Hakuna matata', 'Swahili', 'ha-ku-na ma-ta-ta', 'No worries', 'No problems here', 'Everything is fine', 'Made famous by The Lion King'),
('Ubuntu', 'Zulu', 'oo-boon-too', 'I am because we are', 'Good computer', 'African unity', 'Philosophy of interconnectedness'),

-- More Latin American Spanish
('¡Órale!', 'Mexican Spanish', 'o-ra-le', 'Wow!/Come on!', 'Listen up!', 'Time to pray!', 'Versatile exclamation expressing surprise or encouragement'),
('Pura vida', 'Costa Rican Spanish', 'poo-ra vee-da', 'Pure life/great!', 'Clean living', 'Pure water', 'Costa Rican motto meaning life is good'),
('Chévere', 'Colombian Spanish', 'che-ve-re', 'Cool/awesome', 'Spicy food', 'Expensive goat', 'Colombian slang for something good');
