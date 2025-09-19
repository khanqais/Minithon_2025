import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';

import UserProfile from './components/UserProfile';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <nav className="bg-white shadow-sm border-b p-4">
          <div className="flex space-x-6">
            <Link to="/" className="text-eco-blue-600 hover:text-eco-blue-800 font-medium transition-colors">Home</Link>
            <Link to="/auth" className="text-eco-blue-600 hover:text-eco-blue-800 font-medium transition-colors">Sign In/Up</Link>
            <Link to="/dashboard" className="text-eco-blue-600 hover:text-eco-blue-800 font-medium transition-colors">Dashboard</Link>
           
            <Link to="/profile" className="text-eco-blue-600 hover:text-eco-blue-800 font-medium transition-colors">Profile</Link>
            
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">🌱 Eco Footprint Calculator</h1>
                <p className="text-xl text-gray-600 mb-8">Discover your environmental impact and learn how to reduce it</p>
                <div className="bg-eco-green-50 border border-eco-green-200 rounded-lg p-6 max-w-2xl mx-auto">
                  <p className="text-eco-green-800">Welcome to your journey towards a more sustainable lifestyle!</p>
                </div>
              </div>
            } />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            <Route path="/profile" element={<UserProfile />} />
            
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
