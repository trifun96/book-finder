import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";

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
    <div style={{ marginTop: "30px" }}>
      <TextField
        label="Search book by title"
        variant="outlined"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        fullWidth
        size="small"
        error={Boolean(error)}
        helperText={error}
        placeholder="Search book by title..."
      />
    </div>
  );
}
