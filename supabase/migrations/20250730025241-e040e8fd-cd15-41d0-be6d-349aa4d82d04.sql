-- Update profiles table to use stars instead of XP
ALTER TABLE public.profiles 
DROP COLUMN IF EXISTS xp,
ADD COLUMN IF NOT EXISTS total_stars INTEGER DEFAULT 0;