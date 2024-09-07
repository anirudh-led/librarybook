import { useEffect, useState } from "react";

const BookIssue = () => {
  const [books, setBooks] = useState([]);
  const [issuedBooks, setIssuedBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        const data = await response.json();
        setBooks(data);

        // Extract issued book IDs for quick lookup
        const issuedBooks = data.filter(book => book.issued).map(book => book._id);
        setIssuedBooks(issuedBooks);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('An error occurred while fetching books.');
      }
    };

    fetchBooks();
  }, []);

  const onClicked = async (bookId) => {
    if (!bookId) {
      console.error("No book ID provided");
      return;
    }

    const isIssued = issuedBooks.includes(bookId);
    const updatedIssuedBooks = isIssued
      ? issuedBooks.filter((id) => id !== bookId)
      : [...issuedBooks, bookId];

    setIssuedBooks(updatedIssuedBooks);

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({ issued: !isIssued }),  // Send the issued status
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (!response.ok) {
        console.error("Server responded with an error:", json.error);
        setError(`Failed to issue/return book: ${json.error}`);
      } else {
        console.log("Success:", json);
        setError(null);  // Clear error if successful
      }
    } catch (err) {
      console.error("Fetch error:", err);  // Log the actual error
      setError("An error occurred while issuing the book.");
    }
  };

  return (
    <div>
      {books &&
        books.map((book) => (
          <div
            key={book._id}
            className="my-5 flex flex-col justify-center items-center border border-black rounded-xl"
            style={{ maxWidth: 400 }}
          >
            <h2>
              <strong>Title: </strong> {book.title}
            </h2>
            <h3>
              <strong>Author: </strong> {book.authour}
            </h3>
            <h3>
              <strong>Description: </strong> {book.description}
            </h3>
            <button
              onClick={() => onClicked(book._id)}
              className="my-1 px-3 py-2 bg-orange-400 transition-colors hover:bg-orange-600 rounded-xl text-white"
            >
              {issuedBooks.includes(book._id) ? "Return" : "Issue"}
            </button>
            {error && <h2 className="text-red-500">{error}</h2>}
          </div>
        ))}
    </div>
  );
};

export default BookIssue;
