
-- Add hilarious new phrases with witty incorrect options
INSERT INTO public.phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes) VALUES

-- More hilarious German compounds
('Verschlimmbessern', 'German', 'fer-shlim-bes-sern', 'To make something worse by trying to improve it', 'To dress like a fancy pretzel', 'When your cat judges your life choices', 'The most German thing ever: a word for ruining things while helping'),
('Backpfeifengesicht', 'German', 'bahk-pfy-fen-ge-zikht', 'A face that desperately needs to be slapped', 'A beautiful Instagram selfie', 'Someone who collects vintage spoons', 'Literally "slap-face" - brutally honest German humor'),
('Kummerspeck', 'German', 'koo-mer-shpek', 'Weight gained from emotional eating', 'Bacon-flavored sadness', 'When pigs get depressed', 'Literally "grief bacon" - Germans have a word for everything'),

-- Absurdly funny Japanese concepts
('Tsundoku', 'Japanese', 'tsun-do-ku', 'Buying books but never reading them', 'When books develop separation anxiety', 'Professional library haunting', 'The art of collecting guilt with paper'),
('Kintsugi', 'Japanese', 'kin-tsu-gi', 'Repairing broken pottery with gold', 'When your dishes have trust issues', 'Expensive way to fix your clumsiness', 'Making broken things more beautiful than before'),
('Ikigai', 'Japanese', 'ee-kee-guy', 'Your reason for being', 'When you really need coffee', 'Professional procrastination technique', 'The intersection of what you love and what pays rent'),

-- Hilarious Finnish concepts
('Kalsarikännit', 'Finnish', 'kal-sa-ri-kan-nit', 'Getting drunk at home in your underwear', 'Professional couch potato certification', 'When your pajamas judge you', 'The Finnish art of dignified home drinking'),
('Sisu', 'Finnish', 'see-soo', 'Stubborn determination in the face of adversity', 'When your WiFi has commitment issues', 'Arguing with furniture and winning', 'Finnish superpower: being too stubborn to quit'),

-- Witty Dutch phrases
('Uitwaaien', 'Dutch', 'oyt-vah-yen', 'Walking in windy weather to clear your head', 'When the weather attacks your hairstyle', 'Professional cloud chasing', 'Dutch therapy: let the wind fix your problems'),
('Gezellig', 'Dutch', 'kheh-zel-likh', 'Cozy, warm, friendly atmosphere', 'When your socks achieve enlightenment', 'Furniture that gives good hugs', 'Untranslatable Dutch magic: ultimate coziness'),

-- Absurd English phrases with funny meanings
('Petrichor', 'English', 'pet-ri-kor', 'The smell of earth after rain', 'When your garden has morning breath', 'Dirt perfume for fancy worms', 'Nature''s signature cologne'),
('Schadenfreude', 'German', 'shah-den-froy-de', 'Joy from others'' misfortune', 'When karma has a sense of humor', 'Professional drama appreciation', 'Feeling good about feeling bad about feeling good'),

-- Ridiculous French sophistication
('L''esprit de l''escalier', 'French', 'les-pree de les-kal-yay', 'Thinking of the perfect comeback too late', 'When your brain works part-time', 'Stair-climbing intellectual emergency', 'The French art of being witty... eventually'),
('Saudade', 'Portuguese', 'saw-da-de', 'Deep nostalgic longing', 'When your heart speaks Portuguese', 'Emotional time travel sickness', 'Missing something you never had'),

-- Absurd Spanish drama
('Sobremesa', 'Spanish', 'so-bre-me-sa', 'Time spent chatting after a meal', 'When food coma becomes social activity', 'Professional post-dinner loitering', 'The Spanish art of never leaving the table'),
('Estrenar', 'Spanish', 'es-tre-nar', 'To wear something for the first time', 'When clothes have social anxiety', 'Fashion item''s coming-out party', 'The moment your shirt loses its virginity'),

