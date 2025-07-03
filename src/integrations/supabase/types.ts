export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      learned_phrases: {
        Row: {
          id: string
          learned_at: string
          phrase_id: string
          user_id: string
        }
        Insert: {
          id?: string
          learned_at?: string
          phrase_id: string
          user_id: string
        }
        Update: {
          id?: string
          learned_at?: string
          phrase_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "learned_phrases_phrase_id_fkey"
            columns: ["phrase_id"]
            isOneToOne: false
            referencedRelation: "phrases"
            referencedColumns: ["id"]
          },
        ]
      }
      phrases: {
        Row: {
          correct_meaning: string
          created_at: string
          difficulty: number | null
          id: string
          incorrect1: string
          incorrect2: string
          language: string
          notes: string | null
          phrase_text: string
          pronunciation: string | null
        }
        Insert: {
          correct_meaning: string
          created_at?: string
          difficulty?: number | null
          id?: string
          incorrect1: string
          incorrect2: string
          language: string
          notes?: string | null
          phrase_text: string
          pronunciation?: string | null
        }
        Update: {
          correct_meaning?: string
          created_at?: string
          difficulty?: number | null
          id?: string
          incorrect1?: string
          incorrect2?: string
          language?: string
          notes?: string | null
          phrase_text?: string
          pronunciation?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          current_streak: number
          hearts: number
          id: string
          last_heart_regen_at: string | null
          last_played: string | null
          longest_streak: number
          max_hearts: number
          username: string | null
          xp: number
        }
        Insert: {
          created_at?: string | null
          current_streak?: number
          hearts?: number
          id: string
          last_heart_regen_at?: string | null
          last_played?: string | null
          longest_streak?: number
          max_hearts?: number
          username?: string | null
          xp?: number
        }
        Update: {
          created_at?: string | null
          current_streak?: number
          hearts?: number
          id?: string
          last_heart_regen_at?: string | null
          last_played?: string | null
          longest_streak?: number
          max_hearts?: number
          username?: string | null
          xp?: number
        }
        Relationships: []
      }
      user_scores: {
        Row: {
          correct_count: number
          created_at: string
          id: string
          score: number
          total_questions: number
          username: string | null
        }
        Insert: {
          correct_count: number
          created_at?: string
          id?: string
          score: number
          total_questions: number
          username?: string | null
        }
        Update: {
          correct_count?: number
          created_at?: string
          id?: string
          score?: number
          total_questions?: number
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
