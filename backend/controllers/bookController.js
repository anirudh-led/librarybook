const Book = require("../models/bookModel");
const mongoose = require("mongoose");

//get all books
const getBooks = async (req, res) => {
  const books = Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(books);
};

//get a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const books = Book.findById(id);

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
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such book" });
      }
    
    const books = await Book.findOneAndDelete({_id :id});
    
    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(books);
}


//update a book
const updateBook = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such book" });
      }
    
    const books = await Book.findOneAndUpdate({_id :id}, {
        ...req.body
    });
    
    if (!workout) {
        return res.status(404).json({ error: "No such workout" });
    }

    res.status(200).json(books);
}

//no of books
const noBooks = Book.countDocuments({})
  .then((count) => {
    const noBooks = count;
    console.log(noBooks);
  })
  .catch((err) => {
    console.error("Error counting documents:", err);
  });

module.exports = {
  getBooks,
  getBook,
  addBook,
  noBooks,
  deleteBook,
  updateBook
};
