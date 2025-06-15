
-- Create user profiles table to track XP, hearts, and streaks
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text,
  xp integer NOT NULL DEFAULT 0,
  hearts integer NOT NULL DEFAULT 3,
  max_hearts integer NOT NULL DEFAULT 3,
  current_streak integer NOT NULL DEFAULT 0,
  longest_streak integer NOT NULL DEFAULT 0,
  last_played date,
  last_heart_regen_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now()
);

-- Add unique constraint if you want usernames unique
CREATE UNIQUE INDEX profiles_username_idx ON public.profiles ((lower(username))) WHERE username IS NOT NULL;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Only user can read/update own profile
CREATE POLICY "profiles are viewable by owner" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "profiles are updatable by owner" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles are insertable by owner" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);
