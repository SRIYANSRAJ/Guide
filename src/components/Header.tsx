import React from 'react';
import { BookOpen, Sparkles, Binary, CheckCircle2, Menu } from 'lucide-react';
import { BaseType } from '../types';
import { BASES } from '../utils/numberSystems';

interface HeaderProps {
  currentChapter: string;
  totalSolved: number;
  totalAttempts: number;
  onToggleSidebar: () => void;
  onSelectChapter: (ch: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentChapter,
  totalSolved,
  totalAttempts,
  onToggleSidebar,
}) => {
  const accuracy = totalAttempts > 0 ? Math.round((totalSolved / totalAttempts) * 100) : 100;

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 text-white px-4 lg:px-8 py-3.5 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-md shadow-indigo-500/20">
            <Binary className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
                NumVisual
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Interactive Lab
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Positional Number Systems, Radix Conversions & Slow-Mo Arithmetic
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Base badges */}
        <div className="hidden md:flex items-center gap-1.5 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
          {([2, 8, 10, 16] as BaseType[]).map((base) => (
            <span
              key={base}
              style={{ color: BASES[base].color }}
              className="text-xs font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900/60"
            >
              {BASES[base].symbol} {BASES[base].subscript}
            </span>
          ))}
        </div>

        {/* Practice Stats Pill */}
        <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-3 py-1.5 rounded-xl text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <div className="flex flex-col">
            <span className="font-bold text-slate-200">
              {totalSolved} / {totalAttempts} Solved
            </span>
            <span className="text-[10px] text-slate-400">{accuracy}% Accuracy</span>
          </div>
        </div>
      </div>
    </header>
  );
};
