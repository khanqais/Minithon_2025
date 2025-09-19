const express = require('express');
const router = express.Router();
const { 
  submitQuiz, 
  getUserResults, 
  getLeaderboard 
} = require('../controller/appController');


router.post('/quiz/submit', submitQuiz);


router.get('/quiz/results/:userId', getUserResults);


router.get('/leaderboard', getLeaderboard);

module.exports = router;