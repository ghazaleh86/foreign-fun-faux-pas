
-- Insert sample phrases into the public.phrases table for Guess That Phrase!
insert into public.phrases (phrase_text, language, pronunciation, correct_meaning, incorrect1, incorrect2, notes)
values
  ('Kätzchenjammer', 'German', 'ket-tschen-ya-merr', 'A hangover', 'A kitten''s opera', 'An allergy to cheese', 'Literal: "kitten yowling". Used for hangover.'),
  ('No tener pelos en la lengua', 'Spanish', 'noh teh-nair peh-los en lah len-gwah', 'To speak one''s mind', 'To brush your tongue with fur', 'To eat soup with a comb', 'Means "no hairs on the tongue": says whatever they think.'),
  ('C''est la vie', 'French', 'seh lah vee', 'That’s life', 'A fancy salad', 'French disco party', 'Used to accept or shrug off something out of your control.'),
  ('Baka', 'Japanese', 'bah-kah', 'Fool/idiot', 'Delicious cow', 'Super fast', 'Common insult, mild.'),
  ('La dolce vita', 'Italian', 'lah dohl-cheh vee-tah', 'The sweet life', 'Sugary spaghetti', 'Big pizza sauce', 'Enjoying a life of pleasure and luxury.'),
  ('Spasibo', 'Russian', 'spah-see-bo', 'Thank you', 'Very spicy', 'Grandma''s scarf', NULL),
  ('Khob khun ka', 'Thai', 'kob-koon-ka', 'Thank you (female speaker)', 'Let''s go to the beach', 'Dangerous chili', 'Used by women, men say "khob khun krub".'),
  ('Mañana, mañana', 'Spanish', 'man-ya-na, man-ya-na', 'Not today / some indefinite future time', 'Morning banana', 'It''s raining frogs', 'When you''ll do something "tomorrow"... or never.'),
  ('Dépaysement', 'French', 'day-pay-ze-mon', 'The feeling of being out of one''s element', 'Losing a baguette', 'Extreme snoring', 'No exact English translation. Means "disorientation from new surroundings".'),
  ('Du bist ein Apfel', 'German', 'doo bist ein ahp-fel', 'You are an apple', 'You''re a secret agent', 'Cheese enthusiast', 'Literal: apple. Not a common phrase but funny out of context.')
;
