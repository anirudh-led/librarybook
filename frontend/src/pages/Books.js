import { useEffect } from "react";
import Navbar from "../components/Navbar";
import BookDetails from "../components/BookDetails";
import { useBooksContext } from "../hooks/useBooksContext";

const Books = () => {
  const { books, dispatch } = useBooksContext();

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_BOOKS", payload: json });
      }
    };

    fetchBooks();
  }, [dispatch]);

  return (
    <div className="Home">
      <Navbar
        name="Library"
        setExtra={true}
        urltwo='admin/create'
        urlnametwo="Create Books"
        url="admin"
        urlname="Admin"
        link=""
      />
      <div className="py-3">
        <div className="workouts">
          <BookDetails books={books} />
        </div>
      </div>
    </div>
  );
};

export default Books;
