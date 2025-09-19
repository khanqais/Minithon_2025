import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              🌱 Eco Footprint
              <span className="block text-green-600">Calculator</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Discover your environmental impact and join thousands of others in building a sustainable future
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <SignedOut>
              <Link
                to="/auth"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Get Started Free
              </Link>
              <Link
                to="/leaderboard"
                className="bg-white/80 hover:bg-white backdrop-blur-sm text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2 border-green-600 hover:shadow-lg"
              >
                View Leaderboard
              </Link>
            </SignedOut>
            
            <SignedIn>
              <Link
                to="/quiz"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Take Quiz Now
              </Link>
              <Link
                to="/dashboard"
                className="bg-white/80 hover:bg-white backdrop-blur-sm text-green-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all border-2 border-green-600 hover:shadow-lg"
              >
                View Dashboard
              </Link>
            </SignedIn>
          </div>

          {/* Welcome Back Message */}
          <SignedIn>
            <div className="bg-white/70 backdrop-blur-sm border border-green-200 rounded-lg p-6 mb-8">
              <p className="text-green-800 text-lg">
                Welcome back, <span className="font-semibold">{user?.firstName || 'Eco Warrior'}</span>! 
                Ready to continue your sustainability journey? 🌿
              </p>
            </div>
          </SignedIn>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose Our Eco Calculator?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Assessment</h3>
              <p className="text-gray-600">
                10 detailed questions covering transportation, energy, consumption, and waste management
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Global Leaderboard</h3>
              <p className="text-gray-600">
                Compare your eco-footprint with others and track your progress over time
              </p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-green-200 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Personalized Tips</h3>
              <p className="text-gray-600">
                Get customized suggestions to reduce your environmental impact effectively
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-8 border border-green-200 shadow-lg">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">10,000+</div>
                <div className="text-gray-600">Assessments Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">25%</div>
                <div className="text-gray-600">Average Footprint Reduction</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">150+</div>
                <div className="text-gray-600">Countries Represented</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of eco-conscious individuals working towards a sustainable future
          </p>
          
          <SignedOut>
            <Link
              to="/auth"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Start Your Journey Today
            </Link>
          </SignedOut>
          
          <SignedIn>
            <Link
              to="/quiz"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all transform hover:scale-105 shadow-lg inline-block"
            >
              Take Assessment Now
            </Link>
          </SignedIn>
        </div>
      </section>
    </div>
  );
}