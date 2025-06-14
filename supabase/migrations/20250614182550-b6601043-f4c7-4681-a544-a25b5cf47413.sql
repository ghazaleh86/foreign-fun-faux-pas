
-- 1. Add data validation to user_scores table

-- Make sure score, correct_count, total_questions are within sensible bounds
ALTER TABLE public.user_scores 
  ADD CONSTRAINT chk_score_positive CHECK (score >= 0 AND score <= 1000),
  ADD CONSTRAINT chk_correct_count_nonnegative CHECK (correct_count >= 0 AND correct_count <= total_questions),
  ADD CONSTRAINT chk_total_questions_positive CHECK (total_questions > 0 AND total_questions <= 100);

-- Ensure username is not too long
ALTER TABLE public.user_scores 
  ADD CONSTRAINT chk_username_length CHECK (char_length(username) <= 40);

-- 2. Add field length validation to phrases
ALTER TABLE public.phrases
  ADD CONSTRAINT chk_phrases_length_phrase_text CHECK (char_length(phrase_text) <= 120),
  ADD CONSTRAINT chk_phrases_length_language CHECK (char_length(language) <= 32),
  ADD CONSTRAINT chk_phrases_length_pronunciation CHECK (pronunciation IS NULL OR char_length(pronunciation) <= 120),
  ADD CONSTRAINT chk_phrases_length_correct_meaning CHECK (char_length(correct_meaning) <= 120),
  ADD CONSTRAINT chk_phrases_length_incorrect1 CHECK (char_length(incorrect1) <= 120),
  ADD CONSTRAINT chk_phrases_length_incorrect2 CHECK (char_length(incorrect2) <= 120),
  ADD CONSTRAINT chk_phrases_length_notes CHECK (notes IS NULL OR char_length(notes) <= 200);

-- 3. Harden RLS on user_scores: users can only insert/select their own scores, must be authenticated

ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow insert/read user scores" ON public.user_scores;
DROP POLICY IF EXISTS "Allow anyone to insert scores" ON public.user_scores;

-- Only authenticated users can select their own score(s)
CREATE POLICY "Users can select their own scores"
  ON public.user_scores
  FOR SELECT 
  USING (auth.uid()::text = username);

-- Only authenticated users can insert their own scores
CREATE POLICY "Users can insert their own scores"
  ON public.user_scores
  FOR INSERT
  WITH CHECK (auth.uid()::text = username);

-- 4. Phrases remains public readable for quiz -- but nobody can insert/update/delete unless additional policies are added.

