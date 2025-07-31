-- Fix Danish literal translations to proper idiomatic meanings
-- Update phrases that show literal translations instead of actual meanings

UPDATE phrases SET 
    correct_meaning = 'Raining heavily',
    incorrect1 = 'Light drizzle',
    incorrect2 = 'Sunny weather'
WHERE id = 'b15b6552-bf77-42d8-901a-3bafd9ab955a' AND phrase_text = 'Det regner skomagerdrenge';

UPDATE phrases SET 
    correct_meaning = 'Very windy',
    incorrect1 = 'Calm weather',
    incorrect2 = 'Slightly breezy'
WHERE id = '7e95e1ea-7236-441e-a330-90ad5521c67a' AND phrase_text = 'Det blæser en halv pelikan';

UPDATE phrases SET 
    correct_meaning = 'Something is suspicious',
    incorrect1 = 'Everything is normal',
    incorrect2 = 'Great opportunity'
WHERE id = 'e44edb11-eb70-4e91-b02c-478784e53c68' AND phrase_text = 'Der er ugler i mosen';

UPDATE phrases SET 
    correct_meaning = 'That''s the middle of nowhere',
    incorrect1 = 'A popular destination',
    incorrect2 = 'The city center'
WHERE id = '8cf1098e-56da-4b1d-83da-ea92f8554710' AND phrase_text = 'Det er der, hvor kragen vender';

-- Also fix some other problematic literal translations
UPDATE phrases SET 
    correct_meaning = 'To be very tired',
    incorrect1 = 'To be energetic',
    incorrect2 = 'To be confused'
WHERE id = 'b1d47d3a-0b63-47b1-82be-b8199aee2254' AND phrase_text = 'At være træt som en ko';

UPDATE phrases SET 
    correct_meaning = 'To be completely confused',
    incorrect1 = 'To be very focused',
    incorrect2 = 'To be well organized'
WHERE id = '39e374be-48b0-4126-8a69-2291b1bb7a50' AND phrase_text = 'At være helt hen i vejret';

UPDATE phrases SET 
    correct_meaning = 'There''s not much difference',
    incorrect1 = 'They are completely different',
    incorrect2 = 'One is much better'
WHERE id = 'eceff90d-18f3-480e-8529-89b65d95c834' AND phrase_text = 'Der er ikke langt mellem bark og træ';