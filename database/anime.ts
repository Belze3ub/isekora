import supabase from "./dbConfig";
import { Anime } from "./types/types";

export const fetchTotalPages = async (
  format: string,
  genres: string[],
  pageSize: number
): Promise<number> => {
  let totalPages = 0;
  try {
    const { data, error } = await supabase.rpc('fetch_total_pages', {
      anime_format: format,
      genres,
    });
    if (error) {
      console.error(`Error fetching data for total pages: ${error.message}`);
    } else {
      totalPages = Math.ceil(data.length / pageSize);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data  for total pages: ${error.message}`);
    }
  }
  return totalPages;
};

export const fetchAnime = async (
  searchQuery?: string,
  pageSize?: number,
  format?: string,
  genres?: string[],
  page?: number,
): Promise<Anime[]> => {
  let anime: Anime[] = [];
  try {
    const { data, error } = await supabase.rpc('fetch_animes', {
      anime_format: format,
      genres,
      page,
      page_size: pageSize,
      // search_query: query ? query : '',
      search_query: searchQuery,
    });
    if (error) {
      console.error(`Error fetching data from anime table: ${error.message}`);
    } else {
      anime = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data from anime table: ${error.message}`);
    }
  }
  return anime;
};

export const fetchAnimeBySeason = async (
  season: string,
  seasonYear: string
): Promise<Anime[]> => {
  let anime: Anime[] = [];
  try {
    const { data, error } = await supabase
      .from('anime')
      .select('*')
      .eq('season', season)
      .eq('season_year', seasonYear);
    if (error) {
      console.error(
        `Error fetching data from anime table with season: ${season} and year: ${seasonYear} - ${error.message}`
      );
    } else {
      anime = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from anime table with season: ${season} and year: ${seasonYear} - ${error.message}`
      );
    }
  }
  return anime;
};

export const fetchAnimeBySlug = async (slug: string): Promise<Anime | null> => {
  let anime: Anime | null = null;
  try {
    const { data, error } = await supabase
      .from('anime')
      .select('*')
      .eq('title_romaji_slug', slug)
      .single();
    if (error) {
      console.error(
        `Error fetching data from anime table for slug: ${slug} - ${error.message}`
      );
    } else {
      anime = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from anime table for slug: ${slug} - ${error.message}`
      );
    }
  }
  return anime;
};

export const fetchAnimeByAnilistId = async (id: number): Promise<Anime | null> => {
  let anime: Anime | null = null;
  try {
    const { data, error } = await supabase
      .from('anime')
      .select('*')
      .eq('anilist_id', id)
      .single();
    if (error) {
      console.error(
        `Error fetching data from anime table for anilist_id: ${id} - ${error.message}`
      );
    } else {
      anime = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from anime table for anilist_id: ${id} - ${error.message}`
      );
    }
  }
  return anime;
};

export const fetchAnimeFormats = async (): Promise<{format: string}[]> => {
  let formats: {format: string}[] = [];
  try {
    const { data, error } = await supabase
      .rpc('get_anime_formats');
    if (error) {
      console.error(
        `Error fetching data from anime table: ${error.message}`
      );
    } else {
      formats = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from anime table: ${error.message}`
      );
    }
  }
  return formats;
};

export const fetchAnimeByTranslatorName = async (
  translator_name: string
): Promise<Anime[]> => {
  let translatorAnime: Anime[] = [];
  try {
    const { data, error } = await supabase.rpc(
      'fetch_anime_by_translator_name',
      { name: translator_name }
    );
    if (error) {
      console.error(`Error fetching data from anime table: ${error.message}`);
    } else {
      translatorAnime = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data from anime table: ${error.message}`);
    }
  }
  return translatorAnime;
};