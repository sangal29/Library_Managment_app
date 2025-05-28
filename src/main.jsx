import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter } from "react-router-dom";
import HomePage from './pages/HomePage.jsx';
import BrowseBooks from "./components/BrowseBooks.jsx";
import BookDetails from "./components/BookDetails.jsx";
import AddBookForm from './components/AddBookForm.jsx';
import { RouterProvider } from 'react-router-dom';
import Error from './components/Error.jsx';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "/books/:category",
        element: <BrowseBooks />
      },
      {
        path: "/books/:category/:bookId",
        element: <BookDetails />
      },
      {
        path: "/add-book",
        element: <AddBookForm />
      }
    ],
    errorElement: <Error />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
