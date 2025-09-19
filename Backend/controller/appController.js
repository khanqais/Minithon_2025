const EcoFootprint = require('../model/EcoFootprint');

const SCORING = {
  commute: {
    walk_bike: 0,
    public_transport: 2,
    carpool: 4,
    fuel_efficient: 6,
    suv_truck: 8
  },
  drivingMiles: {
    '0_50': 1,
    '51_150': 3,
    '151_300': 6,
    '300_plus': 10
  },
  flights: {
    none: 0,
    '1_2_domestic': 4,
    '3_5_domestic': 8,
    '6_plus_international': 12
  },
  homeEnergy: {
    renewable: 1,
    natural_gas: 5,
    electricity_grid: 6,
    coal_oil: 10
  },
  lightsOff: {
    always: 1,
    usually: 2,
    sometimes: 4,
    rarely_never: 6
  },
  unplugElectronics: {
    always: 1,
    often: 2,
    sometimes: 4,
    never: 6
  },
  meatConsumption: {
    never_vegetarian: 1,
    '1_2_times_week': 3,
    '3_4_times_week': 6,
    daily: 10
  },
  foodShopping: {
    farmers_market: 2,
    grocery_fresh: 4,
    mixed_fresh_processed: 6,
    fast_food_processed: 10
  },
  clothesShopping: {
    rarely_secondhand: 1,
    few_times_year: 3,
    monthly: 6,
    weekly_more: 10
  },
  wasteHandling: {
    recycle_compost_all: 1,
    recycle_most: 3,
    recycle_sometimes: 5,
    rarely_recycle: 8
  }
};

const submitScore = async (req, res) => {
  try {
    const { userId, totalScore} = req.body;

    if (!userId || totalScore === undefined) {
      return res.status(400).json({
        success: false,
        message: 'User ID and total score are required'
      });
    }

    if (totalScore < 0 || totalScore > 100) {
      return res.status(400).json({
        success: false,
        message: 'Total score must be between 0 and 100'
      });
    }

    let impactCategory 
    if (!impactCategory) {
      if (totalScore <= 25) {
        impactCategory = 'Low Impact';
      } else if (totalScore <= 45) {
        impactCategory = 'Moderate Impact';
      } else if (totalScore <= 70) {
        impactCategory = 'High Impact';
      } else {
        impactCategory = 'Very High Impact';
      }
    }

    
    const ecoFootprint = new EcoFootprint({
      userId,
      totalScore,
      category: impactCategory,
     
     
    });

    await ecoFootprint.save();

    res.status(201).json({
      success: true,
      message: 'Score submitted successfully',
      data: {
        totalScore,
        category: ecoFootprint.category,
        id: ecoFootprint._id,
        timestamp: ecoFootprint.createdAt
      }
    });

  } catch (error) {
    console.error('Error submitting score:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};



const getUserResults = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'User ID is required'
      });
    }


    const latestResult = await EcoFootprint.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!latestResult) {
      return res.status(404).json({
        success: false,
        message: 'No quiz results found for this user'
      });
    }

    
    const allResults = await EcoFootprint.find({ userId })
      .sort({ createdAt: -1 })
      .select('totalScore category createdAt')
      .limit(10)
      .lean();

    res.json({
      success: true,
      data: {
        latest: latestResult,
        history: allResults
      }
    });

  } catch (error) {
    console.error('Error fetching user results:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

const getLeaderboard = async (req, res) => {
  try {
   
    const leaderboard = await EcoFootprint.aggregate([
      {
        $sort: { createdAt: -1 }
      },
      {
        $group: {
          _id: '$userId',
          bestScore: { $min: '$totalScore' },
          latestScore: { $first: '$totalScore' },
          latestCategory: { $first: '$category' },
          latestDate: { $first: '$createdAt' },
          totalAttempts: { $sum: 1 },
          averageScore: { $avg: '$totalScore' }
        }
      },
      {
        $sort: { bestScore: 1 }
      },
      {
        $project: {
          userId: '$_id',
          bestScore: 1,
          latestScore: 1,
          category: '$latestCategory',
          lastUpdated: '$latestDate',
          totalAttempts: 1,
          averageScore: { $round: ['$averageScore', 1] },
          _id: 0
        }
      }
    ]);

    const leaderboardWithRank = leaderboard.map((user, index) => ({
      rank: index + 1,
      ...user
    }));

    res.json({
      success: true,
      data: leaderboardWithRank,
      totalUsers: leaderboardWithRank.length,
      message: 'Complete leaderboard sorted by best scores (lowest = best for eco-footprint)'
    });

  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
};

module.exports = {
  
  submitScore,
  getUserResults,
  getLeaderboard
};