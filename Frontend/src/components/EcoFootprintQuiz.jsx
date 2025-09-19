// src/components/EcoFootprintQuiz.jsx
import { useState, useMemo } from 'react';
import { RotateCcw, CheckCircle, AlertTriangle, Zap } from 'lucide-react';

export default function EcoFootprintQuiz() {
  const questions = [
    {
      id: "transport",
      title: "How do you commute most often?",
      options: [
        { id: "car", label: "Car (alone)", points: 80 },
        { id: "carpool", label: "Carpool / Ride-share", points: 50 },
        { id: "public", label: "Public transport", points: 30 },
        { id: "bike", label: "Bicycle", points: 10 },
        { id: "walk", label: "Walk", points: 5 },
      ],
    },
    {
      id: "diet",
      title: "Which best describes your diet?",
      options: [
        { id: "meat", label: "Meat-heavy", points: 70 },
        { id: "mixed", label: "Mixed (meat + veg)", points: 45 },
        { id: "veg", label: "Vegetarian", points: 25 },
        { id: "vegan", label: "Vegan", points: 10 },
      ],
    },
    {
      id: "energy",
      title: "How often do you conserve electricity?",
      options: [
        { id: "rarely", label: "Rarely", points: 60 },
        { id: "sometimes", label: "Sometimes", points: 30 },
        { id: "always", label: "Always / actively", points: 10 },
      ],
    },
    {
      id: "waste",
      title: "How do you handle waste & recycling?",
      options: [
        { id: "none", label: "No recycling", points: 60 },
        { id: "partial", label: "Some recycling", points: 30 },
        { id: "full", label: "Compost + recycle", points: 10 },
      ],
    },
    {
      id: "shopping",
      title: "How often do you buy new clothes or gadgets?",
      options: [
        { id: "often", label: "Often (impulse buys)", points: 60 },
        { id: "sometimes", label: "Sometimes", points: 30 },
        { id: "rarely", label: "Rarely / second-hand", points: 10 },
      ],
    },
  ];

  // Initialize answers state with nulls
  const initialAnswers = useMemo(() => {
    const map = {};
    questions.forEach((q) => (map[q.id] = null));
    return map;
  }, []);

  const [answers, setAnswers] = useState(initialAnswers);

  // compute total and max
  const { total, maxTotal, filledCount } = useMemo(() => {
    let t = 0;
    let m = 0;
    let filled = 0;
    
    questions.forEach((q) => {
      const optionPoints = answers[q.id] != null ? answers[q.id] : 0;
      t += optionPoints;
      // maximum for this question is the highest option points
      const qMax = q.options.reduce((a, b) => (a.points > b.points ? a : b)).points;
      m += qMax;
      if (answers[q.id] != null) filled++;
    });
    
    return { total: t, maxTotal: m, filledCount: filled };
  }, [answers]);

  const percentage = Math.round((total / maxTotal) * 100 || 0);

  // derive category and tips
  const category = useMemo(() => {
    // lower score -> better (we set low points for eco-friendly)
    const pct = percentage;
    if (pct <= 30) return { text: "Low impact", icon: CheckCircle, color: "text-green-600", bg: "bg-green-100" };
    if (pct <= 65) return { text: "Medium impact", icon: AlertTriangle, color: "text-yellow-600", bg: "bg-yellow-100" };
    return { text: "High impact", icon: Zap, color: "text-red-600", bg: "bg-red-100" };
  }, [percentage]);

  const suggestions = useMemo(() => {
    const tips = [];
    
    // transport tip
    if (answers.transport >= 80) {
      tips.push("Try carpooling or using public transport a few days/week.");
    } else if (answers.transport <= 10) {
      tips.push("Great job: keep active commuting!");
    }

    // diet tip
    if (answers.diet >= 70) {
      tips.push("Try 'Meatless Mondays' or reduce red meat intake.");
    } else if (answers.diet <= 25) {
      tips.push("Plant-forward diets are a strong carbon saver — nice work!");
    }

    // energy tip
    if (answers.energy >= 60) {
      tips.push("Switch off standby devices and use LED bulbs.");
    } else if (answers.energy <= 10) {
      tips.push("You're energy-conscious — consider small efficiency upgrades like smart plugs.");
    }

    // waste tip
    if (answers.waste >= 60) {
      tips.push("Start by separating recyclables — small steps scale up.");
    } else if (answers.waste <= 10) {
      tips.push("Composting and recycling make a big impact — keep it up!");
    }

    // shopping tip
    if (answers.shopping >= 60) {
      tips.push("Try buying second-hand or planning purchases to avoid impulse buys.");
    }

    if (tips.length === 0) {
      tips.push("Nice — you're already doing several eco-friendly things. Keep it up!");
    }

    return tips;
  }, [answers]);

  function handleSelect(qid, pts) {
    setAnswers((prev) => ({ ...prev, [qid]: pts }));
  }

  function reset() {
    setAnswers(initialAnswers);
  }

  const isComplete = filledCount === questions.length;
  const CategoryIcon = category.icon;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          🌍 Eco-Footprint Quick Quiz
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Answer 5 quick questions to get your environmental impact score. 
          Each option has points — the lower your final score, the lower your footprint.
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">
            Progress: {filledCount} / {questions.length} questions
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((filledCount / questions.length) * 100)}% complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(filledCount / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-6 mb-8">
        {questions.map((q, index) => (
          <div key={q.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <div className="flex items-center">
                <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </span>
                <h3 className="text-lg font-semibold text-gray-800">{q.title}</h3>
                {answers[q.id] !== null && (
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto" />
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {q.options.map((opt) => (
                  <label
                    key={opt.id}
                    className={`cursor-pointer flex items-start gap-3 p-4 rounded-lg border-2 transition-all hover:bg-gray-50 ${
                      answers[q.id] === opt.points 
                        ? "border-green-500 bg-green-50 text-green-700" 
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={answers[q.id] === opt.points}
                      onChange={() => handleSelect(q.id, opt.points)}
                      className="mt-1 w-4 h-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{opt.label}</div>
                      <div className="text-sm text-gray-500 mt-1">
                        Impact points: {opt.points}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Results Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
          <h3 className="text-xl font-bold text-white">Your Eco-Footprint Results</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Score Section */}
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-2">
                {total} / {maxTotal}
              </div>
              <div className="text-sm text-gray-500 mb-4">Total Impact Points</div>
              
              <div className={`inline-flex items-center px-4 py-2 rounded-full ${category.bg}`}>
                <CategoryIcon className={`w-5 h-5 mr-2 ${category.color}`} />
                <span className={`font-semibold ${category.color}`}>
                  {category.text}
                </span>
              </div>
            </div>

            {/* Progress Bar Section */}
            <div className="flex flex-col justify-center">
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-600">Impact Level</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div
                  className={`h-6 rounded-full transition-all duration-500 ${
                    percentage <= 30 ? "bg-green-500" : 
                    percentage <= 65 ? "bg-yellow-500" : "bg-red-500"
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="text-sm text-gray-500 mt-2 text-center">
                {percentage}% of maximum impact
              </div>
            </div>
          </div>

          {/* Suggestions */}
          {isComplete && (
            <div className="border-t border-gray-200 pt-6">
              <h4 className="font-semibold text-gray-800 mb-4 flex items-center">
                💡 Personalized Suggestions
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-start p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
            <button 
              onClick={reset}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset Quiz
            </button>
            
            <div className="text-sm text-gray-500">
              {isComplete ? (
                <span className="text-green-600 font-medium">✓ Quiz Complete!</span>
              ) : (
                <span>Answer all questions to see full results</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}