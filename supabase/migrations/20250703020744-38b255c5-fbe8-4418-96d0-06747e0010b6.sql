-- Add sample phrases for new languages: Farsi, Mali/Bambara, Irish, Scottish, and Hebrew

-- Farsi phrases
INSERT INTO public.phrases (phrase_text, correct_meaning, incorrect1, incorrect2, language, pronunciation, notes) VALUES
('سلام', 'Hello', 'Goodbye', 'Thank you', 'Farsi', 'salaam', 'Standard Persian greeting'),
('تشکر', 'Thank you', 'Please', 'Excuse me', 'Farsi', 'tashakkor', 'Expression of gratitude'),
('خوش آمدید', 'Welcome', 'Good morning', 'How are you', 'Farsi', 'khosh amadid', 'Welcoming phrase'),
('چطوری؟', 'How are you?', 'What time is it?', 'Where are you?', 'Farsi', 'chetori?', 'Informal greeting'),
('خداحافظ', 'Goodbye', 'Good luck', 'See you later', 'Farsi', 'khodahafez', 'Standard farewell');

-- Mali/Bambara phrases
INSERT INTO public.phrases (phrase_text, correct_meaning, incorrect1, incorrect2, language, pronunciation, notes) VALUES
('I ni ce', 'Hello/Good morning', 'Goodbye', 'Thank you', 'Mali', 'ee nee chay', 'Traditional Bambara greeting'),
('A bɛ di', 'It is good', 'It is bad', 'It is small', 'Mali', 'ah bay dee', 'Expression of approval'),
('I ni tile', 'Good evening', 'Good morning', 'Good night', 'Mali', 'ee nee tee-lay', 'Evening greeting'),
('Aw ni sɔgɔma', 'Good morning', 'Good evening', 'Good afternoon', 'Mali', 'aw nee saw-go-mah', 'Morning greeting'),
('Kan bɛn', 'See you later', 'Hello', 'How are you', 'Mali', 'kan ben', 'Casual farewell');

-- Irish/Gaeilge phrases
INSERT INTO public.phrases (phrase_text, correct_meaning, incorrect1, incorrect2, language, pronunciation, notes) VALUES
('Sláinte', 'Health/Cheers', 'Hello', 'Goodbye', 'Irish', 'slawn-che', 'Toast or well-wish'),
('Céad míle fáilte', 'A hundred thousand welcomes', 'Good morning', 'How are you', 'Irish', 'kay-d mee-leh fall-che', 'Traditional Irish welcome'),
('Go raibh maith agat', 'Thank you', 'Please', 'Excuse me', 'Irish', 'guh rev mah ah-gut', 'Expression of gratitude'),
('Conas atá tú?', 'How are you?', 'What is your name?', 'Where are you from?', 'Irish', 'kun-us ah-taw too', 'Asking about wellbeing'),
('Slán', 'Goodbye', 'Hello', 'Thank you', 'Irish', 'slawn', 'Standard farewell');

-- Scottish phrases
INSERT INTO public.phrases (phrase_text, correct_meaning, incorrect1, incorrect2, language, pronunciation, notes) VALUES
('Ken', 'Know', 'See', 'Hear', 'Scottish', 'ken', 'Scottish word for know'),
('Wee', 'Small', 'Big', 'Medium', 'Scottish', 'wee', 'Scottish word for small'),
('Bonnie', 'Beautiful', 'Ugly', 'Average', 'Scottish', 'bon-ee', 'Scottish word for beautiful'),
('Aye', 'Yes', 'No', 'Maybe', 'Scottish', 'eye', 'Scottish word for yes'),
('Dinnae', 'Do not', 'Do', 'Will do', 'Scottish', 'din-ay', 'Scottish contraction for do not');

-- Hebrew phrases
INSERT INTO public.phrases (phrase_text, correct_meaning, incorrect1, incorrect2, language, pronunciation, notes) VALUES
('שלום', 'Peace/Hello', 'Goodbye', 'Thank you', 'Hebrew', 'shalom', 'Common Hebrew greeting'),
('תודה', 'Thank you', 'Please', 'You are welcome', 'Hebrew', 'toda', 'Expression of gratitude'),
('בסדר', 'Okay/Alright', 'Not okay', 'Perfect', 'Hebrew', 'be-se-der', 'Agreement or acceptance'),
('איך קוראים לך?', 'What is your name?', 'How are you?', 'Where are you from?', 'Hebrew', 'eich kor-im le-cha', 'Asking for someone''s name'),
('להתראות', 'See you later', 'Hello', 'Good night', 'Hebrew', 'le-hit-ra-ot', 'Casual goodbye');