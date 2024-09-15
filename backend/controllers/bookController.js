const Book = require("../models/bookModel");
const mongoose = require("mongoose");

//get all books
const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(books);
};

//get a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const books = await Book.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  }
  res.status(200).json(books);
};

//add a book
const addBook = async (req, res) => {
  const { title, authour, description } = req.body;

  try {
    const book = await Book.create({ title, authour, description });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const books = await Book.findOneAndDelete({ _id: id });

  if (!books) {
    return res.status(404).json({ error: "No such workout" });
  }

  res.status(200).json(books);
};

//update a book
const updateBook = async (req, res) => {
  const { id } = req.params;
  const { issued, issuedOn, returnDate, issuedTo } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: "No such book" });
  }

  // Update the issued status, dates, and issuedTo
  const updatedBook = await Book.findOneAndUpdate(
    { _id: id },
    { issued, issuedOn, returnDate, issuedTo },
    { new: true }
  );

  res.status(200).json(updatedBook);
};

//no of books
const noBooks = async (req, res) => {
  try {
    const count = await Book.countDocuments({});
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ error: "Failed to get the number of books" });
  }
};

module.exports = {
  getBooks,
  getBook,
  addBook,
  noBooks,
  deleteBook,
  updateBook,
};
