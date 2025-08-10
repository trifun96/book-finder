import { useParams } from "react-router-dom";

function BookDetailsPage() {
  const { id } = useParams();
  return (
    <div className="container mt-4">
      <h1>Book Details Page</h1>
    </div>
  );
}

export default BookDetailsPage;
