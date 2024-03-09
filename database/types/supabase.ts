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
      anime: {
        Row: {
          anilist_id: number
          anime_id: number
          cover_extra_large_image: string | null
          cover_medium_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number | null
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string
        }
        Insert: {
          anilist_id: number
          anime_id?: number
          cover_extra_large_image?: string | null
          cover_medium_image?: string | null
          description?: string | null
          duration?: number | null
          episodes?: number | null
          format?: string | null
          mal_id?: number | null
          season?: string | null
          season_year?: string | null
          title_english?: string | null
          title_romaji?: string | null
          title_romaji_slug: string
        }
        Update: {
          anilist_id?: number
          anime_id?: number
          cover_extra_large_image?: string | null
          cover_medium_image?: string | null
          description?: string | null
          duration?: number | null
          episodes?: number | null
          format?: string | null
          mal_id?: number | null
          season?: string | null
          season_year?: string | null
          title_english?: string | null
          title_romaji?: string | null
          title_romaji_slug?: string
        }
        Relationships: []
      }
      anime_genre: {
        Row: {
          anime_id: number
          genre_id: number
        }
        Insert: {
          anime_id: number
          genre_id: number
        }
        Update: {
          anime_id?: number
          genre_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "anime_genre_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["anime_id"]
          },
          {
            foreignKeyName: "anime_genre_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genre"
            referencedColumns: ["genre_id"]
          }
        ]
      }
      comment: {
        Row: {
          comment_id: number
          comment_text: string
          create_date: string | null
          episode_id: number | null
          parent_id: number | null
          spoiler: boolean
          update_date: string | null
          user_id: string | null
        }
        Insert: {
          comment_id?: number
          comment_text: string
          create_date?: string | null
          episode_id?: number | null
          parent_id?: number | null
          spoiler?: boolean
          update_date?: string | null
          user_id?: string | null
        }
        Update: {
          comment_id?: number
          comment_text?: string
          create_date?: string | null
          episode_id?: number | null
          parent_id?: number | null
          spoiler?: boolean
          update_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comment_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "episode"
            referencedColumns: ["episode_id"]
          },
          {
            foreignKeyName: "comment_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "comment"
            referencedColumns: ["comment_id"]
          },
          {
            foreignKeyName: "comment_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      emoji: {
        Row: {
          emoji_character: string | null
          emoji_description: string | null
          emoji_id: number
          emoji_image_url: string | null
        }
        Insert: {
          emoji_character?: string | null
          emoji_description?: string | null
          emoji_id?: number
          emoji_image_url?: string | null
        }
        Update: {
          emoji_character?: string | null
          emoji_description?: string | null
          emoji_id?: number
          emoji_image_url?: string | null
        }
        Relationships: []
      }
      episode: {
        Row: {
          anime_id: number | null
          create_date: string | null
          episode_id: number
          episode_number: string
          episode_thumbnail: string | null
          update_date: string | null
          views: number | null
        }
        Insert: {
          anime_id?: number | null
          create_date?: string | null
          episode_id?: number
          episode_number: string
          episode_thumbnail?: string | null
          update_date?: string | null
          views?: number | null
        }
        Update: {
          anime_id?: number | null
          create_date?: string | null
          episode_id?: number
          episode_number?: string
          episode_thumbnail?: string | null
          update_date?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "episode_anime_id_fkey"
            columns: ["anime_id"]
            isOneToOne: false
            referencedRelation: "anime"
            referencedColumns: ["anime_id"]
          }
        ]
      }
      genre: {
        Row: {
          genre: string
          genre_id: number
        }
        Insert: {
          genre: string
          genre_id?: number
        }
        Update: {
          genre?: string
          genre_id?: number
        }
        Relationships: []
      }
      translator: {
        Row: {
          translator_banner: string | null
          translator_discord: string | null
          translator_id: number
          translator_info: string | null
          translator_logo: string | null
          translator_name: string
          translator_website: string | null
        }
        Insert: {
          translator_banner?: string | null
          translator_discord?: string | null
          translator_id?: number
          translator_info?: string | null
          translator_logo?: string | null
          translator_name: string
          translator_website?: string | null
        }
        Update: {
          translator_banner?: string | null
          translator_discord?: string | null
          translator_id?: number
          translator_info?: string | null
          translator_logo?: string | null
          translator_name?: string
          translator_website?: string | null
        }
        Relationships: []
      }
      url: {
        Row: {
          episode_id: number | null
          player_name: string
          translator_episode_link: string | null
          translator_id: number | null
          url: string
          url_id: number
        }
        Insert: {
          episode_id?: number | null
          player_name: string
          translator_episode_link?: string | null
          translator_id?: number | null
          url: string
          url_id?: number
        }
        Update: {
          episode_id?: number | null
          player_name?: string
          translator_episode_link?: string | null
          translator_id?: number | null
          url?: string
          url_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "url_episode_id_fkey"
            columns: ["episode_id"]
            isOneToOne: false
            referencedRelation: "episode"
            referencedColumns: ["episode_id"]
          },
          {
            foreignKeyName: "url_translator_id_fkey"
            columns: ["translator_id"]
            isOneToOne: false
            referencedRelation: "translator"
            referencedColumns: ["translator_id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      fetch_anime_by_translator_name: {
        Args: {
          name: string
        }
        Returns: {
          anilist_id: number
          anime_id: number
          cover_extra_large_image: string | null
          cover_medium_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number | null
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string
        }[]
      }
      fetch_animes: {
        Args: {
          search_query?: string
          page_size?: number
          anime_format?: string
          genres?: string[]
          page?: number
        }
        Returns: {
          anilist_id: number
          anime_id: number
          cover_extra_large_image: string | null
          cover_medium_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number | null
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string
        }[]
      }
      fetch_comments_with_users: {
        Args: {
          ep_id: number
        }
        Returns: {
          comment_id: number
          user_id: string
          episode_id: number
          comment_text: string
          spoiler: boolean
          create_date: string
          update_date: string
          parent_id: number
          id: string
          name: string
          image: string
        }[]
      }
      fetch_episodes_by_slug: {
        Args: {
          slug: string
        }
        Returns: {
          anime_id: number | null
          create_date: string | null
          episode_id: number
          episode_number: string
          episode_thumbnail: string | null
          update_date: string | null
          views: number | null
        }[]
      }
      fetch_episodes_by_slug_and_number: {
        Args: {
          slug: string
          episode_num: string
        }
        Returns: {
          anime_id: number | null
          create_date: string | null
          episode_id: number
          episode_number: string
          episode_thumbnail: string | null
          update_date: string | null
          views: number | null
        }[]
      }
      fetch_total_pages: {
        Args: {
          anime_format: string
          genres: string[]
        }
        Returns: {
          anilist_id: number
          anime_id: number
          cover_extra_large_image: string | null
          cover_medium_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number | null
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string
        }[]
      }
      fetch_urls_by_slug_and_episode_number: {
        Args: {
          slug: string
          episode_num: string
        }
        Returns: {
          player_name: string
          urls: string[]
          translator_names: string[]
          translator_logos: string[]
        }[]
      }
      get_anime_formats: {
        Args: Record<PropertyKey, never>
        Returns: {
          format: string
        }[]
      }
      get_newest_episodes: {
        Args: {
          _limit: number
        }
        Returns: {
          anime_id: number
          cover_extra_large_image: string
          cover_medium_image: string
          description: string
          duration: number
          episodes: number
          format: string
          mal_id: number
          anilist_id: number
          season: string
          season_year: string
          title_english: string
          title_romaji: string
          title_romaji_slug: string
          create_date: string
          update_date: string
          episode_id: number
          episode_number: string
          episode_thumbnail: string
          views: number
        }[]
      }
      get_newest_episodes_from_translator: {
        Args: {
          t_name: string
          _limit: number
        }
        Returns: {
          anime_id: number
          cover_extra_large_image: string
          cover_medium_image: string
          description: string
          duration: number
          episodes: number
          format: string
          mal_id: number
          anilist_id: number
          season: string
          season_year: string
          title_english: string
          title_romaji: string
          title_romaji_slug: string
          update_date: string
          create_date: string
          episode_id: number
          episode_number: string
          episode_thumbnail: string
          views: number
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
