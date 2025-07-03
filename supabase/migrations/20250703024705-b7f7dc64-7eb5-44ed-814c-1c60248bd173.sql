-- Fix the Polish phrase to remove literal translation from options
UPDATE phrases 
SET incorrect1 = 'To be very hungry'
WHERE phrase_text = 'Mieć muchy w nosie' AND incorrect1 = 'To have flies in your nose';

-- Let's also check for other similar patterns and fix them
-- Look for any other phrases where literal translations might be showing up

-- Update any other problematic literal translations we can identify
UPDATE phrases 
SET incorrect2 = 'To feel dizzy'
WHERE phrase_text = 'Mieć muchy w nosie' AND incorrect2 = 'To have allergies';