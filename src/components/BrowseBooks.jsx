/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BookCard from "./BookCard";
import { updateBooks } from "../utils/store/slices/bookSlice";

function BrowseBooks() {
  const { category } = useParams("category");
  const allBooks = useSelector((state) => state.bookSlice.books);
  const [books, setBooks] = useState(allBooks);
  const [filteredBooks, setFilteredBooks] = useState(books);
  const [bookInput, setBookInput] = useState("");
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    let url;
    if (category === "all") url = `${baseUrl}/api/v1/books/all`;
    else url = `${baseUrl}/api/v1/books/category/${category}`;
    if (category.startsWith("search")) searchBook();
    else fetchBooks(url);
  }, [category]);

  useEffect(() => {
    // To Scroll the page to top
    window.scrollTo(0, 0);
  }, []);

  async function fetchBooks(url) {
    const res = await fetch(url);
    const resJson = await res.json();

    setFilteredBooks(resJson.data);
  }

  async function searchBook() {
    if (bookInput.trim() === "") return;

    const res = await fetch(`${baseUrl}/api/v1/books/search?q=${bookInput}`);
    const resJson = await res.json();

    setFilteredBooks(resJson.data);
    setBookInput("");
  }

  return (
    <section className="min-h-[488px] flex flex-col items-center mt-7">
      <h1 className="text-3xl text-center font-semibold italic">
        Your Perfect Book is Just a Search Away!
      </h1>
      <article className="mt-7 flex items-center px-2">
        <input
          value={bookInput}
          onChange={(e) => setBookInput(e.target.value)}
          type="text"
          className="w-full min-[650px]:min-w-[500px] ps-4 pe-3 py-2 text-lg font-semibold rounded-s-full outline-none border-blue-900 border-2"
          placeholder="Search by Book Name or Author Name"
        />
        <Link to={`/books/search-${bookInput}`}>
          <button className="bg-sky-900 text-white font-semibold text-lg px-5 py-[10px] rounded-e-full">
            Search
          </button>
        </Link>
      </article>
      <section className="mt-14 flex flex-wrap justify-center gap-x-5 gap-y-14">
        {filteredBooks.length ? (
          filteredBooks?.map((book) => {
            return <BookCard key={book?._id} book={book} />;
          })
        ) : (
          <h1 className="text-black font-semibold text-3xl">
            No Books Available!
          </h1>
        )}
      </section>
    </section>
  );
}

export default BrowseBooks;
