// src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import EcoFootprintQuiz from '../components/EcoFootprintQuiz';
import Leaderboard from '../components/Leaderboard';
import { 
  Trophy, 
  Leaf, 
  Award, 
  TrendingUp, 
  Users, 
  Target,
  Calendar,
  BarChart3,
  Play
} from 'lucide-react';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [userStats, setUserStats] = useState({
    carbonFootprint: 0,
    rank: 0,
    testsCompleted: 0,
    ecoScore: 0
  });

  // Mock user data - in real app, this would come from your backend
  useEffect(() => {
    // Simulate loading user stats
    setUserStats({
      carbonFootprint: 8.2,
      rank: 15,
      testsCompleted: 3,
      ecoScore: 85
    });
  }, []);

  const StatCard = ({ icon: Icon, title, value, unit, trend, color }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-red-500' : 'text-green-500'}`}>
            <TrendingUp className="w-4 h-4 mr-1" />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold text-gray-800">
        {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
      </p>
    </div>
  );

  const TabButton = ({ tab, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
        activeTab === tab
          ? 'bg-green-500 text-white shadow-lg'
          : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'
      }`}
    >
      <Icon className="w-4 h-4 mr-2" />
      {label}
    </button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Leaf}
                title="Carbon Footprint"
                value={userStats.carbonFootprint}
                unit="tons CO₂/year"
                trend={-12}
                color="bg-green-500"
              />
              <StatCard
                icon={Trophy}
                title="Global Rank"
                value={`#${userStats.rank}`}
                unit=""
                trend={-5}
                color="bg-blue-500"
              />
              <StatCard
                icon={Target}
                title="Eco Score"
                value={userStats.ecoScore}
                unit="/100"
                trend={8}
                color="bg-purple-500"
              />
              <StatCard
                icon={Calendar}
                title="Tests Completed"
                value={userStats.testsCompleted}
                unit="this month"
                color="bg-orange-500"
              />
            </div>

            {/* Action Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">Take New Assessment</h3>
                <p className="text-green-100 mb-4">
                  Measure your environmental impact and get personalized recommendations
                </p>
                <button
                  onClick={() => setActiveTab('quiz')}
                  className="bg-white text-green-600 px-6 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center"
                >
                  <Play className="w-4 h-4 mr-2" />
                  Start Quiz
                </button>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                <h3 className="text-xl font-bold mb-2">View Leaderboard</h3>
                <p className="text-blue-100 mb-4">
                  See how you rank against other eco-conscious individuals
                </p>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center"
                >
                  <Users className="w-4 h-4 mr-2" />
                  View Rankings
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 mr-2 text-gray-600" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Completed Transportation Quiz</span>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Improved by 3 positions in leaderboard</span>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-600">Completed Home Energy Assessment</span>
                  <span className="text-sm text-gray-500">1 week ago</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <EcoFootprintQuiz />
          </div>
        );

      case 'leaderboard':
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <Leaderboard />
          </div>
        );

      case 'achievements':
        return (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
              <Award className="w-5 h-5 mr-2 text-yellow-500" />
              Your Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'First Steps', description: 'Completed your first eco assessment', earned: true },
                { title: 'Green Warrior', description: 'Maintained low carbon footprint for 30 days', earned: true },
                { title: 'Top 20', description: 'Reached top 20 in global rankings', earned: true },
                { title: 'Eco Expert', description: 'Completed 10 assessments', earned: false },
                { title: 'Climate Champion', description: 'Reduced footprint by 50%', earned: false },
                { title: 'Green Leader', description: 'Reached #1 on leaderboard', earned: false },
              ].map((achievement, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    achievement.earned
                      ? 'border-yellow-300 bg-yellow-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <Award
                      className={`w-5 h-5 mr-2 ${
                        achievement.earned ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    />
                    <h4
                      className={`font-medium ${
                        achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                      }`}
                    >
                      {achievement.title}
                    </h4>
                  </div>
                  <p
                    className={`text-sm ${
                      achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                    }`}
                  >
                    {achievement.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <main className="relative w-full min-h-screen overflow-auto">
        {/* Background 3D Animation */}
        {/* <div className="fixed inset-0 -z-10 pointer-events-none">
          <Spline scene="https://prod.spline.design/T20WqSWDiFIluah125X56gnz/scene.splinecode" />
        </div> */}

        {/* Foreground Content */}
        <section className="relative z-10 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
                🌍 Eco-Footprint Dashboard
              </h1>
              <p className="text-white/80 text-lg drop-shadow">
                Track, compare, and reduce your environmental impact
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8 bg-white/20 backdrop-blur-sm rounded-xl p-2">
              <TabButton tab="overview" label="Overview" icon={BarChart3} />
              <TabButton tab="quiz" label="Take Test" icon={Play} />
              <TabButton tab="leaderboard" label="Leaderboard" icon={Trophy} />
              <TabButton tab="achievements" label="Achievements" icon={Award} />
            </div>

            {/* Content */}
            {renderContent()}
          </div>
        </section>
      </main>
    </ProtectedRoute>
  );
}

export default Dashboard;