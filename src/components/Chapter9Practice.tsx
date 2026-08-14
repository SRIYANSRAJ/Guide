import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, Sparkles, HelpCircle, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion, TopicProgress } from '../types';

interface Chapter9PracticeProps {
  onUpdateStats: (correct: boolean, category: string) => void;
  topicProgress: Record<string, TopicProgress>;
}

export const Chapter9Practice: React.FC<Chapter9PracticeProps> = ({
  onUpdateStats,
  topicProgress,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const questions: QuizQuestion[] = [
    {
      id: 'q1',
      category: 'conversions',
      difficulty: 'beginner',
      question: 'What is the binary equivalent of decimal 25₁₀?',
      options: ['11001₂', '10101₂', '11100₂', '10011₂'],
      correctAnswer: '11001₂',
      explanation: '25 ÷ 2 = 12 rem 1; 12 ÷ 2 = 6 rem 0; 6 ÷ 2 = 3 rem 0; 3 ÷ 2 = 1 rem 1; 1 ÷ 2 = 0 rem 1. Reading bottom-up gives 11001₂ (16 + 8 + 1 = 25).',
      hint: 'Sum the powers of two: 16 + 8 + 1.',
    },
    {
      id: 'q2',
      category: 'conversions',
      difficulty: 'intermediate',
      question: 'Convert Hexadecimal 3A7₁₆ directly to Binary:',
      options: ['0011 1010 0111₂', '0011 1011 0111₂', '0111 1010 0011₂', '0011 1001 0111₂'],
      correctAnswer: '0011 1010 0111₂',
      explanation: 'Convert each hex digit to 4 bits: 3 ➔ 0011, A (10) ➔ 1010, 7 ➔ 0111. Concatenating gives 0011 1010 0111₂.',
      hint: 'A in hex is 10 in decimal (1010 in 4-bit binary).',
    },
    {
      id: 'q3',
      category: 'subtraction',
      difficulty: 'advanced',
      question: 'In Octal subtraction 1000₈ − 7₈, when the borrow travels through the zeroes, what value do the intermediate zeroes become?',
      options: ['7 (which is base − 1)', '8 (the base)', '0 (unchanged)', '1'],
      correctAnswer: '7 (which is base − 1)',
      explanation: 'When borrowing across zeroes, each intermediate zero receives base 8, then immediately lends 1 to the next column, leaving 8 − 1 = 7. Thus 1000₈ − 7₈ = 0771₈.',
      hint: 'In base 10, intermediate zeroes become 9 (10 − 1). In base 8, they become 8 − 1 = 7.',
    },
    {
      id: 'q4',
      category: 'addition',
      difficulty: 'beginner',
      question: 'In Binary addition, what is 1₂ + 1₂?',
      options: ['0 with Carry 1 (10₂)', '2 with Carry 0', '1 with Carry 1', '10 with Carry 1'],
      correctAnswer: '0 with Carry 1 (10₂)',
      explanation: 'In base 2, 1 + 1 = 2. Since 2 ≥ base, output digit is 2 mod 2 = 0, and Carry 1 rolls to the left.',
      hint: 'There is no digit "2" in binary; 2 is written as 10₂.',
    },
    {
      id: 'q5',
      category: 'complements',
      difficulty: 'intermediate',
      question: 'What is the 2’s complement of the 4-bit binary number 1010₂?',
      options: ['0110₂', '0101₂', '1101₂', '1011₂'],
      correctAnswer: '0110₂',
      explanation: '1’s complement (invert bits) of 1010 is 0101. Adding 1: 0101 + 1 = 0110₂.',
      hint: 'Invert the bits to get 1’s complement, then add 1.',
    },
    {
      id: 'q6',
      category: 'fractions',
      difficulty: 'intermediate',
      question: 'What is the binary representation of the decimal fraction 0.625₁₀?',
      options: ['0.101₂', '0.110₂', '0.011₂', '0.111₂'],
      correctAnswer: '0.101₂',
      explanation: '0.625 = 0.5 (2⁻¹) + 0.125 (2⁻³) = 1·(0.5) + 0·(0.25) + 1·(0.125) = 0.101₂.',
      hint: '0.625 = 1/2 + 1/8.',
    },
  ];

  const filteredQuestions =
    selectedCategory === 'all'
      ? questions
      : questions.filter((q) => q.category === selectedCategory);

  const currentQ = filteredQuestions[currentQIndex % filteredQuestions.length];

  const handleSelectOption = (opt: string) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(opt);
    setShowExplanation(true);
    const isCorrect = opt === currentQ.correctAnswer;
    onUpdateStats(isCorrect, currentQ.category);

    if (isCorrect) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setShowHint(false);
    setCurrentQIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-1">
          <Award className="w-4 h-4" /> Chapter 9 • Interactive Assessment
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Adaptive Practice &amp; Knowledge Arena
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Test your mastery of base conversions, carry generation, chain borrowing across zeroes, radix points, and complements.
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {['all', 'conversions', 'addition', 'subtraction', 'complements', 'fractions'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentQIndex(0);
              setSelectedAnswer(null);
              setShowExplanation(false);
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Question Card */}
      {currentQ && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-mono">
              Category: {currentQ.category}
            </span>
            <span className="text-xs font-bold text-slate-400 font-mono">
              Question {(currentQIndex % filteredQuestions.length) + 1} of {filteredQuestions.length}
            </span>
          </div>

          <h3 className="font-black text-lg sm:text-xl text-slate-900 dark:text-white mb-6">
            {currentQ.question}
          </h3>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            {currentQ.options.map((opt) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === currentQ.correctAnswer;

              let btnStyle = 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:border-slate-400';
              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={opt}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border-2 font-mono font-bold text-sm text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {selectedAnswer !== null && isCorrect && <CheckCircle2 className="w-5 h-5" />}
                  {selectedAnswer !== null && isSelected && !isCorrect && <XCircle className="w-5 h-5" />}
                </button>
              );
            })}
          </div>

          {/* Hint button */}
          {!showExplanation && currentQ.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 mb-4 hover:underline"
            >
              <HelpCircle className="w-3.5 h-3.5" /> {showHint ? 'Hide Hint' : 'Need a Hint?'}
            </button>
          )}

          {showHint && !showExplanation && currentQ.hint && (
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-xs text-blue-900 dark:text-blue-200 mb-4">
              💡 Hint: {currentQ.hint}
            </div>
          )}

          {/* Explanation Callout */}
          {showExplanation && (
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-800 mb-6 space-y-2">
              <div className="flex items-center gap-2 font-bold text-amber-400 uppercase text-[11px] tracking-wider">
                <Sparkles className="w-4 h-4" /> Explanation:
              </div>
              <p className="leading-relaxed text-slate-300">{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              Next Challenge <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
