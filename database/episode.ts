import supabase from "./dbConfig";
import { Episode, NewestEpisode } from "./types/types";

// export const fetchNewestEpisodes = async (): Promise<NewestEpisode[]> => {
//   let episodes: NewestEpisode[] = [];
//   try {
//     const { data, error } = await supabase
//       .from('episode')
//       .select(
//         `
//         *,
//         anime:anime_id (*)
//       `
//       )
//       .returns<NewestEpisode[]>()
//       .order('added_date', { ascending: false })
//       .limit(36);
//     if (error) {
//       console.error(
//         `Error fetching data from episode table with season - ${error.message}`
//       );
//     } else {
//       episodes = data;
//     }
//   } catch (error) {
//     if (error instanceof Error) {
//       console.error(
//         `Error fetching data from episode table with season - ${error.message}`
//       );
//     }
//   }
//   return episodes;
// };

export const fetchNewestEpisodes = async (limit: number): Promise<NewestEpisode[]> => {
  let episodes: NewestEpisode[] = [];
  try {
    const { data, error } = await supabase
      .rpc('get_newest_episodes', {_limit: limit})
    if (error) {
      console.error(
        `Error fetching data from episode table with season - ${error.message}`
      );
    } else {
      episodes = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from episode table with season - ${error.message}`
      );
    }
  }
  return episodes;
};

export const fetchNewestEpisodesFromTranslator = async (
  translator_name: string
, limit: number): Promise<NewestEpisode[]> => {
  let episodes: NewestEpisode[] = [];
  try {
    const { data, error } = await supabase.rpc(
      'get_newest_episodes_from_translator',
      { t_name: translator_name, _limit: limit }
    );
    if (error) {
      console.error(
        `Error fetching data from episode table with season - ${error.message}`
      );
    } else {
      episodes = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from episode table with season - ${error.message}`
      );
    }
  }
  return episodes;
};

export const fetchEpisodesBySlug = async (slug: string): Promise<Episode[]> => {
  let episodes: Episode[] = [];
  try {
    const { data, error } = await supabase.rpc('fetch_episodes_by_slug', {
      slug,
    });
    if (error) {
      console.error(
        `Error fetching data from episode table for slug: ${slug} - ${error.message}`
      );
    } else {
      episodes = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from episode table for slug: ${slug} - ${error.message}`
      );
    }
  }
  return episodes;
};

export const fetchEpisodeBySlugAndNumber = async (slug: string, episodeNumber: string): Promise<Episode | null> => {
  let episode: Episode | null = null;
  try {
    const { data, error } = await supabase.rpc('fetch_episodes_by_slug_and_number', {
      slug,
      episode_num: episodeNumber
    });
    if (error) {
      console.error(
        `Error fetching data for ${slug} episode: ${episodeNumber} - ${error.message}`
      );
    } else {
      episode = data[0];
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data for ${slug} episode: ${episodeNumber} - ${error.message}`
      );
    }
  }
  return episode;
};