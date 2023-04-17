const mongoose = require('mongoose')
const Book = require('./book.js')

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    genre:{
        type:String,
        required: false
    },
    dateOfBirth:{
        type: Date,
        default: Date.now,
        required: false
    },
    aboutAuthor:{
        type:String,
        required:false
    }
})
//if author has some books linked to him, u can't delete 
authorSchema.pre('delete', function(next) {
  Book.find({ author: this._id }, (err, books) => {
    if (err) {
      next(err)
    } else if (Book.length > 0) {
      const error = new Error('This author has books still')
      error.isKnownError = true
      next(error)
    } else {
      next()
    }
  })
})

module.exports = mongoose.model('Author', authorSchema)