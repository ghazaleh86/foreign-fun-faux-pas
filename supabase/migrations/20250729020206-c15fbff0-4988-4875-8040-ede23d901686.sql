-- Fix Cantonese and Mandarin phrases with incorrect meanings or pronunciations

-- Fix any Cantonese phrases that may have issues
-- The phrase "有錢使得鬼推磨" appears to be correct, but let's verify all meanings

-- Update Cantonese phrase meanings to be more accurate
UPDATE phrases 
SET correct_meaning = 'Money talks / Money can make even spirits work'
WHERE phrase_text = '有錢使得鬼推磨' AND language = 'cantonese';

-- Ensure all other Cantonese phrases have proper meanings
UPDATE phrases 
SET correct_meaning = 'Attempting something dishonest but failing and losing what you had'
WHERE phrase_text = '偷雞不成蝕把米' AND language = 'cantonese';

UPDATE phrases 
SET correct_meaning = 'Truth cannot be hidden / Lies will be exposed'
WHERE phrase_text = '紙包不住火' AND language = 'cantonese';

-- Fix Mandarin phrase that might have pronunciation issues
-- Verify the traditional character version matches the meaning
UPDATE phrases 
SET correct_meaning = 'Making futile efforts / Wasting time on something impossible'
WHERE phrase_text = '對牛彈琴' AND language = 'mandarin';

-- Ensure consistency in Mandarin pronunciations with tone marks
UPDATE phrases 
SET pronunciation = 'jǐng dǐ zhī wā'
WHERE phrase_text = '井底之蛙' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'wáng yáng bǔ láo'
WHERE phrase_text = '亡羊補牢' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'sài wēng shī mǎ, yān zhī fēi fú'
WHERE phrase_text = '塞翁失馬，焉知非福' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'shǒu zhū dài tù'
WHERE phrase_text = '守株待兔' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'duì niú tán qín'
WHERE phrase_text = '對牛彈琴' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'huà shé tiān zú'
WHERE phrase_text = '畫蛇添足' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'pò fǔ chén zhōu'
WHERE phrase_text = '破釜沉舟' AND language = 'mandarin';

UPDATE phrases 
SET pronunciation = 'tiě chǔ mó chéng zhēn'
WHERE phrase_text = '鐵杵磨成針' AND language = 'mandarin';