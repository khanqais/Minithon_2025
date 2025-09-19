// Test script to check backend connection
// Run this in your browser console or create a simple HTML page

const testBackendConnection = async () => {
  const API_BASE_URL = 'http://localhost:3000';
  
  console.log('🧪 Testing backend connection...');
  
  try {
    // Test 1: Check if backend is running
    console.log('📡 Testing basic connection...');
    const basicResponse = await fetch(`${API_BASE_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!basicResponse.ok) {
      throw new Error(`Backend not responding: ${basicResponse.status}`);
    }
    
    const basicData = await basicResponse.json();
    console.log('✅ Backend is running:', basicData);
    
    // Test 2: Check leaderboard endpoint
    console.log('📊 Testing leaderboard endpoint...');
    const leaderboardResponse = await fetch(`${API_BASE_URL}/api/leaderboard`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!leaderboardResponse.ok) {
      throw new Error(`Leaderboard endpoint failed: ${leaderboardResponse.status}`);
    }
    
    const leaderboardData = await leaderboardResponse.json();
    console.log('✅ Leaderboard data:', leaderboardData);
    
    // Test 3: Test score submission (optional - commented out to avoid creating test data)
    /*
    console.log('📝 Testing score submission...');
    const scoreResponse = await fetch(`${API_BASE_URL}/api/score/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: 'test_user_123',
        totalScore: 25,
        category: 'Low Impact'
      })
    });
    
    const scoreData = await scoreResponse.json();
    console.log('✅ Score submission test:', scoreData);
    */
    
    return {
      success: true,
      message: 'All tests passed! Backend is working correctly.',
      data: {
        basicEndpoint: basicData,
        leaderboard: leaderboardData
      }
    };
    
  } catch (error) {
    console.error('❌ Backend test failed:', error);
    return {
      success: false,
      message: error.message,
      solutions: [
        '1. Make sure your backend server is running: cd Backend && npm run dev',
        '2. Check if port 3000 is accessible',
        '3. Verify MongoDB connection in backend',
        '4. Check CORS settings in backend app.js'
      ]
    };
  }
};

// Usage: Call this function to test your backend
// testBackendConnection().then(result => console.log(result));

// Quick test function you can use in React components
export const quickLeaderboardTest = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/leaderboard');
    const data = await response.json();
    console.log('Leaderboard test result:', data);
    return data;
  } catch (error) {
    console.error('Leaderboard test failed:', error);
    return { success: false, error: error.message };
  }
};

export default testBackendConnection;