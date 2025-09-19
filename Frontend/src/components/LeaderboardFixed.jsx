// src/components/Leaderboard.jsx
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, top10, top50
  const { user } = useUser();

  // Backend API base URL
  const API_BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/api/leaderboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('Leaderboard API Response:', data);
      console.log('Leaderboard Data Array:', data.data);
      
      if (data.success) {
        setLeaderboard(data.data || []);
        setTotalUsers(data.totalUsers || 0);
      } else {
        throw new Error(data.message || 'Failed to fetch leaderboard');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter leaderboard based on selection
  const getFilteredLeaderboard = () => {
    switch (filter) {
      case 'top10':
        return leaderboard.slice(0, 10);
      case 'top50':
        return leaderboard.slice(0, 50);
      default:
        return leaderboard;
    }
  };

  // Find current user's rank
  const getCurrentUserRank = () => {
    if (!user) {
      return null;
    }
    const userEntry = leaderboard.find(entry => entry.userId === user.id);
    return userEntry ? userEntry.rank : null;
  };

  const getScoreColor = (score) => {
    if (score <= 25) {
      return 'text-green-600 bg-green-50 border-green-200';
    }
    if (score <= 45) {
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
    if (score <= 70) {
      return 'text-orange-600 bg-orange-50 border-orange-200';
    }
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getRankIcon = (rank) => {
    if (rank === 1) {
      return '🥇';
    }
    if (rank === 2) {
      return '🥈';
    }
    if (rank === 3) {
      return '🥉';
    }
    return `#${rank}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green-500"></div>
        <span className="ml-3 text-gray-600">Loading leaderboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 mb-4">
          <svg className="h-12 w-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-semibold">Unable to Load Leaderboard</h3>
          <p className="text-sm">{error}</p>
          <p className="text-xs text-gray-500 mt-2">Make sure your backend server is running on port 3000</p>
        </div>
        <button 
          onClick={fetchLeaderboard}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  const filteredData = getFilteredLeaderboard();
  const currentUserRank = getCurrentUserRank();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-eco-green-500 to-eco-blue-500 p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold flex items-center">
              🏆 Eco Leaderboard
            </h2>
            <p className="text-eco-green-100 mt-1">
              Ranked by lowest carbon footprint (lower is better!)
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalUsers}</div>
            <div className="text-eco-green-100 text-sm">Total Users</div>
            {currentUserRank && (
              <div className="mt-2 bg-white bg-opacity-20 rounded-lg px-3 py-1">
                <span className="text-sm">Your Rank: </span>
                <span className="font-bold text-lg">#{currentUserRank}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Options */}
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex space-x-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all' 
                ? 'bg-eco-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Users ({totalUsers})
          </button>
          <button
            onClick={() => setFilter('top10')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'top10'
                ? 'bg-eco-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Top 10
          </button>
          <button
            onClick={() => setFilter('top50')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'top50'
                ? 'bg-eco-blue-500 text-white shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Top 50
          </button>
          <button
            onClick={fetchLeaderboard}
            className="ml-auto bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh
          </button>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="overflow-x-auto">
        {filteredData.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-4">🌱</div>
            <h3 className="text-lg font-semibold text-gray-700">No Data Yet</h3>
            <p>Be the first to take the eco-footprint quiz!</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-700">Rank</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">User</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Best Score</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Latest</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Average</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Attempts</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Category</th>
                <th className="text-center py-4 px-6 font-semibold text-gray-700">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry, index) => (
                <tr 
                  key={`${entry.userId}-${entry.rank}-${index}`}
                  className={`border-b border-gray-100 transition-colors ${
                    entry.userId === user?.id 
                      ? 'bg-eco-blue-50 border-eco-blue-200'
                      : entry.rank <= 3
                        ? 'bg-yellow-50 border-yellow-200'
                        : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold mr-2">
                        {getRankIcon(entry.rank)}
                      </span>
                      {entry.rank <= 3 && (
                        <div className="flex">
                          {entry.rank === 1 && <span className="text-xs">🌟</span>}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div className="h-8 w-8 bg-gradient-to-r from-eco-green-400 to-eco-blue-400 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                        {entry.userId === user?.id ? 'Y' : 'U'}
                      </div>
                      <span className={`font-medium ${
                        entry.userId === user?.id ? 'text-eco-blue-700 font-bold' : 'text-gray-900'
                      }`}>
                        {entry.userId === user?.id ? 'You' : `User ${entry.userId.slice(-4)}`}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`px-3 py-2 rounded-full text-sm font-bold border ${getScoreColor(entry.bestScore)}`}>
                      {entry.bestScore}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600 font-medium">
                    {entry.latestScore}
                  </td>
                  <td className="py-4 px-6 text-center text-gray-600 font-medium">
                    {entry.averageScore}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                      {entry.totalAttempts}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium border ${getScoreColor(entry.bestScore)}`}>
                      {entry.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-gray-500">
                    {formatDate(entry.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 px-6 py-4 text-center text-sm text-gray-600">
        Showing {filteredData.length} of {totalUsers} users • Lower scores indicate better eco-friendliness 🌱
      </div>
    </div>
  );
}

export default Leaderboard;