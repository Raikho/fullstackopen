const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
  },
  born: {
    type: Number,
    length: 4,
  },
})

module.exports = mongoose.model('Author', schema)
