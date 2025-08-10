const BASE_URL = "https://openlibrary.org";

export async function searchBooks(searchTerm) {
  const response = await fetch(`${BASE_URL}/search.json?title=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  const data = await response.json();

  return data.docs.filter(book => book.cover_i);
}

export async function getBookDetails(id) {
  const response = await fetch(`${BASE_URL}/works/${id}.json`);
  if (!response.ok) throw new Error("Failed to fetch book details");
  return await response.json();
}

export function getBookCoverUrl(coverId, size = "L") {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}
