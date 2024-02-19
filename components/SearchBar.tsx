'use client';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { Input } from './ui/input';
import { ChangeEvent, useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

const Search = () => {
  const router = useRouter();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query) {
      router.push(`?search=${query}`)
    } else {
      router.push('/')
    }
  }, [query, router])

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  return (
    <div className="relative items-center gap-2 md:flex">
      <div className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform">
        {query ? (
          <IoClose
            className="text-accent cursor-pointer"
            onClick={() => setQuery('')}
          />
        ) : (
          <FaMagnifyingGlass />
        )}
      </div>
      <Input
        placeholder="Szukaj..."
        className="pl-8 no-focus border-none bg-secondary"
        value={query}
        onChange={(e) => handleSearch(e)}
      />
    </div>
  );
};

export default Search;
