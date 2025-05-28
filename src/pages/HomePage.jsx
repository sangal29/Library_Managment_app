import Hero from "../components/Hero";
import Categories from "../components/Categories";
import PopularBooks from "../components/PopularBooks";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    // To Scroll the page to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Hero />
      <Categories />
      <PopularBooks />
    </>
  );
}

export default HomePage;
