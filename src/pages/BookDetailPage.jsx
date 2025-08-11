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

export default function BookDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [authors, setAuthors] = useState([]);
  const [publishYear, setPublishYear] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const data = await getBookDetails(id);
      setBook(data);

      if (data.authors && data.authors.length) {
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
          const publishDate = firstEdition.publish_date;
          setPublishYear(publishDate || "Unknown");

          const isbn13 = firstEdition.isbn_13?.[0];
          const isbn10 = firstEdition.isbn_10?.[0];

          setIsbn(isbn13 || isbn10 || "No ISBN found");
        }
      } catch (error) {
        setPublishYear("Unknown");
        setIsbn("No ISBN found");
      }
    }
    fetchData();
  }, [id, dispatch]);

  if (!book) {
    return <p>Loading book details...</p>;
  }

  const coverUrl = book.covers?.length ? getBookCoverUrl(book.covers[0]) : null;

  return (
    <div className="container mt-3">
      <button className="btn btn-secondary mb-3" onClick={() => navigate(-1)}>
        ← Back
      </button>

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
        {typeof book.description === "string"
          ? book.description
          : book.description?.value || "No description available."}
      </p>
    </div>
  );
}
