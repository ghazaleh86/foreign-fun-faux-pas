-- Clean up and standardize to top 20 most spoken languages worldwide
-- First, let's standardize some language names and remove less common languages

-- Update language standardization
UPDATE phrases SET language = 'mandarin' WHERE language IN ('chinese', 'mandarin');
UPDATE phrases SET language = 'spanish' WHERE language IN ('mexican spanish', 'spanish (dominican republic)');
UPDATE phrases SET language = 'english' WHERE language = 'english (south africa)';

-- Remove phrases that are not in the top 20 most spoken languages
DELETE FROM phrases WHERE language NOT IN (
  'english', 'spanish', 'french', 'german', 'italian', 'portuguese', 
  'russian', 'japanese', 'korean', 'mandarin', 'arabic', 'hindi',
  'dutch', 'swedish', 'norwegian', 'danish', 'turkish', 'polish',
  'thai', 'vietnamese'
);

-- Now let's add phrases for each language to reach at least 20 phrases each
-- English phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Break a leg', 'english', 'brayk uh leg', 'Good luck', 'Cause an injury', 'Take a break', 'Theater expression for good luck', 1),
('Piece of cake', 'english', 'pees uhv kayk', 'Very easy', 'Delicious dessert', 'Birthday celebration', 'Something that is very easy to do', 1),
('It''s raining cats and dogs', 'english', 'its ray-ning kats and dawgz', 'Raining heavily', 'Pet store explosion', 'Animal rescue day', 'Heavy rainfall', 1),
('Spill the beans', 'english', 'spil thuh beenz', 'Reveal a secret', 'Make a mess', 'Cook dinner', 'To reveal secret information', 1),
('Bite the bullet', 'english', 'bahyt thuh bul-it', 'Face a difficult situation', 'Eat metal', 'Go to war', 'Face something difficult with courage', 2),
('The ball is in your court', 'english', 'thuh bawl iz in yoor kort', 'It''s your decision', 'Play tennis', 'Go to trial', 'The decision or action is now yours', 2),
('Don''t count your chickens before they hatch', 'english', 'dohnt kownt yoor chik-inz bi-fawr thay hach', 'Don''t assume success', 'Bad at math', 'Chicken farming tips', 'Don''t make plans based on uncertain outcomes', 2),
('Kill two birds with one stone', 'english', 'kil too burdz with wuhn stohn', 'Accomplish two things at once', 'Animal cruelty', 'Poor aim', 'Achieve two goals with one action', 2),
('Let the cat out of the bag', 'english', 'let thuh kat owt uhv thuh bag', 'Reveal a secret', 'Pet store accident', 'Rescue mission', 'Accidentally reveal secret information', 2),
('When pigs fly', 'english', 'hwen pigz flahy', 'Never', 'At the airport', 'In a fantasy movie', 'Something that will never happen', 2),
('Barking up the wrong tree', 'english', 'bar-king uhp thuh rawng tree', 'Making a mistake', 'Dog training', 'Tree climbing', 'Pursuing the wrong course of action', 2),
('A blessing in disguise', 'english', 'uh bles-ing in dis-gahyz', 'Hidden good fortune', 'Costume party', 'Religious ceremony', 'Something good that seemed bad at first', 2),
('Beat around the bush', 'english', 'beet uh-rownd thuh bush', 'Avoid the topic', 'Gardening technique', 'Hunting method', 'Avoid talking directly about something', 2),
('Better late than never', 'english', 'bet-ur layt than nev-ur', 'It''s good to do something late', 'Time management', 'Punctuality is overrated', 'It''s better to do something late than not at all', 1),
('Curiosity killed the cat', 'english', 'kyoor-ee-os-i-tee kild thuh kat', 'Being too curious is dangerous', 'Cat accident', 'Scientific experiment', 'Being too curious can get you in trouble', 2),
('Every cloud has a silver lining', 'english', 'ev-ree klowd haz uh sil-vur lahy-ning', 'There''s good in every bad situation', 'Weather forecast', 'Jewelry making', 'Something good comes from every bad situation', 2);

