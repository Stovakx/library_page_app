const express = require('express')
const router = express.Router()
const fs = require('fs')
const Book = require('../models/book')
const Author = require('../models/author')
const multer = require('multer')
const path = require('path')
const uploadPath = path.join('public', Book.coverImageBasePath)
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const upload = multer({
  dest: uploadPath,
  fileFilter: (req, file, callback) => {
    callback(null, imageMimeTypes.includes(file.mimetype))
  }
})

// All Books Route
router.get('/', async (req, res) => {
  let query = Book.find().populate('author')
  //title search
  if (req.query.title != null && req.query.title != '') {
    query = query.regex('title', new RegExp(req.query.title, 'i'))
  }
  //searching with publishing date before and after
/*   if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
    query = query.lte('publishDate', req.query.publishedBefore)
  }
  if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
    query = query.gte('publishDate', req.query.publishedAfter)
  } */
  //to do!!! genre checkboxes
  try {
    const books = await query.exec()
    res.render('books/index', {
      books: books,
      searchOptions: req.query
    })
  } catch {
    res.redirect('/')
  }
})

// New Book Route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Book())
})

// Create Book Route
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    genre: req.body.genre,
    publishDate: new Date(req.body.publishDate),
    pageCount: req.body.pageCount,
    coverImageName: fileName,
    description: req.body.description,
  })

  try {
    const newBook = await book.save()
    res.redirect(`books/${newBook.id}`)
  } catch {
    if (book.coverImageName != null) {
      removeBookCover(book.coverImageName)
    }
    renderNewPage(res, book, true)
  }
})

//view page book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
                           .populate('author')
                           .exec()
    res.render('books/showbook', { book: book })
  } catch {
    res.redirect('/')
  }
})

//adding comments
router.post('/:id', async function(req, res, next) {
  try {
    const rating = req.body.rating
    const user = req.body.user
    const bookId = req.params.id
    const commentText = req.body.comment

    const comment = new Comment({
      text: commentText,
      user: user,
      book: bookId,
      rating: rating
    })

    await comment.save();

    await Book.findByIdAndUpdate(bookId, { $push: { comments: comment._id } });

    res.redirect('/books/:id');
  } catch (err) {
    return next(err);
  }
});

//edit book
router.get('/:id/edit', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    renderEditPage(res, book)
  } catch {
    res.redirect('/')
  }
})

//update
router.put('/:id', async (req, res) => {
  let book

  try {
    book = await Book.findById(req.params.id)
    book.title = req.body.title
    book.author = req.body.author
    book.publishDate = new Date(req.body.publishDate)
    book.pageCount = req.body.pageCount
    book.description = req.body.description
    if (req.body.cover != null && req.body.cover !== '') {
      saveCover(book, req.body.cover)
    }
    await book.save()
    res.redirect(`/books/${book.id}`)
  } catch {
    if (book != null) {
      renderEditPage(res, book, true)
    } else {
      res.redirect(`/books`)
    }
  }
})

//delete book
router.delete('/:id', async (req, res) => {
  let book
  try {
    book = await Book.findById(req.params.id)
    await book.deleteOne()
    res.redirect('/books')
  } catch (err) {
    if (book == null) {
      console.log(err)
      res.redirect('/')
    } else {
      console.log(err)
      res.redirect(`/books/${book.id}`)
    }
  }
})

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), err => {
    if (err) console.error(err)
  })
}

async function renderNewPage(res, book, hasError = false) {
  try {
    const authors = await Author.find({})
    const params = {
      authors: authors,
      book: book
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('books/new', params)
  } catch {
    res.redirect('/books')
  }
}

async function renderEditPage(res, book, hasError = false) {
  try {
    const author = await Author.find({})
    const params = {
      author: author,
      book: book
    }
    console.log(author)
    if (hasError) params.errorMessage = 'Error update Book'
    res.render('books/editbook', params)
    console.log('Error message:', params.errorMessage)
  } catch {
    res.redirect('/books')
  }
}



module.exports = router