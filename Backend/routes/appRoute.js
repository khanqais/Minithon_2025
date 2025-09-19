const express = require('express');
const router = express.Router();
const { 

  submitScore,
  getUserResults, 
  getLeaderboard 
} = require('../controller/appController');

// Submit pre-calculated score from frontend (simplified)
router.post('/score/submit', submitScore);



// Get user's quiz results
router.get('/quiz/results/:userId', getUserResults);

// Get leaderboard (top 10 users with lowest scores)
router.get('/leaderboard', getLeaderboard);

module.exports = router;