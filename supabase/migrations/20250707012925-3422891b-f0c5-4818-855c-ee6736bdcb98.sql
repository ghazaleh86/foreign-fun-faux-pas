-- Remove simple greetings, thank you phrases, and basic vocabulary
-- These are direct translations rather than complex idioms or cultural expressions

DELETE FROM phrases WHERE 
-- Simple greetings (Hello, Hi)
correct_meaning ILIKE '%hello%' OR
correct_meaning ILIKE '%hi %' OR
correct_meaning = 'Hi' OR

-- Basic thank you phrases
correct_meaning ILIKE '%thank you%' OR
correct_meaning = 'Thank you' OR

-- Basic goodbye phrases  
correct_meaning ILIKE '%goodbye%' OR
correct_meaning = 'Goodbye' OR

-- Basic cheers/toasts
correct_meaning = 'Cheers' OR

-- Simple daily words
correct_meaning = 'Today' OR
correct_meaning = 'I am' OR
correct_meaning = 'Okay/Alright' OR
correct_meaning = 'Peace/Hello' OR

-- Single word emotions without complex cultural meaning
correct_meaning = 'Perseverance/persistence' OR

-- Simple greetings with basic meaning
correct_meaning ILIKE '%respectful greeting%' OR
correct_meaning ILIKE '%common greeting%' OR
correct_meaning ILIKE '%standard greeting%' OR
correct_meaning ILIKE '%informal greeting%' OR
correct_meaning ILIKE '%traditional greeting%' OR
correct_meaning ILIKE '%universal greeting%' OR

-- Remove simple insults that are just vocabulary
correct_meaning = 'Fool/idiot' OR
correct_meaning = 'Fool/dummy' OR

-- Simple expressions without cultural complexity
correct_meaning = 'Come on, let''s go, hurry up' OR
correct_meaning = 'I don''t know (with shoulder shrug)' OR

-- Keep only complex cultural expressions, idioms, and untranslatable concepts
-- Examples of what we KEEP:
-- - "Deep sorrow mixed with hope" (Han - Korean emotional complexity)
-- - "Cozy contentment and well-being" (Hygge - Danish cultural concept)  
-- - "Just the right amount, not too much or little" (Lagom - Swedish philosophy)
-- - "Butterflies in stomach from romance" (Kilig - untranslatable feeling)
-- - "Maybe it will work out somehow" (Avos - Russian optimistic negligence)
-- - "Untranslatable anguish of the soul" (Toska - Russian existential concept)
-- - "Fear of missing out" (FOMO - modern cultural phenomenon)
-- - Complex idioms like "Pearls before swine", "Armchair general", etc.