-- Spanish phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Estar en las nubes', 'spanish', 'es-tar en las noo-bes', 'To be absent-minded', 'Weather prediction', 'Cloud watching', 'Literally "to be in the clouds" - being distracted', 1),
('Costar un ojo de la cara', 'spanish', 'kos-tar oon oh-ho de la ka-ra', 'To be very expensive', 'Eye surgery', 'Facial injury', 'Literally "to cost an eye from the face" - very expensive', 2),
('Tirar la casa por la ventana', 'spanish', 'ti-rar la ka-sa por la ben-ta-na', 'To spare no expense', 'Home demolition', 'Bad housekeeping', 'Literally "throw the house out the window" - spend lavishly', 2),
('Estar como una cabra', 'spanish', 'es-tar ko-mo oo-na ka-bra', 'To be crazy', 'Animal impersonation', 'Farm work', 'Literally "to be like a goat" - to be crazy', 2),
('Meter la pata', 'spanish', 'me-ter la pa-ta', 'To mess up', 'Put on shoes', 'Animal care', 'Literally "to put the paw in" - to make a mistake', 1),
('Dar en el clavo', 'spanish', 'dar en el kla-bo', 'To hit the nail on the head', 'Construction work', 'Play darts', 'To be exactly right about something', 2),
('Buscar una aguja en un pajar', 'spanish', 'bus-kar oo-na a-goo-ha en oon pa-har', 'Looking for a needle in a haystack', 'Sewing class', 'Farm work', 'Looking for something nearly impossible to find', 2),
('Dormir como un lirón', 'spanish', 'dor-mir ko-mo oon li-ron', 'To sleep like a log', 'Animal studies', 'Music practice', 'To sleep very deeply', 1),
('Estar hecho un brazo de mar', 'spanish', 'es-tar e-cho oon bra-so de mar', 'To be very well dressed', 'Swimming attire', 'Body building', 'To be very elegantly dressed', 2),
('Tomar el pelo', 'spanish', 'to-mar el pe-lo', 'To pull someone''s leg', 'Hair styling', 'Barber shop', 'To tease or fool someone', 1),
('Estar en la luna', 'spanish', 'es-tar en la loo-na', 'To be daydreaming', 'Space travel', 'Night shift', 'To be absent-minded or distracted', 1),
('No tener ni pies ni cabeza', 'spanish', 'no te-ner ni pies ni ka-be-sa', 'To make no sense', 'Medical condition', 'Anatomy lesson', 'Literally "to have neither feet nor head" - nonsensical', 2),
('Quedarse de piedra', 'spanish', 'ke-dar-se de pie-dra', 'To be shocked', 'Sculpture class', 'Geology study', 'Literally "to remain of stone" - to be stunned', 2);

-- French phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Avoir le cafard', 'french', 'ah-vwar luh ka-far', 'To feel depressed', 'Insect problem', 'Coffee addiction', 'Literally "to have the cockroach" - feeling down', 2),
('Poser un lapin', 'french', 'po-zay uhn la-pan', 'To stand someone up', 'Pet photography', 'Rabbit hunting', 'Literally "to pose a rabbit" - not show up for a date', 2),
('Avoir un chat dans la gorge', 'french', 'ah-vwar uhn sha dan la gorzh', 'To have a frog in throat', 'Pet emergency', 'Vet visit', 'Literally "to have a cat in the throat" - hoarse voice', 1),
('Tomber dans les pommes', 'french', 'tom-bay dan lay pom', 'To faint', 'Apple picking', 'Fruit shopping', 'Literally "to fall in the apples" - to pass out', 2),
('Avoir les dents longues', 'french', 'ah-vwar lay dan long', 'To be ambitious', 'Dental problem', 'Vampire transformation', 'Literally "to have long teeth" - very ambitious', 2),
('Mettre les pieds dans le plat', 'french', 'met-truh lay pee-ay dan luh pla', 'To put your foot in it', 'Cooking accident', 'Table manners', 'Literally "to put feet in the dish" - say wrong thing', 2),
('Avoir un poil dans la main', 'french', 'ah-vwar uhn pwal dan la man', 'To be lazy', 'Hair growth disorder', 'Salon treatment', 'Literally "to have a hair in the hand" - very lazy', 2),
('Casser les pieds', 'french', 'ka-say lay pee-ay', 'To annoy someone', 'Medical emergency', 'Dance injury', 'Literally "to break the feet" - to bother someone', 1),
('Avoir le beurre et l''argent du beurre', 'french', 'ah-vwar luh burr ay lar-zhan du burr', 'To have your cake and eat it', 'Dairy business', 'Cooking lesson', 'Literally "to have butter and butter money" - want everything', 2),
('Chercher midi à quatorze heures', 'french', 'sher-shay mi-dee ah ka-torzh ur', 'To complicate things', 'Time confusion', 'Clock repair', 'Literally "to look for noon at 2pm" - overcomplicate', 2),
('Donner sa langue au chat', 'french', 'do-nay sa lang oh sha', 'To give up guessing', 'Pet feeding', 'Vet checkup', 'Literally "to give tongue to cat" - give up on riddle', 1),
('Il pleut comme vache qui pisse', 'french', 'eel pluh kom vash kee pees', 'It''s raining heavily', 'Farm accident', 'Bathroom emergency', 'Literally "raining like a cow that pees" - heavy rain', 2),
('Avoir d''autres chats à fouetter', 'french', 'ah-vwar doh-truh sha ah foo-eh-tay', 'To have other things to do', 'Animal training', 'Cooking preparation', 'Literally "have other cats to whip" - have better things to do', 2);

