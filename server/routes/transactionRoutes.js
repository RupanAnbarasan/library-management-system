const express = require("express");
const router = express.Router();
const Transaction = require("../models/transactions");

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const { transactionType } = req.query;
    const query = transactionType ? { transactionType } : {};
    const transactions = await Transaction.find(query);    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get transactions for a specific user
router.get("/user/:userId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.params.userId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get transactions for a specific book
router.get("/book/:bookId", async (req, res) => {
  try {
    const transactions = await Transaction.find({ book: req.params.bookId });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Add a new transaction
router.post("/", async (req, res) => {
  const { user, book, dueDate, transactionType } = req.body;

  const newTransaction = new Transaction({
    user,
    book,
    dueDate,
    transactionType,
  });

  try {
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
