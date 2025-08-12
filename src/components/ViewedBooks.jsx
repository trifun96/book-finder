import React from "react";
import BookCard from "./BookCard/BookCard";
import { useDispatch } from "react-redux";
import { clearBooks } from "../features/viewedBooks/viewedBookSlice";

const ViewedBooks = React.memo(({ viewedBooks }) => {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearBooks());
  };

  if (viewedBooks.length === 0) return null;

  return (
    <div className="container mt-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Previously viewed books:</h2>
        <button className="btn btn-primary btn-sm" onClick={handleClear}>
          Clear All
        </button>
      </div>

      <div className="d-flex flex-wrap gap-4">
        {viewedBooks.map((book) => (
          <BookCard
            key={book.key}
            book={{
              title: book.title,
              cover_i: book.coverId,
            }}
          />
        ))}
      </div>
    </div>
  );
});
export default ViewedBooks;
