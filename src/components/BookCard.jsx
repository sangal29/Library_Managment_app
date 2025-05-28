import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function BookCard({ book }) {
  return (
    <article className="flex flex-col items-center shadow-[2px_3px_5px_#777] p-3 rounded-lg">
      <img src={book?.imageSrc} className="w-[220px] h-[270px] rounded-lg" />
      <h2 title={book?.title} className="mt-2 font-semibold">
        {book?.title.length <= 25
          ? book?.title
          : book?.title?.slice(0, 25) + "..."}
      </h2>
      <h2 className="mt-2 font-semibold text-sm text-slate-500">
        {book?.author}
      </h2>
      <Link to={"/books/" + book?.category + "/" + book?._id}>
        <button className="mt-4 text-[15px] bg-blue-900 text-white p-2 rounded-md">
          View More Details
        </button>
      </Link>
    </article>
  );
}

export default BookCard;
