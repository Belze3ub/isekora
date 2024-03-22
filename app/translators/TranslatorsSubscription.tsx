'use client';

import { useEffect } from 'react';
import supabase from '@/database/dbConfig';
import revalidateTranslatorsPage from '../actions/revalidateTranslatorsPage';

export default function TranslatorsSubscription() {
  useEffect(() => {
    const channel = supabase
      .channel('latest_translators')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'translator' },
        () => {
          revalidateTranslatorsPage();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return null;
}
