import supabase from "./dbConfig";
import { Translator } from "./types/types";

export const fetchTranslators = async (): Promise<Translator[]> => {
  let translators: Translator[] = [];
  try {
    const { data, error } = await supabase.from('translator').select('*');
    if (error) {
      console.error(
        `Error fetching data from translator table: ${error.message}`
      );
    } else {
      translators = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from translator table: ${error.message}`
      );
    }
  }
  return translators;
};

export const fetchTranslatorByName = async (
  translator_name: string
): Promise<Translator | null> => {
  let translator: Translator | null = null;
  try {
    const { data, error } = await supabase
      .from('translator')
      .select('*')
      .eq('translator_name', translator_name)
      .single();
    if (error) {
      console.error(
        `Error fetching data from translator table: ${error.message}`
      );
    } else {
      translator = data;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data from translator table: ${error.message}`
      );
    }
  }
  return translator;
};