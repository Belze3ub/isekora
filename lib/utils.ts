import { type ClassValue, clsx } from 'clsx';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export const seasonTranslations: { [key: string]: string } = {
  winter: 'Zima',
  spring: 'Wiosna',
  summer: 'Lato',
  fall: 'Jesień',
};

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

export const timeAgo = (date: Date) => {
  const now = new Date();
  let diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 1) diffInSeconds = 1;
  if (diffInSeconds < 60) {
    const lastDigit = diffInSeconds % 10;
    let label = 'sekund';

    if (
      lastDigit > 1 &&
      lastDigit <= 4 &&
      !(diffInSeconds >= 11 && diffInSeconds <= 14)
    ) {
      label = 'sekundy';
    }

    if (diffInSeconds === 1) {
      label = 'sekundę';
    }
    return `${diffInSeconds} ${label} temu`;
  }
  if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    const lastDigit = minutes % 10;
    let label = 'minut';

    if (lastDigit > 1 && lastDigit <= 4 && !(minutes >= 11 && minutes <= 14)) {
      label = 'minuty';
    }

    if (minutes === 1) {
      label = 'minutę';
    }
    return `${minutes} ${label} temu`;
  }
  if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    const lastDigit = hours % 10;
    let label = 'godzin';

    if (lastDigit > 1 && lastDigit <= 4 && !(hours >= 11 && hours <= 14)) {
      label = 'godziny';
    }

    if (hours === 1) {
      label = 'godzinę';
    }
    return `${hours} ${label} temu`;
  }
  if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    let label = 'dni';

    if (days === 1) {
      label = 'dzień';
    }
    return `${days} ${label} temu`;
  }
  if (diffInSeconds < 2629800) {
    const weeks = Math.floor(diffInSeconds / 604800);
    const lastDigit = weeks % 10;
    let label = 'tygodni';

    if (lastDigit > 1 && lastDigit <= 4 && !(weeks >= 11 && weeks <= 14)) {
      label = 'tygodnie';
    }

    if (weeks === 1) {
      label = 'tydzień';
    }
    return `${weeks} ${label} temu`;
  }
  if (diffInSeconds < 31557600) {
    const months = Math.floor(diffInSeconds / 2629800);
    const lastDigit = months % 10;
    let label = 'miesięcy';

    if (lastDigit > 1 && lastDigit <= 4 && !(months >= 11 && months <= 14)) {
      label = 'miesiące';
    }

    if (months === 1) {
      label = 'miesiąc';
    }
    return `${months} ${label} temu`;
  }
  if (diffInSeconds >= 31557600) {
    const years = Math.floor(diffInSeconds / 31557600);
    const lastDigit = years % 10;
    let label = 'lat';

    if (lastDigit > 1 && lastDigit <= 4 && !(years >= 11 && years <= 14)) {
      label = 'lata';
    }

    if (years === 1) {
      label = 'rok';
    }
    return `${years} ${label} temu`;
  }
};
