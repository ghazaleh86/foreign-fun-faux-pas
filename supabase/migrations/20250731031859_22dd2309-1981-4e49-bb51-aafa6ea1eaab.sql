-- Update romanized Mandarin phrases to proper Chinese characters
-- Keep pronunciation field with romanized version for TTS fallback

UPDATE phrases SET phrase_text = '狗仗人势' 
WHERE id = 'eb5e9616-82ac-489d-81bc-2017e898d032' AND phrase_text = 'Gǒu zhàng rén shì';

UPDATE phrases SET phrase_text = '画蛇添足' 
WHERE id = 'c3f71050-48e4-4fc2-8b54-ed28de571ced' AND phrase_text = 'Huà shé tiān zú';

UPDATE phrases SET phrase_text = '祸不单行' 
WHERE id = '847a3229-ac51-400b-98b2-5bb37be8de01' AND phrase_text = 'Huò bù dān xíng';

UPDATE phrases SET phrase_text = '脚踏两只船' 
WHERE id = 'b70369d0-aa4b-4111-8f1b-170ed0131507' AND phrase_text = 'Jiǎo tà liǎng zhī chuán';

UPDATE phrases SET phrase_text = '老马识途' 
WHERE id = 'd3f50de7-4343-4827-a61c-d4e8c7f9d189' AND phrase_text = 'Lǎo mǎ shí tú';

UPDATE phrases SET phrase_text = '落叶归根' 
WHERE id = '5ce02a47-5aac-4f80-875a-90341b7df0ad' AND phrase_text = 'Luò yè guī gēn';

UPDATE phrases SET phrase_text = '马马虎虎' 
WHERE id = '5606de1a-078d-4875-9817-18f3cbe11c75' AND phrase_text = 'Mǎ mǎ hū hū';

UPDATE phrases SET phrase_text = '门当户对' 
WHERE id = 'eb8f463f-1d60-4968-92cd-34244940aa06' AND phrase_text = 'Mén dāng hù duì';

UPDATE phrases SET phrase_text = '守株待兔' 
WHERE id = 'ef89f486-f4c8-4927-bb9f-bdd15d6e169c' AND phrase_text = 'Shǒu zhū dài tù';

UPDATE phrases SET phrase_text = '水中捞月' 
WHERE id = '78c205ce-a40c-452a-98f2-d802df543797' AND phrase_text = 'Shuǐ zhōng lāo yuè';

UPDATE phrases SET phrase_text = '太岁头上动土' 
WHERE id = 'd7d07d03-1ffc-4701-83c1-61e238225df7' AND phrase_text = 'Tài suì tóu shàng dòng tǔ';

UPDATE phrases SET phrase_text = '一石千斤' 
WHERE id = 'cba72e71-4e93-47ce-a04d-49bade84fffa' AND phrase_text = 'Yī shí qiān jīn';

UPDATE phrases SET phrase_text = '猪朋狗友' 
WHERE id = 'ee63d75f-5526-4939-9500-fecc72c76e33' AND phrase_text = 'Zhū péng gǒu yǒu';

-- Remove the duplicate '守株待兔' entry that's already in Chinese
DELETE FROM phrases 
WHERE id = '77234523-3f70-48e5-b7b5-43eeb8a1f83e' AND phrase_text = '守株待兔';

-- Remove the duplicate '画蛇添足' entry 
DELETE FROM phrases 
WHERE id = '67af7c9d-6159-4e20-9b03-4bed34a3ddbb' AND phrase_text = '画蛇添足';