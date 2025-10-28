import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooks } from "./booksAPI";

export const getBooks = createAsyncThunk('books/getBooks', async (query) => {
    return await fetchBooks(query)
})

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        items: [],
        state: "idle",
        error: null,
        query: '',
    },
    reducers: {
        setQuery: (state, action) => {
            state.query = action.payload;
        },
        clearBooks: (state) => {
            state.items = [];
            state.status = 'idle';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
})

export const { setQuery, clearBooks } = booksSlice.actions
export default booksSlice.reducer