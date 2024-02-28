import { Anilist } from "@/database/types/types";
import client from "./apolloClient";
import { gql } from "@apollo/client";

const GET_ANIME_DETAILS = `
  query Anilist ($id: Int, $type: MediaType = ANIME) {
    Media(id: $id, type: $type) {
      id
      idMal
      title {
        romaji
        english
        native
      }
      coverImage {
        extraLarge
        large
        medium
        color
      }
      bannerImage
      description
      format
      episodes
      duration
      status
      startDate {
        year
        month
        day
      }
      endDate {
        year
        month
        day
      }
      season
      seasonYear
      averageScore
      meanScore
      popularity
      favourites
      genres
      studios {
        nodes {
          name
        }
      }
      synonyms
      trailer {
        id
        site
        thumbnail
      }
      recommendations {
        nodes {
          mediaRecommendation {
            title {
              romaji
              english
              native
            }
          }
        }
      }
      relations {
        edges {
          node {
            title {
              romaji
              english
              native
            }
            type
          }
          relationType
        }
      }
      nextAiringEpisode {
        airingAt
        timeUntilAiring
        episode
      }
    }
  }
`;

const fetchAnimeInfo = async (id: number): Promise<Anilist | null> => {
  try {
    const {data} = await client.query({
      query: gql(GET_ANIME_DETAILS),
      variables: {id}
    })
    return data.Media
  } catch (error) {
    if (error instanceof Error) {
      console.error(
        `Error fetching data for anilist_id: ${id}: ${error.message}`
      );
    }
    return null;
  }
};

export default fetchAnimeInfo;
