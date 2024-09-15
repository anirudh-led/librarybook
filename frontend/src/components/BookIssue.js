import { useEffect, useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookIssue = () => {
  const { books, dispatch } = useBooksContext(); // Get books from context
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]); // Users state
  const [openBookId, setOpenBookId] = useState(null); // Track which book's dropdown is open

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/api/books");
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_BOOKS", payload: data });
        } else {
          setError("Failed to fetch books");
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("An error occurred while fetching books.");
      }
    };

    fetchBooks();
  }, [dispatch]);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("An error occurred while fetching users.");
      }
    };

    fetchUsers();
  }, []);

  // Handle user selection and issue the book
  const handleUserSelect = (bookId, user) => {
    onClicked(bookId, user); // Issue the book to the selected user
    setOpenBookId(null); // Close the dropdown after selection
  };

  // Handle issuing or returning the book
  const onClicked = async (bookId, selectedUser) => {
    const book = books.find((book) => book._id === bookId);

    const issued = !book.issued;
    let issuedOn = null;
    let returnDate = null;
    let issuedTo = null;

    if (issued) {
      issuedOn = new Date(); // Set issue date
      returnDate = new Date(issuedOn); // Set return date as 14 days later
      returnDate.setDate(issuedOn.getDate() + 14);
      issuedTo = selectedUser.username; // Set issuedTo as username
    }

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({
          issued,
          issuedOn,
          returnDate,
          issuedTo, // Send username if issuing
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "UPDATE_BOOK", payload: json }); // Update context state
        setError(null); // Clear any errors
      } else {
        setError("Failed to update book");
      }
    } catch (err) {
      console.error("Error updating book:", err);
      setError("An error occurred while updating the book.");
    }
  };

  // Handle returning the book
  const handleReturn = async (bookId) => {
    const book = books.find((book) => book._id === bookId);

    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "PATCH",
        body: JSON.stringify({
          issued: false,
          issuedOn: null,
          returnDate: null,
          issuedTo: null, // Clear issuedTo when returning
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "UPDATE_BOOK", payload: json }); // Update context state
        setError(null); // Clear any errors
      } else {
        setError("Failed to update book");
      }
    } catch (err) {
      console.error("Error updating book:", err);
      setError("An error occurred while updating the book.");
    }
  };

  // Handle deleting a book
  const delClicked = async (bookId) => {
    try {
      const response = await fetch(`/api/books/${bookId}`, {
        method: "DELETE",
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "DELETE_BOOK", payload: json });
      } else {
        setError("Failed to delete book");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      setError("An error occurred while deleting the book.");
    }
  };

  // Toggle dropdown for the book
  const toggleDropdown = (bookId) => {
    setOpenBookId((prevId) => (prevId === bookId ? null : bookId)); // Toggle dropdown for specific book
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
              <strong>Authour: </strong> {book.authour}
            </h3>
            <h3>
              <strong>Description: </strong> {book.description}
            </h3>
            <h3>
              <strong>Issued On: </strong>{" "}
              {book.issuedOn
                ? new Date(book.issuedOn).toLocaleDateString()
                : "Not Issued"}
            </h3>
            <h3>
              <strong>Return Date: </strong>{" "}
              {book.returnDate
                ? new Date(book.returnDate).toLocaleDateString()
                : "N/A"}
            </h3>

            {/* Issue or Return Button */}
            {!book.issued ? (
              <button
                onClick={() => toggleDropdown(book._id)}
                className="my-1 px-3 py-2 bg-orange-400 transition-colors hover:bg-orange-600 rounded-xl text-white"
              >
                Issue
              </button>
            ) : (
              <button
                onClick={() => handleReturn(book._id)}
                className="my-1 px-3 py-2 bg-red-400 transition-colors hover:bg-red-600 rounded-xl text-white"
              >
                Return
              </button>
            )}

            {/* Dropdown for users */}
            {openBookId === book._id && (
              <div className="dropdown">
                <ul className="dropdown-menu border p-2">
                  {users.length > 0 ? (
                    users.map((user) => (
                      <li
                        key={user._id}
                        className="cursor-pointer hover:bg-gray-200 p-2"
                        onClick={() => handleUserSelect(book._id, user)} // Automatically issue the book when user is selected
                      >
                        {user.username}
                      </li>
                    ))
                  ) : (
                    <li>No users available</li>
                  )}
                </ul>
              </div>
            )}

            {/* Error Message */}
            {error && <h2 className="text-red-500">{error}</h2>}

            {/* Delete Button */}
            <button
              onClick={() => delClicked(book._id)}
              className="my-1 px-3 py-1 bg-red-400 transition-colors hover:bg-red-600 rounded-lg text-white"
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default BookIssue;
