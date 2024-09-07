import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import BookDetails from "../components/BookDetails";

const Books = () => {
  const [books, setBooks] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch("/api/books");
      const json = await response.json();

      if (response.ok) {
        setBooks(json);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="Home">
      <Navbar name="Library" url="admin" urlname="Admin" link="" />
      <div className="py-3">
        <div className="workouts">
          <BookDetails  books={books} />
        </div>
      </div>
    </div>
  );
};

export default Books;
