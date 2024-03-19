'use client';

import supabase from '@/database/dbConfig';
import { Anilist, Episode } from '@/database/types/types';
import { useEffect, useState } from 'react';
import EpisodeCard from './EpisodeCard';
import NextEpisodeCard from './NextEpisodeCard';

interface Props {
  slug: string;
  anime: Anilist;
  initialEpisodes: Episode[];
}

const EpisodeList = ({ slug, anime, initialEpisodes }: Props) => {
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes);

  useEffect(() => {
    const episodeSubscription = supabase
      .channel('episode')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'episode' },
        async (payload) => {
          if (payload.eventType === 'DELETE') {
            const deletedEpisode = payload.old as Episode;
            setEpisodes((prevEpisodes) =>
              prevEpisodes.filter(
                (prevEpisode) =>
                  prevEpisode.episode_id !== deletedEpisode.episode_id
              )
            );
          } else if (payload.eventType === 'INSERT') {
            const newEpisode = payload.new as Episode;
            setEpisodes((prevEpisodes) => [...prevEpisodes, newEpisode]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(episodeSubscription);
    };
  }, [slug, setEpisodes]);

  return (
    <div className="grid gap-3 md:grid-cols-[repeat(2,minmax(100px,500px))] lg:grid-cols-[repeat(3,minmax(100px,500px))] xl:grid-cols-[repeat(4,minmax(100px,500px))]">
      {episodes
        .sort((a, b) => Number(a.episode_number) - Number(b.episode_number))
        .map((episode) => (
          <EpisodeCard
            key={episode.episode_id}
            episode={episode}
            title_english={anime.title.english}
            title_romaji={anime.title.romaji}
            titleSlug={slug}
          />
        ))}
      {anime.nextAiringEpisode && (
        <NextEpisodeCard
          episodeNumber={anime.nextAiringEpisode.episode}
          timeUntilAiring={anime.nextAiringEpisode.airingAt}
        />
      )}
    </div>
  );
};

export default EpisodeList;
