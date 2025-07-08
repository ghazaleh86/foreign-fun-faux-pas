
-- Add Cantonese idioms and sayings
INSERT INTO phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, difficulty, notes) VALUES
-- Cantonese idioms
('食得鹹魚抵得渴', 'cantonese', 'sik6 dak1 haam4 jyu4 dai2 dak1 hot3', 'If you choose to do something, you must accept the consequences', 'Fish tastes better when salty', 'Drinking water after eating fish', 4, 'Classic Cantonese idiom about accepting responsibility for your choices'),
('有錢使得鬼推磨', 'cantonese', 'jau5 cin4 sai2 dak1 gwai2 teoi1 mo4', 'Money makes the world go round / Money can make ghosts work', 'Rich people are scary', 'Ghosts like to count money', 3, 'Popular saying about the power of money'),
('山雞變鳳凰', 'cantonese', 'saan1 gai1 bin3 fung6 wong4', 'A nobody becomes somebody important (rags to riches)', 'Chickens can fly like birds', 'Mountain birds are beautiful', 3, 'Describes someone who rises from humble beginnings'),
('一山還有一山高', 'cantonese', 'jat1 saan1 waan4 jau5 jat1 saan1 gou1', 'There is always someone better / Behind every mountain is a higher mountain', 'Mountains keep growing taller', 'Hiking is very difficult', 4, 'Humility saying - there is always someone more capable'),
('偷雞不成蝕把米', 'cantonese', 'tau1 gai1 bat1 sing4 sik6 baa2 mai5', 'Trying to steal a chicken but losing the rice bait instead', 'Chickens eat too much rice', 'Farmers lose money on chickens', 4, 'When a scheme backfires and you lose more than you gain'),
('紙包不住火', 'cantonese', 'zi2 baau1 bat1 zyu6 fo2', 'Paper cannot wrap fire / Truth will always come out', 'Paper burns very easily', 'Fire needs oxygen to burn', 3, 'You cannot hide the truth forever'),

-- Mandarin idioms and sayings  
('塞翁失馬，焉知非福', 'mandarin', 'sài wēng shī mǎ, yān zhī fēi fú', 'A blessing in disguise / Bad luck may turn out to be good fortune', 'Old people should not ride horses', 'Losing animals brings bad luck', 5, 'Classical idiom about how misfortune can lead to good fortune'),
('井底之蛙', 'mandarin', 'jǐng dǐ zhī wā', 'A frog at the bottom of a well / Someone with a narrow worldview', 'Frogs live in dark places', 'Wells are dangerous for animals', 3, 'Describes someone with limited perspective or knowledge'),
('畫蛇添足', 'mandarin', 'huà shé tiān zú', 'Drawing legs on a snake / Adding unnecessary details that spoil something', 'Snakes are hard to draw', 'Artists make many mistakes', 4, 'Doing something unnecessary that ruins the original'),
('破釜沉舟', 'mandarin', 'pò fǔ chén zhōu', 'Breaking the pots and sinking the boats / Burning bridges with no retreat', 'Soldiers need cooking equipment', 'Boats are expensive to replace', 4, 'Committing fully to a course of action with no way back'),
('守株待兔', 'mandarin', 'shǒu zhū dài tù', 'Waiting by the tree stump for rabbits / Relying on luck rather than effort', 'Rabbits are afraid of trees', 'Hunting requires great patience', 3, 'Passively waiting for success instead of working for it'),
('亡羊補牢', 'mandarin', 'wáng yáng bǔ láo', 'Mending the pen after losing sheep / Better late than never', 'Sheep are difficult to catch', 'Fences need regular maintenance', 3, 'Taking action to prevent further problems after damage is done'),
('對牛彈琴', 'mandarin', 'duì niú tán qín', 'Playing piano to a cow / Talking to someone who cannot understand', 'Cows enjoy classical music', 'Musical instruments are expensive', 3, 'Wasting effort on someone who cannot appreciate it'),
('鐵杵磨成針', 'mandarin', 'tiě chǔ mó chéng zhēn', 'An iron rod can be ground into a needle / Persistence can achieve anything', 'Metal tools are very useful', 'Needles are made in factories', 4, 'With enough persistence, even impossible tasks can be accomplished');
