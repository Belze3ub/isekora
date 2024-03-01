import { type ClassValue, clsx } from "clsx"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getCurrentSeasonAndYear(): { season: string; year: string } {
  const now = new Date();
  const year = now.getFullYear();
  const seasons: { [key: string]: Date } = {
    winter: new Date(year, 11, 21),
    spring: new Date(year, 2, 20),
    summer: new Date(year, 5, 21),
    fall: new Date(year, 8, 22),
  };
  const seasonNames = Object.keys(seasons);
  let season = 'winter';
  for (let i = 0; i < seasonNames.length; i++) {
    const currentSeason = seasons[seasonNames[i]];
    const nextSeason = seasons[seasonNames[(i + 1) % seasonNames.length]];
    if (now >= currentSeason && now < nextSeason) {
      season = seasonNames[i];
      break;
    }
  }
  return { season, year: year.toString() };
}

export function timestampToDate(timestamp: string) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}.${month}.${year}`;
}

export const seasonTranslations: {[key: string]: string} = {
  winter: 'Zima',
  spring: 'Wiosna',
  summer: 'Lato',
  fall: 'Jesień'
}

export const statusTranslations: { [key: string]: string } = {
  releasing: 'Wychodzi',
  finished: 'Zakończone',
};

export interface Param {
  [key: string]: string;
}

export const updateURLParams = (
  router: AppRouterInstance,
  pathname: string,
  newParam: Param
) => {
  const searchParams = new URLSearchParams(window.location.search);
  for (const [key, value] of Object.entries(newParam)) {
    if (value) {
      searchParams.set(key, value);
    } else {
      searchParams.delete(key);
    }
  }
  const queryString = searchParams.toString();

  const url = queryString ? `${pathname}?${queryString}` : pathname;

  router.push(url);
};