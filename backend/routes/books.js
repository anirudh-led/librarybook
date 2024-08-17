const express = require('express')
const router = express.Router()
const Book = require('../models/bookModel')
const {
    getBooks,
    getBook,
    addBook,
    noBooks,
    updateBook,
    deleteBook
} = require('../controllers/bookController')

//get all the books
router.get('/', getBooks)

//get a single book
router.get('/:id', getBook)

//post a book
router.post('/', addBook)

//update a book
router.patch('/:id', (req,res) => {
    res.json({mssg: "update a single book"})
})

//delete a book
router.delete('/:id', (req,res) => {
    res.json({mssg: "delete a single book"})
})

module.exports = router