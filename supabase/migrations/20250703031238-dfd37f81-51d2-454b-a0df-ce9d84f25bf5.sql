-- Replace literal translations in incorrect options with clearly wrong meanings

-- Spanish phrase "Buscarle tres pies al gato" - replace literal translation option
UPDATE phrases 
SET incorrect2 = 'To search for buried treasure'
WHERE phrase_text = 'Buscarle tres pies al gato' AND incorrect2 = 'To count cat legs';

-- Spanish phrase "Estar en las nubes" - replace literal translation option  
UPDATE phrases 
SET incorrect1 = 'To pilot a helicopter'
WHERE phrase_text = 'Estar en las nubes' AND incorrect1 = 'To be on an airplane';

-- Spanish phrase "No tener pelos en la lengua" - replace literal translation option
UPDATE phrases 
SET incorrect1 = 'To have excellent dental hygiene'
WHERE phrase_text = 'No tener pelos en la lengua' AND incorrect1 = 'To brush your tongue with fur';

-- Arabic phrase "العين بصيرة واليد قصيرة" - replace literal translation option
UPDATE phrases 
SET incorrect2 = 'Exercise helps health' 
WHERE phrase_text = 'العين بصيرة واليد قصيرة' AND incorrect2 = 'Short arms problem';

-- German phrase "Kätzchenjammer" - replace literal translation option  
UPDATE phrases 
SET incorrect1 = 'A fancy dinner party'
WHERE phrase_text = 'Kätzchenjammer' AND incorrect1 = 'A kitten''s opera';