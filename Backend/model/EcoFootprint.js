const mongoose = require('mongoose');

const ecoFootprintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  
  // Store individual question answers
  answers: {
    commute: {
      type: String,
      enum: ['walk_bike', 'public_transport', 'carpool', 'fuel_efficient', 'suv_truck'],
      required: true
    },
    drivingMiles: {
      type: String,
      enum: ['0_50', '51_150', '151_300', '300_plus'],
      required: true
    },
    flights: {
      type: String,
      enum: ['none', '1_2_domestic', '3_5_domestic', '6_plus_international'],
      required: true
    },
    homeEnergy: {
      type: String,
      enum: ['renewable', 'natural_gas', 'electricity_grid', 'coal_oil'],
      required: true
    },
    lightsOff: {
      type: String,
      enum: ['always', 'usually', 'sometimes', 'rarely_never'],
      required: true
    },
    unplugElectronics: {
      type: String,
      enum: ['always', 'often', 'sometimes', 'never'],
      required: true
    },
    meatConsumption: {
      type: String,
      enum: ['never_vegetarian', '1_2_times_week', '3_4_times_week', 'daily'],
      required: true
    },
    foodShopping: {
      type: String,
      enum: ['farmers_market', 'grocery_fresh', 'mixed_fresh_processed', 'fast_food_processed'],
      required: true
    },
    clothesShopping: {
      type: String,
      enum: ['rarely_secondhand', 'few_times_year', 'monthly', 'weekly_more'],
      required: true
    },
    wasteHandling: {
      type: String,
      enum: ['recycle_compost_all', 'recycle_most', 'recycle_sometimes', 'rarely_recycle'],
      required: true
    }
  },

  // Store individual scores for each category
  scores: {
    transportation: {
      type: Number,
      required: true
    },
    energy: {
      type: Number,
      required: true
    },
    diet: {
      type: Number,
      required: true
    },
    waste: {
      type: Number,
      required: true
    }
  },

  // Total score
  totalScore: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  },

  // Footprint category based on score
  category: {
    type: String,
    enum: ['Low Impact', 'Moderate Impact', 'High Impact', 'Very High Impact'],
    required: true
  },

  // Timestamp
  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for efficient queries
ecoFootprintSchema.index({ userId: 1, createdAt: -1 });

// Method to calculate category based on score
ecoFootprintSchema.methods.calculateCategory = function() {
  if (this.totalScore <= 25) {
    return 'Low Impact';
  } else if (this.totalScore <= 45) {
    return 'Moderate Impact';
  } else if (this.totalScore <= 70) {
    return 'High Impact';
  } else {
    return 'Very High Impact';
  }
};

// Pre-save hook to update category and timestamps
ecoFootprintSchema.pre('save', function(next) {
  this.category = this.calculateCategory();
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('EcoFootprint', ecoFootprintSchema);