
-- Create a table to track learned phrases for each user
CREATE TABLE public.learned_phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  phrase_id uuid NOT NULL REFERENCES public.phrases(id) ON DELETE CASCADE,
  learned_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, phrase_id)
);

-- Enable RLS for learned_phrases
ALTER TABLE public.learned_phrases ENABLE ROW LEVEL SECURITY;

-- Users can only see their own learned phrases
CREATE POLICY "Users can view their own learned phrases"
  ON public.learned_phrases
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only insert their own learned phrases
CREATE POLICY "Users can insert their own learned phrases"
  ON public.learned_phrases
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own learned phrases
CREATE POLICY "Users can delete their own learned phrases"
  ON public.learned_phrases
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create an index for better performance
CREATE INDEX idx_learned_phrases_user_id ON public.learned_phrases(user_id);
CREATE INDEX idx_learned_phrases_phrase_id ON public.learned_phrases(phrase_id);
