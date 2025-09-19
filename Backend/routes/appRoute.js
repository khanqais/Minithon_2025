const express = require('express');
const router = express.Router();
const { 

  submitScore,
  getUserResults, 
  getLeaderboard 
} = require('../controller/appController');

router.post('/score/submit', submitScore);

router.get('/quiz/results/:userId', getUserResults);

router.get('/leaderboard', getLeaderboard);

module.exports = router;