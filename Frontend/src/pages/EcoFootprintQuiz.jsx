// src/pages/EcoFootprintQuiz.jsx
import EcoFootprintQuiz from '../components/EcoFootprintQuiz';

function EcoFootprintQuizPage() {
  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Emerald Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 10%, #ffffff 40%, #10b981 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🌱 Eco-Footprint Quiz
            </h1>
            <p className="text-xl text-gray-700">
              Discover your environmental impact and get personalized tips
            </p>
          </div>
          
          {/* Quiz Component with backdrop styling */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 max-w-4xl mx-auto border border-white/30">
            <EcoFootprintQuiz />
          </div>
        </div>
      </div>
    </div>
  );
}

export default EcoFootprintQuizPage;