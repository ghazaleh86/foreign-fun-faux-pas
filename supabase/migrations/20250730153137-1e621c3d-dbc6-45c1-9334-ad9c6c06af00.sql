-- Fix literal translations and improve answer quality across all phrases

-- First, let's fix the French phrase "Avoir un chat dans la gorge" and similar issues
UPDATE phrases 
SET 
  correct_meaning = 'To have a frog in your throat',
  incorrect1 = 'To be very hungry',
  incorrect2 = 'To feel nervous'
WHERE phrase_text = 'Avoir un chat dans la gorge';

-- Fix German phrases with literal translations
UPDATE phrases 
SET 
  correct_meaning = 'That''s the end of it',
  incorrect1 = 'To cook dinner',
  incorrect2 = 'To start over'
WHERE phrase_text = 'Das ist das Ende der Fahnenstange';

UPDATE phrases 
SET 
  correct_meaning = 'That''s old news',
  incorrect1 = 'Fresh coffee brewing',
  incorrect2 = 'Morning routine'
WHERE phrase_text = 'Das ist kalter Kaffee';

-- Fix Spanish phrases
UPDATE phrases 
SET 
  correct_meaning = 'To die',
  incorrect1 = 'To climb mountains',
  incorrect2 = 'To clean shoes'
WHERE phrase_text = 'Estirar la pata';

UPDATE phrases 
SET 
  correct_meaning = 'To search everywhere',
  incorrect1 = 'To count money',
  incorrect2 = 'To study maps'
WHERE phrase_text = 'Buscar un tesoro';

-- Fix Dutch phrases
UPDATE phrases 
SET 
  correct_meaning = 'To eavesdrop',
  incorrect1 = 'To paint walls',
  incorrect2 = 'To lock doors'
WHERE phrase_text = 'Aan de deur luisteren';

UPDATE phrases 
SET 
  correct_meaning = 'To be in trouble',
  incorrect1 = 'To plant flowers',
  incorrect2 = 'To climb fences'
WHERE phrase_text = 'In de boom zitten';

-- Fix Italian phrases
UPDATE phrases 
SET 
  correct_meaning = 'To feel under the weather',
  incorrect1 = 'To cook pasta',
  incorrect2 = 'To study hard'
WHERE phrase_text = 'Essere giù di corda';

-- Fix Japanese phrases with proper English equivalents
UPDATE phrases 
SET 
  correct_meaning = 'The sky is blue',
  incorrect1 = 'Homework is delicious',
  incorrect2 = 'Elephants can sing opera'
WHERE phrase_text = 'Sora wa aoi desu';

UPDATE phrases 
SET 
  correct_meaning = 'It''s not a big deal',
  incorrect1 = 'Potatoes are dancing',
  incorrect2 = 'Secret handshakes exist'
WHERE phrase_text = 'Taishita koto ja nai';

-- Fix Mandarin phrases
UPDATE phrases 
SET 
  correct_meaning = 'Once in a blue moon',
  incorrect1 = 'Every single day',
  incorrect2 = 'Twice per hour'
WHERE phrase_text = 'Qiān nián yī yù' AND language = 'Mandarin';

UPDATE phrases 
SET 
  correct_meaning = 'To add insult to injury',
  incorrect1 = 'To heal quickly',
  incorrect2 = 'To celebrate success'
WHERE phrase_text = 'Luò jǐng xià shí' AND language = 'Mandarin';

-- Fix Korean phrases
UPDATE phrases 
SET 
  correct_meaning = 'When pigs fly',
  incorrect1 = 'Every morning at dawn',
  incorrect2 = 'During lunch breaks'
WHERE phrase_text = 'Haneul-e-seo byeol-i tteoreojil ttae' AND language = 'Korean';

-- Fix Portuguese phrases
UPDATE phrases 
SET 
  correct_meaning = 'To beat around the bush',
  incorrect1 = 'To water plants',
  incorrect2 = 'To count sheep'
WHERE phrase_text = 'Enrolar linguiça' AND language = 'Portuguese';

-- Fix Russian phrases
UPDATE phrases 
SET 
  correct_meaning = 'To work very hard',
  incorrect1 = 'To sleep deeply',
  incorrect2 = 'To eat slowly'
WHERE phrase_text = 'Как пчёлка трудиться' AND language = 'Russian';

-- Fix Hindi phrases
UPDATE phrases 
SET 
  correct_meaning = 'To be very angry',
  incorrect1 = 'To feel peaceful',
  incorrect2 = 'To smile gently'
WHERE phrase_text = 'आग बबूला होना' AND language = 'Hindi';

-- Fix Arabic phrases  
UPDATE phrases 
SET 
  correct_meaning = 'To mind your own business',
  incorrect1 = 'To share everything',
  incorrect2 = 'To ask many questions'
WHERE phrase_text = 'اهتم بشؤونك' AND language = 'Arabic';

-- Fix Swedish phrases with proper English equivalents
UPDATE phrases 
SET 
  correct_meaning = 'To take a coffee break',
  incorrect1 = 'To exercise vigorously',
  incorrect2 = 'To avoid responsibility'
WHERE phrase_text = 'Att ta en fika' AND language = 'Swedish';

-- Remove duplicate entries (keep only the best version of each phrase)
DELETE FROM phrases 
WHERE id IN (
  SELECT id FROM (
    SELECT id, 
           ROW_NUMBER() OVER (PARTITION BY phrase_text, language ORDER BY created_at DESC) as rn
    FROM phrases
  ) t 
  WHERE rn > 1
);

-- Fix any remaining grammar issues with articles
UPDATE phrases 
SET correct_meaning = CASE 
  WHEN correct_meaning = 'To have frog in throat' THEN 'To have a frog in your throat'
  WHEN correct_meaning = 'To have butterfly in stomach' THEN 'To have butterflies in your stomach'
  WHEN correct_meaning = 'To break ice' THEN 'To break the ice'
  WHEN correct_meaning = 'To spill beans' THEN 'To spill the beans'
  WHEN correct_meaning = 'To let cat out of bag' THEN 'To let the cat out of the bag'
  ELSE correct_meaning
END
WHERE correct_meaning LIKE '%frog in throat%' 
   OR correct_meaning LIKE '%butterfly in stomach%'
   OR correct_meaning LIKE '%break ice%'
   OR correct_meaning LIKE '%spill beans%'
   OR correct_meaning LIKE '%cat out of bag%';