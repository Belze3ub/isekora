'use server';
import { revalidatePath } from 'next/cache';

const revalidateAnimeEpisodesPage = () => {
  revalidatePath('/anime/[slug]', 'page');
};

export default revalidateAnimeEpisodesPage;
