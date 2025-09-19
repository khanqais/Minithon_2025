# 🌱 EcoFootprint Calculator - Advanced Version

An advanced, full-stack web application for calculating and tracking environmental carbon footprints with real-time leaderboards, comprehensive analytics, and personalized sustainability recommendations.

## 🚀 Features

### ✨ Core Functionality
- **Comprehensive Assessment**: 10-question detailed eco-footprint quiz covering transportation, energy, consumption, and waste
- **Real-time Scoring**: Instant calculation with scores ranging 0-100 (lower = better for environment)
- **Global Leaderboard**: Compare your impact with users worldwide with live rankings
- **Progress Tracking**: Monitor your eco-journey with detailed analytics and history

### 🔐 Authentication & User Management  
- **Clerk Authentication**: Secure sign-up/sign-in with social providers
- **Protected Routes**: Secure access to user-specific features
- **User Profiles**: Comprehensive profile pages with statistics and achievements

### 📊 Advanced Analytics
- **Dashboard**: Real-time stats, rankings, and progress visualization
- **Achievement System**: Unlock badges and milestones for eco-improvements
- **Historical Data**: Track your improvement over time
- **Personalized Recommendations**: AI-powered suggestions based on assessment results

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Beautiful emerald gradient backgrounds with backdrop blur effects
- **Responsive Layout**: Seamless experience across all devices
- **Advanced Navigation**: Smart routing with active states and mobile-optimized menus
- **Loading States & Error Handling**: Professional UX with comprehensive error boundaries

## 🛠 Technology Stack

### Frontend
- **React 19**: Latest React with hooks and modern patterns
- **Vite**: Lightning-fast build tool and dev server
- **React Router**: Advanced routing with protected routes
- **Tailwind CSS**: Utility-first CSS framework with custom configurations
- **Clerk**: Modern authentication and user management
- **Lucide React**: Beautiful icon system

### Backend
- **Node.js & Express**: RESTful API server
- **MongoDB & Mongoose**: NoSQL database with advanced queries
- **CORS**: Cross-origin resource sharing configuration
- **Advanced Aggregation**: Complex leaderboard queries and user statistics

## 📁 Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx       # Advanced navigation with mobile menu
│   │   ├── EcoFootprintQuiz.jsx  # Comprehensive quiz component
│   │   ├── LeaderboardFixed.jsx  # Real-time leaderboard
│   │   ├── ProtectedRoute.jsx    # Authentication wrapper
│   │   ├── ErrorBoundary.jsx     # Error handling component
│   │   └── LoadingSpinner.jsx    # Loading states
│   ├── pages/               # Application pages
│   │   ├── HomePage.jsx     # Landing page with features
│   │   ├── Dashboard.jsx    # User dashboard with analytics
│   │   ├── QuizPage.jsx     # Assessment interface
│   │   ├── LeaderboardPage.jsx   # Global rankings
│   │   ├── ProfilePage.jsx  # User profile and stats
│   │   └── AuthPage.jsx     # Authentication flows
│   └── App.jsx              # Main application with routing
│
Backend/
├── controller/
│   └── appController.js     # API business logic
├── model/
│   └── EcoFootprint.js      # MongoDB schema
├── routes/
│   └── appRoute.js          # API routes
└── app.js                   # Express server setup
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Clerk account for authentication

### Frontend Setup
1. Navigate to frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment file:
   ```bash
   cp .env.example .env
   ```

4. Configure environment variables:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_API_BASE_URL=http://localhost:3000
   ```

5. Start development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure MongoDB connection in `app.js`

4. Start the server:
   ```bash
   npm start
   ```

## 🌐 API Endpoints

### Quiz & Scoring
- `POST /api/score/submit` - Submit quiz results
- `GET /api/quiz/results/:userId` - Get user's quiz history

### Leaderboard
- `GET /api/leaderboard` - Get global rankings with comprehensive stats

## 📱 Key Features Explained

### Advanced Quiz System
- **Smart Scoring**: Each question contributes to a scientific carbon footprint calculation
- **Real-time Validation**: Prevents submission until all questions are answered
- **Personalized Results**: Dynamic suggestions based on specific user choices
- **Progress Tracking**: Visual indicators and completion status

### Dynamic Leaderboard
- **Real-time Updates**: Instant ranking updates when new scores are submitted
- **Filtering Options**: View top 10, top 50, or all users
- **Advanced Metrics**: Best score, average score, total attempts, and ranking history
- **User Highlighting**: Special styling for current user's position

### Professional Dashboard
- **Multiple Views**: Overview, quiz, leaderboard, and achievements tabs
- **Statistics Cards**: Key metrics with trend indicators
- **Action Cards**: Quick access to primary functions
- **Recent Activity**: Timeline of user actions and improvements

## 🎯 Scoring System

### Categories
- **0-25 points**: Low Impact ✅ (Excellent eco-friendliness)
- **26-45 points**: Moderate Impact ⚠️ (Good with room for improvement) 
- **46-70 points**: High Impact 🔥 (Needs significant changes)
- **70+ points**: Very High Impact 🚨 (Urgent action required)

### Assessment Areas
1. **Transportation & Commuting** (0-18 points)
2. **Energy Consumption** (0-16 points) 
3. **Food & Diet Choices** (0-13 points)
4. **Waste & Recycling** (0-8 points)
5. **Shopping & Consumption** (0-11 points)

---

**Made with 💚 for a sustainable future**+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
