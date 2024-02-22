'use client'
import { fetchEpisodesBySlug } from "@/database/episode";
import Link from "next/link";
import { Button } from "./ui/button";
import { FaRegListAlt } from "react-icons/fa";
import { MdArrowRight, MdArrowLeft } from 'react-icons/md';
import { CgArrowTopRightR } from 'react-icons/cg';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Episode } from "@/database/types/types";
import { useEffect, useState } from "react";

interface Props {
  slug: string;
  episodeNumber: string;
  url: string;
}

const EpisodeNav = ({ slug, episodeNumber, url }: Props) => {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  useEffect(() => {
    const fetchEpisodes = async () => {
      const episodes = await fetchEpisodesBySlug(slug);
      setEpisodes(episodes);
    }
    fetchEpisodes();
  }, [slug]);
  const episodeArr = episodes.map((episode) => Number(episode.episode_number));
  episodeArr.sort((a, b) => a - b);
  const currentEpisodeIndex = episodeArr.indexOf(Number(episodeNumber));
  let previousEpisode = null;
  let nextEpisode = null;
  if (currentEpisodeIndex > 0) previousEpisode = episodeArr[currentEpisodeIndex - 1];
  if (currentEpisodeIndex < episodeArr.length - 1) nextEpisode = episodeArr[currentEpisodeIndex + 1];
  return (
    <div className="flex flex-wrap p-4 gap-5 justify-center bg-primary rounded-xl">
      <Link
        aria-disabled={!previousEpisode}
        tabIndex={!previousEpisode ? -1 : undefined}
        className={!previousEpisode ? 'pointer-events-none' : ''}
        href={`/anime/${slug}/${previousEpisode}`}
      >
        <Button className="border">
          <MdArrowLeft
            size={25}
            className={previousEpisode ? 'text-accent' : ''}
          />
          Poprzedni
        </Button>
      </Link>
      <Link href={`/anime/${slug}`}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="border flex gap-2">
                <FaRegListAlt size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Lista odcinków</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {/* <Button className="border flex gap-2">
          <FaRegListAlt size={20} />
        </Button> */}
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={url} target="_blank">
              <Button className="border flex gap-2">
                <CgArrowTopRightR size={20} />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Otwórz w nowej karcie</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Link
        aria-disabled={!nextEpisode}
        tabIndex={!nextEpisode ? -1 : undefined}
        className={!nextEpisode ? 'pointer-events-none' : ''}
        href={`/anime/${slug}/${nextEpisode}`}
      >
        <Button className="border">
          Następny
          <MdArrowRight
            size={25}
            className={nextEpisode ? 'text-accent' : ''}
          />
        </Button>
      </Link>
    </div>
  );
};

export default EpisodeNav;
