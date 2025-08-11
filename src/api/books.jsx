const BASE_URL = "https://openlibrary.org";
const BOOK_COVER_URL = "https://covers.openlibrary.org";

export async function searchBooks(searchTerm) {
  const response = await fetch(`${BASE_URL}/search.json?title=${encodeURIComponent(searchTerm)}`);
  if (!response.ok) throw new Error("Failed to fetch books");
  const data = await response.json();

  return data.docs.filter(book => book.cover_i);
}

export async function getBookDetails(id) {
  const response = await fetch(`${BASE_URL}/works/${id}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }
  return await response.json();
}

export async function getAuthorDetails(authorKey) {
  const response = await fetch(`${BASE_URL}${authorKey}.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch author details");
  }
  return await response.json();
}

export async function getWorkEditions(id) {
  const response = await fetch(`${BASE_URL}/works/${id}/editions.json`);
  if (!response.ok) {
    throw new Error("Failed to fetch editions");
  }
  const data = await response.json();
  return data.entries || [];
}

export function getBookCoverUrl(coverId, size = "L") {
  return `${BOOK_COVER_URL}/b/id/${coverId}-${size}.jpg`;
}
