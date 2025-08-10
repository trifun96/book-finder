import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import { searchBooks } from '../api/books';

export default function LandingPage() {
  const [books, setBooks] = useState([]);

  const handleSearch = async (term) => {
    const results = await searchBooks(term);
    console.log(results,'results');
    
    setBooks(results);
  };

  return (
    <div className="container mt-4">
      <h1>Book Finder</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} />
    </div>
  );
}
