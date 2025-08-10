import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books.length) {
    return <p>No books found.</p>;
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
}
