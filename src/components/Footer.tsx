import React from 'react';
import { Heart, Sparkles, Binary, BookOpen, Layers, Cpu, Zap } from 'lucide-react';

interface FooterProps {
  onSelectChapter: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectChapter }) => {
  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300">
      {/* Zero-Knowledge Conceptual Knowledge Vault */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" /> Conceptual Knowledge Base
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            Essential Computer Science Concepts Explained
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Everything you need to know about number systems even if you start with zero background knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-xs leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm">
              <Cpu className="w-4 h-4 text-blue-500" /> 1. Why Computers Use Binary (Base 2)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Electronic microprocessors consist of billions of microscopic transistors acting as switches. A switch has only 2 stable states: <strong>OFF (0V / logic 0)</strong> and <strong>ON (+5V or +3.3V / logic 1)</strong>. Binary matches physical semiconductor physics directly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm">
              <Layers className="w-4 h-4 text-purple-500" /> 2. Why Octal &amp; Hexadecimal Exist
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Long binary strings like <code className="text-blue-500 font-mono">1111111111110000</code> are unreadable to humans. Because $2^3 = 8$ and $2^4 = 16$, every 3 binary bits collapse into 1 Octal digit, and every 4 binary bits collapse into 1 Hex digit (<code className="text-amber-500 font-mono">FFF0₁₆</code>).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm">
              <Zap className="w-4 h-4 text-amber-500" /> 3. What Carry &amp; Borrow Truly Mean
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              When a column’s sum reaches or exceeds the base value, the single position overflows and bundles a complete unit of the next power (Carry). When a top digit is smaller than the bottom digit, it unbundles 1 unit from the left, which dissolves into exactly $+b$ units in the current column (Borrow).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm">
              <Binary className="w-4 h-4 text-emerald-500" /> 4. The Complements Subtraction Trick
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Building separate physical subtraction circuits inside a CPU Arithmetic Logic Unit (ALU) is costly and inefficient. By converting subtrahend B into its Two’s Complement (B* = invert(B) + 1), the hardware calculates A − B as simple addition A + B*.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm">
              <Sparkles className="w-4 h-4 text-rose-500" /> 5. Fractional Radix Points
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Just as numbers to the left of the point have weights $b^0, b^1, b^2$, positions to the right have fractional weights $b^{-1} = 1/b, b^{-2} = 1/b^2, b^{-3} = 1/b^3$. For binary: $0.1_2 = 0.5_{10}$, $0.01_2 = 0.25_{10}$, $0.001_2 = 0.125_{10}$.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-2 text-sm">
              <BookOpen className="w-4 h-4 text-indigo-500" /> 6. Universal Power Polynomial Rule
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">
              Number = $d_n b^n + \dots + d_1 b^1 + d_0 b^0 + d_{-1} b^{-1} + \dots$
              <br />
              <span className="font-sans text-slate-500 mt-1 block">
                This exact mathematical equation holds true without exception across all positional number systems.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Dedicated Attribution Footer Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-8 bg-slate-50 dark:bg-slate-950 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 font-extrabold text-sm text-slate-900 dark:text-white">
              <span>NumVisual Interactive Laboratory</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
              With passion and precision crafted by{' '}
              <strong className="text-slate-900 dark:text-slate-100 font-black">
                Sriyans And Devashish
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onSelectChapter('chapter1')}
              className="hover:text-blue-600 transition-colors"
            >
              Basics
            </button>
            <button
              onClick={() => onSelectChapter('chapter3')}
              className="hover:text-blue-600 transition-colors"
            >
              Conversions
            </button>
            <button
              onClick={() => onSelectChapter('subtraction_borrow')}
              className="hover:text-rose-600 transition-colors"
            >
              Slow-Mo Borrow Lab
            </button>
            <button
              onClick={() => onSelectChapter('practice')}
              className="hover:text-emerald-600 transition-colors"
            >
              Practice
            </button>
            <button
              onClick={() => onSelectChapter('reference')}
              className="hover:text-indigo-600 transition-colors"
            >
              Cheat Sheet
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
