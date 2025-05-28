import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between px-5 py-3">
      <Link to="/">
        <h1 className="text-xl min-[450px]:text-2xl font-bold">LibraryHub</h1>
      </Link>
      <nav>
        <ul className="flex gap-x-4">
          <Link to="/" className="min-[450px]:block hidden">
            <li className="font-semibold">Home</li>
          </Link>
          <Link to="/books/all">
            <li className="font-semibold">All Books</li>
          </Link>
          <Link to="/add-book">
            <li className="font-semibold">Add Book</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
