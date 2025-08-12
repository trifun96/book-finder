import React, { useState, useMemo } from "react";
import BookCard from "./BookCard/BookCard";
import Pagination from "@mui/material/Pagination";

const PAGE_SIZE = 8;

export default function BookList({ books }) {
  const [page, setPage] = useState(1);

  const pageCount = Math.ceil(books.length / PAGE_SIZE);

  const pagedBooks = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return books.slice(start, start + PAGE_SIZE);
  }, [books, page]);

  if (!books.length) {
    return (
      <p
        className="mt-4"
        style={{
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          fontSize: "1rem",
          lineHeight: "1.6",
          color: "#555",
        }}
      >
        No books found for your search. Try typing a book title in the search
        bar above and press Enter to start your search. You can also type just
        part of a title, we will do the rest!
      </p>
    );
  }

  return (
    <>
      <div className="d-flex flex-wrap gap-3 mt-4">
        {pagedBooks.map((book) => (
          <BookCard key={book.key} book={book} />
        ))}
      </div>

      {pageCount > 1 && (
        <div className="d-flex justify-content-center my-3 mb-5">
          <Pagination
            count={pageCount}
            page={page}
            onChange={(e, value) => setPage(value)}
            color="primary"
          />
        </div>
      )}
    </>
  );
}
