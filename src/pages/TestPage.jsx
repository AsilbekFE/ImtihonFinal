import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  frontendQuestions,
  backendQuestions,
  reactQuestions,
  javascriptQuestions,
} from '../data/questionsData';
import TechLogo from '../components/TechLogo';

const categories = [
  {
    id: 'frontend',
    name: 'Frontend',
    logoType: 'html',
    color: 'bg-blue-600',
    borderColor: 'border-blue-500/40',
    bgColor: 'bg-blue-600/10',
    textColor: 'text-blue-400',
    questions: frontendQuestions,
    desc: 'HTML, CSS, Responsive dizayn',
  },
  {
    id: 'backend',
    name: 'Backend',
    logoType: 'nodejs',
    color: 'bg-green-600',
    borderColor: 'border-green-500/40',
    bgColor: 'bg-green-600/10',
    textColor: 'text-green-400',
    questions: backendQuestions,
    desc: "SQL, REST API, Ma'lumotlar bazasi",
  },
  {
    id: 'react',
    name: 'React.js',
    logoType: 'react',
    color: 'bg-cyan-600',
    borderColor: 'border-cyan-500/40',
    bgColor: 'bg-cyan-600/10',
    textColor: 'text-cyan-400',
    questions: reactQuestions,
    desc: 'Hooks, Components, State Management',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    logoType: 'javascript',
    color: 'bg-yellow-500',
    borderColor: 'border-yellow-500/40',
    bgColor: 'bg-yellow-600/10',
    textColor: 'text-yellow-400',
    questions: javascriptQuestions,
    desc: "ES6+, Async, Prototype, Event Loop",
  },
];

const levelColors = {
  Beginner: 'text-green-400 bg-green-400/10 border-green-400/30',
  Intermediate: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  Junior: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
};

