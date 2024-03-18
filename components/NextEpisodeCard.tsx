import React from 'react';
import { FaClock } from 'react-icons/fa';

interface Props {
  timeUntilAiring: number;
  episodeNumber: number;
}

const NextEpisodeCard = ({ timeUntilAiring, episodeNumber }: Props) => {
  const now = Date.now();
  const airDate = timeUntilAiring * 1000; 
  const diff = airDate - now;
  let formattedTimeLeft;
  if (diff < 0) {
    formattedTimeLeft = 'Już powinien być';
  } else if (diff < 1000 * 60 * 60) {
    const minutes = Math.round(diff / (1000 * 60));
    formattedTimeLeft = `${minutes}m`;
  } else if (diff < 1000 * 60 * 60 * 24) {
    const hours = Math.round(diff / (1000 * 60 * 60));
    const minutes = Math.round((diff % (1000 * 60 * 60)) / (1000 * 60));
    formattedTimeLeft = `${hours}h ${minutes}m`;
  } else if (diff < 1000 * 60 * 60 * 24 * 2) {
    formattedTimeLeft = 'Jutro';
  } else {
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    formattedTimeLeft = `Za ${days} dni`;
  }
  return (
    <div className="bg-primary overflow-hidden rounded-xl transition-all">
      <div className="relative w-full aspect-video">
        <div className="absolute z-10 inset-0 place-items-center text-2xl grid">
          <FaClock />
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>
      <div className="p-3">
        <h5>Odcinek {episodeNumber}</h5>
        <h6>{formattedTimeLeft}</h6>
      </div>
    </div>
  );
};

export default NextEpisodeCard;
