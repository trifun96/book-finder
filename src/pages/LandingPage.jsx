import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import BookList from "../components/BookList";
import { searchBooks } from "../api/books";
import { useSelector } from "react-redux";
import ViewedBooks from "../components/ViewedBooks";

export default function LandingPage() {
  const [books, setBooks] = useState([]);
  const viewedBooks = useSelector((state) => state.viewedBooks.books);

  const handleSearch = async (term) => {
    const results = await searchBooks(term);
    setBooks(results);
  };

  return (
    <>
      <div className="container mt-4">
        <h1>Book Finder</h1>
        <SearchBar onSearch={handleSearch} />
        <BookList books={books} />
        <ViewedBooks viewedBooks={viewedBooks}/>
      </div>
    </>
  );
}
