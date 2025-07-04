
-- Add comprehensive collection of island country phrases
-- Phase 1: Major Island Nations (25 phrases)

-- Philippines (Tagalog/Filipino) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Bahala na', 'Tagalog', 'bah-HAH-lah nah', 'Come what may', 'I am hungry', 'Where is the bathroom?', 2, 'Popular Filipino expression meaning "leave it to fate" or "whatever will be, will be"'),
('Pasalip sa mata', 'Tagalog', 'pah-SAH-lip sah MAH-tah', 'A wink', 'Good morning', 'Thank you very much', 3, 'Literally means "a glimpse to the eye" - used for subtle hints or signals'),
('Kilig', 'Tagalog', 'KEE-lig', 'Butterflies in stomach from romance', 'I am tired', 'See you tomorrow', 2, 'Untranslatable feeling of excitement from romantic situations'),
('Kumusta ka?', 'Tagalog', 'koo-MOOS-tah kah', 'How are you?', 'What time is it?', 'I love you', 1, 'Common greeting in Filipino, borrowed from Spanish "¿Cómo está?"'),
('Salamat po', 'Tagalog', 'sah-LAH-mat poh', 'Thank you (formal)', 'Excuse me', 'Good night', 1, 'Polite way to say thank you, "po" adds respect');

-- Iceland (Icelandic) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Þetta reddast', 'Icelandic', 'THET-tah RED-ast', 'It will all work out', 'I am cold', 'Where is the store?', 2, 'Icelandic philosophy meaning "this will sort itself out" - very common expression'),
('Takk fyrir', 'Icelandic', 'tahk FEER-ir', 'Thank you', 'Good morning', 'How much does it cost?', 1, 'Standard way to say thank you'),
('Hvað segirðu?', 'Icelandic', 'kvahth SEH-gir-thu', 'How are you?', 'What is your name?', 'I don''t understand', 1, 'Literally "what do you say?" - casual greeting'),
('Gleðilegt nýtt ár', 'Icelandic', 'GLEH-thi-lekt neet aur', 'Happy New Year', 'Merry Christmas', 'Happy birthday', 2, 'New Year greeting in Iceland'),
('Að fara í gegnum eldinn', 'Icelandic', 'ahth FAH-rah ee GEG-num EL-din', 'To go through fire for someone', 'To be very angry', 'To cook dinner', 3, 'Expression meaning to do anything for someone you love');

-- Malta (Maltese) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Saħħa', 'Maltese', 'SAH-hah', 'Cheers', 'Goodbye', 'Good luck', 1, 'Used when toasting, similar to "health" or "cheers"'),
('Grazzi ħafna', 'Maltese', 'GRAH-tsee HAF-nah', 'Thank you very much', 'You are welcome', 'Excuse me please', 1, 'Polite way to express gratitude'),
('Kif inti?', 'Maltese', 'keef IN-tee', 'How are you?', 'What is this?', 'Where are you going?', 1, 'Standard greeting question'),
('Il-ħajja hija sabiħa', 'Maltese', 'il-HI-yah HEE-yah sah-BEE-hah', 'Life is beautiful', 'The weather is nice', 'I am very happy', 2, 'Philosophical expression about life'),
('X''inhu isimek?', 'Maltese', 'shee-noo ee-SEE-mek', 'What is your name?', 'How old are you?', 'Where do you live?', 2, 'Question to ask someone''s name');

-- New Zealand (Māori) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Kia ora', 'Māori', 'KEE-ah OH-rah', 'Hello', 'Goodbye', 'Thank you', 1, 'Most common Māori greeting, literally means "be well/healthy"'),
('Aroha nui', 'Māori', 'ah-ROH-hah NOO-ee', 'Much love', 'Good morning', 'See you later', 2, 'Expression of deep affection or love'),
('Whānau', 'Māori', 'FAH-now', 'Family', 'Friend', 'House', 2, 'Extended family concept, very important in Māori culture'),
('Manaakitanga', 'Māori', 'mah-nah-ah-kee-TAHNG-ah', 'Hospitality', 'Friendship', 'Respect', 3, 'Core Māori value of caring for others and showing hospitality'),
('Haere mai', 'Māori', 'HIGH-reh MY', 'Welcome', 'Please come in', 'How are you?', 2, 'Welcome greeting, literally "come here"');

