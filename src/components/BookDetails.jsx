import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BreadCrumb from "./BreadCrumb";

function BookDetails() {
  const [book, setBook] = useState(null);
  const { bookId } = useParams("bookId");
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchBookById(`${baseUrl}/api/v1/books/book/${bookId}`);
  }, []);

  async function fetchBookById(url) {
    const res = await fetch(url);
    const resJson = await res.json();

    setBook(resJson.data);
  }

  useEffect(() => {
    // To Scroll the page to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="px-2">
      {book && <BreadCrumb book={book} category={book.category} />}
      <section className="min-h-[428px] flex justify-center">
        {book ? (
          <section className="place-items-center bg-slate-200 shadow-lg px-4 pt-3 pb-3 relative">
            <img className="w-80 h-[370px] rounded-lg" src={book?.imageSrc} />
            <article className="w-full after:absolute after:rounded-sm after:shadow-lg after:bg-sky-200 after:w-20 after:h-8 after:right-0 after:top-0">
              <article className="flex justify-between gap-x-5">
                <article>
                  <h1 className="font-semibold text-xl mt-3 max-w-[200px]">
                    {book?.title}
                  </h1>
                  <p className="text-slate-600 font-semibold mt-2">
                    {book?.author}
                  </p>
                </article>
                <article className="mt-3">
                  <p className="font-semibold">
                    {book?.country} - {book?.releasedYear}
                  </p>
                  <p className="text-slate-600 font-semibold mt-2">
                    {book?.category}
                  </p>
                </article>
              </article>
            </article>
            <p className="mt-5 font-semibold max-w-[320px]">
              {book?.description}
            </p>
            <p className="font-semibold absolute right-2 top-[1px] text-lg">
              {book?.rating} ⭐
            </p>
          </section>
        ) : (
          <h1 className="mt-24 text-black font-semibold text-3xl">
            Book Not Available!
          </h1>
        )}
      </section>
    </section>
  );
}

export default BookDetails;
