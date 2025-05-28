/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { books } from "../../mockdata";

const bookSlice = createSlice({
    name: "book",
    initialState: {
        books: [],
    },
    reducers: {
        getBooks: (state, action) => {
            return state.books;
        },
        updateBooks: (state, action) => {
            state.books = action.payload;
        },
        addBook: (state, action) => {
            state.books.unshift(action.payload);
        }
    }
});

export const { getBooks, addBook, updateBooks } = bookSlice.actions;
export default bookSlice.reducer;