import Header from "./components/Header";
import Footer from "./components/Footer";
import "./index.css";
import { Provider, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { updateBooks } from "./utils/store/slices/bookSlice";
import bookStore from "./utils/store/bookStore";

function AppBody() {
  const dispatch = useDispatch();
  const baseUrl = import.meta.env.VITE_BASE_URL;
  console.log("app");

  useEffect(() => {
    fetchBooks(`${baseUrl}/api/v1/books/all`);
  }, []);

  async function fetchBooks(url) {
    const res = await fetch(url);
    const resJson = await res.json();

    dispatch(updateBooks(resJson.data));
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      <Provider store={bookStore}>
        <AppBody />
      </Provider>
    </>
  );
}

export default App;
