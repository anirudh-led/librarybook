import { useState } from "react";
import { useBooksContext } from "../hooks/useBooksContext";

const BookForm = () => {
  const { dispatch } = useBooksContext()
  const [title, setTitle] = useState("");
  const [authour, setAuthour] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const book = { title, authour, description };

    const response = await fetch("/api/books", {
      // Added a leading slash for proper path
      method: "POST",
      body: JSON.stringify(book),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }

    if (response.ok) {
      setTitle("");
      setAuthour("");
      setDescription("");
      setError(null);
      console.log("new book added");
      console.log(response);
      setSuccess("Book added");
      dispatch({type: "CREATE_BOOK", payload: json})
    }
  };

  return (
    <form
      className="flex items-center justify-center flex-col"
      onSubmit={handleSubmit}
    >
      <h3 className="text-3xl font-bold my-4">Add a new book</h3>

      <div className="mb-4">
        <label className="block mb-1">Book title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className="border border-black w-full px-2 py-1 "
          style={{ width: "200px" }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Book author:</label>
        <input
          type="text"
          onChange={(e) => setAuthour(e.target.value)}
          value={authour}
          className="border border-black w-full px-2 py-1"
          style={{ width: "200px" }}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Book description:</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="border border-black w-full px-2 py-1"
          style={{ width: "200px" }}
        />
      </div>

        <button className="bg-blue-400 transition-colors text-white hover:bg-blue-600 px-3 py-2 rounded-lg">
          Submit
        </button>
        <p className="text-green-500">{success}</p>
        {error && <div className="text-red-600 mt-2">{error}</div>}
    </form>
  );
};

export default BookForm;
