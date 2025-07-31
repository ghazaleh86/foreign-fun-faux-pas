-- Convert romanized Japanese and Korean phrases to native scripts for accurate pronunciation

-- Japanese phrases - Convert romanized to native script
UPDATE phrases 
SET phrase_text = '雨降って地固まる'
WHERE phrase_text = 'Ame futte ji katamaru' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '出る杭は打たれる'
WHERE phrase_text = 'Deru kugi wa utareru' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '百聞は一見に如かず'
WHERE phrase_text = 'Hyaku wen wa ikken ni shikazu' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '一期一会'
WHERE phrase_text = 'Ichi go ichi e' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '生き甲斐'
WHERE phrase_text = 'Ikigai' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '鰯の頭も信心から'
WHERE phrase_text = 'Iwashi no atama mo shinjin kara' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '可愛い子には旅をさせろ'
WHERE phrase_text = 'Kawaii ko ni wa tabi wo sasero' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '聞いて極楽見て地獄'
WHERE phrase_text = 'Kiite gokuraku mite jigoku' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '金継ぎ'
WHERE phrase_text = 'Kintsugi' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = 'もののあわれ'
WHERE phrase_text = 'Mono no aware' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '七転び八起き'
WHERE phrase_text = 'Nana korobi ya oki' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '猫に小判'
WHERE phrase_text = 'Neko ni koban' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '猫の手も借りたい'
WHERE phrase_text = 'Neko no te mo karitai' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '猿も木から落ちる'
WHERE phrase_text = 'Saru mo ki kara ochiru' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '仕方がない'
WHERE phrase_text = 'Shikata ga nai' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '積ん読'
WHERE phrase_text = 'Tsundoku' AND language = 'japanese';

UPDATE phrases 
SET phrase_text = '嘘も方便'
WHERE phrase_text = 'Uso mo houben' AND language = 'japanese';

-- Korean phrases - Convert romanized to Hangul
UPDATE phrases 
SET phrase_text = '애교'
WHERE phrase_text = 'Aegyo' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '밥은 먹었나'
WHERE phrase_text = 'Bap-eun meok-eoss-na' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '보리차'
WHERE phrase_text = 'Bori-cha' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '치맥'
WHERE phrase_text = 'Chimaek' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '된장녀'
WHERE phrase_text = 'Doenjang-nyeo' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '파이팅'
WHERE phrase_text = 'Fighting' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '개쓰기짝'
WHERE phrase_text = 'Gae-sseugi-jjak' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '한'
WHERE phrase_text = 'Han' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '혼자'
WHERE phrase_text = 'Honja' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '화병'
WHERE phrase_text = 'Hwa-byeong' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '정'
WHERE phrase_text = 'Jeong' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '정적'
WHERE phrase_text = 'Jeong-jeok' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '깝'
WHERE phrase_text = 'Kkab' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '망나니'
WHERE phrase_text = 'Mangnani' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '눈치'
WHERE phrase_text = 'Nun-chi' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '눈치'
WHERE phrase_text = 'Nunchi' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '오빠'
WHERE phrase_text = 'Oppa' AND language = 'korean';

UPDATE phrases 
SET phrase_text = '상친'
WHERE phrase_text = 'Sang-chin' AND language = 'korean';