-- Sri Lanka (Sinhala) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Ayubowan', 'Sinhala', 'AH-yu-bow-ahn', 'Hello', 'Goodbye', 'Thank you', 1, 'Traditional Sinhala greeting meaning "may you live long"'),
('Bohoma sthuti', 'Sinhala', 'BOH-hoh-mah STOO-tee', 'Thank you very much', 'You are welcome', 'Excuse me', 1, 'Formal way to express gratitude'),
('Kohomada?', 'Sinhala', 'koh-HOH-mah-dah', 'How are you?', 'What is this?', 'Where are you from?', 1, 'Common greeting question'),
('Mama oyata adare karami', 'Sinhala', 'MAH-mah oh-YAH-tah ah-DAH-reh kah-rah-mee', 'I love you', 'I miss you', 'I am happy', 2, 'Expression of romantic love'),
('Subha nawa warshayak', 'Sinhala', 'SUB-hah NAH-wah war-SHAH-yak', 'Happy New Year', 'Happy birthday', 'Good luck', 2, 'New Year greeting in Sinhala');

-- Phase 2: Pacific Islands (20 phrases)

-- Samoa (Samoan) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Talofa', 'Samoan', 'tah-LOH-fah', 'Hello', 'Goodbye', 'Thank you', 1, 'Standard Samoan greeting'),
('Fa''afetai tele lava', 'Samoan', 'fah-ah-FEH-tie TEH-leh LAH-vah', 'Thank you very much', 'You are welcome', 'Good morning', 1, 'Very polite way to say thank you'),
('O a mai oe?', 'Samoan', 'oh ah MY oh-eh', 'How are you?', 'What is your name?', 'Where are you going?', 1, 'Standard greeting question'),
('Tofa soifua', 'Samoan', 'TOH-fah soy-FOO-ah', 'Goodbye', 'Good night', 'See you tomorrow', 2, 'Formal farewell greeting'),
('Fa''amolemole', 'Samoan', 'fah-ah-moh-leh-MOH-leh', 'Please', 'Excuse me', 'You are welcome', 2, 'Polite request word, also means "excuse me"');

-- Fiji (Fijian) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Bula', 'Fijian', 'BOO-lah', 'Hello', 'Goodbye', 'Thank you', 1, 'Universal Fijian greeting meaning "life" or "health"'),
('Vinaka vakalevu', 'Fijian', 'vee-NAH-kah vah-kah-LEH-voo', 'Thank you very much', 'You are welcome', 'Good morning', 1, 'Polite expression of gratitude'),
('Vakarau tu?', 'Fijian', 'vah-kah-RAH-oo too', 'How are you?', 'What time is it?', 'Where do you live?', 2, 'Greeting question meaning "are you well?"'),
('Moce', 'Fijian', 'MOH-theh', 'Goodbye', 'Good night', 'See you later', 1, 'Standard farewell, pronounced with "th" sound'),
('Kerekere', 'Fijian', 'keh-reh-KEH-reh', 'Please', 'Thank you', 'Excuse me', 2, 'Polite way to make a request');

