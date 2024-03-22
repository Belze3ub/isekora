'use server';
import { revalidatePath } from 'next/cache';

const revalidateHomePage = () => {
  revalidatePath('/', 'page');
};

export default revalidateHomePage;
