'use client';
import { ChangeEvent } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { DialogClose } from './ui/dialog';
import { Input } from './ui/input';

interface Props {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: Props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const clearQuery = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative items-center gap-2 flex">
      <div className="absolute left-0 flex">
        {searchQuery ? (
          <div className="p-2 cursor-pointer" onClick={clearQuery}>
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
        value={searchQuery}
        onChange={(e) => handleSearch(e)}
      />
      <div className="absolute right-0 flex" onClick={clearQuery}>
        <DialogClose className="p-2">
          <IoClose />
        </DialogClose>
      </div>
    </div>
  );
};

export default SearchBar;
