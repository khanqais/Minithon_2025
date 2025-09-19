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

const submitQuiz = async (req, res) => {
  try {
    const { userId, answers } = req.body;

    // Validate required fields
    if (!userId || !answers) {
      return res.status(400).json({
        success: false,
        message: 'User ID and answers are required'
      });
    }

    // Calculate individual category scores
    const transportationScore = 
      SCORING.commute[answers.commute] + 
      SCORING.drivingMiles[answers.drivingMiles] + 
      SCORING.flights[answers.flights];

    const energyScore = 
      SCORING.homeEnergy[answers.homeEnergy] + 
      SCORING.lightsOff[answers.lightsOff] + 
      SCORING.unplugElectronics[answers.unplugElectronics];

    const dietScore = 
      SCORING.meatConsumption[answers.meatConsumption] + 
      SCORING.foodShopping[answers.foodShopping] + 
      SCORING.clothesShopping[answers.clothesShopping];

    const wasteScore = SCORING.wasteHandling[answers.wasteHandling];

    const totalScore = transportationScore + energyScore + dietScore + wasteScore;

    // Create new eco footprint record
    const ecoFootprint = new EcoFootprint({
      userId,
      answers,
      scores: {
        transportation: transportationScore,
        energy: energyScore,
        diet: dietScore,
        waste: wasteScore
      },
      totalScore
    });

    await ecoFootprint.save();

    res.status(201).json({
      success: true,
      message: 'Quiz submitted successfully',
      data: {
        totalScore,
        category: ecoFootprint.category,
        scores: {
          transportation: transportationScore,
          energy: energyScore,
          diet: dietScore,
          waste: wasteScore
        },
        id: ecoFootprint._id
      }
    });

  } catch (error) {
    console.error('Error submitting quiz:', error);
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

    // Get user's most recent result
    const latestResult = await EcoFootprint.findOne({ userId })
      .sort({ createdAt: -1 })
      .lean();

    if (!latestResult) {
      return res.status(404).json({
        success: false,
        message: 'No quiz results found for this user'
      });
    }

    // Get all results for trend analysis
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
    // Get the best (lowest) scores from all users
    const leaderboard = await EcoFootprint.aggregate([
      {
        $group: {
          _id: '$userId',
          bestScore: { $min: '$totalScore' },
          latestCategory: { $last: '$category' },
          latestDate: { $max: '$createdAt' }
        }
      },
      {
        $sort: { bestScore: 1 }
      },
      {
        $limit: 10
      },
      {
        $project: {
          userId: '$_id',
          bestScore: 1,
          category: '$latestCategory',
          lastUpdated: '$latestDate',
          _id: 0
        }
      }
    ]);

    res.json({
      success: true,
      data: leaderboard
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
  submitQuiz,
  getUserResults,
  getLeaderboard
};