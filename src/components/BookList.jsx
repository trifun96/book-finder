import BookCard from "./BookCard";

export default function BookList({ books }) {
  if (!books.length) {
    return (
      <p>
        {" "}
        No books found for your search. Try typing a book title in the search
        bar above and press Enter to start your search. You can also type just
        part of a title, we will do the rest!
      </p>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-3">
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
}
