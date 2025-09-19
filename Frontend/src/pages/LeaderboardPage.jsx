import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import LeaderboardFixed from '../components/LeaderboardFixed';

export default function LeaderboardPage() {
  const { user } = useUser();
  const [stats, setStats] = useState({
    totalUsers: 0,
    averageScore: 0,
    bestScore: 0
  });

  useEffect(() => {
    // Fetch leaderboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/leaderboard');
        const data = await response.json();
        
        if (data.success && data.data.length > 0) {
          const scores = data.data.map(user => user.bestScore);
          setStats({
            totalUsers: data.totalUsers,
            averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
            bestScore: Math.min(...scores)
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Global Eco Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how you compare with eco-warriors worldwide. Lower scores mean better environmental impact!
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{stats.totalUsers}</div>
            <div className="text-gray-600">Total Participants</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-yellow-200 shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.averageScore}</div>
            <div className="text-gray-600">Average Score</div>
          </div>
          
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-blue-200 shadow-lg text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stats.bestScore}</div>
            <div className="text-gray-600">Best Score</div>
          </div>
        </div>

        {/* Call to Action for Non-Users */}
        <SignedOut>
          <div className="bg-gradient-to-r from-green-50/80 to-blue-50/80 backdrop-blur-sm border border-green-200 rounded-lg p-6 mb-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Join the Leaderboard!
            </h3>
            <p className="text-gray-600 mb-4">
              Sign up and take the assessment to see your ranking and compete with others
            </p>
            <Link
              to="/auth"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Get Started
            </Link>
          </div>
        </SignedOut>

        {/* User Status for Signed In Users */}
        <SignedIn>
          <div className="bg-white/60 backdrop-blur-sm border border-green-200 rounded-lg p-4 mb-8 text-center">
            <p className="text-gray-700">
              Welcome back, <span className="font-semibold text-green-600">{user?.firstName}</span>! 
              {user && (
                <Link 
                  to="/quiz" 
                  className="ml-2 text-green-600 hover:text-green-700 font-medium"
                >
                  Take assessment to improve your ranking →
                </Link>
              )}
            </p>
          </div>
        </SignedIn>

        {/* Leaderboard Component */}
        <div className="mb-8">
          <LeaderboardFixed />
        </div>

        {/* Additional Actions */}
        <div className="text-center space-y-4">
          <SignedIn>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/quiz"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Retake Assessment
              </Link>
              <Link
                to="/dashboard"
                className="bg-white/80 hover:bg-white backdrop-blur-sm text-green-600 px-6 py-3 rounded-lg font-medium transition-colors border border-green-600"
              >
                View Dashboard
              </Link>
            </div>
          </SignedIn>

          <SignedOut>
            <Link
              to="/auth"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Sign Up to Join
            </Link>
          </SignedOut>
        </div>

        {/* Info Section */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              How the Scoring Works
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Score Categories:</h4>
                <ul className="space-y-1">
                  <li>• <span className="text-green-600 font-medium">0-25:</span> Low Impact ✅</li>
                  <li>• <span className="text-yellow-600 font-medium">26-45:</span> Moderate Impact ⚠️</li>
                  <li>• <span className="text-orange-600 font-medium">46-70:</span> High Impact 🔥</li>
                  <li>• <span className="text-red-600 font-medium">70+:</span> Very High Impact 🚨</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-800 mb-2">Assessment Areas:</h4>
                <ul className="space-y-1">
                  <li>• Transportation & Commuting</li>
                  <li>• Energy Consumption</li>
                  <li>• Food & Diet Choices</li>
                  <li>• Waste & Recycling Habits</li>
                  <li>• Shopping & Consumption</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}