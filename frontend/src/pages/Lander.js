import BookIssue from "../components/BookIssue";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";

const Lander = () => {
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
    <div className="lander">
      <Navbar link="" name="Home Page" url="admin" urlname="Admin" />
      {books ? <BookIssue books={books} /> : <p>Loading books...</p>}
    </div>
  );
};

export default Lander;
