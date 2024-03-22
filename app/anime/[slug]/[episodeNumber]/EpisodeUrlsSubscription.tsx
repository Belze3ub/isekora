'use client';

import { useEffect } from 'react';
import supabase from '@/database/dbConfig';
import revalidateEpisodePage from '@/app/actions/revalidateEpisodePage';
import { revalidatePath } from 'next/cache';

export default function EpisodeUrlsSubscription({ episodeId }: { episodeId: number }) {
  useEffect(() => {
    const channel = supabase
      .channel('latest_episode_urls')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'url',
          filter: `episode_id=eq.${episodeId}`,
        },
        () => {
          revalidateEpisodePage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [episodeId]);

  return null;
}
