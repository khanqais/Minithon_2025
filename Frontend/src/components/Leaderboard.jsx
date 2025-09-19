// src/components/Leaderboard.jsx
import { useState, useEffect, useCallback } from 'react';
import { 
  Trophy, 
  Medal, 
  Award, 
  Leaf, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Loader, 
  RefreshCw, 
  Filter,
  MapPin,
  Calendar
} from 'lucide-react';

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFilter, setTimeFilter] = useState('all');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [globalStats, setGlobalStats] = useState({
    totalParticipants: 0,
    averageFootprint: 0,
    totalCO2Saved: 0
  });

  // Fetch leaderboard data from API
  const fetchLeaderboardData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Replace with your actual API endpoint
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`/api/leaderboard?timeFrame=${timeFilter}&limit=10`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please log in again.');
        }
        throw new Error(`Failed to fetch leaderboard data: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success) {
        setLeaderboardData(data.leaderboard || []);
        setCurrentUser(data.currentUser || null);
        setGlobalStats(data.globalStats || globalStats);
      } else {
        throw new Error(data.message || 'Unknown error occurred');
      }
    } catch (err) {
      console.error('Error fetching leaderboard:', err);
      setError(err.message);
      
      // Fallback to mock data for development
      loadMockData();
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [timeFilter]);

  const loadMockData = () => {
    const mockLeaderboard = [
      {
        _id: '671234567890abcdef123456',
        userId: '671234567890abcdef123450',
        username: 'emma_green_eco',
        displayName: 'Emma Green',
        profilePicture: null,
        carbonFootprint: 4.2,
        ecoScore: 98,
        testsCompleted: 15,
        lastTestDate: '2024-10-15T10:30:00Z',
        rank: 1,
        previousRank: 2,
        location: {
          city: 'San Francisco',
          state: 'California',
          country: 'USA'
        },
        totalCO2Saved: 156.8,
        achievements: ['eco_warrior', 'carbon_reducer', 'test_master']
      },
      {
        _id: '671234567890abcdef123457',
        userId: '671234567890abcdef123451',
        username: 'alex_rivera_green',
        displayName: 'Alex Rivera',
        profilePicture: null,
        carbonFootprint: 4.8,
        ecoScore: 95,
        testsCompleted: 12,
        lastTestDate: '2024-10-14T14:45:00Z',
        rank: 2,
        previousRank: 3,
        location: {
          city: 'Barcelona',
          country: 'Spain'
        },
        totalCO2Saved: 142.3,
        achievements: ['green_pioneer', 'sustainable_living']
      },
      {
        _id: '671234567890abcdef123458',
        userId: '671234567890abcdef123452',
        username: 'priya_sharma_eco',
        displayName: 'Priya Sharma',
        profilePicture: null,
        carbonFootprint: 5.1,
        ecoScore: 92,
        testsCompleted: 18,
        lastTestDate: '2024-10-13T09:20:00Z',
        rank: 3,
        previousRank: 1,
        location: {
          city: 'Mumbai',
          country: 'India'
        },
        totalCO2Saved: 201.5,
        achievements: ['quiz_master', 'consistency_king']
      },
      {
        _id: '671234567890abcdef123459',
        userId: '671234567890abcdef123453',
        username: 'marcus_johnson',
        displayName: 'Marcus Johnson',
        profilePicture: null,
        carbonFootprint: 5.6,
        ecoScore: 89,
        testsCompleted: 9,
        lastTestDate: '2024-10-12T16:15:00Z',
        rank: 4,
        previousRank: 6,
        location: {
          city: 'London',
          country: 'UK'
        },
        totalCO2Saved: 89.2,
        achievements: ['green_newcomer']
      },
      {
        _id: '671234567890abcdef123460',
        userId: '671234567890abcdef123454',
        username: 'sarah_chen_green',
        displayName: 'Sarah Chen',
        profilePicture: null,
        carbonFootprint: 6.0,
        ecoScore: 87,
        testsCompleted: 14,
        lastTestDate: '2024-10-11T11:30:00Z',
        rank: 5,
        previousRank: 4,
        location: {
          city: 'Singapore',
          country: 'Singapore'
        },
        totalCO2Saved: 132.7,
        achievements: ['eco_advocate', 'community_builder']
      }
    ];

    const mockCurrentUser = {
      _id: '671234567890abcdef123465',
      userId: '671234567890abcdef123460',
      username: 'current_user',
      displayName: 'You',
      carbonFootprint: 8.2,
      ecoScore: 85,
      testsCompleted: 3,
      rank: 15,
      previousRank: 18,
      totalCO2Saved: 24.6,
      location: {
        city: 'Your City',
        country: 'Your Country'
      }
    };

    const mockGlobalStats = {
      totalParticipants: 12847,
      averageFootprint: 9.2,
      totalCO2Saved: 4521.3
    };

    setLeaderboardData(mockLeaderboard);
    setCurrentUser(mockCurrentUser);
    setGlobalStats(mockGlobalStats);
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [fetchLeaderboardData]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchLeaderboardData();
  };

  const getTrend = (current, previous) => {
    if (!previous || current === previous) {
      return { direction: 'neutral', value: 0 };
    }
    const change = previous - current; // Lower rank number is better
    return {
      direction: change > 0 ? 'up' : 'down',
      value: Math.abs(change)
    };
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (num) => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num?.toFixed(1) || '0';
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-orange-500" />;
      default:
        return (
          <span className="w-6 h-6 flex items-center justify-center text-gray-600 font-bold text-sm">
            #{rank}
          </span>
        );
    }
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
    if (rank === 2) return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
    if (rank === 3) return 'bg-gradient-to-r from-orange-400 to-orange-600 text-white';
    return 'bg-gray-100 text-gray-600';
  };

  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-12">
      <Loader className="w-8 h-8 animate-spin text-green-500" />
      <span className="ml-3 text-gray-600">Loading leaderboard...</span>
    </div>
  );

  const renderErrorState = () => (
    <div className="text-center py-12">
      <div className="text-red-600 mb-4">
        <p className="font-medium">Failed to load leaderboard</p>
        <p className="text-sm text-red-500 mt-1">{error}</p>
      </div>
      <button 
        onClick={fetchLeaderboardData}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors inline-flex items-center"
      >
        <RefreshCw className="w-4 h-4 mr-2" />
        Try Again
      </button>
    </div>
  );

  if (loading) return renderLoadingState();
  if (error && leaderboardData.length === 0) return renderErrorState();

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 flex items-center">
            <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
            Global Leaderboard
          </h2>
          <p className="text-gray-600 mt-1">
            Top eco-champions ranked by their environmental impact
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            title="Refresh leaderboard"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
          </button>

          {/* Time Filter */}
          <div className="flex bg-gray-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All Time' },
              { key: 'month', label: 'This Month' },
              { key: 'week', label: 'This Week' }
            ].map((filter) => (
              <button
                key={filter.key}
                onClick={() => setTimeFilter(filter.key)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeFilter === filter.key
                    ? 'bg-white text-gray-800 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && leaderboardData.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          <p>⚠️ Using cached data. {error}</p>
        </div>
      )}

      {/* Current User Stats */}
      {currentUser && (
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Your Position</h3>
            <div className="flex items-center text-green-100">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">
                {currentUser.location?.city}, {currentUser.location?.country}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">#{currentUser.rank}</div>
              <div className="text-green-100 text-sm">Global Rank</div>
              {currentUser.previousRank && (
                <div className="text-xs text-green-200 mt-1">
                  {currentUser.rank < currentUser.previousRank ? '↑' : '↓'} 
                  {Math.abs(currentUser.rank - currentUser.previousRank)}
                </div>
              )}
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentUser.ecoScore}</div>
              <div className="text-green-100 text-sm">Eco Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentUser.carbonFootprint}</div>
              <div className="text-green-100 text-sm">CO₂ tons/year</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{currentUser.testsCompleted}</div>
              <div className="text-green-100 text-sm">Tests Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{formatNumber(currentUser.totalCO2Saved)}</div>
              <div className="text-green-100 text-sm">CO₂ Saved (tons)</div>
            </div>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 bg-gray-50">
          <h3 className="font-semibold text-gray-800 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Top Performers
            <span className="ml-2 text-sm font-normal text-gray-500">
              ({leaderboardData.length} shown)
            </span>
          </h3>
        </div>
        
        {leaderboardData.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No leaderboard data available</p>
            <p className="text-sm mt-1">Complete a quiz to see rankings</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {leaderboardData.map((user) => {
              const trend = getTrend(user.rank, user.previousRank);
              return (
                <div
                  key={user._id}
                  className={`p-4 hover:bg-gray-50 transition-colors ${
                    user.rank <= 3 ? 'bg-gradient-to-r from-gray-50 to-transparent' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      {/* Rank */}
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(user.rank)}`}>
                        {getRankIcon(user.rank)}
                      </div>
                      
                      {/* User Info */}
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                          {user.profilePicture ? (
                            <img 
                              src={user.profilePicture} 
                              alt={user.displayName}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=10b981&color=fff&size=40`;
                              }}
                            />
                          ) : (
                            <div className="w-full h-full bg-green-500 flex items-center justify-center text-white font-bold text-sm">
                              {user.displayName?.charAt(0)?.toUpperCase() || '?'}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-gray-800 truncate">
                            {user.displayName || 'Anonymous User'}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {user.location?.city}, {user.location?.country}
                          </div>
                          {user.lastTestDate && (
                            <div className="text-xs text-gray-400 flex items-center mt-1">
                              <Calendar className="w-3 h-3 mr-1" />
                              Last test: {formatDate(user.lastTestDate)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="text-center hidden sm:block">
                        <div className="font-semibold text-gray-800">{user.ecoScore}</div>
                        <div className="text-gray-500">Score</div>
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-gray-800 flex items-center">
                          <Leaf className="w-4 h-4 mr-1 text-green-500" />
                          {user.carbonFootprint}
                        </div>
                        <div className="text-gray-500">CO₂/year</div>
                      </div>
                      <div className="text-center hidden md:block">
                        <div className="font-semibold text-gray-800">{user.testsCompleted}</div>
                        <div className="text-gray-500">Tests</div>
                      </div>
                      <div className="text-center hidden lg:block">
                        <div className="font-semibold text-gray-800">{formatNumber(user.totalCO2Saved)}</div>
                        <div className="text-gray-500">CO₂ Saved</div>
                      </div>
                      <div className="text-center">
                        <div className={`flex items-center ${
                          trend.direction === 'up' ? 'text-green-500' : 
                          trend.direction === 'down' ? 'text-red-500' : 'text-gray-400'
                        }`}>
                          {trend.direction === 'up' ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : trend.direction === 'down' ? (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          ) : (
                            <div className="w-4 h-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {trend.value > 0 ? trend.value : '—'}
                          </span>
                        </div>
                        <div className="text-gray-500">Trend</div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Global Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">Total Participants</h4>
            <Users className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-2xl font-bold text-green-600">
            {formatNumber(globalStats.totalParticipants)}
          </p>
          <p className="text-sm text-gray-500">Active eco-champions worldwide</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">Average Footprint</h4>
            <Leaf className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-2xl font-bold text-blue-600">
            {globalStats.averageFootprint} tons
          </p>
          <p className="text-sm text-gray-500">CO₂ per year globally</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-800">Total CO₂ Saved</h4>
            <Trophy className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {formatNumber(globalStats.totalCO2Saved)} tons
          </p>
          <p className="text-sm text-gray-500">Through collective action</p>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;