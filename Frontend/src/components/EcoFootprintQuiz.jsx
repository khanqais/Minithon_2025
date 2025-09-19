import React, { useState, useMemo } from "react";
import { useUser } from '@clerk/clerk-react';

export default function EcoFootprintQuiz({ onComplete }) {
  const { user } = useUser();
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const API_BASE_URL = 'http://localhost:3000';
  const questions = [
    {
      id: "commute",
      title: "What is your primary mode of commuting?",
      category: "Transportation",
      
      options: [
        { id: "walk_bike", label: "Walk or Bike", points: 0 },
        { id: "public_transport", label: "Public Transport", points: 2 },
        { id: "carpool", label: "Carpool/Rideshare", points: 4 },
        { id: "fuel_efficient", label: "Fuel-Efficient Car", points: 6 },
        { id: "suv_truck", label: "SUV/Truck", points: 8 },
      ],
    },
    {
      id: "drivingMiles",
      title: "How many miles do you drive per week?",
      category: "Transportation",
      
      options: [
        { id: "0_50", label: "0-50 miles", points: 1 },
        { id: "51_150", label: "51-150 miles", points: 3 },
        { id: "151_300", label: "151-300 miles", points: 6 },
        { id: "300_plus", label: "300+ miles", points: 10 },
      ],
    },
    {
      id: "flights",
      title: "How often do you fly per year?",
      category: "Transportation",
      
      options: [
        { id: "none", label: "Never", points: 0 },
        { id: "1_2_domestic", label: "1-2 domestic flights", points: 4 },
        { id: "3_5_domestic", label: "3-5 domestic flights", points: 8 },
        { id: "6_plus_international", label: "6+ or international flights", points: 12 },
      ],
    },
    {
      id: "homeEnergy",
      title: "What type of energy does your home primarily use?",
      category: "Energy",
      
      options: [
        { id: "renewable", label: "Renewable Energy (Solar/Wind)", points: 1 },
        { id: "natural_gas", label: "Natural Gas", points: 5 },
        { id: "electricity_grid", label: "Grid Electricity", points: 6 },
        { id: "coal_oil", label: "Coal/Oil", points: 10 },
      ],
    },
    {
      id: "lightsOff",
      title: "How often do you turn off lights when leaving a room?",
      category: "Energy",
      
      options: [
        { id: "always", label: "Always", points: 1 },
        { id: "usually", label: "Usually", points: 2 },
        { id: "sometimes", label: "Sometimes", points: 4 },
        { id: "rarely_never", label: "Rarely/Never", points: 6 },
      ],
    },
    {
      id: "unplugElectronics",
      title: "How often do you unplug electronics when not in use?",
      category: "Energy",
      
      options: [
        { id: "always", label: "Always", points: 1 },
        { id: "often", label: "Often", points: 2 },
        { id: "sometimes", label: "Sometimes", points: 4 },
        { id: "never", label: "Never", points: 6 },
      ],
    },
    {
      id: "meatConsumption",
      title: "How often do you eat meat?",
      category: "Food & Lifestyle",
      
      options: [
        { id: "never_vegetarian", label: "Never (Vegetarian/Vegan)", points: 1 },
        { id: "1_2_times_week", label: "1-2 times per week", points: 3 },
        { id: "3_4_times_week", label: "3-4 times per week", points: 6 },
        { id: "daily", label: "Daily", points: 10 },
      ],
    },
    {
      id: "foodShopping",
      title: "Where do you primarily shop for food?",
      category: "Food & Lifestyle",
      
      options: [
        { id: "farmers_market", label: "Farmers Market/Local", points: 2 },
        { id: "grocery_fresh", label: "Grocery Store (Fresh Products)", points: 4 },
        { id: "mixed_fresh_processed", label: "Mixed Fresh & Processed", points: 6 },
        { id: "fast_food_processed", label: "Fast Food/Processed Foods", points: 10 },
      ],
    },
    {
      id: "clothesShopping",
      title: "How often do you buy new clothes?",
      category: "Consumption",
      
      options: [
        { id: "rarely_secondhand", label: "Rarely/Second-hand only", points: 1 },
        { id: "few_times_year", label: "A few times per year", points: 3 },
        { id: "monthly", label: "Monthly", points: 6 },
        { id: "weekly_more", label: "Weekly or more", points: 10 },
      ],
    },
    {
      id: "wasteHandling",
      title: "How do you handle waste and recycling?",
      category: "Waste",
     
      options: [
        { id: "recycle_compost_all", label: "Recycle & compost everything", points: 1 },
        { id: "recycle_most", label: "Recycle most items", points: 3 },
        { id: "recycle_sometimes", label: "Recycle sometimes", points: 5 },
        { id: "rarely_recycle", label: "Rarely recycle", points: 8 },
      ],
    },
  ];

  const initialAnswers = useMemo(() => {
    const map = {};
    questions.forEach((q) => (map[q.id] = null));
    return map;
  }, [questions]);

  const [answers, setAnswers] = useState(initialAnswers);

  
  const { total, maxTotal, filledCount } = useMemo(() => {
    let t = 0;
    let m = 0;
    let filled = 0;
    questions.forEach((q) => {
      const optionPoints = answers[q.id] != null ? answers[q.id] : 0;
      t += optionPoints;
      const qMax = q.options.reduce((a, b) => (a.points > b.points ? a : b)).points;
      m += qMax;
      if (answers[q.id] != null) filled++;
    });
    return { total: t, maxTotal: m, filledCount: filled };
  }, [answers, questions]);

  const percentage = Math.round((total / maxTotal) * 100 || 0);

  const category = useMemo(() => {
    if (total <= 25) {
      return "Low Impact ";
    }
    if (total <= 45) {
      return "Moderate Impact ";
    }
    if (total <= 70) {
      return "High Impact ";
    }
    return "Very High Impact ";
  }, [total]);

  const suggestions = useMemo(() => {
    const tips = [];
    
    if (answers.commute === "suv_truck") {
      tips.push("Consider switching to a fuel-efficient vehicle or using public transport occasionally.");
    }
    if (answers.commute === "walk_bike") {
      tips.push("Excellent! Walking and biking are the most eco-friendly commute options.");
    }
    
    if (answers.drivingMiles === "300_plus") {
      tips.push("Try to combine trips and consider carpooling for long distances.");
    }
    
    if (answers.flights === "6_plus_international") {
      tips.push("Consider video conferencing for business and choosing closer vacation destinations.");
    }
    
    // energy tips
    if (answers.homeEnergy === "coal_oil") {
      tips.push("Look into renewable energy options or energy-efficient appliances.");
    }
    if (answers.lightsOff === "rarely_never") {
      tips.push("Make it a habit to turn off lights when leaving rooms - it saves energy and money.");
    }
    
    // meat consumption tips  
    if (answers.meatConsumption === "daily") {
      tips.push("Try 'Meatless Mondays' or reduce red meat intake a few days per week.");
    }
    if (answers.meatConsumption === "never_vegetarian") {
      tips.push("Great job! Plant-based diets significantly reduce carbon footprint.");
    }
    
    // waste tips
    if (answers.wasteHandling === "rarely_recycle") {
      tips.push("Start by separating recyclables and composting organic waste - small steps make a big impact.");
    }
    
    // shopping tips
    if (answers.clothesShopping === "weekly_more") {
      tips.push("Consider buying fewer, higher-quality items and explore second-hand options.");
    }

    if (tips.length === 0) {
      tips.push("You're doing great! Keep up the eco-friendly habits and look for new ways to reduce your footprint.");
    }

    return tips;
  }, [answers]);

  // Submit function to send data to backend
  const handleSubmit = async () => {
    if (!user) {
      setSubmitError('Please sign in to submit your quiz results.');
      return;
    }

    if (filledCount < questions.length) {
      setSubmitError('Please answer all questions before submitting.');
      return;
    }

    setSubmitLoading(true);
    setSubmitError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/score/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          totalScore: total,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setTimeout(() => setSubmitSuccess(false), 5000);
        
        // Call onComplete callback if provided
        if (onComplete) {
          setTimeout(() => onComplete(), 2000);
        }
      } else {
        throw new Error(data.message || 'Failed to submit quiz results');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setSubmitError(error.message || 'Failed to submit quiz results');
    } finally {
      setSubmitLoading(false);
    }
  };

  function handleSelect(qid, pts) {
    setAnswers((prev) => ({ ...prev, [qid]: pts }));
  }

  function reset() {
    setAnswers(initialAnswers);
    setSubmitSuccess(false);
    setSubmitError(null);
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      
      {/* Progress Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Assessment Progress</h3>
            <p className="text-sm text-gray-600">Answer all questions to get your eco-footprint score</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{filledCount}/{questions.length}</div>
            <div className="text-xs text-gray-500">Questions Completed</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-300"
            style={{ width: `${(filledCount / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Questions Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{q.icon}</span>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide">{q.category}</div>
                    <div className="text-sm font-medium text-gray-600">Question {index + 1}</div>
                  </div>
                </div>
                {answers[q.id] !== null && (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mt-2">{q.title}</h3>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {q.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`cursor-pointer flex items-center justify-between p-4 rounded-lg border-2 transition-all duration-200 ${
                      answers[q.id] === opt.points 
                        ? "border-green-500 bg-green-50 shadow-md" 
                        : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={q.id}
                        checked={answers[q.id] === opt.points}
                        onChange={() => handleSelect(q.id, opt.points)}
                        className="w-4 h-4 text-green-600 focus:ring-green-500"
                      />
                      <span className="font-medium text-gray-800">{opt.label}</span>
                    </div>
                    <span className={`text-sm px-2 py-1 rounded-full ${
                      opt.points === 0 || opt.points === 1 ? 'bg-green-100 text-green-700' :
                      opt.points <= 4 ? 'bg-yellow-100 text-yellow-700' :
                      opt.points <= 8 ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {opt.points} pts
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Card */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Eco-Footprint Results</h3>
          <div className="w-16 h-1 bg-green-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Score Display */}
          <div className="text-center">
            <div className="relative inline-block">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white mx-auto mb-4 ${
                total <= 25 ? "bg-green-500" : 
                total <= 45 ? "bg-yellow-500" : 
                total <= 70 ? "bg-orange-500" : "bg-red-500"
              }`}>
                {total}
              </div>
              <div className="text-sm text-gray-500 mb-2">out of 100 points</div>
              <div className="text-lg font-semibold text-gray-800">{category}</div>
              <div className="text-xs text-gray-500 mt-1">
                Lower scores indicate better eco-friendliness
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center">
            <div className="w-full">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Eco-Friendly</span>
                <span>High Impact</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-6 rounded-full transition-all duration-500 ${
                    total <= 25 ? "bg-green-500" : 
                    total <= 45 ? "bg-yellow-500" : 
                    total <= 70 ? "bg-orange-500" : "bg-red-500"
                  }`}
                  style={{ width: `${Math.min((total / 100) * 100, 100)}%` }}
                ></div>
              </div>
              <div className="text-center text-xs text-gray-500 mt-2">Score: {total}/100</div>
            </div>
          </div>
        </div>

        {/* Suggestions */}
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <span className="text-2xl mr-3">💡</span>
            Personalized Suggestions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {suggestions.map((suggestion, i) => (
              <div key={i} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">•</span>
                <span className="text-sm text-gray-700">{suggestion}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Messages */}
        {submitSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center text-green-700">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Quiz results submitted successfully! Check the leaderboard to see your ranking.
            </div>
          </div>
        )}

        {submitError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <div className="flex items-center text-red-700">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {submitError}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex gap-3">
            <button 
              onClick={reset} 
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Reset Quiz
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={submitLoading || filledCount < questions.length || !user}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-md hover:shadow-lg ${
                submitLoading || filledCount < questions.length || !user
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {submitLoading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </div>
              ) : (
                'Submit to Leaderboard'
              )}
            </button>
          </div>
          
          <div className="text-sm text-gray-600 text-center">
            {!user && (
              <div className="text-red-500 mb-1">
                Sign in to submit your results
              </div>
            )}
            <div>
              <span className="font-medium">Progress:</span> {filledCount} / {questions.length} questions
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
