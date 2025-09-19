# Minithon Eco-Footprint Backend API

A RESTful API for calculating and storing eco-footprint quiz results with MongoDB integration.

## Features

- ✅ Eco-footprint quiz submission with score calculation
- ✅ User result storage and retrieval
- ✅ Leaderboard functionality
- ✅ MongoDB integration with Mongoose
- ✅ CORS support for frontend integration
- ✅ Environment configuration support

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Configure your `.env` file with your MongoDB connection string and other settings.

## API Endpoints

### 1. Submit Quiz
**POST** `/api/quiz/submit`

Submit eco-footprint quiz answers and get calculated score.

**Request Body:**
```json
{
  "userId": "user_clerk_id_here",
  "answers": {
    "commute": "walk_bike",
    "drivingMiles": "0_50",
    "flights": "none",
    "homeEnergy": "renewable",
    "lightsOff": "always",
    "unplugElectronics": "always",
    "meatConsumption": "never_vegetarian",
    "foodShopping": "farmers_market",
    "clothesShopping": "rarely_secondhand",
    "wasteHandling": "recycle_compost_all"
  }
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quiz submitted successfully",
  "data": {
    "totalScore": 15,
    "category": "Low Impact",
    "scores": {
      "transportation": 1,
      "energy": 3,
      "diet": 6,
      "waste": 1
    },
    "id": "quiz_result_id"
  }
}
```

### 2. Get User Results
**GET** `/api/quiz/results/:userId`

Retrieve user's quiz results and history.

**Response:**
```json
{
  "success": true,
  "data": {
    "latest": {
      "userId": "user_id",
      "totalScore": 15,
      "category": "Low Impact",
      "scores": {...},
      "createdAt": "2025-09-19T..."
    },
    "history": [...]
  }
}
```

### 3. Get Leaderboard
**GET** `/api/leaderboard`

Get top 10 users with the lowest eco-footprint scores.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "userId": "user_1",
      "bestScore": 12,
      "category": "Low Impact",
      "lastUpdated": "2025-09-19T..."
    }
  ]
}
```

## Quiz Scoring System

### Transportation (Max: 30 points)
- **Commute:** Walk/bike (0) → SUV/truck (8)
- **Driving Miles:** 0-50 (1) → 300+ (10)
- **Flights:** None (0) → 6+/international (12)

### Energy & Housing (Max: 22 points)
- **Home Energy:** Renewable (1) → Coal/oil (10)
- **Lights Off:** Always (1) → Rarely/never (6)
- **Unplug Electronics:** Always (1) → Never (6)

### Diet & Consumption (Max: 26 points)
- **Meat Consumption:** Never/vegetarian (1) → Daily (10)
- **Food Shopping:** Farmers market (2) → Fast food/processed (10)
- **Clothes Shopping:** Rarely/secondhand (1) → Weekly+ (10)

### Waste & Recycling (Max: 8 points)
- **Waste Handling:** Recycle/compost all (1) → Rarely recycle (8)

## Score Categories

- **Low Impact:** 1-25 points
- **Moderate Impact:** 26-45 points  
- **High Impact:** 46-70 points
- **Very High Impact:** 71+ points

## Database Schema

The `EcoFootprint` model stores:
- User ID (from Clerk authentication)
- Individual question answers
- Category scores (transportation, energy, diet, waste)
- Total score and impact category
- Timestamps for tracking progress

## Running the Server

### Development
```bash
npm run dev
```

### Production
```bash
npm start
```

## Environment Variables

```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/minithon_eco
FRONTEND_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_secret_here
```

## Integration with Frontend

The API is designed to work seamlessly with your React frontend using Clerk for authentication. Simply use the Clerk user ID when submitting quiz results and retrieving user data.

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error (development only)"
}
```