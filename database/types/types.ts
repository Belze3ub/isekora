import { Tables } from "./supabase";

export type Anime = Tables<'anime'>;
export type Episode = Tables<'episode'>;
export type Url = Tables<'url'>;
export type Translator = Tables<'translator'>;
export type Genre = Tables<'genre'>;

// export type NewestEpisode = Episode & { anime: Anime };
export type NewestEpisode = Episode & Anime;
export type UrlTranslator = {
  player_name: string;
  urls: string[];
  translator_names: string[];
  translator_logos: string[];
};

export type Anilist = {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
  coverImage: {
    extraLarge: string;
    large: string;
    medium: string;
    color: string;
  };
  bannerImage: string;
  description: string;
  format: string;
  episodes: number;
  duration: number;
  status: string;
  startDate: {
    year: number;
    month: number;
    day: number;
  };
  endDate: {
    year: number;
    month: number;
    day: number;
  };
  season: string;
  seasonYear: number;
  averageScore: number;
  meanScore: number;
  popularity: number;
  favourites: number;
  genres: string[];
  studios: {
    nodes: {
      name: string;
    }[];
  };
  synonyms: string[];
  trailer: {
    id: string;
    site: string;
    thumbnail: string;
  };
  recommendations: {
    nodes: {
      mediaRecommendation: {
        title: {
          romaji: string;
          english: string;
          native: string;
        };
      };
    }[];
  };
  relations: {
    edges: {
      node: {
        title: {
          romaji: string;
          english: string;
          native: string;
        };
        type: string;
      };
      relationType: string;
    };
  };
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
};

export type Query = {
  Media: Anilist;
};

export type Variables = {
  id: number;
  type: string;
};