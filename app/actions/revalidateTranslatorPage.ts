'use server';
import { revalidatePath } from 'next/cache';

const revalidateTranslatorPage = () => {
  revalidatePath('/translators/[translatorName]', 'page');
};

export default revalidateTranslatorPage;
