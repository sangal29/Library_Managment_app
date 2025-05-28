import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    async function fetchCategories() {
      const res = await fetch(`${baseUrl}/api/v1/categories/all`);
      const categories = await res.json();

      setCategories(categories.data);
    }

    fetchCategories();
  }, []);

  return (
    <section className="mt-8 px-5 overflow-hidden">
      <h2 className="text-[25px] font-semibold">Search by Categories</h2>
      <section
        id="scrollbar-hide"
        className="mt-3 flex gap-x-5 overflow-x-scroll">
        {categories?.map((category) => {
          return (
            <Link to={"/books/" + category?.name} key={category?._id}>
              <article className="bg-blue-900 text-white p-2 min-[500px]:p-3 min-[740px]:p-4 rounded-md whitespace-nowrap">
                <p className="">
                  {category?.name.slice(0, 1).toUpperCase() +
                    category?.name.slice(1)}
                </p>
              </article>
            </Link>
          );
        })}
      </section>
    </section>
  );
}

export default Categories;
