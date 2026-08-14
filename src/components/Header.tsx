import React from 'react';
import { Sparkles, Binary, CheckCircle2, Menu, ChevronRight } from 'lucide-react';
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
  onSelectChapter,
}) => {
  const accuracy = totalAttempts > 0 ? Math.round((totalSolved / totalAttempts) * 100) : 100;

  const getChapterName = (id: string) => {
    switch (id) {
      case 'home': return 'Overview';
      case 'chapter1': return '1. What is a Base?';
      case 'chapter2': return '2. Base Odometer';
      case 'digits': return '3. Digits & Symbols';
      case 'chapter3': return '4. Conversion Matrix';
      case 'bin_oct_hex': return '5. Bit Grouping';
      case 'decimal_interchange': return '6. Decimal Ladders';
      case 'radix_points': return '7. Radix Points';
      case 'addition': return '8. Column Addition';
      case 'subtraction_borrow': return '9. Slow-Mo Borrow';
      case 'complements': return '10. Complements';
      case 'multiplication': return '11. Multiplication';
      case 'practice': return '12. Quiz Arena';
      case 'reference': return '13. Master Reference';
      case 'progress': return '14. Diagnostics';
      default: return 'Laboratory';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between shadow-xl">
      <div className="flex items-center gap-2 sm:gap-4 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-100 transition-all border border-slate-700 flex items-center justify-center shrink-0"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <div className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer" onClick={() => onSelectChapter('home')}>
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <Binary className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
                NumVisual
              </span>
              <span className="hidden xs:inline-block text-[11px] uppercase font-extrabold tracking-widest px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Lab
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium truncate max-w-[140px] sm:max-w-xs md:max-w-md">
              {getChapterName(currentChapter)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Base badges on md+ */}
        <div className="hidden lg:flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/70">
          {([2, 8, 10, 16] as BaseType[]).map((base) => (
            <span
              key={base}
              style={{ color: BASES[base].color }}
              className="text-xs font-mono font-black px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800"
            >
              {BASES[base].name.split(' ')[0]} ({base})
            </span>
          ))}
        </div>

        {/* Practice Stats Pill */}
        <button
          onClick={() => onSelectChapter('progress')}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-3 sm:px-4 py-2 rounded-2xl text-xs transition-all cursor-pointer shadow-xs"
          title="View Learning Progress & Diagnostics"
        >
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <div className="flex flex-col text-left">
            <span className="font-bold text-slate-100 text-xs leading-none">
              {totalSolved}/{totalAttempts}
            </span>
            <span className="text-[10px] text-slate-400 font-medium mt-0.5">
              {totalAttempts > 0 ? `${accuracy}% Acc` : 'Practice'}
            </span>
          </div>
        </button>
      </div>
    </header>
  );
};
