-- Update Cantonese pronunciations to use proper Jyutping romanization (native Cantonese accent)

UPDATE phrases 
SET pronunciation = 'jau5 cin4 sai2 dak1 gwai2 teoi1 mo4'
WHERE phrase_text = '有錢使得鬼推磨' AND language = 'cantonese';

UPDATE phrases 
SET pronunciation = 'tau1 gai1 bat1 sing4 sit6 baa2 mai5'
WHERE phrase_text = '偷雞不成蝕把米' AND language = 'cantonese';

UPDATE phrases 
SET pronunciation = 'zi2 baau1 bat1 zyu6 fo2'
WHERE phrase_text = '紙包不住火' AND language = 'cantonese';