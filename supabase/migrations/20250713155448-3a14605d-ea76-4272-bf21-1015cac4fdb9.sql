-- Remove all simple greetings, basic vocabulary, and common phrases
-- Keep only complex idioms, cultural expressions, and untranslatable concepts

DELETE FROM phrases WHERE 
-- Simple greetings and farewells
correct_meaning ILIKE '%hello%' OR
correct_meaning ILIKE '%hi %' OR
correct_meaning = 'Hi' OR
correct_meaning ILIKE '%goodbye%' OR
correct_meaning = 'Goodbye' OR
correct_meaning ILIKE '%good day%' OR
correct_meaning = 'Good day' OR
correct_meaning ILIKE '%good morning%' OR
correct_meaning ILIKE '%good evening%' OR
correct_meaning ILIKE '%good night%' OR
correct_meaning ILIKE '%see you%' OR
correct_meaning ILIKE '%farewell%' OR
correct_meaning ILIKE '%greetings%' OR
correct_meaning ILIKE '%respectful greeting%' OR
correct_meaning ILIKE '%common greeting%' OR

-- Basic thank you and politeness
correct_meaning ILIKE '%thank you%' OR
correct_meaning = 'Thank you' OR
correct_meaning ILIKE '%please%' OR
correct_meaning = 'Please' OR
correct_meaning ILIKE '%excuse me%' OR
correct_meaning = 'Excuse me' OR
correct_meaning ILIKE '%sorry%' OR
correct_meaning = 'Sorry' OR

-- Basic questions and responses  
correct_meaning ILIKE '%how are you%' OR
correct_meaning ILIKE '%what is your name%' OR
correct_meaning ILIKE '%what''s your name%' OR
correct_meaning ILIKE '%my name is%' OR
correct_meaning ILIKE '%i am %' OR
correct_meaning = 'I am' OR
correct_meaning ILIKE '%how much%' OR
correct_meaning ILIKE '%how much does it cost%' OR
correct_meaning ILIKE '%how much money%' OR
correct_meaning ILIKE '%what''s happening%' OR

-- Basic understanding phrases
correct_meaning ILIKE '%i don''t understand%' OR
correct_meaning ILIKE '%i cannot understand%' OR
correct_meaning ILIKE '%i do not understand%' OR
correct_meaning ILIKE '%can you speak english%' OR
correct_meaning ILIKE '%do you speak%' OR

-- Simple emotions without cultural complexity
correct_meaning = 'Love' OR
correct_meaning = 'Happy New Year' OR
correct_meaning = 'Cheers' OR

-- Basic directional or simple concepts
correct_meaning = 'Today' OR
correct_meaning = 'Perseverance/persistence' OR
correct_meaning = 'You are an apple' OR

-- Religious basics without cultural depth
correct_meaning ILIKE '%peace be upon you%' OR
correct_meaning ILIKE '%may god bless%' OR
correct_meaning ILIKE '%god willing%' OR
correct_meaning ILIKE '%god help%' OR

-- Simple descriptions
correct_meaning = 'Pickup truck' OR
correct_meaning ILIKE '%cool/awesome%' OR
correct_meaning ILIKE '%pure life%' OR

-- Keep complex cultural expressions like:
-- - Hygge (Danish cozy contentment) 
-- - Sisu (Finnish stubborn determination)
-- - Schadenfreude (German joy from others' misfortune)
-- - Petrichor (English smell of earth after rain)
-- - FOMO (Fear of missing out)
-- - Complex idioms and untranslatable cultural concepts
-- - Expressions that require cultural context to understand
-- - Phrases that cannot be directly translated word-for-word