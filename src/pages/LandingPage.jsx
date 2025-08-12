import React, { useState, useCallback } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import ViewedBooks from "../components/ViewedBooks";
import { searchBooks } from "../api/books";
import { useSelector, shallowEqual } from "react-redux";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

export default function LandingPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const viewedBooks = useSelector(
    (state) => state.viewedBooks.books,
    shallowEqual
  );

  const handleSearch = useCallback(async (term) => {
    setLoading(true);
    setError(null);
    setBooks([]);
    try {
      const results = await searchBooks(term);
      setBooks(results);
    } catch {
      setError("Failed to load books. Please try again.");
    }
    setLoading(false);
  }, []);

  return (
    <div className="container mt-4">
      <Header/>
      <SearchBar onSearch={handleSearch} />
      {loading && <Spinner />}
      {error && <p className="text-danger">{error}</p>}
      <BookList books={books} />
      <ViewedBooks viewedBooks={viewedBooks} />
    </div>
  );
}
