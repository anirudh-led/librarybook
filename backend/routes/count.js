// Assuming you have a Book model
const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel'); // Adjust the path as necessary

router.get('/books/count', async (req, res) => {
    try {
        const issuedBooksCount = await Book.countDocuments({ issued: true });
        const nonIssuedBooksCount = await Book.countDocuments({ issued: false });
        res.json({ issuedBooksCount, nonIssuedBooksCount });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching book counts', error });
    }
});

module.exports = router;
