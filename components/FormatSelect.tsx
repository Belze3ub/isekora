'use client';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface Params {
  [key: string]: string;
}

export const updateURLParams = (
  router: AppRouterInstance,
  pathname: string,
  params: Params
) => {
  let url = pathname;
  const paramKeys = Object.keys(params);
  if (paramKeys.length > 0) {
    const validParams = paramKeys.filter((key) => params[key]);
    if (validParams.length > 0) {
      url += '?';
      url += validParams.map((key) => `${key}=${params[key]}`).join('&');
    }
  }
  router.push(url);
};

const FormatSelect = ({ formats }: { formats: { format: string }[] }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const genres = searchParams.get('genres') || '';
  const router = useRouter();

  // const handleSelect = (format: string) => {
  //   if (format === 'all') {
  //     router.push(`${pathname}${genres ? '?genres=' + genres : ''}`);
  //   } else {
  //     router.push(
  //       `${pathname}?${genres ? 'genres=' + genres + '&' : ''}format=${format}`
  //     );
  //   }
  // };

  const handleSelect = (format: string) => {
    const params = { genres, format: format === 'all' ? '' : format };
    updateURLParams(router, pathname, params);
  };

  return (
    <Select onValueChange={(format) => handleSelect(format)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Rodzaj" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Wybierz rodzaj...</SelectLabel>
          <SelectItem value="all">Każdy</SelectItem>
          {formats.map((format) => (
            <SelectItem key={format.format} value={format.format}>
              {format.format.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FormatSelect;
