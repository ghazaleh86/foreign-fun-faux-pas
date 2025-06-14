
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

/**
 * Simple React hook to get the current Supabase user, or null if not logged in.
 */
export function useSupabaseUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Subscribe first
    const { subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Fetch current session and set user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return user;
}
