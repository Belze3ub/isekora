'use client';
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
import { updateURLParams } from '@/lib/utils';

const FormatSelect = ({ formats }: { formats: { format: string }[] }) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const format = searchParams.get('format') || '';

  const handleSelect = (format: string) => {
    const newParam = { format: format === 'all' ? '' : format, page: '' };
    updateURLParams(router, pathname, newParam);
  };

  return (
    <Select onValueChange={(format) => handleSelect(format)} value={format}>
      <SelectTrigger className="w-[180px]" aria-label='Wybierz rodzaj'>
        <SelectValue placeholder="Rodzaj" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Wybierz rodzaj...</SelectLabel>
          <SelectItem value="all" aria-label='Każdy'>Każdy</SelectItem>
          {formats.map((format) => (
            <SelectItem key={format.format} value={format.format} aria-label={format.format}>
              {format.format.toUpperCase()}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FormatSelect;
