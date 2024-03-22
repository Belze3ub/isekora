'use client';

import { useEffect } from 'react';
import supabase from '@/database/dbConfig';
import revalidateAnimeEpisodesPage from '@/app/actions/revalidateAnimeEpisodesPage';

export default function AnimeEpisodesSubscription({
  animeId,
}: {
  animeId: number;
}) {
  useEffect(() => {
    const channel = supabase
      .channel('latest_anime_episodes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'episode',
          filter: `anime_id=eq.${animeId}`,
        },
        () => {
          revalidateAnimeEpisodesPage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [animeId]);

  return null;
}
