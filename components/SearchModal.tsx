'use client';
import { useSearchParams } from 'next/navigation';
import Search from './SearchBar';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from './ui/dialog';
import { FaMagnifyingGlass } from 'react-icons/fa6';

const SearchTest = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get('search');
  return (
    <div>
      <Dialog>
        <DialogTrigger className="md:bg-secondary flex items-center gap-2 p-2 rounded-lg">
          <FaMagnifyingGlass />
          <p className="hidden md:block">Szukaj...</p>
        </DialogTrigger>
        <DialogContent className="bg-transparent border-none flex gap-5 flex-col shadow-none max-h-full">
          <DialogHeader>
            <Search />
          </DialogHeader>
          {query && (
            <div className="bg-secondary p-5 rounded-lg max-h-[80%] overflow-auto"></div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchTest;
