import { useState } from 'react';
import { Link } from 'react-router-dom';
import EcoFootprintQuiz from '../components/EcoFootprintQuiz';

export default function QuizPage() {
  const [quizCompleted, setQuizCompleted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Navigation Card */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <Link 
            to="/dashboard" 
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium transition-colors"
          >
            ← Back to Dashboard
          </Link>
        </div>

        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            🌱 Eco-Footprint Assessment
          </h1>
          <p className="text-lg text-gray-600">
            Complete our comprehensive 10-question assessment to discover your environmental impact
          </p>
        </div>

        {/* Quiz Component */}
        <EcoFootprintQuiz onComplete={() => setQuizCompleted(true)} />

        {/* Completion Card */}
        {quizCompleted && (
          <div className="mt-8">
            <div className="bg-gradient-to-r from-green-100 to-green-50 border-2 border-green-200 rounded-xl p-8 text-center">
              <div className="mb-6">
                <span className="text-6xl">🎉</span>
                <h3 className="text-2xl font-bold text-green-800 mt-4 mb-2">
                  Assessment Complete!
                </h3>
                <p className="text-green-700">
                  Great job! Your results have been submitted to the leaderboard.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/leaderboard"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  View Leaderboard
                </Link>
                <Link
                  to="/dashboard"
                  className="bg-white hover:bg-gray-50 text-green-600 px-8 py-3 rounded-xl font-medium transition-all duration-200 border-2 border-green-600 shadow-md hover:shadow-lg"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
