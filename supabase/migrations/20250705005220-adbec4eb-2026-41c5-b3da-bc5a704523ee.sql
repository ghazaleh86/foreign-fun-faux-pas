
-- Add major Indian language phrases with proper difficulty distribution
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
-- Hindi phrases (difficulty 1-5)
('नमस्ते', 'hindi', 'na-mas-tay', 'hello/goodbye (respectful greeting)', 'thank you very much', 'where is the bathroom', 1, 'Most common Hindi greeting'),
('धन्यवाद', 'hindi', 'dhan-ya-vaad', 'thank you', 'excuse me please', 'how much does it cost', 2, 'Formal way to say thank you'),
('कितना पैसा', 'hindi', 'kit-na pai-sa', 'how much money', 'what time is it', 'I am very hungry', 3, 'Essential for shopping'),
('मुझे समझ नहीं आया', 'hindi', 'mu-jhe samajh na-hee aa-ya', 'I do not understand', 'the weather is nice today', 'where can I find help', 4, 'Useful when confused'),
('क्या आप अंग्रेजी बोल सकते हैं', 'hindi', 'kya aap an-gre-zi bol sak-te hain', 'can you speak English', 'I need medical assistance immediately', 'the train is running late', 5, 'Complex conversational phrase'),

-- Bengali phrases (difficulty 1-5)
('নমস্কার', 'bengali', 'no-mosh-kar', 'hello (respectful greeting)', 'see you tomorrow', 'please help me', 1, 'Traditional Bengali greeting'),
('ধন্যবাদ', 'bengali', 'dhon-no-baad', 'thank you', 'good morning friend', 'how are your parents', 2, 'Polite expression of gratitude'),
('কত টাকা', 'bengali', 'ko-to ta-ka', 'how much money', 'when does it start', 'where is my luggage', 3, 'Essential for transactions'),
('আমি বুঝতে পারছি না', 'bengali', 'aa-mi bujh-te par-chi na', 'I cannot understand', 'the food tastes amazing', 'we should leave early', 4, 'Expression of confusion'),
('আপনি কি ইংরেজি বলতে পারেন', 'bengali', 'aap-ni ki ing-re-ji bol-te pa-ren', 'can you speak English', 'I have never been here before', 'the meeting starts at noon', 5, 'Complex language inquiry'),

-- Tamil phrases (difficulty 1-5)
('வணக்கம்', 'tamil', 'va-nak-kam', 'hello/greetings', 'goodbye my friend', 'please wait here', 1, 'Universal Tamil greeting'),
('நன்றி', 'tamil', 'nan-ri', 'thank you', 'excuse me sir', 'what is your name', 2, 'Simple gratitude expression'),
('எவ்வளவு பணம்', 'tamil', 'ev-va-la-vu pa-nam', 'how much money', 'which way to go', 'is this seat taken', 3, 'Money-related question'),
('எனக்கு புரியவில்லை', 'tamil', 'e-nak-ku pu-ri-ya-vil-lai', 'I do not understand', 'the weather is perfect today', 'let us meet again soon', 4, 'Expression of non-comprehension'),
('நீங்கள் ஆங்கிலம் பேச முடியுமா', 'tamil', 'nee-nga an-gi-lam pe-cha mu-di-yu-ma', 'can you speak English', 'I would like to make a reservation', 'the ceremony will begin shortly', 5, 'Complex conversational request'),

-- Telugu phrases (difficulty 1-5)
('నమస్కారం', 'telugu', 'na-mas-ka-ram', 'hello/greetings', 'good night everyone', 'please come inside', 1, 'Traditional Telugu greeting'),
('ధన్యవాదాలు', 'telugu', 'dhan-ya-vaa-da-lu', 'thank you', 'how is everything', 'where are you going', 2, 'Polite thanks expression'),
('ఎంత డబ్బు', 'telugu', 'en-ta dab-bu', 'how much money', 'what time now', 'do you have water', 3, 'Essential pricing question'),
('నాకు అర్థం కావడం లేదు', 'telugu', 'naa-ku ar-tham kaa-va-dam le-du', 'I do not understand', 'the movie was excellent', 'we need to hurry up', 4, 'Statement of confusion'),
('మీరు ఇంగ్లీష్ మాట్లాడగలరా', 'telugu', 'mee-ru ing-leesh maat-laa-da-ga-la-ra', 'can you speak English', 'I am looking for my family', 'the festival is very beautiful', 5, 'Complex language inquiry'),

