const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre: {
        type:String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    publishDate:{
        type: Date,
        required: true
    },
    pageCount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now,
        required: true
    },
    coverImageName:{
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    //code for comments
/*     comments: [{
        user: { type: String, required: false },
        text: { type: String, required: false },
        date: { type: Date, default: Date.now },
      }], */
})

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName != null){
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath