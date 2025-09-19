import React, { useState, useMemo } from "react";

// EcoFootprintQuiz.jsx
// Single-file React component (default export)
// - Renders 5 card-style questions
// - Each option has associated points
// - Selections add up to a total score
// - Shows progress bar, category, and suggestions

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
  }, [questions]);

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
  }, [answers, questions]);

  const percentage = Math.round((total / maxTotal) * 100 || 0);

  // derive category and tips
  const category = useMemo(() => {
    // lower score -> better (we set low points for eco-friendly)
    const pct = percentage;
    if (pct <= 30) return "Low impact ✔️";
    if (pct <= 65) return "Medium impact ⚠️";
    return "High impact 🔥";
  }, [percentage]);

  const suggestions = useMemo(() => {
    const tips = [];
    // transport tip
    if (answers.transport === "car") tips.push("Try carpooling or using public transport a few days/week.");
    if (answers.transport === "bike" || answers.transport === "walk") tips.push("Great job: keep active commuting!");

    // diet tip
    if (answers.diet === "meat") tips.push("Try 'Meatless Mondays' or reduce red meat intake.");
    if (answers.diet === "vegan" || answers.diet === "veg") tips.push("Plant-forward diets are a strong carbon saver — nice work!");

    // energy tip
    if (answers.energy === "rarely") tips.push("Switch off standby devices and use LED bulbs.");
    if (answers.energy === "always") tips.push("You're energy-conscious — consider small efficiency upgrades like smart plugs.");

    // waste tip
    if (answers.waste === "none") tips.push("Start by separating recyclables — small steps scale up.");
    if (answers.waste === "full") tips.push("Composting and recycling make a big impact — keep it up!");

    // shopping tip
    if (answers.shopping === "often") tips.push("Try buying second-hand or planning purchases to avoid impulse buys.");

    if (tips.length === 0) tips.push("Nice — you're already doing several eco-friendly things. Keep it up!");

    return tips;
  }, [answers]);

  function handleSelect(qid, pts) {
    setAnswers((prev) => ({ ...prev, [qid]: pts }));
  }

  function reset() {
    setAnswers(initialAnswers);
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Eco-Footprint Quick Quiz</h2>

      <p className="text-sm text-slate-600 mb-4">
        Answer 5 quick questions. Each option has points — the lower your final score, the lower
        your footprint.
      </p>

      <div className="space-y-4">
        {questions.map((q) => (
          <fieldset key={q.id} className="border rounded-lg p-4 bg-white shadow-sm">
            <legend className="font-medium mb-2">{q.title}</legend>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt) => (
                <label
                  key={opt.id}
                  className={`cursor-pointer flex items-center gap-3 p-2 rounded-md border transition-all ${
                    answers[q.id] === opt.points ? "ring-2 ring-green-300 bg-green-50" : "hover:bg-gray-50"
                  }`}
                >
                  <input
                    type="radio"
                    name={q.id}
                    aria-label={opt.label}
                    checked={answers[q.id] === opt.points}
                    onChange={() => handleSelect(q.id, opt.points)}
                    className="form-radio"
                  />
                  <div>
                    <div className="font-semibold">{opt.label}</div>
                    <div className="text-xs text-slate-500">Points: {opt.points}</div>
                  </div>
                </label>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      {/* Results card */}
      <div className="mt-6 p-4 rounded-lg border bg-gray-50">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-600">Score</div>
            <div className="text-xl font-bold">{total} / {maxTotal}</div>
            <div className="text-sm">{category}</div>
          </div>

          <div className="w-64">
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className={`h-4 rounded-full transition-all ${
                  percentage <= 30 ? "bg-green-500" : percentage <= 65 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${percentage}%` }}
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                role="progressbar"
              />
            </div>
            <div className="text-xs text-slate-500 mt-1">Progress: {percentage}%</div>
          </div>
        </div>

        <div className="mt-4">
          <div className="font-medium">Personalized suggestions</div>
          <ul className="list-disc ml-5 mt-2 text-sm text-slate-700">
            {suggestions.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div className="mt-4 flex gap-2">
          <button onClick={reset} className="px-3 py-1 rounded bg-gray-200">Reset</button>
          <div className="ml-auto text-sm text-slate-600">Answered {filledCount} / {questions.length}</div>
        </div>
      </div>
    </div>
  );
}