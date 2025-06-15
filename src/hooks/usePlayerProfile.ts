
import { useEffect, useCallback, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSupabaseUser } from "@/hooks/useSupabaseUser";

/**
 * Loads/updates player profile (hearts, xp, streak, username, last_played, etc)
 */
export function usePlayerProfile() {
  const user = useSupabaseUser();
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch or initialize profile
  const fetchProfile = useCallback(async () => {
    if (!user) {
      setProfile(null);
      return;
    }
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // If no profile found, insert a new one
    if (!data && user.id) {
      const { data: newProfile, error: insertErr } = await supabase
        .from("profiles")
        .insert({ id: user.id })
        .select("*")
        .single();
      setProfile(newProfile);
      setLoading(false);
      return;
    }

    setProfile(data);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Methods to increment XP, hearts, streak, etc
  const updateProfile = async (changes: any) => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .update(changes)
      .eq("id", user.id)
      .select("*")
      .single();
    setProfile(data);
    setLoading(false);
  };

  // Grant XP, with bonus (optionally for speed)
  const addXP = async (baseXP: number) => {
    if (!profile) return;
    await updateProfile({ xp: profile.xp + baseXP });
  };

  // Lose a heart
  const loseHeart = async () => {
    if (!profile) return;
    if (profile.hearts > 0)
      await updateProfile({ hearts: profile.hearts - 1 });
  };

  // Gain a heart (capped at max_hearts)
  const gainHeart = async () => {
    if (!profile) return;
    if (profile.hearts < profile.max_hearts)
      await updateProfile({ hearts: profile.hearts + 1 });
  };

  // Reset hearts to max
  const resetHearts = async () => {
    if (!profile) return;
    await updateProfile({ hearts: profile.max_hearts });
  };

  // Advance daily streak (if played today and not already on today's date)
  const advanceStreak = async () => {
    if (!profile) return;
    const today = new Date().toISOString().slice(0, 10);
    if (profile.last_played !== today) {
      const newStreak = (profile.last_played &&
        new Date(profile.last_played) >=
          new Date(Date.now() - 36 * 3600 * 1000) // allow small leeway
        ? profile.current_streak + 1
        : 1);
      const newLongest =
        newStreak > profile.longest_streak
          ? newStreak
          : profile.longest_streak;

      await updateProfile({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_played: today,
      });
    }
  };

  return {
    profile,
    loading,
    addXP,
    loseHeart,
    gainHeart,
    resetHearts,
    advanceStreak,
    refresh: fetchProfile,
    updateProfile,
  };
}