-- Tonga (Tongan) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Malo e lelei', 'Tongan', 'MAH-loh eh leh-LEH-ee', 'Hello', 'Goodbye', 'Good morning', 1, 'Standard Tongan greeting meaning "good health"'),
('Malo ''aupito', 'Tongan', 'MAH-loh ah-oo-PEE-toh', 'Thank you very much', 'You are welcome', 'Good evening', 1, 'Formal way to express thanks'),
('Fefe hake?', 'Tongan', 'FEH-feh HAH-keh', 'How are you?', 'What is your name?', 'How old are you?', 1, 'Standard greeting question'),
('Alu a', 'Tongan', 'AH-loo ah', 'Goodbye', 'Good luck', 'See you tomorrow', 2, 'Casual farewell'),
('''Ofa atu', 'Tongan', 'OH-fah AH-too', 'Love to you', 'Take care', 'Good night', 2, 'Expression of affection when parting');

-- Guam (Chamorro) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Hafa adai', 'Chamorro', 'HAH-fah ah-DIE', 'Hello', 'Goodbye', 'Thank you', 1, 'Universal Chamorro greeting meaning "what''s up"'),
('Si Yu''os ma''ase', 'Chamorro', 'see YOO-ohs mah-AH-seh', 'Thank you', 'You are welcome', 'Good morning', 1, 'Literally "God have mercy" - standard thank you'),
('Kao mamaolek hao?', 'Chamorro', 'KAH-oh mah-mah-OH-lek how', 'How are you?', 'What is your name?', 'Where are you from?', 2, 'Standard greeting question meaning "are you well?"'),
('Adios', 'Chamorro', 'ah-DIOS', 'Goodbye', 'Good night', 'See you later', 1, 'Farewell borrowed from Spanish'),
('Guahu', 'Chamorro', 'GWAH-hoo', 'I am', 'You are', 'We are', 2, 'First person pronoun meaning "I" or "me"');

-- Phase 3: Caribbean Islands (20 phrases)

-- Jamaica (Jamaican Patois) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Wah gwaan?', 'Jamaican Patois', 'wah GWAHN', 'What''s going on?', 'Where are you?', 'How much is it?', 1, 'Very common Jamaican greeting meaning "what''s happening?"'),
('Big up yuhself', 'Jamaican Patois', 'big up yuh-SELF', 'Respect yourself', 'Take care of yourself', 'You look good', 2, 'Expression of respect or congratulations'),
('Likkle more', 'Jamaican Patois', 'LIK-kle more', 'See you later', 'A little bit more', 'Wait a minute', 2, 'Casual way to say goodbye, literally "little more"'),
('Bless up', 'Jamaican Patois', 'bless up', 'Blessings', 'Good luck', 'Take care', 2, 'Farewell blessing, wishing someone well'),
('Mi deh yah', 'Jamaican Patois', 'mee deh yah', 'I''m here', 'I''m fine', 'I''m coming', 2, 'Response meaning "I''m here/present" or "I''m okay"');

-- Haiti (Haitian Creole) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Sak pase?', 'Haitian Creole', 'sahk pah-SEH', 'What''s happening?', 'How are you?', 'Where are you going?', 1, 'Common greeting meaning "what''s up?"'),
('Mèsi anpil', 'Haitian Creole', 'MEH-see ahn-PEEL', 'Thank you very much', 'You are welcome', 'Good morning', 1, 'Polite way to express gratitude'),
('N''ap boule', 'Haitian Creole', 'nahp BOO-leh', 'We''re hanging in there', 'We are happy', 'We are tired', 2, 'Common response meaning "we''re managing/surviving"'),
('Kenbe la', 'Haitian Creole', 'ken-BEH lah', 'Hang in there', 'Hold on tight', 'Stay strong', 2, 'Encouragement meaning "keep holding on"'),
('Bon bagay', 'Haitian Creole', 'bohn bah-GAI', 'Good things', 'Good luck', 'Well done', 2, 'Expression of approval or wishing good fortune');

-- Aruba (Papiamento) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Bon dia', 'Papiamento', 'bohn DEE-ah', 'Good day', 'Good morning', 'Good evening', 1, 'Standard daytime greeting'),
('Danki', 'Papiamento', 'DAHN-kee', 'Thank you', 'You are welcome', 'Excuse me', 1, 'Simple way to say thank you'),
('Kon ta bai?', 'Papiamento', 'kohn tah BUY', 'How are you?', 'Where are you going?', 'What are you doing?', 1, 'Standard greeting question'),
('Te aworo', 'Papiamento', 'teh ah-WOH-roh', 'See you later', 'Until tomorrow', 'Good night', 2, 'Casual farewell meaning "until later"'),
('Mi ta stima bo', 'Papiamento', 'mee tah STEE-mah boh', 'I love you', 'I like you', 'I miss you', 2, 'Expression of romantic love');

-- Caribbean Spanish - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('¿Qué tal tú?', 'Spanish (Cuba)', 'keh tahl too', 'How are you?', 'What do you want?', 'Where are you from?', 1, 'Caribbean style greeting, different from standard Spanish'),
('Está brutal', 'Spanish (Dominican Republic)', 'ehs-TAH broo-TAHL', 'It''s awesome', 'It''s terrible', 'It''s difficult', 2, 'Dominican slang meaning something is great'),
('¡Jajaja klk!', 'Spanish (Dominican Republic)', 'hah-hah-hah keh-leh-keh', 'Haha what''s up!', 'Very funny joke', 'I don''t understand', 3, 'Dominican internet slang, "klk" = "que lo que"'),
('Nos vemos al rato', 'Spanish (Cuba)', 'nohs VEH-mohs ahl RAH-toh', 'See you later', 'See you tomorrow', 'See you soon', 2, 'Cuban way to say "see you in a bit"'),
('¡Qué chercha!', 'Spanish (Dominican Republic)', 'keh CHER-chah', 'How funny!', 'How strange!', 'How beautiful!', 2, 'Dominican expression for something amusing');

-- Phase 4: Mediterranean & European Islands (15 phrases)

-- Sicily (Sicilian) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Bongiorno', 'Sicilian', 'bohn-JOR-noh', 'Good day', 'Good evening', 'Good morning', 1, 'Sicilian greeting, different from standard Italian'),
('Grazzi assai', 'Sicilian', 'GRAH-tsee ah-SIGH', 'Thank you very much', 'You are welcome', 'Good morning', 1, 'Polite Sicilian gratitude expression'),
('Comu stai?', 'Sicilian', 'KOH-moo sty', 'How are you?', 'What is your name?', 'Where do you live?', 1, 'Standard Sicilian greeting question'),
('Arrivederci', 'Sicilian', 'ah-ree-veh-DER-chee', 'Goodbye', 'Good night', 'See you tomorrow', 2, 'Formal farewell in Sicilian'),
('Bedda matri', 'Sicilian', 'BED-dah MAH-tree', 'Beautiful mother!', 'Oh my goodness!', 'How wonderful!', 3, 'Expression of surprise, literally "beautiful mother"');

-- Corsica (Corsican) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Bonghjornu', 'Corsican', 'bohn-JOR-noo', 'Good day', 'Good evening', 'Good morning', 1, 'Standard Corsican greeting'),
('Vi ringraziu', 'Corsican', 'vee reen-GRAH-tsoo', 'Thank you', 'You are welcome', 'Excuse me', 1, 'Polite way to express thanks'),
('Cumu state?', 'Corsican', 'KOO-moo STAH-teh', 'How are you?', 'What is this?', 'Where are you going?', 1, 'Standard greeting question'),
('Avvedeci', 'Corsican', 'ah-veh-DEH-chee', 'Goodbye', 'See you later', 'Good night', 2, 'Standard farewell'),
('Pace è Salute', 'Corsican', 'PAH-cheh eh sah-LOO-teh', 'Peace and health', 'Good luck', 'Take care', 2, 'Traditional Corsican blessing');

-- Faroe Islands (Faroese) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Góðan dag', 'Faroese', 'GOH-than dahg', 'Good day', 'Good morning', 'Good evening', 1, 'Standard Faroese greeting'),
('Takk fyri', 'Faroese', 'tahk FEE-ree', 'Thank you', 'You are welcome', 'Excuse me', 1, 'Simple expression of gratitude'),
('Hvussu gongur?', 'Faroese', 'KVOOS-soo GOHNG-oor', 'How are you?', 'How is it going?', 'What are you doing?', 2, 'Greeting question meaning "how''s it going?"'),
('Farvæl', 'Faroese', 'FAR-vail', 'Goodbye', 'Good night', 'See you later', 2, 'Standard farewell'),
('Kærleiki', 'Faroese', 'KAIR-ly-kee', 'Love', 'Friendship', 'Happiness', 2, 'The word for love in Faroese');

-- Phase 5: Indian Ocean & Remote Islands (20 phrases)

-- Mauritius (Mauritian Creole) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Ki manyer?', 'Mauritian Creole', 'kee mahn-YAIR', 'How are you?', 'What''s new?', 'What are you doing?', 1, 'Standard Mauritian greeting question'),
('Mersi boukou', 'Mauritian Creole', 'mer-SEE boo-KOO', 'Thank you very much', 'You are welcome', 'Good morning', 1, 'Polite expression of gratitude'),
('Mo kontan twa', 'Mauritian Creole', 'moh kohn-TAHN twah', 'I''m happy to see you', 'I like you', 'I miss you', 2, 'Expression of joy at seeing someone'),
('Zordi', 'Mauritian Creole', 'zor-DEE', 'Today', 'Tomorrow', 'Yesterday', 2, 'The word for "today"'),
('Bonzer', 'Mauritian Creole', 'bohn-ZAIR', 'Good', 'Bad', 'Okay', 1, 'Simple positive adjective');

-- Seychelles (Seychellois Creole) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Komman sa va?', 'Seychellois Creole', 'koh-MAHN sah vah', 'How are you?', 'What''s happening?', 'Where are you going?', 1, 'Standard Seychellois greeting'),
('Mersi boukou', 'Seychellois Creole', 'mer-SEE boo-KOO', 'Thank you very much', 'You are welcome', 'Good evening', 1, 'Polite way to say thanks'),
('Mon kontan wer ou', 'Seychellois Creole', 'mohn kohn-TAHN wair oo', 'I''m happy to see you', 'I like you', 'Nice to meet you', 2, 'Expression of joy at meeting someone'),
('Ozordi', 'Seychellois Creole', 'oh-zor-DEE', 'Today', 'Tonight', 'This morning', 2, 'The word for "today"'),
('Bonzour', 'Seychellois Creole', 'bohn-ZOOR', 'Good day', 'Good morning', 'Good evening', 1, 'Standard daytime greeting');

-- Maldives (Dhivehi) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Assalaamu alaikum', 'Dhivehi', 'ah-sah-LAH-moo ah-LY-koom', 'Peace be upon you', 'Good morning', 'How are you?', 1, 'Islamic greeting commonly used in Maldives'),
('Shukuriyaa', 'Dhivehi', 'shoo-koo-ree-YAH', 'Thank you', 'You are welcome', 'Excuse me', 1, 'Standard way to express gratitude'),
('Haalu kihineh?', 'Dhivehi', 'HAH-loo kee-hee-NEH', 'How are you?', 'What is this?', 'Where are you from?', 2, 'Standard greeting question'),
('Dhannyabaad', 'Dhivehi', 'than-nyah-BAHD', 'Thank you', 'Please', 'You are welcome', 1, 'Another way to say thank you'),
('Barakallahu feeki', 'Dhivehi', 'bah-rah-kah-LAH-hoo fee-KEE', 'May God bless you', 'Good luck', 'Take care', 2, 'Islamic blessing commonly used');

-- Papua New Guinea (Tok Pisin) - 5 phrases
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
('Gutpela moning', 'Tok Pisin', 'GOOT-peh-lah MOR-ning', 'Good morning', 'Good evening', 'Good night', 1, 'Standard morning greeting in Tok Pisin'),
('Tenk yu tru', 'Tok Pisin', 'tengk yoo troo', 'Thank you very much', 'You are welcome', 'Good morning', 1, 'Emphatic way to say thank you'),
('Yu stap gut?', 'Tok Pisin', 'yoo stahp goot', 'Are you well?', 'Where are you?', 'What are you doing?', 1, 'Standard greeting question'),
('Lukim yu bihain', 'Tok Pisin', 'LOO-keem yoo bee-HINE', 'See you later', 'See you tomorrow', 'Take care', 2, 'Casual farewell meaning "see you behind/later"'),
('Mi glad tru', 'Tok Pisin', 'mee glahd troo', 'I''m very happy', 'I''m very tired', 'I''m very hungry', 2, 'Expression of joy, "tru" intensifies the meaning');