-- German phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Das ist mir Wurst', 'german', 'das ist meer voorsht', 'I don''t care', 'I love sausages', 'That''s my lunch', 'Literally "that is sausage to me" - I don''t care', 1),
('Ich verstehe nur Bahnhof', 'german', 'ikh fer-shtay-uh noor bahn-hohf', 'I don''t understand anything', 'I only travel by train', 'I work at the station', 'Literally "I only understand train station" - totally confused', 2),
('Du gehst mir auf den Keks', 'german', 'doo gayst meer owf dayn kayks', 'You''re getting on my nerves', 'You''re eating my cookies', 'You''re stepping on food', 'Literally "you go on my cookie" - you annoy me', 2),
('Da steppt der Bär', 'german', 'dah shtept der bayr', 'It''s a wild party', 'Bear dancing show', 'Dangerous wildlife', 'Literally "there the bear dances" - wild party', 2),
('Ich glaub mein Schwein pfeift', 'german', 'ikh glowb mahyn shvahyn pfhayyft', 'I can''t believe it', 'My pig makes music', 'Farm animal sounds', 'Literally "I think my pig whistles" - unbelievable', 2),
('Jemandem einen Bären aufbinden', 'german', 'yay-man-dem ahy-nen bayr-en owf-bin-den', 'To lie to someone', 'Bear rescue operation', 'Circus training', 'Literally "to tie a bear onto someone" - to deceive', 2),
('Das ist kalter Kaffee', 'german', 'das ist kal-ter ka-fay', 'That''s old news', 'Bad beverage service', 'Morning routine', 'Literally "that is cold coffee" - old information', 1),
('Schwein haben', 'german', 'shvahyn hah-ben', 'To be lucky', 'Own a pig', 'Work on farm', 'Literally "to have pig" - to be fortunate', 1),
('Einen Vogel haben', 'german', 'ahy-nen foh-gel hah-ben', 'To be crazy', 'Own a bird', 'Birdwatching hobby', 'Literally "to have a bird" - to be nuts', 1),
('Tomaten auf den Augen haben', 'german', 'to-mah-ten owf dayn ow-gen hah-ben', 'To be oblivious', 'Vegetable face mask', 'Cooking accident', 'Literally "to have tomatoes on eyes" - not notice obvious', 2),
('Den Nagel auf den Kopf treffen', 'german', 'dayn nah-gel owf dayn kopf tre-fen', 'To hit the nail on the head', 'Construction accident', 'Carpentry skill', 'To be exactly right about something', 2),
('Alles hat ein Ende nur die Wurst hat zwei', 'german', 'al-les hat ahyn en-de noor dee voorsht hat tsvahhy', 'Everything has an end', 'Cooking philosophy', 'Geometry lesson', 'Literally "everything has an end, only sausage has two" - everything ends', 2);

