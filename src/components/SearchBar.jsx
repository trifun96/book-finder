import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        type="text"
        placeholder="Search book by title..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="form-control"
      />
      <button type="submit" className="btn btn-primary mt-2">
        Search
      </button>
    </form>
  );
}
