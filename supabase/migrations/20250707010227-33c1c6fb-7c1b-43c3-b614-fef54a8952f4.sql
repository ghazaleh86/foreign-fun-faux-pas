
-- Update basic phrases with semantically orthogonal incorrect options
-- Phase 1: Greetings and Basic Courtesy Words

-- Hindi greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the purple elephant is dancing wildly',
  incorrect2 = 'my computer needs more coffee today'
WHERE phrase_text = 'नमस्ते' AND language = 'hindi';

UPDATE phrases SET 
  incorrect1 = 'seventeen flying bicycles crashed yesterday',
  incorrect2 = 'the refrigerator speaks fluent mathematics'
WHERE phrase_text = 'धन्यवाद' AND language = 'hindi';

-- Bengali greetings and courtesy  
UPDATE phrases SET 
  incorrect1 = 'the green spaceship landed quietly',
  incorrect2 = 'my sandwich discusses quantum physics'
WHERE phrase_text = 'নমস্কার' AND language = 'bengali';

UPDATE phrases SET 
  incorrect1 = 'forty-two singing telescopes appeared suddenly',
  incorrect2 = 'the washing machine dreams of vacation'
WHERE phrase_text = 'ধন্যবাদ' AND language = 'bengali';

-- Tamil greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the red tornado juggles pineapples',
  incorrect2 = 'my calculator enjoys classical music'
WHERE phrase_text = 'வணக்கம்' AND language = 'tamil';

UPDATE phrases SET 
  incorrect1 = 'ninety-seven frozen bananas exploded peacefully',
  incorrect2 = 'the microwave teaches advanced chemistry'
WHERE phrase_text = 'நன்றி' AND language = 'tamil';

-- Telugu greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the blue helicopter swims underwater',
  incorrect2 = 'my toaster writes romantic poetry'
WHERE phrase_text = 'నమస్కారం' AND language = 'telugu';

UPDATE phrases SET 
  incorrect1 = 'seventy-three bouncing umbrellas disappeared mysteriously',
  incorrect2 = 'the dishwasher practices professional wrestling'
WHERE phrase_text = 'ధన్యవాదాలు' AND language = 'telugu';

-- Marathi greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the orange submarine flies backwards',
  incorrect2 = 'my lamp studies ancient philosophy'
WHERE phrase_text = 'नमस्कार' AND language = 'marathi';

UPDATE phrases SET 
  incorrect1 = 'twelve spinning donuts solved calculus',
  incorrect2 = 'the vacuum cleaner speaks seven languages'
WHERE phrase_text = 'धन्यवाद' AND language = 'marathi';

-- Gujarati greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the yellow earthquake tickles softly',
  incorrect2 = 'my stapler enjoys mountain climbing'
WHERE phrase_text = 'નમસ્તે' AND language = 'gujarati';

UPDATE phrases SET 
  incorrect1 = 'fifty-eight dancing pencils melted accidentally',
  incorrect2 = 'the printer meditates on weekends'
WHERE phrase_text = 'આભાર' AND language = 'gujarati';

-- Punjabi greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the pink volcano whispers secrets',
  incorrect2 = 'my scissors collect vintage stamps'
WHERE phrase_text = 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ' AND language = 'punjabi';

UPDATE phrases SET 
  incorrect1 = 'thirty-four floating hammers sang opera',
  incorrect2 = 'the blender studies marine biology'
WHERE phrase_text = 'ਧੰਨਵਾਦ' AND language = 'punjabi';

-- Urdu greetings and courtesy
UPDATE phrases SET 
  incorrect1 = 'the silver lightning bolt knits sweaters',
  incorrect2 = 'my ruler practices interpretive dance'
WHERE phrase_text = 'السلام علیکم' AND language = 'urdu';

UPDATE phrases SET 
  incorrect1 = 'eighty-one giggling mirrors cracked simultaneously',
  incorrect2 = 'the coffee maker runs a book club'
WHERE phrase_text = 'شکریہ' AND language = 'urdu';

-- Phase 2: Money/Shopping phrases with orthogonal options

-- Hindi money phrase
UPDATE phrases SET 
  incorrect1 = 'the invisible rainbow tastes like Tuesday',
  incorrect2 = 'my shoelaces are plotting world domination'
WHERE phrase_text = 'कितना पैसा' AND language = 'hindi';

-- Bengali money phrase  
UPDATE phrases SET 
  incorrect1 = 'the backwards clock sneezes colorfully',
  incorrect2 = 'my paperclip dreams of becoming famous'
WHERE phrase_text = 'কত টাকা' AND language = 'bengali';

-- Tamil money phrase
UPDATE phrases SET 
  incorrect1 = 'the upside-down elephant plays chess',
  incorrect2 = 'my spoon practices competitive swimming'
WHERE phrase_text = 'எவ்வளவு பணம்' AND language = 'tamil';

-- Telugu money phrase
UPDATE phrases SET 
  incorrect1 = 'the transparent fish drives a taxi',
  incorrect2 = 'my fork studies international diplomacy'
WHERE phrase_text = 'ఎంత డబ్బు' AND language = 'telugu';

-- Marathi money phrase
UPDATE phrases SET 
  incorrect1 = 'the squared circle melts on Sundays',
  incorrect2 = 'my plate teaches ballet lessons'
WHERE phrase_text = 'किती पैसे' AND language = 'marathi';

