import { configureStore } from "@reduxjs/toolkit";
import bookReducer from "../features/books/booksSlice"
import favoritesReducer from "../features/favorites/favoritesSlice"

export const store = configureStore({
    reducer: {
        books: bookReducer,
        favorites: favoritesReducer,
    }
})