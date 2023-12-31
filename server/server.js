const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/library');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// API routes
app.use('/books', bookRoutes);
app.use('/users', userRoutes);
app.use('/transactions', transactionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`MongoDB connection: ${mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'}`);
  });
  