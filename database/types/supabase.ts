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
          anime_id: number
          cover_extra_large_image: string | null
          cover_large_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string | null
        }
        Insert: {
          anime_id?: number
          cover_extra_large_image?: string | null
          cover_large_image?: string | null
          description?: string | null
          duration?: number | null
          episodes?: number | null
          format?: string | null
          mal_id: number
          season?: string | null
          season_year?: string | null
          title_english?: string | null
          title_romaji?: string | null
          title_romaji_slug?: string | null
        }
        Update: {
          anime_id?: number
          cover_extra_large_image?: string | null
          cover_large_image?: string | null
          description?: string | null
          duration?: number | null
          episodes?: number | null
          format?: string | null
          mal_id?: number
          season?: string | null
          season_year?: string | null
          title_english?: string | null
          title_romaji?: string | null
          title_romaji_slug?: string | null
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
            foreignKeyName: "anime_genre_genre_id_fkey"
            columns: ["genre_id"]
            isOneToOne: false
            referencedRelation: "genre"
            referencedColumns: ["genre_id"]
          }
        ]
      }
      anime_test: {
        Row: {
          anilist_id: number
          anime_id: number
          cover_extra_large_image: string
          cover_large_image: string
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string
        }
        Insert: {
          anilist_id: number
          anime_id?: number
          cover_extra_large_image: string
          cover_large_image: string
          season?: string | null
          season_year?: string | null
          title_english?: string | null
          title_romaji: string
        }
        Update: {
          anilist_id?: number
          anime_id?: number
          cover_extra_large_image?: string
          cover_large_image?: string
          season?: string | null
          season_year?: string | null
          title_english?: string | null
          title_romaji?: string
        }
        Relationships: []
      }
      episode: {
        Row: {
          added_date: string | null
          anime_id: number | null
          episode_id: number
          episode_number: string
          episode_thumbnail: string | null
          views: number | null
        }
        Insert: {
          added_date?: string | null
          anime_id?: number | null
          episode_id?: number
          episode_number: string
          episode_thumbnail?: string | null
          views?: number | null
        }
        Update: {
          added_date?: string | null
          anime_id?: number | null
          episode_id?: number
          episode_number?: string
          episode_thumbnail?: string | null
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
          anime_id: number
          cover_extra_large_image: string | null
          cover_large_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string | null
        }[]
      }
      fetch_animes:
        | {
            Args: {
              anime_format: string
              genres: string[]
              page: number
              page_size: number
              search_query?: string
            }
            Returns: {
              anime_id: number
              cover_extra_large_image: string | null
              cover_large_image: string | null
              description: string | null
              duration: number | null
              episodes: number | null
              format: string | null
              mal_id: number
              season: string | null
              season_year: string | null
              title_english: string | null
              title_romaji: string | null
              title_romaji_slug: string | null
            }[]
          }
        | {
            Args: {
              genres: string[]
              page: number
              page_size: number
            }
            Returns: {
              anime_id: number
              cover_extra_large_image: string | null
              cover_large_image: string | null
              description: string | null
              duration: number | null
              episodes: number | null
              format: string | null
              mal_id: number
              season: string | null
              season_year: string | null
              title_english: string | null
              title_romaji: string | null
              title_romaji_slug: string | null
            }[]
          }
      fetch_animes_by_genre: {
        Args: {
          genre_name: string
        }
        Returns: {
          anime_id: number
          cover_extra_large_image: string | null
          cover_large_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string | null
        }[]
      }
      fetch_episodes_by_slug: {
        Args: {
          slug: string
        }
        Returns: {
          added_date: string | null
          anime_id: number | null
          episode_id: number
          episode_number: string
          episode_thumbnail: string | null
          views: number | null
        }[]
      }
      fetch_total_pages: {
        Args: {
          anime_format: string
          genres: string[]
        }
        Returns: {
          anime_id: number
          cover_extra_large_image: string | null
          cover_large_image: string | null
          description: string | null
          duration: number | null
          episodes: number | null
          format: string | null
          mal_id: number
          season: string | null
          season_year: string | null
          title_english: string | null
          title_romaji: string | null
          title_romaji_slug: string | null
        }[]
      }
      fetch_urls_by_slug_and_episode_number: {
        Args: {
          slug: string
          episode_num: string
        }
        Returns: {
          url_id: number
          episode_id: number
          url: string
          player_name: string
          translator_episode_link: string
          translator_id: number
          translator_logo: string
        }[]
      }
      fetch_urls_by_slug_and_episode_number_test: {
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
          cover_large_image: string
          description: string
          duration: number
          episodes: number
          format: string
          mal_id: number
          season: string
          season_year: string
          title_english: string
          title_romaji: string
          title_romaji_slug: string
          added_date: string
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
          cover_large_image: string
          description: string
          duration: number
          episodes: number
          format: string
          mal_id: number
          season: string
          season_year: string
          title_english: string
          title_romaji: string
          title_romaji_slug: string
          added_date: string
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
