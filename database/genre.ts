import supabase from "./dbConfig";
import { Genre } from "./types/types";

export const fetchGenres = async (): Promise<Genre[]> => {
  let genres: Genre[] = [];
  try {
    const { data, error } = await supabase.from('genre').select('*');
    if (error) {
      console.error(`Error fetching data from genre table: ${error.message}`);
    } else {
      genres = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching data from genre table: ${error.message}`);
    }
  }
  return genres;
};
