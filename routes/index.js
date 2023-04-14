const express = require('express')
const router = express.Router()
const Book = require('../models/book')
const Author = require('../models/author')

router.get('/', async (req, res) => {
    let authors
    let books
    try {
      books = await Book.find().sort({ createdAt: 'desc' }).populate('author').limit(10).exec()
      authors = await Author.find().sort({ createdAt: 'desc'}).limit(10).exec()
    } catch {
        authors = []
        books = []
    }
    res.render('index', { books: books, authors: authors })
  })
  
  module.exports = router
