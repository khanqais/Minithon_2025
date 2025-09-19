const mongoose = require('mongoose');

const ecoFootprintSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  

  

  totalScore: {
    type: Number,
    required: true,
    min: 10,
    max: 100
  },

  category: {
    type: String,
    enum: ['Low Impact', 'Moderate Impact', 'High Impact', 'Very High Impact'],
    required: true
  },

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

ecoFootprintSchema.index({ userId: 1, createdAt: -1 });

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

ecoFootprintSchema.pre('save', function(next) {
  this.category = this.calculateCategory();
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('EcoFootprint', ecoFootprintSchema);