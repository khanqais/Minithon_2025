require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const appRoutes = require('./routes/appRoute');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI ;
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


connectDB();


app.use('/api', appRoutes);

app.get('/', (req, res) => {
  res.json({ 
    message: 'Minithon Eco-Footprint API',
    version: '1.0.0',
    endpoints: {
      'POST /api/quiz/submit': 'Submit eco-footprint quiz',
      'GET /api/quiz/results/:userId': 'Get user quiz results',
      'GET /api/leaderboard': 'Get leaderboard'
    }
  });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});



app.listen(port, () => {
  console.log(`Minithon Eco-Footprint API listening on port ${port}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
