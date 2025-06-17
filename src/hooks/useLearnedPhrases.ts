
import { useSupabaseUser } from "@/hooks/useSupabaseUser";
import { supabase } from "@/integrations/supabase/client";

export function useLearnedPhrases() {
  const user = useSupabaseUser();

  const markPhraseAsLearned = async (phraseId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from("learned_phrases")
        .insert({
          user_id: user.id,
          phrase_id: phraseId,
        });

      if (error && error.code !== '23505') { // 23505 is unique constraint violation (already exists)
        console.error("Error marking phrase as learned:", error);
      }
    } catch (error) {
      console.error("Error marking phrase as learned:", error);
    }
  };

  return {
    markPhraseAsLearned,
  };
}
