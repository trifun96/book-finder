import { useEffect, useState } from "react";

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const trimmed = term.trim();

    if (!trimmed) {
      setError("");
      onSearch("");
      return;
    }

    if (trimmed.length < 3) {
      setError("Please enter at least 3 characters to search.");
      onSearch("");
      return;
    }

    setError("");

    const timeoutId = setTimeout(() => {
      onSearch(trimmed);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [term, onSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search book by title..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        className="form-control"
      />
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
}
