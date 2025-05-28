import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "../utils/store/slices/bookSlice";
import Toaster from "./Toaster";

function AddBookForm() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    releasedYear: "",
    rating: "",
    country: "",
    bookCover: null,
  });
  const dispatch = useDispatch();
  const [showToaster, setShowToaster] = useState(false);
  const [toasterMessage, setToasterMessage] = useState("");
  const [toasterTextColorClass, setToasterTextColorClass] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const coverImageInput = useRef();

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${baseUrl}/api/v1/categories/all`);
      const categories = await res.json();

      setCategories(categories.data);
    }

    fetchCategories();
  }, []);

  function handleDataChange(e) {
    let { name, value, files } = e.target;

    setFormData((prevState) => {
      return {
        ...prevState,
        [name]: files ? files[0] : value,
      };
    });
  }

  function handleAddBook(e) {
    e.preventDefault();

    const error = validateData(formData);
    if (error) return;

    const data = new FormData();

    Object.entries(formData).forEach((entry) => {
      if (entry[0] === "category") entry[1] = entry[1].toLowerCase();
      data.append(entry[0], entry[1]);
    });

    addNewBook(data);
  }

  async function addNewBook(data) {
    setLoading(true);

    const res = await fetch(`${baseUrl}/api/v1/books/add`, {
      method: "POST",
      body: data,
    });

    setLoading(false);

    const book = await res.json();

    if (book.status === "success") {
      showToasterPopUp("Book added successfully !", "text-green-400");
      setFormData({
        title: "",
        author: "",
        description: "",
        category: "",
        releasedYear: "",
        rating: "",
        country: "",
        bookCover: null,
      });
      if (coverImageInput.current) {
        coverImageInput.current.value = "";
      }
    }

    dispatch(addBook(book.data));
  }

  function validateData(formData) {
    if (
      [
        formData.title,
        formData.author,
        formData.description,
        formData.category,
        formData.releasedYear,
        formData.rating,
        formData.country,
      ].some((item) => item.trim() === "")
    ) {
      showToasterPopUp("Fields are missing !", "text-red-400");
      return true;
    }

    if (formData.category === "Select") {
      showToasterPopUp("Category is missing !", "text-red-400");
      return true;
    }

    if (!formData.bookCover) {
      showToasterPopUp("Book Cover Image is missing !", "text-red-400");
      return true;
    }

    if (!formData.bookCover.type.startsWith("image")) {
      showToasterPopUp("Book Cover should be an image !", "text-red-400");
      return true;
    }

    if (formData.bookCover.size > 5 * 1024 * 1024) {
      showToasterPopUp(
        "Book Cover image can be upto 5mb size only !",
        "text-red-400"
      );
      return true;
    }

    return false;
  }

  function showToasterPopUp(message, tailwindTextColorClass) {
    setShowToaster(true);
    setToasterMessage(message);
    setToasterTextColorClass(tailwindTextColorClass);

    setTimeout(() => {
      setShowToaster(false);
      setToasterMessage("");
      setToasterTextColorClass("");
    }, 2000);
  }

  return (
    <section className="px-3">
      <section className="flex flex-col place-self-center items-center mt-5 shadow-lg bg-slate-200 w-fit px-4 py-3 rounded-md">
        <h1 className="text-3xl font-bold">Add Book</h1>
        <form onSubmit={handleAddBook} className="flex flex-col gap-y-5 mt-7">
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Enter Book Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={(e) => handleDataChange(e)}
              type="text"
              className="w-full outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2"
            />
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Enter Author Name</label>
            <input
              value={formData.author}
              name="author"
              onChange={(e) => handleDataChange(e)}
              type="text"
              className="w-full outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2"
            />
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Enter Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={(e) => handleDataChange(e)}
              className="resize-none w-full outline-none border-2 border-sky-900 rounded-md ps-1 pe-2"
              cols="60"
              rows="3"></textarea>
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Select Category</label>
            <select
              name="category"
              value={formData.category}
              className="p-2"
              onChange={(e) => handleDataChange(e)}>
              <option>Select</option>
              {categories &&
                categories.map((category) => {
                  return (
                    <option key={category._id}>
                      {category.name.slice(0, 1).toUpperCase() +
                        category.name.slice(1)}
                    </option>
                  );
                })}
            </select>
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Enter Released Year</label>
            <input
              name="releasedYear"
              value={formData.releasedYear}
              onChange={(e) => handleDataChange(e)}
              className="w-full outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2"
            />
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Select Book Cover Image</label>
            <input
              ref={coverImageInput}
              name="bookCover"
              onChange={(e) => handleDataChange(e)}
              type="file"
              accept="image/*"
              className="w-full outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2"
            />
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Enter Ratings</label>
            <input
              name="rating"
              value={formData.rating}
              onChange={(e) => handleDataChange(e)}
              className="w-full outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2"
            />
          </article>
          <article className="flex flex-col gap-y-1">
            <label className="font-semibold">Enter Origin Country</label>
            <input
              name="country"
              value={formData.country}
              onChange={(e) => handleDataChange(e)}
              type="text"
              className="w-full outline-none border-2 border-sky-900 rounded-md ps-1 py-1 pe-2"
            />
          </article>
          <button
            type="submit"
            className="flex items-center gap-x-3 mt-4 text-[15px] bg-blue-900 text-white w-fit self-center py-2 px-10 rounded-md">
            Add Book
            {loading && (
              <span className="inline-block w-5 h-5 border-t-white border-t-2 border-e-2 animate-spin rounded-full"></span>
            )}
          </button>
        </form>
      </section>
      {showToaster && (
        <Toaster
          message={toasterMessage}
          textColorClass={toasterTextColorClass}
        />
      )}
    </section>
  );
}

export default AddBookForm;
