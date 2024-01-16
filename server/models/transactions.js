const mongoose = require('mongoose');

// Define Transaction Schema
const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['borrowed', 'returned'],
    required: true,
  }
});

// Create Transaction model
const Transaction = mongoose.model('transactions', transactionSchema);

module.exports = Transaction;
