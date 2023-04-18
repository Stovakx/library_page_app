const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    user:{
        type: String,
        required: true
    },
    /* after registration completed and login completed
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }, */
    rating:{
        type: Number,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    }
})

module.exports = mongoose.model('Comment', commentSchema)