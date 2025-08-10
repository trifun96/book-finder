import { getBookCoverUrl } from "../api/books";

export default function BookCard({ book }) {
  const coverUrl = getBookCoverUrl(book.cover_i);

  return (
    <div className="card mb-3" style={{ maxWidth: "200px" }}>
      <img src={coverUrl} alt={book.title} className="card-img-top" />
      <div className="card-body p-2">
        <h6 className="card-title">{book.title}</h6>
        <p className="card-text text-truncate">
          {book.author_name?.join(", ")}
        </p>
      </div>
    </div>
  );
}
