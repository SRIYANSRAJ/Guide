import React from 'react';
import { BarChart3, Award, TrendingUp, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { TopicProgress } from '../types';

interface ChapterProgressProps {
  totalAttempts: number;
  totalSolved: number;
  topicProgress: Record<string, TopicProgress>;
  onSelectChapter: (id: string) => void;
}

export const ChapterProgress: React.FC<ChapterProgressProps> = ({
  totalAttempts,
  totalSolved,
  topicProgress,
  onSelectChapter,
}) => {
  const accuracy = totalAttempts > 0 ? Math.round((totalSolved / totalAttempts) * 100) : 0;

  const topics = [
    { key: 'conversions', label: 'Radix Conversions', chapterId: 'chapter3' },
    { key: 'addition', label: 'Column Addition & Carry', chapterId: 'addition' },
    { key: 'subtraction', label: 'Chain Borrowing Subtraction', chapterId: 'subtraction_borrow' },
    { key: 'complements', label: 'r’s & (r−1)’s Complements', chapterId: 'complements' },
    { key: 'fractions', label: 'Radix Points & Fractions', chapterId: 'radix_points' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
          <BarChart3 className="w-4 h-4" /> Learning Analytics &amp; Diagnostic
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Your Number System Mastery Profile
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Real-time performance tracking across all operational modules.
        </p>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Total Questions
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono mt-1">
            {totalAttempts}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Correct Answers
          </span>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mt-1">
            {totalSolved}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Overall Accuracy
          </span>
          <div className="text-3xl font-black text-blue-600 dark:text-blue-400 font-mono mt-1">
            {accuracy}%
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Mastery Tier
          </span>
          <div className="text-lg font-black text-amber-500 mt-2 flex items-center gap-1.5">
            <Award className="w-5 h-5" />{' '}
            {totalSolved >= 10 ? 'Master Architect' : totalSolved >= 4 ? 'Adept Explorer' : 'Apprentice'}
          </div>
        </div>
      </div>

      {/* Breakdown Progress Bars */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-6">
          Topic-by-Topic Proficiency
        </h3>

        <div className="space-y-5">
          {topics.map((t) => {
            const prog = topicProgress[t.key] || { attempted: 0, correct: 0, streak: 0 };
            const topicAcc = prog.attempted > 0 ? Math.round((prog.correct / prog.attempted) * 100) : 0;

            return (
              <div key={t.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <button
                    onClick={() => onSelectChapter(t.chapterId)}
                    className="text-slate-800 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-1.5"
                  >
                    {t.label} ➔
                  </button>
                  <span className="font-mono text-slate-500">
                    {prog.correct} / {prog.attempted} ({topicAcc}%)
                  </span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${topicAcc}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Learning Diagnostic */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 text-slate-100 border border-slate-800 shadow-lg">
        <div className="flex items-center gap-2 font-black text-amber-400 text-sm uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" /> Diagnostic Feedback &amp; Study Recommendations
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {totalAttempts < 3
            ? 'Complete at least 3 practice questions to generate targeted diagnostic insights and identify any subtle misconceptions regarding carry propagation or radix conversions.'
            : accuracy >= 80
            ? '🌟 Outstanding conceptual foundation! You demonstrate high fluency with multi-base arithmetic, power expansions, and bit grouping. Next, explore Chapter 6 to master ultra-slow chain borrowing!'
            : '💡 Great effort! To further strengthen your mental model, revisit Chapter 6 for slow-motion borrowing across zeroes and Chapter 3 for successive division remainders.'}
        </p>
      </div>
    </div>
  );
};
