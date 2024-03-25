'use client';

import { Episode, UrlTranslator } from '@/database/types/types';
import Image from 'next/image';
import React, { useState } from 'react';
import EpisodeNav from './EpisodeNav';
import { Button } from './ui/button';

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
  
  return (
    <div className="flex flex-col gap-5">
      <EpisodeNav
        slug={slug}
        episodeNumber={episodeNumber}
        url={url}
        initialEpisodes={episodes}
      />
      <iframe
        allow="fullscreen"
        src={url}
        className={`w-full aspect-video overflow-hidden`}
        title={`Odtwarzacz dla odcinka ${episodeNumber}`}
        scrolling="no"
      />
      <div className="flex flex-col sm:grid gap-y-2 gap-x-5 grid-cols-[auto_1fr] sm:items-center">
        {initialPlayers.map((player) => (
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