-- Gujarati money phrase
UPDATE phrases SET 
  incorrect1 = 'the frozen thunder laughs mechanically',
  incorrect2 = 'my cup organizes protest marches'
WHERE phrase_text = 'કેટલા પૈસા' AND language = 'gujarati';

-- Punjabi money phrase
UPDATE phrases SET 
  incorrect1 = 'the liquid mountain grows sideways',
  incorrect2 = 'my knife collects rare butterflies'
WHERE phrase_text = 'ਕਿੰਨੇ ਪੈਸੇ' AND language = 'punjabi';

-- Urdu money phrase
UPDATE phrases SET 
  incorrect1 = 'the magnetic sunset barks loudly',
  incorrect2 = 'my bowl performs stand-up comedy'
WHERE phrase_text = 'کتنے پیسے' AND language = 'urdu';

-- Phase 3: Understanding/Confusion phrases with orthogonal options

-- Hindi understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the polka-dotted earthquake juggles fire',
  incorrect2 = 'my keyboard grows organic vegetables'
WHERE phrase_text = 'मुझे समझ नहीं आया' AND language = 'hindi';

-- Bengali understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the striped tornado plays violin',
  incorrect2 = 'my mouse trains circus elephants'
WHERE phrase_text = 'আমি বুঝতে পারছি না' AND language = 'bengali';

-- Tamil understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the checkered avalanche tells jokes',
  incorrect2 = 'my monitor breeds tropical fish'
WHERE phrase_text = 'எனக்கு புரியவில்லை' AND language = 'tamil';

-- Telugu understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the spiral blizzard performs magic tricks',
  incorrect2 = 'my headphones run a small restaurant'
WHERE phrase_text = 'నాకు అర్థం కావడం లేదు' AND language = 'telugu';

-- Marathi understanding phrase  
UPDATE phrases SET 
  incorrect1 = 'the zigzag tsunami paints portraits',
  incorrect2 = 'my webcam teaches cooking classes'
WHERE phrase_text = 'मला समजत नाही' AND language = 'marathi';

-- Gujarati understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the hexagonal hurricane knits scarves',
  incorrect2 = 'my speaker writes detective novels'
WHERE phrase_text = 'મને સમજાતું નથી' AND language = 'gujarati';

-- Punjabi understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the twisted windstorm bakes cookies',
  incorrect2 = 'my printer studies ancient languages'
WHERE phrase_text = 'ਮੈਨੂੰ ਸਮਝ ਨਹੀਂ ਆਈ' AND language = 'punjabi';

-- Urdu understanding phrase
UPDATE phrases SET 
  incorrect1 = 'the curved sandstorm plays baseball',
  incorrect2 = 'my scanner collects vintage coins'
WHERE phrase_text = 'مجھے سمجھ نہیں آیا' AND language = 'urdu';

-- Phase 4: English capability phrases with orthogonal options

-- Hindi English phrase
UPDATE phrases SET 
  incorrect1 = 'the holographic rainbow tastes like geometry',
  incorrect2 = 'my paperweight operates a time machine'
WHERE phrase_text = 'क्या आप अंग्रेजी बोल सकते हैं' AND language = 'hindi';

-- Bengali English phrase
UPDATE phrases SET 
  incorrect1 = 'the levitating square dances with gravity',
  incorrect2 = 'my eraser manages a jazz orchestra'
WHERE phrase_text = 'আপনি কি ইংরেজি বলতে পারেন' AND language = 'bengali';

-- Tamil English phrase
UPDATE phrases SET 
  incorrect1 = 'the multiplying triangle sings opera backwards',
  incorrect2 = 'my stapler directs documentary films'
WHERE phrase_text = 'நீங்கள் ஆங்கிலம் பேச முடியுமா' AND language = 'tamil';

-- Telugu English phrase
UPDATE phrases SET 
  incorrect1 = 'the dividing pentagon writes love letters',
  incorrect2 = 'my clipboard hosts cooking shows'
WHERE phrase_text = 'మీరు ఇంగ్లీష్ మాట్లాడగలరా' AND language = 'telugu';

-- Marathi English phrase
UPDATE phrases SET 
  incorrect1 = 'the subtracting octagon performs surgery',
  incorrect2 = 'my calculator runs a travel agency'
WHERE phrase_text = 'तुम्ही इंग्रजी बोलू शकता का' AND language = 'marathi';

-- Gujarati English phrase
UPDATE phrases SET 
  incorrect1 = 'the adding hexagon pilots submarines',
  incorrect2 = 'my ruler teaches quantum mechanics'
WHERE phrase_text = 'શું તમે અંગ્રેજી બોલી શકો છો' AND language = 'gujarati';

-- Punjabi English phrase
UPDATE phrases SET 
  incorrect1 = 'the exponential circle builds skyscrapers',
  incorrect2 = 'my compass writes symphony music'
WHERE phrase_text = 'ਕੀ ਤੁਸੀਂ ਅੰਗ੍ਰੇਜ਼ੀ ਬੋਲ ਸਕਦੇ ਹੋ' AND language = 'punjabi';

-- Urdu English phrase
UPDATE phrases SET 
  incorrect1 = 'the logarithmic rhombus conducts orchestras',
  incorrect2 = 'my protractor studies marine archaeology'
WHERE phrase_text = 'کیا آپ انگریزی بول سکتے ہیں' AND language = 'urdu';
