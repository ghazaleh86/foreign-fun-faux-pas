-- Fix remaining Hindi phrases with literal translations instead of English idiom equivalents

-- जल में रहकर मगर से बैर (fighting crocodile while living in water)
UPDATE phrases 
SET correct_meaning = 'Biting the hand that feeds you',
    incorrect1 = 'Fighting someone you depend on',
    incorrect2 = 'Swimming with crocodiles is dangerous'
WHERE phrase_text = 'जल में रहकर मगर से बैर' AND language = 'Hindi';

-- अंधे की लाठी (blind person's stick) 
UPDATE phrases 
SET correct_meaning = 'Someone's only support',
    incorrect1 = 'Walking stick for blind',
    incorrect2 = 'Wooden support beam'
WHERE phrase_text = 'अंधे की लाठी' AND language = 'Hindi';

-- खुद की खुदाई (digging oneself)
UPDATE phrases 
SET correct_meaning = 'Digging your own grave',
    incorrect1 = 'Self excavation project',
    incorrect2 = 'Personal mining operation'
WHERE phrase_text = 'खुद की खुदाई' AND language = 'Hindi';

-- चार दिन की चांदनी (four days of moonlight)
UPDATE phrases 
SET correct_meaning = 'Short-lived fame',
    incorrect1 = 'Four nights of brightness',
    incorrect2 = 'Lunar calendar event'
WHERE phrase_text = 'चार दिन की चांदनी' AND language = 'Hindi';

-- नाक में दम (breath in nose)
UPDATE phrases 
SET correct_meaning = 'Fed up to the back teeth',
    incorrect1 = 'Breathing through nose only',
    incorrect2 = 'Nasal congestion problem'
WHERE phrase_text = 'नाक में दम' AND language = 'Hindi';

-- आंखों का तारा (star of the eyes)
UPDATE phrases 
SET correct_meaning = 'Apple of one''s eye',
    incorrect1 = 'Eye examination chart',
    incorrect2 = 'Bright star reflection'
WHERE phrase_text = 'आंखों का तारा' AND language = 'Hindi';

-- कान में तेल डालना (pouring oil in ears)
UPDATE phrases 
SET correct_meaning = 'Turn a deaf ear',
    incorrect1 = 'Ear wax removal method',
    incorrect2 = 'Traditional ear treatment'
WHERE phrase_text = 'कान में तेल डालना' AND language = 'Hindi';

-- गले का हार (necklace of the throat)
UPDATE phrases 
SET correct_meaning = 'Pride and joy',
    incorrect1 = 'Expensive jewelry piece',
    incorrect2 = 'Throat decoration item'
WHERE phrase_text = 'गले का हार' AND language = 'Hindi';

-- सिर पर सवार (riding on head)
UPDATE phrases 
SET correct_meaning = 'Being a pain in the neck',
    incorrect1 = 'Sitting on shoulders',
    incorrect2 = 'Head balancing act'
WHERE phrase_text = 'सिर पर सवार' AND language = 'Hindi';

-- हाथी के दांत (elephant's teeth)
UPDATE phrases 
SET correct_meaning = 'Two-faced',
    incorrect1 = 'Large ivory tusks',
    incorrect2 = 'Elephant dental care'
WHERE phrase_text = 'हाथी के दांत' AND language = 'Hindi';