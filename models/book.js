const mongoose = require('mongoose')
const Comment = require('./comment')
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
    //author
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    //code for comments
    comments:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment'
    }
})

bookSchema.virtual('coverImagePath').get(function(){
    if(this.coverImageName != null){
        return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model('Book', bookSchema)
module.exports.coverImageBasePath = coverImageBasePath