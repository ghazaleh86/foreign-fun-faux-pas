
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

/**
 * Simple React hook to get the current Supabase user, or null if not logged in.
 */
export function useSupabaseUser() {
  const [user, setUser] = useState<ReturnType<typeof supabase.auth.getUser> | null>(null);

  useEffect(() => {
    let unsub: any;
    supabase.auth.getUser().then(({ data }) => setUser(data?.user ?? null));
    unsub = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    // Return unsubscribe function on cleanup
    return () => { unsub?.data?.subscription?.unsubscribe?.(); };
  }, []);

  return user;
}