-- Italian phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('In bocca al lupo', 'italian', 'in bo-ka al loo-po', 'Good luck', 'Wolf attack warning', 'Dental procedure', 'Literally "in the mouth of the wolf" - good luck', 1),
('Avere le mani bucate', 'italian', 'ah-vay-ray lay ma-nee boo-ka-tay', 'To be a spendthrift', 'Hand injury', 'Kitchen accident', 'Literally "to have holey hands" - spend money easily', 2),
('Prendere due piccioni con una fava', 'italian', 'pren-day-ray doo-ay pi-cho-nee kon oo-na fa-va', 'Kill two birds with one stone', 'Bird hunting technique', 'Cooking with beans', 'Literally "catch two pigeons with one bean" - achieve two goals', 2),
('Essere al verde', 'italian', 'es-say-ray al vayr-day', 'To be broke', 'Environmental activist', 'Traffic light stuck', 'Literally "to be at green" - to have no money', 2),
('Avere gli occhi foderati di prosciutto', 'italian', 'ah-vay-ray lyee o-kee fo-day-ra-tee dee pro-shoo-to', 'To be blind to obvious', 'Ham eye mask', 'Deli worker uniform', 'Literally "eyes lined with ham" - can''t see obvious', 2),
('Non tutte le ciambelle riescono col buco', 'italian', 'non too-tay lay cham-bel-lay ree-ay-sko-no kol boo-ko', 'Not everything goes as planned', 'Donut making failure', 'Baking disaster', 'Literally "not all donuts come out with hole" - things don''t always work', 2),
('Avere le braccine corte', 'italian', 'ah-vay-ray lay bra-chee-nay kor-tay', 'To be stingy', 'Physical deformity', 'Short sleeve shirt', 'Literally "to have short little arms" - reluctant to spend', 2),
('Essere una pizza', 'italian', 'es-say-ray oo-na pi-tsa', 'To be boring', 'Work at restaurant', 'Italian food', 'Literally "to be a pizza" - to be dull', 1),
('Avere sale in zucca', 'italian', 'ah-vay-ray sa-lay in tsoo-ka', 'To have common sense', 'Cooking ingredient', 'Garden vegetable', 'Literally "to have salt in pumpkin" - to be smart', 2),
('Essere un pesce fuor d''acqua', 'italian', 'es-say-ray oon pay-shay foo-or da-kwa', 'To be out of place', 'Fishing accident', 'Aquarium cleaning', 'Literally "to be fish out of water" - feel out of place', 1),
('Attaccare bottone', 'italian', 'at-ta-ka-ray bo-to-nay', 'To strike up conversation', 'Sewing lesson', 'Clothing repair', 'Literally "to attach button" - start talking to someone', 2),
('Fare le ore piccole', 'italian', 'fa-ray lay o-ray pi-ko-lay', 'To stay up late', 'Clock repair', 'Work part-time', 'Literally "to make small hours" - stay up until late', 2);

