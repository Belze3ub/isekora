import { Tables } from './supabase';

export type Anime = Tables<'anime'>;
export type Episode = Tables<'episode'>;
export type Url = Tables<'url'>;
export type Translator = Tables<'translator'>;
export type Genre = Tables<'genre'>;
export type Comment = Tables<'comment'>;

// export type NewestEpisode = Episode & { anime: Anime };
export type NewestEpisode = Episode & Anime;
export type UrlTranslator = {
  player_name: string;
  urls: string[];
  translator_names: string[];
  translator_logos: string[];
  episode_id: number;
};

export type CommentUser = Comment & { id: string; name: string; image: string };

export type Anilist = {
  id: number;
  idMal: number;
  title: {
    romaji: string;
    english: string;
  };
  trailer: {
    id: number;
    site: string;
  };
  coverImage: {
    extraLarge: string;
    medium: string;
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
  recommendations: {
    nodes: RecommendedNode[];
  };
  relations: {
    edges: RelatedEdge[];
  };
  nextAiringEpisode: {
    airingAt: number;
    timeUntilAiring: number;
    episode: number;
  };
};

export type RecommendedNode = {
  mediaRecommendation: {
    id: number;
    format: string;
    seasonYear: number;
    episodes: number;
    coverImage: {
      medium: string;
    };
    title: {
      romaji: string;
      english: string;
    };
  };
};

export type RelatedEdge = {
  relationType: string;
  node: {
    title: {
      romaji: string;
      english: string;
    };
    id: number;
    coverImage: {
      medium: string;
    };
    type: string;
  };
};

export type RelatedAnime = RelatedEdge & { title_romaji_slug: string };

export type RecommendedAnime = RecommendedNode & { title_romaji_slug: string };

export type Query = {
  Media: Anilist;
};

export type Variables = {
  id: number;
  type: string;
};
