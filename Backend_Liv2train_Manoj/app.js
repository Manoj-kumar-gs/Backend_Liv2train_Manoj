const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const trainingCenterRoutes = require('./routes/trainingCenter');

const app = express();
app.use(bodyParser.json());

const mongoUri = "mongodb+srv://manojappu315:TqhiJ2RHNr0PDhLm@cluster0.hrvff.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Training Center Routes
app.use('/api/training-center', trainingCenterRoutes);

// Error handling middleware for validation errors
app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }
  next(err);
});


app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
