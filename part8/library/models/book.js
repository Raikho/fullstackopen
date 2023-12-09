const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  published: {
    type: Number,
    length: 4,
  },
  author: {
    type: String,
    required: true,
    minlength: 3,
  },
  genres: [
    {
      type: String,
    },
  ],
})

module.exports = mongoose.model('Book', schema)
