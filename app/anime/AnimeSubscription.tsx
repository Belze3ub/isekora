'use client';

import { useEffect } from 'react';
import supabase from '@/database/dbConfig';
import revalidateAnimePage from '../actions/revalidateAnimePage';
import { revalidatePath } from 'next/cache';

export default function AnimeSubscription() {
  useEffect(() => {
    const channel = supabase
      .channel('latest_anime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'anime' },
        () => {
          // revalidateAnimePage();
          revalidatePath('/anime', 'page');
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
