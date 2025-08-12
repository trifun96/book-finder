import {
  getBookDetails,
  getBookCoverUrl,
  getAuthorDetails,
  getWorkEditions,
} from "../api/books";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../features/viewedBooks/viewedBookSlice";
import Spinner from "../components/Spinner";

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [publishYear, setPublishYear] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

useEffect(() => {
  async function fetchData() {
    setLoading(true);
    try {
      const data = await getBookDetails(id);
      setBook(data);

      if (data.authors?.length) {
        const authorNames = await Promise.all(
          data.authors.map(async (authorObj) => {
            const authorData = await getAuthorDetails(authorObj.author.key);
            return authorData.name || "Unknown author";
          })
        );
        setAuthors(authorNames);
      }

      dispatch(
        addBook({
          key: data.key,
          title: data.title,
          coverId: data.covers?.[0] || null,
        })
      );

      try {
        const editions = await getWorkEditions(id);
        if (editions.length > 0) {
          const firstEdition = editions[0];
          setPublishYear(firstEdition.publish_date || "Unknown");

          const isbn13 = firstEdition.isbn_13?.[0];
          const isbn10 = firstEdition.isbn_10?.[0];
          setIsbn(isbn13 || isbn10 || "No ISBN found");
        }
      } catch {
        setPublishYear("Unknown");
        setIsbn("No ISBN found");
      }
    } finally {
      setLoading(false);
    }
  }

  fetchData();
}, [id]);


  const coverUrl = book?.covers?.length
    ? getBookCoverUrl(book.covers[0])
    : null;

  return (
    <div className="container mt-3">
      {loading && <Spinner />}

      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

      {book && (
        <>
          <h1>{book.title}</h1>
          {coverUrl && (
            <img
              src={coverUrl}
              alt={book.title}
              className="img-fluid mb-3"
              style={{ maxWidth: "300px" }}
            />
          )}

          <p>
            <strong>Authors:</strong>{" "}
            {authors.length ? authors.join(", ") : "No authors found."}
          </p>

          <p>
            <strong>Published:</strong> {publishYear || "Unknown"}
          </p>

          <p>
            <strong>ISBN:</strong> {isbn}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {book.description?.value ||
              book.description ||
              "No description available."}
          </p>
        </>
      )}
    </div>
  );
}
