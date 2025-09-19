import { useState, useEffect } from 'react';

function LeaderboardDebug() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      
      console.log('=== LEADERBOARD DEBUG ===');
      console.log('Full API Response:', JSON.stringify(data, null, 2));
      console.log('Data Array Length:', data.data ? data.data.length : 0);
      console.log('Each User Entry:');
      
      if (data.data) {
        data.data.forEach((entry, index) => {
          console.log(`Entry ${index}:`, {
            userId: entry.userId,
            rank: entry.rank,
            bestScore: entry.bestScore,
            latestScore: entry.latestScore,
            totalAttempts: entry.totalAttempts
          });
        });
      }
      
      if (data.success) {
        setLeaderboard(data.data || []);
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

  if (loading) {
    return <div className="p-4">Loading leaderboard debug...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Leaderboard Debug</h2>
      <button 
        onClick={fetchLeaderboard}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Refresh Data
      </button>
      
      <div className="mb-4">
        <strong>Total Entries:</strong> {leaderboard.length}
      </div>
      
      <div className="space-y-2">
        {leaderboard.map((entry, index) => (
          <div 
            key={`debug-${entry.userId}-${index}`}
            className="border p-3 rounded bg-gray-50"
          >
            <div><strong>Index:</strong> {index}</div>
            <div><strong>Rank:</strong> {entry.rank}</div>
            <div><strong>User ID:</strong> {entry.userId}</div>
            <div><strong>Best Score:</strong> {entry.bestScore}</div>
            <div><strong>Latest Score:</strong> {entry.latestScore}</div>
            <div><strong>Average Score:</strong> {entry.averageScore}</div>
            <div><strong>Total Attempts:</strong> {entry.totalAttempts}</div>
            <div><strong>Category:</strong> {entry.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardDebug;