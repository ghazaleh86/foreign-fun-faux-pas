
import { useEffect, useCallback, useState, useMemo } from "react";

/**
 * Loads/updates player profile (hearts, xp, streak, username, last_played, etc)
 */
export function usePlayerProfile() {
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const STORAGE_KEY = "localPlayerProfile_v1";

  const defaultProfile = useCallback(() => {
    return {
      id: "local",
      username: "Player",
      total_stars: 0,
      hearts: 3,
      max_hearts: 3,
      current_streak: 0,
      longest_streak: 0,
      last_played: null as string | null,
      created_at: new Date().toISOString(),
    };
  }, []);

  const fetchProfile = useCallback(async () => {
    setLoading(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setProfile(JSON.parse(stored));
      } else {
        const p = defaultProfile();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
        setProfile(p);
      }
    } catch {
      const p = defaultProfile();
      setProfile(p);
    } finally {
      setLoading(false);
    }
  }, [defaultProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = useCallback(async (changes: any) => {
    if (!profile) return;
    setLoading(true);
    try {
      const next = { ...profile, ...changes };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      setProfile(next);
    } finally {
      setLoading(false);
    }
  }, [profile]);

  // Grant stars
  const addStars = useCallback(async (stars: number) => {
    if (!profile) return;
    await updateProfile({ total_stars: profile.total_stars + stars });
  }, [profile, updateProfile]);

  // Lose a heart
  const loseHeart = useCallback(async () => {
    if (!profile) return;
    if (profile.hearts > 0)
      await updateProfile({ hearts: profile.hearts - 1 });
  }, [profile, updateProfile]);

  // Gain a heart (capped at max_hearts)
  const gainHeart = useCallback(async () => {
    if (!profile) return;
    if (profile.hearts < profile.max_hearts)
      await updateProfile({ hearts: profile.hearts + 1 });
  }, [profile, updateProfile]);

  // Reset hearts to max
  const resetHearts = useCallback(async () => {
    if (!profile) return;
    await updateProfile({ hearts: profile.max_hearts });
  }, [profile, updateProfile]);

  // Advance daily streak (if played today and not already on today's date)
  const advanceStreak = useCallback(async () => {
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
  }, [profile, updateProfile]);

  // Memoize the return object to prevent unnecessary re-renders
  const memoizedReturn = useMemo(() => ({
    profile,
    loading,
    addStars,
    loseHeart,
    gainHeart,
    resetHearts,
    advanceStreak,
    refresh: fetchProfile,
    updateProfile,
  }), [profile, loading, addStars, loseHeart, gainHeart, resetHearts, advanceStreak, fetchProfile, updateProfile]);

  return memoizedReturn;
}
