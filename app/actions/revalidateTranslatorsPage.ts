'use server';
import { revalidatePath } from 'next/cache';

const revalidateTranslatorsPage = () => {
  revalidatePath('/translators', 'page');
};

export default revalidateTranslatorsPage;
