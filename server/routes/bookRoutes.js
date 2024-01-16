const express = require("express");
const router = express.Router();
const Book = require("../models/books");

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific book by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// autocomplete availability == true
router.get("/search/autocomplete", async (req, res) => {
  const { searchTerm } = req.query;
  if (searchTerm.length==0) {
    console.log('sample');
    return res.json([])
  }
else{
  try {    
    // Perform a case-insensitive search for books with a name starting with the searchTerm
    const books = await Book.find({
      name: { $regex: `^${searchTerm}`, $options: "i" },
    });
    const arr = books.filter((book) => {
      return book.availability == true;
    });
    res.json(arr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }}
});

// autocomplete availability == false
router.get("/search/autocomplete/returning", async (req, res) => {
  try {
    const { searchTerm } = req.query;

    // Perform a case-insensitive search for books with a name starting with the searchTerm
    const books = await Book.find({
      name: { $regex: `^${searchTerm}`, $options: "i" },
    });
    const arr = books.filter((book) => {
      return book.availability == false;
    });
    res.json(arr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get new books
router.get("/latest/three", async (req, res) => {
  try {
    const books = await Book.find().sort({ _id: -1 }).limit(3);         
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new book
router.post("/", async (req, res) => {
  const { name, author } = req.body;
  const newBook = new Book({
    name,
    author,
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a book's availability status
router.patch("/:id", async (req, res) => {
  try {
    var book = await Book.findById(req.params.id).exec();

    if (book) {
      book.availability = req.body.availability;
      console.log(book);
      const updatedBook = await book.save();
      res.json(updatedBook);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (book) {
      await book.deleteOne();
      res.json({ message: "Book deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;