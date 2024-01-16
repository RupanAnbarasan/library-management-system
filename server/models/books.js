const mongoose = require('mongoose');

// Define Book Schema
const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: String,
    required: true,
  },
  availability: {
    type: Boolean,
    default: true, // Assume books are available by default
  },
});

// Create Book model
const Book = mongoose.model('books', bookSchema);

module.exports = Book;