// ===== RESULT SCREEN =====
const ResultScreen = ({ category, answers, questions, onRetry, onBack }) => {
  const { t } = useContext(AppContext);
  const correct = answers.filter((a, i) => a === questions[i].correct).length;
  const total = questions.length;
  const percent = Math.round((correct / total) * 100);

  const getGrade = () => {
    if (percent >= 90) return { label: t('resultExcel'), color: 'text-green-400', emoji: '🏆' };
    if (percent >= 70) return { label: t('resultGood'), color: 'text-blue-400', emoji: '🎯' };
    if (percent >= 50) return { label: t('resultAvg'), color: 'text-yellow-400', emoji: '📚' };
    return { label: t('resultPoor'), color: 'text-red-400', emoji: '💪' };
  };

  const grade = getGrade();

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-16 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Result Card */}
        <div className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-8 text-center fade-up">
          {/* Grade */}
          <div className="text-6xl mb-4">{grade.emoji}</div>
          <div className={`text-3xl font-black mb-2 ${grade.color}`}>{grade.label}</div>
          <div className="text-purple-400 text-sm font-semibold mb-6 uppercase tracking-widest">
            {category.name} — {t('quizFinished')}
          </div>

          {/* Score Circle */}
          <div className="relative w-36 h-36 mx-auto mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#1E1E3A" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke={percent >= 70 ? '#7C3AED' : percent >= 50 ? '#EAB308' : '#EF4444'}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42 * percent / 100} ${2 * Math.PI * 42}`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black text-white">{percent}%</span>
              <span className="text-gray-400 text-xs">{correct}/{total}</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-green-600/10 border border-green-500/20 rounded-xl p-4">
              <div className="text-2xl font-black text-green-400">{correct}</div>
              <div className="text-gray-500 text-xs mt-1">{t('correctAnswers')}</div>
            </div>
            <div className="bg-red-600/10 border border-red-500/20 rounded-xl p-4">
              <div className="text-2xl font-black text-red-400">{total - correct}</div>
              <div className="text-gray-500 text-xs mt-1">{t('wrongAnswers')}</div>
            </div>
            <div className="bg-purple-600/10 border border-purple-500/20 rounded-xl p-4">
              <div className="text-2xl font-black text-purple-400">{total}</div>
              <div className="text-gray-500 text-xs mt-1">{t('totalQuestions')}</div>
            </div>
          </div>

          {/* Detailed answers */}
          <div className="text-left mb-6">
            <h3 className="text-white font-bold mb-3 text-sm uppercase tracking-wide">{t('resultsDetail')}</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {questions.map((q, i) => {
                const isCorrect = answers[i] === q.correct;
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-3 p-3 rounded-lg border ${
                      isCorrect
                        ? 'bg-green-600/10 border-green-500/20'
                        : 'bg-red-600/10 border-red-500/20'
                    }`}
                  >
                    <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isCorrect ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-300 text-xs leading-snug">{i + 1}. {q.question}</p>
                      {!isCorrect && (
                        <p className="text-green-400 text-xs mt-1 font-medium">
                          ✓ {q.options[q.correct]}
                        </p>
                      )}
                    </div>
                    <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full border ${levelColors[q.level]}`}>
                      {q.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onBack}
              className="flex-1 px-4 py-3 rounded-xl border border-[#1E1E3A] text-gray-300 hover:border-purple-500/50 hover:text-white hover:bg-purple-600/10 transition-all font-semibold"
            >
              ← {t('backBtn')}
            </button>
            <button
              onClick={onRetry}
              className="flex-1 px-4 py-3 rounded-xl bg-purple-600 text-white font-semibold transition-all glow-purple"
            >
              {t('retryBtn')} 🔄
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== QUIZ SCREEN =====
const QuizScreen = ({ category, onFinish, onBack }) => {
  const { t } = useContext(AppContext);
  const [startTime] = useState(() => Date.now());
  const questions = category.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  const current = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (isLast) {
      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000);
      onFinish(newAnswers, elapsedSeconds);
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedOption(null);
      setAnswers((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-16 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8 fade-up">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3 ${category.bgColor} border ${category.borderColor} ${category.textColor}`}>
            <TechLogo type={category.logoType || 'design'} size="w-4 h-4" />
            {category.name.toUpperCase()} ASSESSMENT
          </div>
          <h1 className="text-2xl font-black text-white">{t('quizHeader')}</h1>
          <p className="text-gray-500 text-sm mt-2">
            {t('questionText')} {currentIndex + 1} / {questions.length}
          </p>

          {/* Progress bar */}
          <div className="mt-4 bg-[#1E1E3A] rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div key={currentIndex} className="bg-[#13132A] border border-[#1E1E3A] rounded-3xl p-8 slide-in">
          {/* Level badge */}
          <div className="flex items-center justify-between mb-5">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${levelColors[current.level]}`}>
              {current.level}
            </span>
            <span className="text-gray-600 text-xs">#{currentIndex + 1}</span>
          </div>

          {/* Question */}
          <div className="flex items-start gap-3 mb-7">
            <div className="w-7 h-7 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
              <div className="w-2 h-2 bg-purple-400 rounded-sm" />
            </div>
            <h2 className="text-white font-semibold text-lg leading-snug">{current.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {current.options.map((option, i) => {
              const optionLabel = ['A', 'B', 'C', 'D'][i];
              const isSelected = selectedOption === i;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border text-left transition-all duration-200 group ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white'
                      : 'bg-[#0D0D1A] border-[#1E1E3A] text-gray-300 hover:border-purple-500/40 hover:bg-purple-600/5 hover:text-white'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-purple-600 text-white'
                      : 'bg-[#1E1E3A] text-gray-500 group-hover:bg-purple-600/20 group-hover:text-purple-400'
                  }`}>
                    {isSelected ? (
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : optionLabel}
                  </div>
                  <span className="text-sm leading-snug">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={currentIndex === 0 ? onBack : handlePrev}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {currentIndex === 0 ? t('backBtn') : t('previous')}
            </button>

            <button
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                selectedOption !== null
                  ? isLast
                    ? 'bg-green-600 text-white glow-cyan'
                    : 'bg-purple-600 text-white glow-purple'
                  : 'bg-[#1E1E3A] text-gray-600 cursor-not-allowed'
              }`}
            >
              {isLast ? t('submitFinal') : t('next')}
              {!isLast && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mini progress indicators */}
        <div className="flex justify-center gap-1 mt-5 flex-wrap">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1 rounded-full transition-all duration-300 ${
                i < currentIndex
                  ? 'w-4 bg-purple-500'
                  : i === currentIndex
                  ? 'w-6 bg-purple-400'
                  : 'w-2 bg-[#1E1E3A]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// ===== TEST PAGE =====
const TestPage = () => {
  const { addTestResult, t } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalAnswers, setFinalAnswers] = useState([]);

  const handleStart = (cat) => {
    setSelectedCategory(cat);
    setQuizFinished(false);
    setFinalAnswers([]);
  };

  const handleFinish = (answers, elapsedSeconds) => {
    setFinalAnswers(answers);
    setQuizFinished(true);

    const correct = answers.filter((a, i) => a === selectedCategory.questions[i].correct).length;
    const total = selectedCategory.questions.length;
    const percent = Math.round((correct / total) * 100);

    addTestResult(selectedCategory.name, percent, correct, total - correct, elapsedSeconds || 45);
  };

  const handleBack = () => {
    setSelectedCategory(null);
    setQuizFinished(false);
    setFinalAnswers([]);
  };

  const handleRetry = () => {
    setQuizFinished(false);
    setFinalAnswers([]);
  };

  // Show results
  if (selectedCategory && quizFinished) {
    return (
      <ResultScreen
        category={selectedCategory}
        answers={finalAnswers}
        questions={selectedCategory.questions}
        onRetry={handleRetry}
        onBack={handleBack}
      />
    );
  }

  // Show quiz
  if (selectedCategory && !quizFinished) {
    return (
      <QuizScreen
        category={selectedCategory}
        onFinish={handleFinish}
        onBack={handleBack}
      />
    );
  }

  // Show category selection
  return (
    <div className="min-h-screen bg-[#0D0D1A] pt-16">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-purple-700/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-cyan-700/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Header */}
        <div className="text-center mb-14 fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-600/15 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-5">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            {t('testSubtitle')}
          </div>

          <h1 className="text-5xl font-black text-white mb-4">
            {t('testTitle').split(' ').slice(0, 1).join(' ')} <span className="text-gradient">{t('testTitle').split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            {t('testDesc')}
          </p>
        </div>

        {/* Info banner */}
        <div className="bg-[#13132A] border border-purple-500/20 rounded-2xl p-4 mb-10 flex items-center gap-4 flex-wrap">
          {[
            { icon: '📝', label: t('testInfo1'), sub: t('testSub1') },
            { icon: '🎯', label: t('testInfo2'), sub: t('testSub2') },
            { icon: '🚀', label: t('testInfo3'), sub: t('testSub3') },
            { icon: '🔄', label: t('testInfo4'), sub: t('testSub4') },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 flex-1 min-w-36">
              <div className="w-9 h-9 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-lg flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <div className="text-white font-semibold text-sm">{item.label}</div>
                <div className="text-gray-500 text-xs">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Category Cards */}
        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleStart(cat)}
              className={`text-left bg-[#13132A] border border-[#1E1E3A] rounded-2xl p-6 hover:${cat.borderColor} hover:-translate-y-1 transition-all duration-300 group`}
            >
              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <TechLogo type={cat.logoType || 'design'} size="w-8 h-8" className="text-white" />
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${cat.bgColor} ${cat.textColor} border ${cat.borderColor}`}>
                  {t('questionsLimit')}
                </div>
              </div>

              <h3 className="text-white font-black text-xl mb-1">{cat.name}</h3>
              <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>

              {/* Level badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                {['Beginner', 'Intermediate', 'Junior'].map((level) => (
                  <span
                    key={level}
                    className={`text-xs px-2 py-0.5 rounded-full border ${levelColors[level]}`}
                  >
                    {level}
                  </span>
                ))}
              </div>

              {/* Start button */}
              <div className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl ${cat.color} text-white font-semibold text-sm group-hover:opacity-90 transition-opacity`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {t('startTest')}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
