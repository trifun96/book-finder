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
      <div
        className="card mb-3"
        style={{
          width: "250px",
          height: "440px",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <img
          src={coverUrl}
          alt={book.title}
          className="card-img-top"
          style={{
            height: "350px",
            objectFit: "cover",
          }}
        />
        <div
          className="card-body p-2"
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h6 className="card-title text-truncate">{book.title}</h6>
          <p className="card-text text-truncate">
            {book.author_name?.join(", ")}
          </p>
        </div>
      </div>
    </Link>
  );
}
