'use client';
import SearchBar from './SearchBar';

import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import SearchResults from './SearchResults';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from './ui/dialog';

const SearchModal = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div>
      <Dialog>
        <DialogTrigger className="md:bg-secondary flex items-center gap-2 p-2 rounded-lg">
          <FaMagnifyingGlass />
          <p className="hidden md:block">Szukaj...</p>
        </DialogTrigger>
        <DialogContent
          className="bg-transparent border-none flex flex-col shadow-none max-h-full"
          onClick={() => setSearchQuery('')}
        >
          <DialogHeader>
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </DialogHeader>
          {searchQuery && <SearchResults searchQuery={searchQuery} setSearchQuery={setSearchQuery} />}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SearchModal;
