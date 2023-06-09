const express = require('express')
const router = express.Router()
const Author = require('../models/author')
const Book = require('../models/book')

//all authors
router.get('/', async (req, res)=> {
  let searchOptions = {}
  if(req.query.name != null && req.query.name != '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
  try{
    const authors = await Author.find(searchOptions)
    res.render('authors/index', {
      authors: authors,
      searchOptions: req.query
    })
  } catch {
     res.redirect('/')
  } 
})



// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() })
})
  
// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name,
    genre: req.body.genre,
    dateOfBirth: req.body.dateOfBirth,
    aboutAuthor: req.body.aboutAuthor
  })
  try {
    const newAuthor = await author.save()
    res.redirect(`authors/${newAuthor.id}`)

  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    })
  }
})

//show author
router.get('/:id', async(req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    const books = await Book.find({ author: author.id }).limit(6).exec()
    res.render('authors/showauthor', {
      author: author,
      booksByAuthor: books
    })
  } catch {
    res.redirect('/')
  }
})

//edit author
router.get('/:id/edit', async (req, res) => {
  try {
    const author = await Author.findById(req.params.id)
    res.render('authors/edit', { author: author })
  } catch {
    res.redirect('/authors')
  }
})

//update
router.put('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id.trim())
    author.name = req.body.name
    author.genre = req.body.genre
    author.dateOfBirth = new Date(req.body.dateOfBirth)
    author.aboutAuthor = req.body.aboutAuthor
    await author.save()
    res.redirect(`/authors/${author.id}`)
  } catch (err) {
    if(author == null){
      res.redirect('/')
    }else{
      res.render('authors/edit', {
        author: author,
        errorMessage: 'Error updating Author'
      })
    }
  }
})

//delete author
router.delete('/:id', async (req, res) => {
  let author
  try {
    author = await Author.findById(req.params.id)
    await author.deleteOne()
    res.redirect('/authors')
  } catch (err) {
    if (author == null) {
      res.redirect('/')
    } else {
      res.redirect(`/authors/${author.id}`)
    }
  }
})
module.exports = router