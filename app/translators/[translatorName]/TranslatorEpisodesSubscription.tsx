'use client';

import { useEffect } from 'react';
import supabase from '@/database/dbConfig';
import revalidateTranslatorPage from '@/app/actions/revalidateTranslatorPage';

export default function TranslatorEpisodesSubscription({
  translatorId,
}: {
  translatorId: number;
}) {
  useEffect(() => {
    const channel = supabase
      .channel('latest_translator_episodes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'url',
          filter: `translator_id=eq.${translatorId}`,
        },
        () => {
          revalidateTranslatorPage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [translatorId]);

  return null;
}
