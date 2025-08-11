import { createSlice } from "@reduxjs/toolkit";

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("viewedBooks");
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (books) => {
  try {
    localStorage.setItem("viewedBooks", JSON.stringify(books));
  } catch {
  }
};

const initialState = {
  books: loadFromLocalStorage(),
};

const viewedBooksSlice = createSlice({
  name: "viewedBooks",
  initialState,
  reducers: {
    addBook(state, action) {
      const exists = state.books.find((book) => book.key === action.payload.key);
      if (!exists) {
        state.books.push(action.payload);
        saveToLocalStorage(state.books);
      }
    },
    clearBooks(state) {
      state.books = [];
      saveToLocalStorage([]);
    },
  },
});

export const { addBook, clearBooks } = viewedBooksSlice.actions;
export default viewedBooksSlice.reducer;
