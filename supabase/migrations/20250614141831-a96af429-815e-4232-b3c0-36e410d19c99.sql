
-- Table to store phrase data for the quiz game
CREATE TABLE public.phrases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phrase_text TEXT NOT NULL,
  language TEXT NOT NULL,
  pronunciation TEXT,
  correct_meaning TEXT NOT NULL,
  incorrect1 TEXT NOT NULL,
  incorrect2 TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow everyone to SELECT phrases (no RLS for public quiz)
ALTER TABLE public.phrases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow read access to phrases"
  ON public.phrases
  FOR SELECT
  USING (true);

-- (Optional) Track scores if ever you want to add user accounts/login later.
CREATE TABLE public.user_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT,
  score INTEGER NOT NULL,
  correct_count INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow public inserts/selects into user_scores (for now; can lock down in future)
ALTER TABLE public.user_scores ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow insert/read user scores"
  ON public.user_scores
  FOR SELECT USING (true);
CREATE POLICY "Allow anyone to insert scores"
  ON public.user_scores
  FOR INSERT WITH CHECK (true);