-- Marathi phrases (difficulty 1-5)
('नमस्कार', 'marathi', 'na-mas-kaar', 'hello/greetings', 'see you later', 'please sit down', 1, 'Common Marathi greeting'),
('धन्यवाद', 'marathi', 'dhan-ya-vaad', 'thank you', 'good morning all', 'how was your day', 2, 'Expression of gratitude'),
('किती पैसे', 'marathi', 'ki-ti pai-se', 'how much money', 'where is this place', 'can I help you', 3, 'Money inquiry'),
('मला समजत नाही', 'marathi', 'ma-la sa-ma-jat naa-hi', 'I do not understand', 'the food is delicious', 'let us go together', 4, 'Expression of non-understanding'),
('तुम्ही इंग्रजी बोलू शकता का', 'marathi', 'tum-hi ing-ra-ji bo-lu sha-ka-ta ka', 'can you speak English', 'I need to find the hospital', 'the celebration is tomorrow', 5, 'Complex conversational question'),

-- Gujarati phrases (difficulty 1-5)
('નમસ્તે', 'gujarati', 'na-mas-te', 'hello/greetings', 'have a good day', 'please wait outside', 1, 'Traditional Gujarati greeting'),
('આભાર', 'gujarati', 'aa-bhaar', 'thank you', 'excuse me please', 'what is happening', 2, 'Simple thank you'),
('કેટલા પૈસા', 'gujarati', 'ket-la pai-sa', 'how much money', 'which bus to take', 'is everything okay', 3, 'Pricing question'),
('મને સમજાતું નથી', 'gujarati', 'ma-ne sa-ma-jaa-tum na-thi', 'I do not understand', 'the weather is lovely', 'we should celebrate tonight', 4, 'Statement of confusion'),
('શું તમે અંગ્રેજી બોલી શકો છો', 'gujarati', 'shum ta-me an-gre-ji bo-li sha-ko cho', 'can you speak English', 'I am trying to locate my friend', 'the performance was outstanding', 5, 'Complex language request'),

-- Punjabi phrases (difficulty 1-5)
('ਸਤ ਸ੍ਰੀ ਅਕਾਲ', 'punjabi', 'sat shree a-kaal', 'hello/greetings (Sikh greeting)', 'goodbye my friend', 'please come here', 1, 'Traditional Punjabi/Sikh greeting'),
('ਧੰਨਵਾਦ', 'punjabi', 'dhan-va-aad', 'thank you', 'good evening sir', 'how are you doing', 2, 'Expression of thanks'),
('ਕਿੰਨੇ ਪੈਸੇ', 'punjabi', 'kin-ne pai-se', 'how much money', 'what is the time', 'where is the market', 3, 'Money-related inquiry'),
('ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਈ', 'punjabi', 'mai-nu sa-majh na-hee aa-ee', 'I do not understand', 'the music is beautiful', 'let us eat together', 4, 'Expression of non-comprehension'),
('ਕੀ ਤੁਸੀਂ ਅੰਗ੍ਰੇਜ਼ੀ ਬੋਲ ਸਕਦੇ ਹੋ', 'punjabi', 'kee tu-seen an-gre-zi bol sak-de ho', 'can you speak English', 'I would like to visit the temple', 'the wedding is next week', 5, 'Complex conversational question'),

-- Urdu phrases (difficulty 1-5)
('السلام علیکم', 'urdu', 'as-sa-laam a-lai-kum', 'peace be upon you (greeting)', 'have a safe journey', 'please forgive me', 1, 'Traditional Islamic greeting'),
('شکریہ', 'urdu', 'shu-kri-ya', 'thank you', 'good luck today', 'where are you from', 2, 'Simple gratitude'),
('کتنے پیسے', 'urdu', 'kit-ne pai-se', 'how much money', 'when will you return', 'is this the right way', 3, 'Pricing inquiry'),
('مجھے سمجھ نہیں آیا', 'urdu', 'mu-jhe sa-majh na-hee aa-ya', 'I do not understand', 'the book is interesting', 'we must leave soon', 4, 'Statement of confusion'),
('کیا آپ انگریزی بول سکتے ہیں', 'urdu', 'kya aap an-gre-zi bol sak-te hain', 'can you speak English', 'I am searching for my keys', 'the event was memorable', 5, 'Complex language request');
