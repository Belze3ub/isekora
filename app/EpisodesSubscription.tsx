'use client';

import { useEffect } from 'react';
import supabase from '@/database/dbConfig';
import revalidateHomePage from './actions/revalidateHomePage';

export default function EpisodesSubscription() {
  useEffect(() => {
    const channel = supabase
      .channel('latest_episodes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'episode' },
        () => {
          revalidateHomePage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
