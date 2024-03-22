'use server';
import { revalidatePath } from 'next/cache';

const revalidateAnimePage = () => {
  revalidatePath('/anime', 'page');
};

export default revalidateAnimePage;
