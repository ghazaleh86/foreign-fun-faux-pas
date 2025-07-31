-- Fix remaining Danish literal translation issues
-- Update the most critical phrase that was specifically mentioned in the issue

UPDATE phrases SET 
    correct_meaning = 'Don''t count your chickens before they hatch',
    incorrect1 = 'Always plan ahead',
    incorrect2 = 'Act immediately'
WHERE id = '5f9ef1a1-7dd9-4969-8d8f-d1a1f69d972d' AND phrase_text = 'Man skal ikke sælge skindet, før bjørnen er skudt';

-- Fix "At komme på glatis" - should be about getting into trouble, not literal ice
UPDATE phrases SET 
    correct_meaning = 'To get into trouble',
    incorrect1 = 'To go ice skating',
    incorrect2 = 'To slip and fall'
WHERE id = '47719516-c6c7-4014-854c-6d86d9c52cdc' AND phrase_text = 'At komme på glatis';

-- Fix other problematic literal translations
UPDATE phrases SET 
    correct_meaning = 'To do two things at once',
    incorrect1 = 'To kill insects',
    incorrect2 = 'To use a fly swatter'
WHERE id = 'aafec86b-7ca7-4376-a626-3bb56aefd0b9' AND phrase_text = 'At slå to fluer med et smæk';

UPDATE phrases SET 
    correct_meaning = 'To beat around the bush',
    incorrect1 = 'To feed a cat',
    incorrect2 = 'To cook porridge'
WHERE id = '77a148ec-6d4a-415b-9839-f2208782994c' AND phrase_text = 'At gå som katten om den varme grød';

UPDATE phrases SET 
    correct_meaning = 'To offer valuable things to those who can''t appreciate them',
    incorrect1 = 'To waste expensive jewelry',
    incorrect2 = 'To feed farm animals'
WHERE id = '58264dbe-3ac9-4777-89b3-0e8259d2ecdd' AND phrase_text = 'At kaste perler for svin';