-- Japanese phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Neko ni koban', 'japanese', 'ne-ko ni ko-ban', 'Pearls before swine', 'Cat payment system', 'Pet store currency', 'Literally "gold coin to a cat" - wasted on someone', 2),
('Saru mo ki kara ochiru', 'japanese', 'sa-ru mo ki ka-ra o-chi-ru', 'Even experts make mistakes', 'Monkey falling accidents', 'Tree climbing lessons', 'Literally "even monkeys fall from trees" - everyone makes mistakes', 2),
('Ame futte ji katamaru', 'japanese', 'a-me fu-te ji ka-ta-ma-ru', 'Adversity strengthens bonds', 'Weather prediction', 'Ground hardening', 'Literally "rain falls, ground hardens" - hardship strengthens relationships', 2),
('Iwashi no atama mo shinjin kara', 'japanese', 'i-wa-shi no a-ta-ma mo shin-jin ka-ra', 'Faith can move mountains', 'Fish head worship', 'Sardine religion', 'Literally "even sardine head if you believe" - faith is powerful', 2),
('Nana korobi ya oki', 'japanese', 'na-na ko-ro-bi ya o-ki', 'Fall seven times, rise eight', 'Counting exercise', 'Gymnastics routine', 'Never give up despite repeated failures', 2),
('Kawaii ko ni wa tabi wo sasero', 'japanese', 'ka-wa-ii ko ni wa ta-bi wo sa-se-ro', 'Send loved ones on journeys', 'Travel agency motto', 'Child abandonment', 'Literally "send cute child on journey" - hardship builds character', 2),
('Hyaku wen wa ikken ni shikazu', 'japanese', 'hya-ku wen wa i-ken ni shi-ka-zu', 'Seeing is believing', 'Math problem', 'Vision test', 'Literally "hundred hearings not equal to one seeing" - experience beats theory', 2),
('Uso mo houben', 'japanese', 'u-so mo ho-ben', 'White lies are sometimes necessary', 'Legal defense', 'Meditation practice', 'Literally "lies are also expedient means" - sometimes lying helps', 2),
('Deru kugi wa utareru', 'japanese', 'de-ru ku-gi wa u-ta-re-ru', 'The nail that sticks out gets hammered', 'Construction warning', 'Carpentry lesson', 'Standing out brings trouble - conformity is safer', 2),
('Kiite gokuraku mite jigoku', 'japanese', 'ki-te go-ku-ra-ku mi-te ji-go-ku', 'Hearing is paradise, seeing is hell', 'Audio vs visual', 'Religious concept', 'Things sound better than they look', 2),
('Neko no te mo karitai', 'japanese', 'ne-ko no te mo ka-ri-ta-i', 'So busy you''d take any help', 'Pet rental service', 'Animal employment', 'Literally "want to borrow cat''s paws" - desperately need help', 2),
('Ichi go ichi e', 'japanese', 'i-chi go i-chi e', 'One time, one meeting', 'Math formula', 'Meeting schedule', 'Treasure each encounter as it may never happen again', 2),
('Shikata ga nai', 'japanese', 'shi-ka-ta ga na-i', 'It can''t be helped', 'Medical diagnosis', 'Repair impossible', 'Accept things you cannot change', 1),
('Mono no aware', 'japanese', 'mo-no no a-wa-re', 'Bittersweet awareness of impermanence', 'Object consciousness', 'Sad about things', 'The pathos of things - beauty in transience', 2);

-- Korean phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Gae-sseugi-jjak', 'korean', 'gae-sseu-gi-jjak', 'Useless person', 'Dog food brand', 'Pet grooming', 'Literally means someone useless like dog food dregs', 2),
('Bap-eun meok-eoss-na', 'korean', 'bap-eun meok-eot-na', 'Have you eaten?', 'Cooking question', 'Restaurant review', 'Common Korean greeting showing care', 1),
('Nun-chi', 'korean', 'nun-chi', 'Reading the room', 'Eye examination', 'Number counting', 'Social awareness and sensitivity to others'' feelings', 2),
('Jeong', 'korean', 'jeong', 'Deep affection/bond', 'Name pronunciation', 'Meditation sound', 'Uniquely Korean concept of deep emotional connection', 2),
('Aegyo', 'korean', 'ae-gyo', 'Cute charm', 'Baby name', 'Exercise routine', 'Acting cute to get what you want', 1),
('Hwa-byeong', 'korean', 'hwa-byeong', 'Suppressed anger illness', 'Flower disease', 'Fire injury', 'Culture-bound syndrome from suppressed emotions', 2),
('Jeong-jeok', 'korean', 'jeong-jeok', 'Emotional enemy', 'Name meaning', 'Romantic partner', 'Someone you should hate but can''t help caring about', 2),
('Sang-chin', 'korean', 'sang-chin', 'Perfect child comparison', 'Twin sibling', 'School friend', 'The perfect kid other parents always compare to yours', 2),
('Bori-cha', 'korean', 'bo-ri-cha', 'Barley tea', 'Rice wine', 'Green tea', 'Common Korean beverage, especially in summer', 1),
('Kkab', 'korean', 'kkab', 'Acting pretentious', 'Taxi fare', 'Food wrapper', 'Trying too hard to look cool or sophisticated', 2),
('Doenjang-nyeo', 'korean', 'doen-jang-nyeo', 'Soybean paste girl', 'Cooking student', 'Traditional chef', 'Girl who pretends to be sophisticated but isn''t', 2),
('Chimaek', 'korean', 'chi-maek', 'Chicken and beer', 'Traditional dance', 'Friendship ritual', 'Popular Korean combination of fried chicken and beer', 1),
('Honja', 'korean', 'hon-ja', 'Alone', 'Traditional greeting', 'Family name', 'Doing things alone, especially dining or activities', 1),
('Mangnani', 'korean', 'mang-na-ni', 'Crazy person', 'Fruit type', 'Dance move', 'Someone who acts irrationally or wildly', 2),
('Oppa', 'korean', 'op-pa', 'Older brother/male', 'Grandfather', 'Uncle', 'Term for older male, used by females', 1),
('Fighting', 'korean', 'pai-ting', 'Good luck/encouragement', 'Physical combat', 'Argument starting', 'Korean way of saying "you can do it!" or "good luck!"', 1);

