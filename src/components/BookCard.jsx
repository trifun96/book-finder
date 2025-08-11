import { Link } from "react-router-dom";
import { getBookCoverUrl } from "../api/books";

export default function BookCard({ book }) {
  const coverUrl = getBookCoverUrl(book.cover_i);
  const workId = book.key.split("/").pop();

  return (
    <Link
      to={`/book/${workId}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="card mb-3" style={{ maxWidth: "200px", cursor: "pointer" }}>
        <img src={coverUrl} alt={book.title} className="card-img-top" />
        <div className="card-body p-2">
          <h6 className="card-title">{book.title}</h6>
          <p className="card-text text-truncate">
            {book.author_name?.join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
}
