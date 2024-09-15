const express = require('express')
const router = express.Router()
const User = require('../models/userModel')
const { addUser, getUser, getUsers, deleteUser } = require('../controllers/userController')

//get all the books
router.get('/', getUsers)

//get a single book
router.get('/:id', getUser)

//post a book
router.post('/', addUser)

//delete a book
router.delete('/:id', deleteUser)


module.exports = router