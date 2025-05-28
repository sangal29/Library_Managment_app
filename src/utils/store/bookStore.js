import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./slices/bookSlice";

const bookStore = configureStore({
    reducer: {
        bookSlice: bookSlice
    }
});

export default bookStore;