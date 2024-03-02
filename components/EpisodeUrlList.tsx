'use client';

import { Episode, UrlTranslator } from '@/database/types/types';
import React, { useState } from 'react';
import VideoContainer from './VideoContainer';
import { Button } from './ui/button';
import Image from 'next/image';
import EpisodeNav from './EpisodeNav';

interface Props {
  slug: string;
  episodeNumber: string;
  players: UrlTranslator[];
  episodes: Episode[];
}

const EpisodeUrlList = ({ slug, episodeNumber, players, episodes }: Props) => {
  const [url, setUrl] = useState<string>(players[0].urls[0]);
  return (
    <div className="flex flex-col gap-5">
      <EpisodeNav
        slug={slug}
        episodeNumber={episodeNumber}
        url={url}
        episodes={episodes}
      />
      {url && <VideoContainer url={url} />}
      <div className="flex flex-col sm:grid gap-y-2 gap-x-5 grid-cols-[auto_1fr]">
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
                      alt="Translator Name"
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
