import supabase from './dbConfig';
import { Emoji } from './types/types';

export const fetchEmojis = async () => {
  let emojis: Emoji[] = [];
  try {
    const { data, error } = await supabase.from('emoji').select('*');
    if (error) {
      console.error('Error fetching data from emoji table', error.message);
    } else {
      emojis = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error fetching data from emoji table', error.message);
    }
  }
  return emojis;
};
