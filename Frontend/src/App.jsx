import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import LeaderboardPage from './pages/LeaderboardPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoute from './components/ProtectedRoute';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {
  return (
    
      <ErrorBoundary>
        <Router>
          <div className="min-h-screen w-full bg-white relative">
            <div
              className="fixed inset-0 z-0"
              style={{
                backgroundImage: `
                  radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
                `,
                backgroundSize: "100% 100%",
              }}
            />
            
            <div className="relative z-10 min-h-screen flex flex-col">
              <Header />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={
                    <SignedOut>
                      <AuthPage />
                    </SignedOut>
                  } />
                  
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/quiz" element={
                    <ProtectedRoute>
                      <QuizPage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/leaderboard" element={<LeaderboardPage />} />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/auth" element={
                    <SignedIn>
                      <Navigate to="/dashboard" replace />
                    </SignedIn>
                  } />
                  
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
              
              <footer className="bg-white/10 backdrop-blur-sm border-t border-green-200/20 py-6">
                <div className="container mx-auto px-4 text-center">
                  <p className="text-gray-700/80 text-sm">
                    © 2025 Eco Footprint Calculator. Making sustainability accessible for everyone. 🌱
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </Router>
      </ErrorBoundary>
    
  );
}

export default App;
