'use client';

import { Episode, UrlTranslator } from '@/database/types/types';
import React, { useEffect, useState } from 'react';
import VideoContainer from './VideoContainer';
import { Button } from './ui/button';
import Image from 'next/image';
import EpisodeNav from './EpisodeNav';
import supabase from '@/database/dbConfig';
import { fetchEpisodeUrls } from '@/database/url';

interface Props {
  slug: string;
  episodeNumber: string;
  initialPlayers: UrlTranslator[];
  episodes: Episode[];
}

const EpisodeUrlList = ({
  slug,
  episodeNumber,
  initialPlayers,
  episodes,
}: Props) => {
  const [url, setUrl] = useState<string>(initialPlayers[0].urls[0]);
  const [players, setPlayers] = useState(initialPlayers);

  useEffect(() => {
    const episodeSubscription = supabase
      .channel('url')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'url' },
        async () => {
          const players = await fetchEpisodeUrls(slug, episodeNumber);
          setPlayers(players);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(episodeSubscription);
    };
  }, [slug, episodeNumber]);
  
  return (
    <div className="flex flex-col gap-5">
      <EpisodeNav
        slug={slug}
        episodeNumber={episodeNumber}
        url={url}
        initialEpisodes={episodes}
      />
      {/* {url && <VideoContainer url={url} />} */}
      <iframe allow="fullscreen" src={url} className={`w-full aspect-video`} />
      <div className="flex flex-col sm:grid gap-y-2 gap-x-5 grid-cols-[auto_1fr] sm:items-center">
        {players.map((player) => (
          <React.Fragment key={player.player_name}>
            <div>{player.player_name.toUpperCase()}</div>
            <div className="flex gap-2 flex-wrap">
              {player.urls.map((url, i) => (
                <Button key={url} onClick={() => setUrl(url)}>
                  {player.translator_logos[i] && (
                    <Image
                      src={player.translator_logos[i]}
                      width={30}
                      height={30}
                      alt={
                        `Logo grupy suberskiej ${player.translator_names[i]}` ||
                        'Logo nieznanej grupy suberskiej'
                      }
                      className="mr-1 rounded-full"
                    />
                  )}
                  {player.translator_names[i] || 'Nieznany'}
                </Button>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default EpisodeUrlList;
