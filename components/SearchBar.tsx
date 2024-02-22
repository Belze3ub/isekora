'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Input } from './ui/input';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DialogClose } from './ui/dialog';

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {
      router.push(`${pathname}?query=${query}`);
    } else {
      router.push(`${pathname}`);
    }
  }, [query, router, pathname]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="relative items-center gap-2 flex">
      <div className="absolute left-0 flex">
        {query ? (
          <div className="p-2 cursor-pointer" onClick={() => setQuery('')}>
            <IoClose className="text-accent" />
          </div>
        ) : (
          <div className="p-2">
            <FaMagnifyingGlass />
          </div>
        )}
      </div>
      <Input
        placeholder="Szukaj..."
        className="pl-8 no-focus border-none bg-secondary"
        value={query}
        onChange={(e) => handleSearch(e)}
      />
      <div className="absolute right-0 flex" onClick={() => setQuery('')}>
        <DialogClose className="p-2">
          <IoClose />
        </DialogClose>
      </div>
    </div>
  );
};

export default Search;