-- Hilariously specific Korean concepts
('Han', 'Korean', 'hahn', 'Deep sorrow mixed with hope', 'When your emotions need group therapy', 'Sad but make it inspirational', 'Korean emotional complexity in one syllable'),
('Nunchi', 'Korean', 'noon-chee', 'Social awareness and sensitivity', 'When you read minds but for feelings', 'Emotional detective work', 'Korean superpower: knowing when to shut up'),

-- Absurd Italian passion
('Boh', 'Italian', 'bo', 'I don''t know (with shoulder shrug)', 'When uncertainty becomes an art form', 'Professional confusion with style', 'Italian for *dramatic shrug*'),
('Mamma mia', 'Italian', 'mah-ma mee-a', 'Expression of surprise or frustration', 'When your pasta commits betrayal', 'Emergency Italian emotional release', 'What you say when life gets spicy'),

-- Ridiculous Scandinavian concepts
('Hygge', 'Danish', 'hoo-gah', 'Cozy contentment and well-being', 'When your blanket achieves nirvana', 'Professional happiness in pajamas', 'Danish secret to surviving winter: candles and denial'),
('Lagom', 'Swedish', 'lah-gom', 'Just the right amount, not too much or little', 'When Goldilocks becomes a lifestyle', 'Swedish perfectionism but chill', 'The art of being exactly adequate'),

-- Absurd Russian drama
('Toska', 'Russian', 'tos-ka', 'Untranslatable anguish of the soul', 'When your feelings speak Russian literature', 'Emotional winter that never ends', 'Russian for existential crisis but poetic'),
('Avos', 'Russian', 'ah-vos', 'Maybe it will work out somehow', 'When hope meets procrastination', 'Russian roulette but with life decisions', 'The art of optimistic negligence'),

-- Hilarious Arabic wisdom
('Yalla', 'Arabic', 'yah-lah', 'Come on, let''s go, hurry up', 'When patience files for divorce', 'Universal Arabic life acceleration', 'The sound of Middle Eastern urgency'),
('Inshallah', 'Arabic', 'in-shah-lah', 'God willing, if Allah wills it', 'When the universe handles your schedule', 'Divine project management', 'Arabic for "we''ll see what happens"'),

-- Absurd modern concepts
('FOMO', 'English', 'fo-mo', 'Fear of missing out', 'When your social anxiety gets social media', 'Professional party stalking syndrome', 'Modern disease: being everywhere except present'),
('Ghosting', 'English', 'go-sting', 'Suddenly cutting off all communication', 'When humans cosplay as WiFi problems', 'Professional disappearing act', 'Modern magic: vanishing without leaving the country');

-- Update some existing phrases with funnier incorrect options
UPDATE public.phrases SET 
  incorrect1 = 'When your refrigerator starts a revolution',
  incorrect2 = 'My pet rock needs therapy'
WHERE phrase_text = 'তোমাকে ধন্যবাদ' AND language = 'Bengali';

UPDATE public.phrases SET 
  incorrect1 = 'When clouds have commitment issues',
  incorrect2 = 'Professional sky watching certification'
WHERE phrase_text = 'आकाश नीला है' AND language = 'Hindi';

UPDATE public.phrases SET 
  incorrect1 = 'When your breakfast achieves consciousness',
  incorrect2 = 'Professional morning meal psychology'
WHERE phrase_text = 'सुप्रभात' AND language = 'Hindi';

UPDATE public.phrases SET 
  incorrect1 = 'When your social skills file for bankruptcy',
  incorrect2 = 'Professional human interaction emergency'
WHERE phrase_text = 'हैलो' AND language = 'Hindi';

UPDATE public.phrases SET 
  incorrect1 = 'When gratitude becomes interpretive dance',
  incorrect2 = 'My appreciation has stage fright'
WHERE phrase_text = 'شکریہ' AND language = 'Urdu';
