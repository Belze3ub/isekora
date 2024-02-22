import { FaSnowflake, FaLeaf, FaSun, FaCloud } from 'react-icons/fa';

export const SeasonIcon = ({ season }: { season: string }) => {
  switch (season.toLowerCase()) {
    case 'winter':
      return <FaSnowflake color="#8CCFFF" />;
    case 'spring':
      return <FaLeaf color="#52B255" />;
    case 'summer':
      return <FaSun color="#F0C620" />;
    case 'fall':
      return <FaCloud color="#9FC5E5" />;
    default:
      return null;
  }
};
