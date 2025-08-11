import BookCard from "./BookCard";
import { useDispatch } from "react-redux";
import { clearBooks } from "../features/viewedBooks/viewedBookSlice";

export default function ViewedBooks({ viewedBooks }) {
  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearBooks());
  };

  if (viewedBooks.length === 0) return null;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Previously viewed books:</h2>
        <button className="btn btn-primary btn-sm" onClick={handleClear}>
          Clear All
        </button>
      </div>

      <div className="column d-flex flex-wrap gap-5">
        {viewedBooks.map((book) => (
          <div key={book.key}>
            <BookCard
              book={{
                title: book.title,
                cover_i: book.coverId,
                key: book.key,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
