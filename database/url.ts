import supabase from "./dbConfig";
import { UrlTranslator } from "./types/types";

export const fetchEpisodeUrls = async (
  slug: string,
  episodeNumber: string
): Promise<UrlTranslator[]> => {
  let urls: UrlTranslator[] = [];
  try {
    const { data, error } = await supabase.rpc(
      'fetch_urls_by_slug_and_episode_number',
      {
        slug: slug,
        episode_num: episodeNumber,
      }
    );
    if (error) {
      console.error(`Error fetching data from url table: ${error.message}`);
    } else {
      urls = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data from url table: ${error.message}`);
    }
  }
  return urls;
};
