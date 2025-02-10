// SearchBar.tsx
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import toast from 'react-hot-toast';
import css from './SearchBar.module.css';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const query = new FormData(form).get('query') as string;

    if (!query.trim()) {
      toast('You must enter text to search for images');
      return;
    }

    onSubmit(query.trim());
    form.reset();
  };

  return (
    <header className={css.container}>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          name="query"
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit" className={css.searchButton}>
          <BsSearch size={20} />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
