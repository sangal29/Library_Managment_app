import BookCard from "./BookCard";
import { useSelector } from "react-redux";

function PopularBooks() {
  const books = useSelector((state) => state.bookSlice.books);

  return (
    <section className="mt-4 px-5">
      <h2 className="text-[25px] font-semibold">Popular Books</h2>
      <section className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-14">
        {books.length ? (
          books?.map((book) => {
            if (book?.rating >= 4.6) {
              return <BookCard key={book?._id} book={book} />;
            }
          })
        ) : (
          <h1>Loading....</h1>
        )}
      </section>
    </section>
  );
}

export default PopularBooks;
