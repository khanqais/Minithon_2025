const mongoose = require('mongoose');

const ecoFootprintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
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