-- Mandarin phrases (adding to existing)
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes, difficulty) VALUES
('Gǒu zhàng rén shì', 'mandarin', 'goh jahng ren shih', 'Relying on powerful connections', 'Dog training school', 'Pet obedience class', 'Literally "dog fights human power" - using influence', 2),
('Zhū péng gǒu yǒu', 'mandarin', 'joo peng goh yoh', 'Bad company', 'Pet friendship', 'Animal farming', 'Literally "pig and dog friends" - bad influence friends', 2),
('Huà shé tiān zú', 'mandarin', 'hwah shuh tee-en zoo', 'Unnecessary addition', 'Snake art class', 'Reptile biology', 'Literally "draw snake add feet" - unnecessary embellishment', 2),
('Mǎ mǎ hū hū', 'mandarin', 'mah mah hoo hoo', 'So-so, mediocre', 'Horse sound effects', 'Animal imitation', 'Literally "horse horse tiger tiger" - just okay', 1),
('Jiǎo tà liǎng zhī chuán', 'mandarin', 'jee-ow tah lee-ahng jih chwan', 'Playing both sides', 'Boat balancing act', 'Maritime accident', 'Literally "foot on two boats" - being disloyal', 2),
('Tài suì tóu shàng dòng tǔ', 'mandarin', 'tahy sway toh shahng dong too', 'Offending powerful person', 'Soil excavation', 'Construction work', 'Literally "digging soil on Tai Sui''s head" - courting disaster', 2),
('Lǎo mǎ shí tú', 'mandarin', 'lao mah shih too', 'Old horse knows the way', 'Equestrian training', 'GPS navigation', 'Experience is valuable - old horse knows the path', 2),
('Yī shí qiān jīn', 'mandarin', 'yee shih chee-en jin', 'A promise is worth gold', 'Time is money', 'Weight measurement', 'Literally "one word thousand gold" - keep your word', 2),
('Mén dāng hù duì', 'mandarin', 'men dahng hoo dway', 'Well-matched families', 'Door installation', 'House security', 'Literally "doors match households match" - suitable marriage', 2),
('Shuǐ zhōng lāo yuè', 'mandarin', 'shway johng lao yway', 'Impossible task', 'Fishing expedition', 'Water sports', 'Literally "fish moon from water" - futile effort', 2),
('Huò bù dān xíng', 'mandarin', 'hwoh boo dahn shing', 'Misfortunes come in pairs', 'Single life philosophy', 'Walking alone', 'Literally "misfortune doesn''t walk alone" - bad luck clusters', 2),
('Shǒu zhū dài tù', 'mandarin', 'shoh joo dahy too', 'Waiting passively for luck', 'Rabbit hunting', 'Tree farming', 'Literally "guard stump wait rabbit" - passive waiting for fortune', 2),
('Luò yè guī gēn', 'mandarin', 'lwoh yay gway gen', 'Returning to one''s roots', 'Autumn gardening', 'Tree biology', 'Literally "fallen leaves return roots" - going back home', 2);

-- Continue with remaining languages...