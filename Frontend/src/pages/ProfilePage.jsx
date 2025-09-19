import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

export default function ProfilePage() {
  const { user } = useUser();
  const [userStats, setUserStats] = useState({
    totalAttempts: 0,
    bestScore: null,
    latestScore: null,
    averageScore: null,
    rank: null,
    history: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserStats();
    }
  }, [user]);

  const fetchUserStats = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3000/api/quiz/results/${user.id}`);
      const data = await response.json();

      if (data.success) {
        // Also fetch leaderboard to get user rank
        const leaderboardResponse = await fetch('http://localhost:3000/api/leaderboard');
        const leaderboardData = await leaderboardResponse.json();
        
        let userRank = null;
        if (leaderboardData.success) {
          const userEntry = leaderboardData.data.find(entry => entry.userId === user.id);
          userRank = userEntry ? userEntry.rank : null;
        }

        setUserStats({
          totalAttempts: data.data.history?.length || 0,
          bestScore: data.data.latest?.totalScore || null,
          latestScore: data.data.latest?.totalScore || null,
          averageScore: data.data.latest?.totalScore || null,
          rank: userRank,
          history: data.data.history || []
        });
      }
    } catch (err) {
      console.error('Error fetching user stats:', err);
      setError('Failed to load your statistics');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score <= 25) return 'text-green-600 bg-green-50 border-green-200';
    if (score <= 45) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    if (score <= 70) return 'text-orange-600 bg-orange-50 border-orange-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreCategory = (score) => {
    if (score <= 25) return 'Low Impact';
    if (score <= 45) return 'Moderate Impact';
    if (score <= 70) return 'High Impact';
    return 'Very High Impact';
  };

  if (loading) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                {user?.firstName?.charAt(0) || user?.emailAddresses[0]?.emailAddress?.charAt(0) || 'U'}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Your Profile'}
                </h1>
                <p className="text-gray-600">{user?.emailAddresses[0]?.emailAddress}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg text-center">
            <div className="text-2xl font-bold text-green-600 mb-2">
              {userStats.totalAttempts}
            </div>
            <div className="text-gray-600 text-sm">Assessments Taken</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-blue-200 shadow-lg text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">
              {userStats.rank ? `#${userStats.rank}` : 'N/A'}
            </div>
            <div className="text-gray-600 text-sm">Global Rank</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-purple-200 shadow-lg text-center">
            <div className="text-2xl font-bold text-purple-600 mb-2">
              {userStats.bestScore || 'N/A'}
            </div>
            <div className="text-gray-600 text-sm">Best Score</div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-lg p-6 border border-orange-200 shadow-lg text-center">
            <div className="text-2xl font-bold text-orange-600 mb-2">
              {userStats.latestScore || 'N/A'}
            </div>
            <div className="text-gray-600 text-sm">Latest Score</div>
          </div>
        </div>

        {/* Current Status */}
        {userStats.bestScore && (
          <div className="mb-8">
            <div className={`rounded-lg p-6 border shadow-lg ${getScoreColor(userStats.bestScore)}`}>
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-2">Current Eco Status</h3>
                <div className="text-3xl font-bold mb-2">{userStats.bestScore}/100</div>
                <div className="text-sm font-medium">{getScoreCategory(userStats.bestScore)}</div>
                <div className="mt-4 text-sm">
                  {userStats.rank && `You're ranked #${userStats.rank} globally!`}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Link
            to="/quiz"
            className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-6 transition-colors text-center group"
          >
            <div className="text-2xl mb-2">📊</div>
            <div className="font-semibold mb-1">Take Assessment</div>
            <div className="text-sm opacity-90">Improve your eco-footprint score</div>
          </Link>

          <Link
            to="/leaderboard"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 transition-colors text-center group"
          >
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-semibold mb-1">View Leaderboard</div>
            <div className="text-sm opacity-90">See how you compare globally</div>
          </Link>
        </div>

        {/* Assessment History */}
        {userStats.history.length > 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Assessment History</h3>
            <div className="space-y-3">
              {userStats.history.slice(0, 5).map((attempt, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/50 rounded border">
                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium border ${getScoreColor(attempt.totalScore)}`}>
                      {attempt.totalScore}
                    </div>
                    <div className="text-sm text-gray-600">{attempt.category}</div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(attempt.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-6 border border-gray-200 shadow-lg text-center">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Assessments Yet</h3>
            <p className="text-gray-600 mb-4">Take your first eco-footprint assessment to get started!</p>
            <Link
              to="/quiz"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-block"
            >
              Take Assessment
            </Link>
          </div>
        )}

        {error && (
          <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600 text-center">
            {error}
          </div>
        )}

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <Link
            to="/dashboard"
            className="text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}