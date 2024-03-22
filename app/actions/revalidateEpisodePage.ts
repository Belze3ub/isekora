'use server';
import { revalidatePath } from 'next/cache';

const revalidateEpisodePage = () => {
  revalidatePath('/anime/[slug]/[episodeNumber]', 'page');
};

export default revalidateEpisodePage;
