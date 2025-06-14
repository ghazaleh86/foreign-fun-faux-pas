
-- Add phrases for many more countries

insert into public.phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes)
values
-- Brazil (Portuguese)
('Pisar na bola', 'Portuguese', 'pee-zar nah boh-lah', 'To mess up', 'To play soccer', 'To step on grapes', 'Literally "to step on the ball", means to make a mistake.'),
('Cair a ficha', 'Portuguese', 'kah-eer ah fee-sha', 'To realize/suddenly understand', 'Drop your phone', 'Faint in public', 'Like "the penny dropped".'),
-- Turkey (Turkish)
('Kafayı yemek', 'Turkish', 'kah-fah-uh yeh-mehk', 'To go crazy', 'Eat your mind', 'Find your hat', 'Literally "to eat your head".'),
('Elini taşın altına koymak', 'Turkish', 'eh-lee-nee tah-shin al-tee-nah koy-mahk', 'To take responsibility', 'Touch a stone', 'Hide behind a rock', 'Literally "to put your hand under the stone".'),
-- Sweden (Swedish)
('Lagom är bäst', 'Swedish', 'lah-gum air best', 'Moderation is best', 'Most is best', 'Cold is best', 'Lagom = just right, in moderation.'),
('Sitta i sjön', 'Swedish', 'sit-tah ee hwern', 'To be in trouble', 'Sit in a lake', 'Ready to swim', 'Literally "to sit in the lake".'),
-- Korea (Korean)
('눈치 없다', 'Korean', 'noon-chee up-da', 'Lack of social awareness', 'To have bad eyesight', 'To be lucky', 'No sense of social situations.'),
('오르고 내리다', 'Korean', 'oh-ruh-go nae-ree-da', 'To go up and down', 'To get angry', 'To eat noodles', 'Describes changing moods or circumstances.'),
-- Poland (Polish)
('Nie mój cyrk, nie moje małpy', 'Polish', 'nyeh mooy tsirk nyeh moy-yeh maw-peh', 'Not my problem', 'Not my zoo, not my cows', 'Someone else’s animals', 'Literally: "not my circus, not my monkeys".'),
('Bułka z masłem', 'Polish', 'bool-kah z mah-swem', 'Piece of cake (easy)', 'Bread with butter', 'Bread with honey', 'Means something is very easy.'),
-- South Africa (Afrikaans)
('Bakkie', 'Afrikaans', 'bah-kee', 'Pickup truck', 'Bread roll', 'Gossip', 'Common slang for truck.'),
('Just now', 'English (South Africa)', '', 'In a little while (not immediately)', 'Right now', 'Never', 'Actually means it''s not soon!'),
-- Egypt (Arabic)
('أنا مش فاضية', 'Arabic', 'ana mish fadiya', 'I am busy (female speaker)', 'I am empty', 'I am full', 'Common phrase for politely turning down invitations.'),
('عيش و ملح', 'Arabic', 'aish wa malh', 'A strong friendship', 'Eat bread and salt', 'Play soccer', 'Sharing bread and salt means a strong bond.'),
-- Norway (Norwegian)
('Ut på tur, aldri sur', 'Norwegian', 'oot paw toor, aldray soor', 'Happy when hiking', 'Out on tour, never sure', 'Always late', 'Norwegians always cheerful when out in nature.'),
('Takk for sist', 'Norwegian', 'tak for seest', 'Thanks for last time', 'Last cookie', 'Next time', 'Greeting after not seeing someone for a while.'),
-- Vietnam (Vietnamese)
('Ăn cơm nhà vác tù và hàng tổng', 'Vietnamese', 'an kum nya vak tu va hang tong', 'Do community service for free', 'Eat rice with tofu', 'Buy food at the market', 'Do something for the community, not for yourself.'),
('Tiền nào của nấy', 'Vietnamese', 'tee-en nao cua nay', 'You get what you pay for', 'Money rain', 'Cheap is best', 'Quality matches the price.'),
-- Finland (Finnish)
('Sisu', 'Finnish', 'see-soo', 'Perseverance/persistence', 'Soup', 'Sugar', 'Untranslatable. Inner strength in adversity.'),
('Juosta pää kolmantena jalkana', 'Finnish', 'yoo-os-tah pah kol-man-tena yal-kana', 'Be in a hurry', 'Run with three legs', 'Jog with a friend', 'Literally "run with your head as the third leg".');
