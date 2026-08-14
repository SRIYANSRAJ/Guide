import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Layers, ShieldCheck, Cpu, ArrowLeftRight, Link2, RefreshCw } from 'lucide-react';
import { BaseType } from '../types';
import { BASES } from '../utils/numberSystems';

interface ChapterHomeProps {
  onSelectChapter: (id: string) => void;
}

export const ChapterHome: React.FC<ChapterHomeProps> = ({ onSelectChapter }) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Computer Science Laboratory
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            Master Number Systems &amp;{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-amber-300 bg-clip-text text-transparent">
              Slow-Mo Arithmetic
            </span>
          </h1>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
            Explore positional place values, arbitrary radix conversions with live division and grouping ladders,
            slow-motion chain borrowing with visual strike-throughs, carry propagation, and complements across Binary, Octal, Decimal, and Hexadecimal.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => onSelectChapter('chapter1')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-100"
            >
              <BookOpen className="w-4 h-4" /> Start Chapter 1
            </button>
            <button
              onClick={() => onSelectChapter('subtraction_borrow')}
              className="px-6 py-3.5 rounded-xl bg-rose-600/90 hover:bg-rose-600 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-rose-600/25 transition-all hover:scale-105 active:scale-100"
            >
              <Link2 className="w-4 h-4" /> Slow-Mo Chain Borrow Lab
            </button>
            <button
              onClick={() => onSelectChapter('chapter3')}
              className="px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-sm flex items-center gap-2 transition-all"
            >
              <ArrowLeftRight className="w-4 h-4" /> Universal Matrix Converter
            </button>
          </div>
        </div>
      </div>

      {/* Relational Interconnection Diagram */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            Architectural Bridge
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            How The 4 Number Systems Connect
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-2">
            Binary serves as the direct hardware bridge. Octal (3-bit) and Hexadecimal (4-bit) group directly into binary powers of 2.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {([2, 8, 10, 16] as BaseType[]).map((base) => {
            const info = BASES[base];
            return (
              <div
                key={base}
                className="relative p-5 rounded-2xl border transition-all duration-300 hover:shadow-md group flex flex-col justify-between"
                style={{
                  backgroundColor: info.lightBg,
                  borderColor: info.borderColor,
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      style={{ backgroundColor: info.color }}
                      className="text-white text-xs font-bold font-mono px-2.5 py-1 rounded-lg uppercase tracking-wider"
                    >
                      {info.symbol} {info.subscript}
                    </span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300 font-mono">
                      Base {info.base}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg mb-1">{info.name}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed mb-4">{info.description}</p>
                </div>

                <div>
                  <div className="text-[11px] font-mono font-semibold text-slate-700 mb-3 bg-white/70 dark:bg-black/10 p-2.5 rounded-xl border border-slate-300/40">
                    <span className="text-slate-500 font-sans block text-[10px] uppercase font-bold">
                      Valid Digits ({info.digits.length}):
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {info.digits.map((d) => (
                        <span
                          key={d}
                          className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 shadow-xs text-slate-900 dark:text-white font-bold"
                        >
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (base === 2) onSelectChapter('chapter1');
                      else if (base === 8) onSelectChapter('bin_oct_hex');
                      else if (base === 10) onSelectChapter('decimal_interchange');
                      else onSelectChapter('bin_oct_hex');
                    }}
                    style={{ color: info.color }}
                    className="w-full py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-colors shadow-xs"
                  >
                    Explore Base {base} <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Chapter Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          onClick={() => onSelectChapter('chapter3')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ArrowLeftRight className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
            Universal Matrix Conversions
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Convert any number between all 12 combinations of Binary, Octal, Decimal, and Hexadecimal with real-time division remainders and bit regroupings.
          </p>
          <span className="text-xs font-bold text-blue-600 flex items-center gap-1">
            Open Conversion Matrix <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onSelectChapter('subtraction_borrow')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Link2 className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 group-hover:text-rose-600 transition-colors">
            Slow-Motion Chain Borrowing Lab
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Watch the borrow jump across consecutive zeroes with animated strike-throughs, base transfer arrows, and step-by-step arithmetic.
          </p>
          <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
            Launch Slow-Mo Simulator <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>

        <div
          onClick={() => onSelectChapter('practice')}
          className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs hover:shadow-lg transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 group-hover:text-amber-600 transition-colors">
            Adaptive Practice &amp; Diagnostics
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
            Test yourself on conversion challenges, carry additions, chain borrow subtractions, and complements with instant step hints.
          </p>
          <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
            Start Challenge Arena <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
